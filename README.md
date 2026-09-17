# SafePDF

SafePDF is a privacy-first, browser-based PDF utility suite. It provides essential and advanced document manipulation tools—such as merging, splitting, compressing, converting, encrypting, unlocking, editing, signing, and redacting—with a strict zero-upload security guarantee.

All document processing executes locally on the user's device using JavaScript and browser APIs. Files are never transmitted to external servers for processing, eliminating the security and compliance risks associated with cloud-based document utilities.

- **Official Website:** [https://safepdfs.com](https://safepdfs.com)
- **Deployment Platform:** Vercel (Client-Side Single Page Application)
- **Primary Architecture:** React 18, Vite 5, Tailwind CSS, pdf-lib, PDF.js

---

## Architectural Principles & Privacy Model

Most online PDF utilities require users to upload confidential documents to remote cloud servers, where files are processed by server-side workers and temporarily or permanently retained. SafePDF operates on a fundamentally different architecture:

### 1. 100% In-Browser Document Processing
Every PDF transformation is performed within the local browser sandbox via client-side libraries (`pdf-lib`, `pdfjs-dist`, `@pdfsmaller/pdf-encrypt`, `@pdfsmaller/pdf-decrypt`, `docx`, and `jszip`). File data is read from local disk via the HTML5 File API into memory as `ArrayBuffer` instances, manipulated in memory, and downloaded directly via Blob URLs.

### 2. Zero Document Network Activity
No PDF document bytes, form inputs, or document passwords are ever transmitted across the network during tool execution. You can confirm this at any time by inspecting the browser's Network tab: document manipulation operations generate zero outbound HTTP requests.

### 3. Ephemeral In-Memory Lifecycle
Document buffers exist exclusively in browser RAM for the duration of the active session. When the tab is refreshed or closed, the memory is reclaimed by the browser engine. SafePDF does not persist document content to `localStorage`, `IndexedDB`, or browser caches.

### 4. Network Transparency & External Services
While document processing is entirely local and offline-capable in browser memory, ordinary website services may generate network requests during standard web usage:
- **Web Analytics:** Google Analytics 4 (`ReactGA`) and `@vercel/speed-insights` are initialized in production builds to collect aggregate page traffic and Core Web Vitals. They never inspect, access, or log document contents, metadata, filenames, or passwords.
- **Web Fonts & Icons:** Material Symbols icons and web typography are loaded from Google Fonts CDN.
- **Optional Sponsorship Flow:** An optional "Support Me" donation integration utilizes `dodopayments-checkout`. This script is dynamically loaded on demand only when a user interacts with the sponsorship flow.

---

## PDF Tool Inventory

SafePDF provides 16 production-deployed document utilities. The table below documents each tool, its route, implementation engine, capabilities, and technical constraints based on the current release:

| Tool | Route | Engine | Capabilities | Technical Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Merge PDF** | `/merge` | `pdf-lib` | Combines multiple PDF files in user-defined order. | Memory consumption scales with cumulative file sizes. |
| **Split PDF** | `/split` | `pdf-lib` | Extracts individual pages or custom ranges (e.g., `1-3, 5`). | Bound by browser memory allocation. |
| **Compress PDF** | `/compress` | `pdf-lib` + HTML Canvas | Selectively downsamples and recompresses embedded JPEG (`/DCTDecode`) images across three presets (`less`, `recommended`, `extreme`). Preserves text, fonts, and vectors. Includes a regression guard to prevent file inflation. | Does not recompress non-JPEG streams (PNG, JBIG2, vectors). Returns the original document if no JPEG objects exist or if compression does not achieve a size reduction. |
| **PDF to Word** | `/pdf-to-word` | `pdfjs-dist` + `docx` | Extracts text items and positional coordinates from PDF streams, groups lines into paragraphs, and generates `.docx` files. | Converts selectable text only. No OCR engine is included (scanned or image-only documents yield empty Word files). Does not convert complex tables, vector artwork, or images into native Word elements. Does not guarantee 1:1 visual layout fidelity. |
| **Protect PDF** | `/protect` | `@pdfsmaller/pdf-encrypt` | Encrypts PDF documents with ISO 32000-2 standard AES-256 user/open passwords via the Web Crypto API. | Requires secure context (`https://` or `localhost`). Cannot re-encrypt an already encrypted PDF without first unlocking it. Permissions do not provide DRM against screen recording. |
| **Unlock PDF** | `/unlock` | `@pdfsmaller/pdf-decrypt` | Losslessly removes password protection from AES-256 (V=5, R=6), RC4 128-bit (V=2, R=3), and RC4 40-bit (V=1, R=2) encrypted documents. | Requires the correct password (does not crack passwords). AES-128 (V=4) and non-standard security handlers are cleanly rejected (`UNSUPPORTED_ENCRYPTION`). Legacy rasterization fallback has been eliminated. |
| **Rotate PDF** | `/rotate` | `pdf-lib` | Rotates individual or all pages in 90-degree increments (90°, 180°, 270°). | Updates the `/Rotate` dictionary entry; visual display depends on viewer compliance with PDF rotation tags. |
| **Organize PDF** | `/organize` | `pdfjs-dist` + `pdf-lib` | Reorder, delete, duplicate, and rotate pages via visual thumbnail drag-and-drop. | Thumbnail rendering can be resource-intensive for documents with high page counts. |
| **PDF to JPG** | `/pdf-to-jpg` | `pdfjs-dist` + `jszip` | Renders PDF pages to 2x resolution JPEG images (144 DPI) and packages multi-page documents as a ZIP archive. | Output is rasterized; selectable text is converted to bitmap pixels. High memory usage on large documents. |
| **JPG to PDF** | `/jpg-to-pdf` | `pdf-lib` | Converts single or multiple images (JPEG, PNG) into a unified PDF document. | Supported formats are constrained by `pdf-lib` native decoders (JPEG, PNG). |
| **Edit PDF** | `/edit` | `pdf-lib` + `pdfjs-dist` | Add freehand pen annotations, highlighters, geometric shapes (rectangles, circles, lines), and text boxes. Supports text replacement. | Text replacement works via whiteout masking rectangles overlaid with new text in standard base-14 fonts; does not reflow underlying PDF font streams. |
| **Sign PDF** | `/sign` | `react-signature-canvas` + `pdf-lib` | Place visual signatures by drawing on canvas, typing cursive names, or uploading signature image assets. | Visual signature stamping only. Does NOT create cryptographic digital signatures (PKI / X.509 certificates). Invalidates pre-existing cryptographic signatures on the source file. |
| **Crop & Resize PDF** | `/crop-pdf` | `pdf-lib` + `pdfjs-dist` | Trims page margins or resizes to standard sizes (A4, Letter). Supports Strategy A (lossless MediaBox/CropBox adjustment) and Strategy B (destructive rasterization). | In Strategy A (default), cropped content is visually hidden but remains inside the file stream. Use Strategy B if irreversible removal of margin data is required. |
| **PDF to ZIP** | `/pdf-to-zip` | `jszip` | Packages multiple PDF files into a single `.zip` archive without re-encoding or modifying file contents. Handles duplicate filenames automatically. | Bound by browser memory allocation for large cumulative archive sizes. |
| **Fill PDF Forms** | `/fill-pdf-form` | `pdf-lib` | Reads and fills standard AcroForm interactive form fields (text boxes, checkboxes, radio groups, dropdowns, and option lists). Optional form flattening. | Does NOT support proprietary Adobe LiveCycle dynamic XFA forms (rejected with `XFA_UNSUPPORTED`). |
| **Redact PDF** | `/redact-pdf` | `pdfjs-dist` + HTML Canvas + `pdf-lib` | Irreversible pixel-level redaction. Renders pages to canvas, stamps opaque blackout/whiteout boxes, and re-encodes pages to new JPEG images in a fresh PDF. | Completely destroys underlying text and vector streams. The resulting document is non-selectable, non-searchable, inaccessible to screen readers, and may have larger file size. |

---

## In-Depth Implementation Details

### Client-Side PDF Compression
- **Selective Image XObject Optimization:** Instead of destructive full-document rasterization, SafePDF inspects the PDF object context (`enumerateIndirectObjects`) for raster image streams (`/Subtype /Image` with `/DCTDecode` filter).
- **Safety Checks:** CMYK, Indexed color spaces, images with transparency masks (`/SMask`, `/Mask`, `/ImageMask`), custom `/Decode` arrays, non-8-bit depths, and small UI icons (<150–300px depending on preset) are bypassed to prevent color distortion or visual artifacts.
- **Regression Guard:** If the optimized bytes do not achieve at least a 2% file reduction, or if the re-encoded file size increases, SafePDF discards the modifications and returns the original untouched file buffer.
- **Preserved Elements:** Vector paths, embedded fonts, text layers, bookmarks, hyperlinks, annotations, and AcroForm widgets are never rasterized or altered.

### Password Protection & Lossless Decryption
- **Encryption Engine:** Uses `@pdfsmaller/pdf-encrypt` with the modern ISO 32000-2 standard (AES-256 encryption, revision 6). Encryption keys are generated via `window.crypto.subtle`.
- **Decryption Engine:** Uses `@pdfsmaller/pdf-decrypt`. Supported algorithms include AES-256 (V=5, R=6), RC4 128-bit (V=2, R=3), and RC4 40-bit (V=1, R=2).
- **No Rasterization Fallback:** Earlier implementations fell back to rasterizing pages when an encrypted PDF could not be decrypted losslessly. This fallback has been completely removed. If an algorithm is unsupported (e.g., AES-128 / V=4 or proprietary security handlers), SafePDF explicitly raises an `UNSUPPORTED_ENCRYPTION` error to preserve document integrity.

### PDF to Word Conversion
- **Text Extraction:** Uses `pdfjs-dist` to extract character glyphs and positional coordinates from the PDF text layer.
- **Paragraph Assembly:** Groups consecutive text items into lines and paragraphs using vertical offset thresholds, then exports them into a structured `.docx` document using `docx`.
- **Scanned Document & Formatting Limitations:** The converter requires an embedded text layer. Because SafePDF does not include an optical character recognition (OCR) engine, scanned image documents contain no extractable text and will result in empty Word documents. Complex tables, multi-column articles, embedded bitmap images, and vector graphics are not reconstructed as native Word structures.

### Redaction vs. Visual Masking
- **Redaction (`/redact-pdf`):** True, irreversible redaction. Pages are rendered to HTML5 canvas, opaque colored boxes are painted onto the pixel bitmap, and the canvas is exported as a new image stream. Underlying text, font tables, and vector objects are completely erased.
- **Visual Masking (`/edit`):** In the Edit tool's text replacement feature, white rectangles are stamped over existing text and new text is drawn above. This is an overlay, not a redaction; underlying text in the original content stream may still be present in the PDF file structure if inspected via raw byte tools.

---

## Technology Stack

```
SafePDF/
├── client/          # Primary web application (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/  # Layout, SEO, Privacy, and Content components
│   │   ├── pages/       # Route-level page components for each PDF tool
│   │   ├── utils/       # PDF processing engine (pdf.js), themes, tool metadata
│   │   └── routes.jsx   # Client-side router configuration with lazy loading
│   ├── public/          # Static assets, sitemap.xml, robots.txt, llms.txt
│   └── vercel.json      # Production SPA routing and caching headers
└── server/          # Optional local Node.js/Express server (self-hosting wrapper)
```

- **Frontend Framework:** React 18 (`react`, `react-dom`, `react-router-dom` v6)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3, Lucide React (icons)
- **PDF Core Engines:**
  - `pdf-lib`: PDF creation, merging, splitting, form filling, vector annotations, and stamping.
  - `pdfjs-dist`: Client-side rendering, text extraction, coordinate detection, thumbnail generation.
  - `@pdfsmaller/pdf-encrypt`: In-browser ISO 32000-2 AES-256 PDF encryption.
  - `@pdfsmaller/pdf-decrypt`: In-browser multi-format PDF decryption.
- **Export & Serialization:** `docx` (Word generation), `jszip` (ZIP archiving), `file-saver` (local downloads).
- **Deployment:** Vercel (configured via `client/vercel.json` for Vite SPA static serving).

---

## Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/Sujay1977/SafePdf.git
cd SafePdf
```

### 2. Install Client Dependencies
SafePDF's primary application resides in the `client` directory:
```bash
cd client
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
The application will start locally at `http://localhost:5173`.

### 4. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
Build outputs are written to `client/dist`.

### 5. Preview the Production Build
```bash
npm run preview
```

### 6. Linting
```bash
npm run lint
```

*(Note: There is no automated test runner configured in `package.json`.)*

### Optional: Local Server Wrapper (`server/`)
The `server/` directory contains an optional Node.js/Express application (`server.js`) that serves the built `client/dist` directory and includes an experimental `/api/unlock` endpoint using `qpdf`.

This server is **not used in production deployment on Vercel**, where SafePDF operates purely as a static client-side SPA. For standard development and usage, running the `client` directory with `npm run dev` is all that is required.

---

## Browser Compatibility & Hardware Requirements

Because all computation occurs client-side, performance and capability depend on the user's browser environment:

- **Web Crypto API:** Required for AES-256 PDF protection (`/protect`). Requires a secure context (`https://` or `localhost`).
- **Memory (RAM):** Because document processing executes directly in browser memory (RAM), handling large PDF files or documents with high page counts (particularly in canvas-intensive operations such as redaction, thumbnail generation in Organize, or page rasterization in PDF to JPG) is bounded by available system RAM and browser tab memory limits. Devices with constrained memory (such as mobile devices) may experience performance degradation or tab crashes on heavy workloads.
- **Supported Browsers:**
  - Google Chrome / Chromium-based browsers (Edge, Brave, Opera): Supported.
  - Mozilla Firefox: Supported.
  - Apple Safari (iOS / macOS): Supported (Safari 15+ recommended for full Web Crypto and canvas support).

---

## Licensing & Repository Information

- **Absence of LICENSE File:** The repository currently does not include a root `LICENSE` file. All rights are reserved by the author. The project should not be assumed to be open source under any particular license. Inquire with the repository maintainer regarding licensing terms, distribution permissions, or commercial use.
- **Private Package Declaration:** Separately, `client/package.json` contains `"private": true` to prevent unintended publication to package registries.
- **Official Domain:** [https://safepdfs.com](https://safepdfs.com) (all previous domains, including `safepdf.site`, redirect to `safepdfs.com`).
