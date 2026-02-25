const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const { execFile } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// ─── Security Headers ────────────────────────────────────────────────
app.use(helmet());

// ─── CORS — restricted to known origins, NO wildcards ────────────────
const ALLOWED_ORIGINS = IS_PROD
    ? ['https://safepdf.site', 'https://www.safepdf.site']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, curl, mobile apps)
        if (!origin) return callback(null, true);
        if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
        callback(new Error('CORS: origin not allowed'));
    },
    methods: ['GET', 'POST'],
    credentials: false,
}));

// ─── Rate Limiting — /api/unlock: 10 req/min per IP ─────────────────
const unlockLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please wait a minute.', code: 'RATE_LIMITED' },
});

// ─── Multer config: 20 MB limit, temp dir ────────────────────────────
const upload = multer({
    dest: os.tmpdir(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are accepted.'));
        }
    },
});

// ─── PDF header validation ───────────────────────────────────────────
const isValidPDFFile = (filePath) => {
    try {
        const fd = fs.openSync(filePath, 'r');
        const buf = Buffer.alloc(5);
        fs.readSync(fd, buf, 0, 5, 0);
        fs.closeSync(fd);
        // %PDF- magic bytes
        return buf[0] === 0x25 && buf[1] === 0x50 &&
            buf[2] === 0x44 && buf[3] === 0x46 && buf[4] === 0x2D;
    } catch {
        return false;
    }
};

// ─── Temp file cleanup helper ────────────────────────────────────────
const safeUnlink = (filePath) => {
    if (filePath) fs.unlink(filePath, () => { });
};

// ─── Server-side PDF unlock via qpdf ─────────────────────────────────
app.post('/api/unlock', unlockLimiter, upload.single('file'), (req, res) => {
    const password = req.body?.password;
    const inputFile = req.file;

    if (!inputFile) {
        return res.status(400).json({ error: 'No PDF file uploaded.', code: 'BAD_REQUEST' });
    }
    if (!password || typeof password !== 'string' || password.length > 1000) {
        safeUnlink(inputFile.path);
        return res.status(400).json({ error: 'A valid password is required.', code: 'BAD_REQUEST' });
    }

    // Validate PDF header (catches renamed non-PDF files)
    if (!isValidPDFFile(inputFile.path)) {
        safeUnlink(inputFile.path);
        return res.status(400).json({ error: 'Uploaded file is not a valid PDF.', code: 'CORRUPT_FILE' });
    }

    const outputFile = path.join(
        os.tmpdir(),
        `unlocked_${crypto.randomUUID()}.pdf`
    );

    // Safe argument passing:
    //   --password=<pw>   as a single arg (execFile doesn't use a shell)
    //   '--'              sentinel prevents input/output paths from being
    //                     interpreted as flags if they start with '-'
    const args = [
        '--decrypt',
        `--password=${password}`,
        '--',
        inputFile.path,
        outputFile,
    ];

    execFile('qpdf', args, { timeout: 30000 }, (error, _stdout, stderr) => {
        safeUnlink(inputFile.path);

        if (error) {
            safeUnlink(outputFile);
            const msg = (stderr || error.message || '').toLowerCase();
            if (msg.includes('password')) {
                return res.status(401).json({ error: 'Incorrect password.', code: 'WRONG_PASSWORD' });
            }
            if (msg.includes('not a valid') || msg.includes('damaged')) {
                return res.status(400).json({ error: 'Corrupt or invalid PDF.', code: 'CORRUPT_FILE' });
            }
            console.error('qpdf error:', stderr || error.message);
            return res.status(500).json({ error: 'Failed to unlock the PDF.', code: 'UNKNOWN' });
        }

        res.download(outputFile, 'unlocked.pdf', (downloadErr) => {
            safeUnlink(outputFile);
            if (downloadErr && !res.headersSent) {
                console.error('Download stream error:', downloadErr);
            }
        });
    });
});

// ─── Multer error handler ────────────────────────────────────────────
app.use((err, _req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ error: 'File exceeds the 20 MB limit.', code: 'FILE_TOO_LARGE' });
        }
        return res.status(400).json({ error: err.message, code: 'UPLOAD_ERROR' });
    }
    if (err.message === 'Only PDF files are accepted.') {
        return res.status(400).json({ error: err.message, code: 'INVALID_TYPE' });
    }
    next(err);
});

// ─── Static frontend serving ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// ─── Graceful shutdown ───────────────────────────────────────────────
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received — shutting down gracefully');
    server.close(() => process.exit(0));
});
