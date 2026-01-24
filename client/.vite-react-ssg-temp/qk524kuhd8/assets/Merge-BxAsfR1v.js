import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { S as SEO } from "../main.mjs";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { g as generateThumbnail, m as mergePDFs, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Trash2, FileUp, Loader2, ArrowRight, Shield } from "lucide-react";
import { Reorder } from "framer-motion";
import "react-dom/client";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-router-dom";
import "dodopayments-checkout";
import "react-ga4";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const Merge = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    setIsProcessing(true);
    const newFiles = await Promise.all(acceptedFiles.map(async (file) => {
      const { thumbnail, numPages } = await generateThumbnail(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        thumbnail,
        numPages,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2)
        // MB
      };
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setIsProcessing(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }
  });
  const removeFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };
  const handleMerge = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const mergedBlob = await mergePDFs(files.map((f) => f.file));
      FileSaver_minExports.saveAs(mergedBlob, "merged.pdf");
    } catch (error) {
      console.error("Merge failed", error);
      alert("Failed to merge PDFs");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Merge PDF | Combine PDF Files for Free",
        description: "Merge multiple PDF files into one document securely in your browser. No upload required, 100% free and private.",
        url: "/merge",
        children: /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/merge" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Merge PDF Files" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Combine PDFs in the order you want with the easiest PDF merger available." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1200px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between mb-4 gap-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-slate-900 dark:text-white text-lg font-bold leading-tight", children: [
            "Selected Files (",
            files.length,
            ")"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs("button", { onClick: () => setFiles([]), className: "flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors", children: [
            /* @__PURE__ */ jsx(Trash2, { size: 18 }),
            /* @__PURE__ */ jsx("span", { children: "Clear All" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center gap-3 aspect-[3/4] rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { ...getInputProps() }),
            /* @__PURE__ */ jsx("div", { className: "size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 24 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-center text-sm px-4", children: "Add files" })
          ] }),
          /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: files, onReorder: setFiles, className: "contents", children: files.map((file) => /* @__PURE__ */ jsx(Reorder.Item, { value: file, className: "contents", children: /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing overflow-hidden aspect-[3/4]", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => removeFile(file.id), className: "absolute top-2 right-2 z-10 size-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-50 shadow-sm border border-slate-200 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden", children: file.thumbnail ? /* @__PURE__ */ jsx("div", { className: "w-full h-full shadow-lg rounded-sm relative", children: /* @__PURE__ */ jsx("img", { src: file.thumbnail, alt: "Preview", className: "w-full h-full object-contain bg-white" }) }) : /* @__PURE__ */ jsx("div", { className: "text-slate-400", children: "Loading..." }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-900 dark:text-white text-xs font-bold truncate mb-1", title: file.name, children: file.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 text-[10px] font-medium uppercase tracking-wide", children: [
                file.numPages,
                " Pages • ",
                file.size,
                " MB"
              ] })
            ] })
          ] }) }, file.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-[340px] flex flex-col gap-6 shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-24", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-slate-900 dark:text-white text-xl font-bold mb-6", children: "Merge Options" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-8", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Drag and drop files to reorder them before merging." }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleMerge,
              disabled: files.length < 2 || isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { children: "Merge PDF" }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30", children: [
          /* @__PURE__ */ jsx("div", { className: "size-8 rounded-full bg-white dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-primary shadow-sm", children: /* @__PURE__ */ jsx(Shield, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-900 dark:text-white text-sm font-bold mb-1", children: "100% Secure & Private" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs leading-relaxed", children: "Your files are processed directly in your browser. No data leaves your device." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  Merge as default
};
