import SEO from '../components/SEO';
import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { getPDFFormFields, fillPDFForm } from '../utils/pdf';
import { saveAs } from 'file-saver';
import {
    FileUp, ArrowRight, Loader2, Check, Download, Shield, AlertTriangle,
    Trash2, RefreshCw, Layers, CheckSquare, AlignLeft, ListFilter,
    CheckCircle2, Lock, Unlock, HelpCircle, FileText
} from 'lucide-react';
import clsx from 'clsx';
import { getToolTheme } from '../utils/theme';
import ToolHeroIcon from '../components/ToolHeroIcon';
import ToolPageHeader from '../components/ToolPageHeader';
import FillPDFFormContent, { fillPDFFormFaqs } from '../components/content/FillPDFFormContent';

const FillPDFForm = () => {
    const theme = getToolTheme('/fill-pdf-form');

    // Document state
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rawFields, setRawFields] = useState([]); // from getPDFFormFields
    const [fieldValues, setFieldValues] = useState({}); // name -> current value
    const [initialFieldValues, setInitialFieldValues] = useState({});

    // Settings
    const [flattenForm, setFlattenForm] = useState(false);

    // Processing & feedback state
    const [isExporting, setIsExporting] = useState(false);
    const [downloadDone, setDownloadDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState(null); // 'XFA_UNSUPPORTED' | 'NO_FIELDS' | 'LOAD_FAILED' | null
    const [searchFilter, setSearchFilter] = useState('');

    // Load and inspect form fields
    const loadFieldsForFile = async (selectedFile) => {
        setIsLoading(true);
        setErrorMessage('');
        setErrorType(null);
        setRawFields([]);
        setFieldValues({});
        setInitialFieldValues({});
        setDownloadDone(false);

        try {
            const detectedFields = await getPDFFormFields(selectedFile);
            setRawFields(detectedFields);

            const initialVals = {};
            detectedFields.forEach(f => {
                initialVals[f.name] = f.value ?? (f.type === 'checkbox' ? false : '');
            });
            setFieldValues(initialVals);
            setInitialFieldValues(initialVals);
        } catch (err) {
            console.error('Error inspecting PDF form:', err);
            setErrorType(err.code || 'UNKNOWN_ERROR');
            if (err.code === 'XFA_UNSUPPORTED') {
                setErrorMessage('This PDF uses dynamic XFA forms (Adobe LiveCycle), which cannot be processed directly in browser environments. Please use Adobe Acrobat to fill dynamic XFA forms.');
            } else if (err.code === 'NO_FIELDS') {
                setErrorMessage('No fillable form fields were detected in this PDF document. If you want to add text or annotations over the page, please use the Edit PDF tool.');
            } else if (err.code === 'LOAD_FAILED') {
                setErrorMessage('Could not open the PDF document. The file may be password-protected or corrupted.');
            } else {
                setErrorMessage(err.message || 'An unexpected error occurred while reading the PDF form.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            const chosen = acceptedFiles[0];
            setFile(chosen);
            loadFieldsForFile(chosen);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    // Update specific field value
    const handleFieldChange = (name, val) => {
        setFieldValues(prev => ({
            ...prev,
            [name]: val
        }));
    };

    // Reset all fields to initial detected state
    const handleResetAll = () => {
        setFieldValues(initialFieldValues);
    };

    // Clear all fields
    const handleClearAll = () => {
        const cleared = {};
        rawFields.forEach(f => {
            cleared[f.name] = f.type === 'checkbox' ? false : '';
        });
        setFieldValues(cleared);
    };

    // Export filled PDF
    const handleExport = async () => {
        if (!file || rawFields.length === 0 || isExporting) return;
        setIsExporting(true);
        setErrorMessage('');
        setDownloadDone(false);

        try {
            const { blob } = await fillPDFForm(file, fieldValues, { flatten: flattenForm });
            saveAs(blob, `filled_${file.name}`);
            setDownloadDone(true);
            setTimeout(() => setDownloadDone(false), 4000);
        } catch (err) {
            console.error('Failed to export filled PDF:', err);
            setErrorMessage(err.message || 'Failed to export filled PDF.');
        } finally {
            setIsExporting(false);
        }
    };

    // Filter fields based on search
    const filteredFields = useMemo(() => {
        if (!searchFilter.trim()) return rawFields;
        const q = searchFilter.toLowerCase();
        return rawFields.filter(f => f.name.toLowerCase().includes(q));
    }, [rawFields, searchFilter]);

    // Statistics
    const modifiedCount = useMemo(() => {
        let count = 0;
        rawFields.forEach(f => {
            if (fieldValues[f.name] !== initialFieldValues[f.name]) {
                count++;
            }
        });
        return count;
    }, [rawFields, fieldValues, initialFieldValues]);

    const pageSchema = [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": fillPDFFormFaqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF Fill PDF Form",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Windows, macOS, Linux, Chrome OS",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://safepdf.site/" },
                { "@type": "ListItem", "position": 2, "name": "Fill PDF Form", "item": "https://safepdf.site/fill-pdf-form" }
            ]
        }
    ];

    return (
        <article className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12 relative">
            <SEO
                title="Fill PDF Form Online Free | SafePDF"
                description="Fill interactive PDF AcroForms directly in your browser. Edit text fields, checkboxes, radio buttons, and dropdowns securely with 100% client-side privacy."
                url="/fill-pdf-form"
            >
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </SEO>

            <ToolPageHeader
                title="Fill PDF Form"
                description="Fill interactive AcroForm fields in your PDF document. 100% private — your files and form responses never leave your device."
            />

            {!file ? (
                /* Initial Dropzone */
                <div
                    {...getRootProps()}
                    className={clsx(
                        "w-full max-w-4xl h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm group",
                        isDragActive
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:shadow-md"
                    )}
                >
                    <input {...getInputProps()} id="fill-form-upload" name="fill-form-upload" aria-label="Upload fillable PDF form" className="hidden" />
                    <div className="flex flex-col items-center gap-4 text-center px-6">
                        <ToolHeroIcon icon="dynamic_form" theme={theme} />
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {isDragActive ? "Drop fillable PDF here" : "Click to Upload Fillable PDF"}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                or drag and drop your form document here
                            </p>
                        </div>
                    </div>
                </div>
            ) : isLoading ? (
                /* Loading State */
                <div className="w-full max-w-xl p-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-emerald-600" size={40} />
                    <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        Scanning and loading form fields…
                    </p>
                    <span className="text-xs text-slate-400">Processing file locally in your browser</span>
                </div>
            ) : errorType ? (
                /* Error / Unsupported State */
                <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {errorType === 'XFA_UNSUPPORTED'
                                    ? 'Dynamic XFA Form Detected'
                                    : errorType === 'NO_FIELDS'
                                    ? 'No Fillable Fields Detected'
                                    : 'Unable to Read Form'}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {errorMessage}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                        {errorType === 'NO_FIELDS' && (
                            <a
                                href="/edit"
                                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                Try Edit PDF Instead
                            </a>
                        )}
                        <button
                            onClick={() => { setFile(null); setErrorType(null); }}
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-md transition-all"
                        >
                            Choose Another File
                        </button>
                    </div>
                </div>
            ) : (
                /* Main Workspace */
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* ── LEFT / MAIN COLUMN: Form Fields List ── */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        {/* File Header */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {rawFields.length} fillable field{rawFields.length === 1 ? '' : 's'} detected
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => { setFile(null); setRawFields([]); }}
                                className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Remove file"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Search / Filter bar (if > 4 fields) */}
                        {rawFields.length > 4 && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Filter fields by name…"
                                    value={searchFilter}
                                    onChange={(e) => setSearchFilter(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        )}

                        {/* Fields List */}
                        <div className="flex flex-col gap-3">
                            {filteredFields.map((field, idx) => {
                                const currentVal = fieldValues[field.name];
                                const isDirty = currentVal !== initialFieldValues[field.name];

                                return (
                                    <div
                                        key={field.name || idx}
                                        className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col gap-2.5 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor={`field-${idx}`}
                                                className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2"
                                            >
                                                <span>{field.name}</span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-slate-500">
                                                    {field.type}
                                                </span>
                                            </label>
                                            {isDirty && (
                                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                    Modified
                                                </span>
                                            )}
                                        </div>

                                        {/* Field Renderers */}
                                        {field.type === 'text' && (
                                            field.isMultiline ? (
                                                <textarea
                                                    id={`field-${idx}`}
                                                    rows={3}
                                                    value={currentVal ?? ''}
                                                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    placeholder="Enter text…"
                                                />
                                            ) : (
                                                <input
                                                    id={`field-${idx}`}
                                                    type="text"
                                                    value={currentVal ?? ''}
                                                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    placeholder="Enter text…"
                                                />
                                            )
                                        )}

                                        {field.type === 'checkbox' && (
                                            <label className="flex items-center gap-3 cursor-pointer select-none mt-1">
                                                <input
                                                    id={`field-${idx}`}
                                                    type="checkbox"
                                                    checked={!!currentVal}
                                                    onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                                                    className="size-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    {currentVal ? 'Checked (Yes)' : 'Unchecked (No)'}
                                                </span>
                                            </label>
                                        )}

                                        {field.type === 'radio' && (
                                            <div className="flex flex-col gap-2 mt-1">
                                                {(field.options || []).map((opt) => (
                                                    <label key={opt} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-800 dark:text-slate-200">
                                                        <input
                                                            type="radio"
                                                            name={field.name}
                                                            value={opt}
                                                            checked={currentVal === opt}
                                                            onChange={() => handleFieldChange(field.name, opt)}
                                                            className="text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {(field.type === 'dropdown' || field.type === 'optionList') && (
                                            <select
                                                id={`field-${idx}`}
                                                value={Array.isArray(currentVal) ? currentVal[0] : (currentVal ?? '')}
                                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            >
                                                <option value="">-- Select option --</option>
                                                {(field.options || []).map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}

                                        {field.type === 'unknown' && (
                                            <div className="text-xs text-slate-400 italic">
                                                Unsupported field widget type.
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Sidebar & Export Controls ── */}
                    <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Form Summary</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Review your filled fields before generating the document.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/60">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Fields</span>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{rawFields.length}</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Modified</span>
                                    <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">{modifiedCount}</p>
                                </div>
                            </div>

                            {/* Flattening Switch */}
                            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                                <label className="flex items-center justify-between cursor-pointer select-none">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <Lock size={15} className="text-slate-500" />
                                        <span>Flatten PDF Form</span>
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={flattenForm}
                                        onChange={(e) => setFlattenForm(e.target.checked)}
                                        className="size-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                    />
                                </label>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Converts fields into permanent static graphics so answers cannot be modified in PDF readers.
                                </p>
                            </div>

                            {/* Actions: Reset / Clear */}
                            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-700">
                                <button
                                    onClick={handleResetAll}
                                    className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold"
                                >
                                    Reset to Original
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className="text-red-500 hover:text-red-600 font-semibold"
                                >
                                    Clear All Values
                                </button>
                            </div>

                            {/* Error notification */}
                            {errorMessage && (
                                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30">
                                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                    <p className="text-xs text-red-700 dark:text-red-400">{errorMessage}</p>
                                </div>
                            )}

                            {/* Export / Download Button */}
                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className={clsx(
                                    "flex w-full items-center justify-center gap-2 rounded-xl h-12 px-6 text-white text-base font-bold tracking-[0.015em] shadow-lg transition-all",
                                    downloadDone
                                        ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                                        : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                                    isExporting && "!bg-slate-400 !shadow-none cursor-not-allowed scale-100"
                                )}
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Filling Form…</span>
                                    </>
                                ) : downloadDone ? (
                                    <>
                                        <Check size={20} />
                                        <span>Downloaded!</span>
                                    </>
                                ) : (
                                    <>
                                        <Download size={20} />
                                        <span>Download Filled PDF</span>
                                    </>
                                )}
                            </button>

                            {/* Privacy Guarantee */}
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                                <Shield className="text-primary mt-0.5 shrink-0" size={16} />
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your files are processed locally in your browser and never uploaded.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FillPDFFormContent />
        </article>
    );
};

export default FillPDFForm;
