import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { i as imagesToPDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Reorder } from "framer-motion";
import { FileUp, Trash2, Loader2, Shield } from "lucide-react";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const JPGToPDF = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file)
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: true
  });
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };
  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdfBlob = await imagesToPDF(files.map((f) => f.file));
      FileSaver_minExports.saveAs(pdfBlob, "converted_images.pdf");
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Failed to convert Images to PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "JPG to PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Convert JPG, PNG images to PDF documents. Drag to reorder." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between mb-4 gap-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-slate-900 dark:text-white text-lg font-bold", children: [
            "Selected Images (",
            files.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFiles([]), className: "text-sm font-medium text-red-600 hover:text-red-700", children: "Clear All" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { ...getInputProps() }),
            /* @__PURE__ */ jsx("div", { className: "size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(FileUp, { size: 20 }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-primary", children: "Add Images" })
          ] }),
          /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: files, onReorder: setFiles, className: "contents", children: files.map((file) => /* @__PURE__ */ jsx(Reorder.Item, { value: file, className: "contents", children: /* @__PURE__ */ jsxs("div", { className: "group relative aspect-[3/4] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden cursor-grab active:cursor-grabbing", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => removeFile(file.id), className: "absolute top-1 right-1 z-10 p-1 rounded-full bg-white text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(Trash2, { size: 12 }) }),
            /* @__PURE__ */ jsx("img", { src: file.preview, alt: "preview", className: "w-full h-full object-cover" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" })
          ] }) }, file.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Convert Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleConvert,
              disabled: files.length === 0 || isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Create PDF" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Private" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Images are processed locally." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  JPGToPDF as default
};
