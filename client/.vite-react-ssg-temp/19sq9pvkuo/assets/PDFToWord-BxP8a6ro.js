import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { b as convertPDFToWord, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { FileText, Loader2, Shield } from "lucide-react";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const PDFToWord = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const docBlob = await convertPDFToWord(file);
      FileSaver_minExports.saveAs(docBlob, `${file.name.replace(".pdf", "")}.docx`);
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Failed to convert PDF to Word");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "PDF to Word" }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: [
        "Convert your PDF files to editable Word documents (DOCX).",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-sm italic opacity-75", children: "(Note: Client-side conversion extracts text but may lose complex layout)" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to select PDF or drag and drop" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(FileText, { size: 40 }) }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2", children: file.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
          (file.size / 1024 / 1024).toFixed(2),
          " MB"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 w-full max-w-md", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Change File" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleConvert,
            disabled: isProcessing,
            className: "flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5",
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Convert to Word" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-start gap-3 max-w-lg p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
      /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Private Conversion" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Unlike other converters, we don't send your file to a server. Conversion happens right here using your browser's power." })
      ] })
    ] })
  ] });
};
export {
  PDFToWord as default
};
