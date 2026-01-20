import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPageThumbnail, addSignatureToPDF } from '../utils/pdf';
import { saveAs } from 'file-saver';
import { Trash2, FileUp, ArrowRight, Loader2, PenTool, Check, X } from 'lucide-react';
const SignatureCanvas = React.lazy(() => import('react-signature-canvas'));
import * as pdfjsLib from 'pdfjs-dist';

const Sign = () => {
    const [file, setFile] = useState(null);
    const [page, setPage] = useState(null); // { thumbnail, width, height, numPages }
    const [pageIndex, setPageIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSigCanvas, setShowSigCanvas] = useState(false);
    const [signature, setSignature] = useState(null); // base64
    const [sigPosition, setSigPosition] = useState({ x: 0.5, y: 0.5 }); // 0-1 relative
    const sigRef = useRef();

    // Load first page for MVP signature placement
    useEffect(() => {
        if (!file) return;
        const loadPage = async () => {
            try {
                const result = await getPageThumbnail(file, pageIndex + 1);
                setPage(result);
            } catch (e) {
                console.error(e);
            }
        };
        loadPage();
    }, [file, pageIndex]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const saveSignature = () => {
        if (sigRef.current.isEmpty()) return;
        setSignature(sigRef.current.toDataURL());
        setShowSigCanvas(false);
    };

    const handleSign = async () => {
        if (!file || !signature) return;
        setIsProcessing(true);
        try {
            // Mock size for signature
            const signatureWidth = 0.2; // 20% of page width
            const signatureHeight = 0.05; // 5% of page height (approx aspect ratio)

            const blob = await addSignatureToPDF(file, signature, {
                pageIndex: pageIndex,
                x: sigPosition.x - (signatureWidth / 2),
                y: sigPosition.y - (signatureHeight / 2),
                width: signatureWidth,
                height: signatureHeight
            });
            saveAs(blob, `signed_${file.name}`);
        } catch (e) {
            console.error(e);
            alert("Sign failed");
        }
        setIsProcessing(false);
    };

    const handleClickPage = (e) => {
        if (!signature) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setSigPosition({ x, y });
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 relative">
            {showSigCanvas && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-lg">
                        <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Draw Signature</h3>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white">
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <SignatureCanvas
                                    ref={sigRef}
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                    penColor="black"
                                />
                            </React.Suspense>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => sigRef.current.clear()} className="px-4 py-2 text-slate-500 hover:text-slate-700">Clear</button>
                            <button onClick={() => setShowSigCanvas(false)} className="px-4 py-2 text-slate-500 hover:text-slate-700">Cancel</button>
                            <button onClick={saveSignature} className="px-6 py-2 bg-primary text-white rounded-lg font-bold">Save</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center max-w-2xl mx-auto mb-6">
                <h1 className="text-3xl font-black mb-2 dark:text-white">Sign PDF</h1>
            </div>

            {!file ? (
                <div {...getRootProps()} className="w-full max-w-2xl h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer border-slate-300 dark:border-slate-700 hover:border-primary">
                    <input {...getInputProps()} />
                    <p className="dark:text-white">Drag & drop PDF</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8 flex justify-center overflow-auto min-h-[500px]">
                        {page && (
                            <div className="relative shadow-lg cursor-crosshair" onClick={handleClickPage}>
                                <img src={page.thumbnail} alt="Page" className="max-w-full h-auto" />
                                {signature && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: `${sigPosition.x * 100}%`,
                                            top: `${sigPosition.y * 100}%`,
                                            transform: 'translate(-50%, -50%)',
                                            width: '20%',
                                        }}
                                        className="border-2 border-blue-500 border-dashed bg-white/30"
                                    >
                                        <img src={signature} alt="Sig" className="w-full" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="w-80 shrink-0 flex flex-col gap-4">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold mb-4 dark:text-white">Actions</h3>
                            <button onClick={() => setShowSigCanvas(true)} className="w-full py-3 bg-white border-2 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg font-bold mb-4 hover:border-primary transition-colors">
                                {signature ? 'Redraw Signature' : 'Create Signature'}
                            </button>

                            <p className="text-xs text-slate-500 mb-4">
                                Click on the document to place your signature.
                            </p>

                            <div className="flex items-center justify-between mt-4 border-t pt-4 dark:border-slate-700">
                                <button onClick={() => setPageIndex(Math.max(0, pageIndex - 1))} disabled={pageIndex === 0} className="p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50">Prev</button>
                                <span className="text-sm dark:text-white">Page {pageIndex + 1}</span>
                                <button onClick={() => setPageIndex(pageIndex + 1)} disabled={!page || pageIndex >= page.numPages - 1} className="p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50">Next</button>
                            </div>
                        </div>

                        <button onClick={handleSign} disabled={!signature || isProcessing} className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors disabled:bg-slate-400">
                            {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : "Download Signed PDF"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sign;
