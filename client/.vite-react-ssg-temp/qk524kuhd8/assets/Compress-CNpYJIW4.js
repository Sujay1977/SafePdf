import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { c as compressPDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Trash2, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { C as ClientOnly } from "../main.mjs";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
import "react-dom/client";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-router-dom";
import "dodopayments-checkout";
import "react-ga4";
const Compress = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("recommended");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileSize, setFileSize] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setFileSize((acceptedFiles[0].size / 1024 / 1024).toFixed(2));
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const compressedBlob = await compressPDF(file, level);
      FileSaver_minExports.saveAs(compressedBlob, `compressed_${file.name}`);
    } catch (error) {
      console.error("Compression failed", error);
      alert("Failed to compress PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Compress PDF File" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Reduce file size locally. No servers involved." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer group", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
          /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to add file or drag and drop" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white px-1", children: "Selected File" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 size-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400", children: /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "picture_as_pdf" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-slate-900 dark:text-white truncate", children: file.name }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded", children: [
              fileSize,
              " MB"
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-5 flex flex-col h-full", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-1", children: "Compression Level" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Choose how much to reduce file size." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: [
          { id: "extreme", label: "Extreme", desc: "Less quality, high compression" },
          { id: "recommended", label: "Recommended", desc: "Good quality, good compression", badge: "Best" },
          { id: "less", label: "Less Compression", desc: "High quality, less compression" }
        ].map((opt) => /* @__PURE__ */ jsxs("label", { className: clsx(
          "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all",
          level === opt.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
          // Unselected
        ), children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "compression", value: opt.id, checked: level === opt.id, onChange: () => setLevel(opt.id), className: "sr-only" }),
          /* @__PURE__ */ jsx("span", { className: "flex flex-1", children: /* @__PURE__ */ jsxs("span", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: clsx("block text-sm font-bold", level === opt.id ? "text-primary" : "text-slate-900 dark:text-white"), children: opt.label }),
              opt.badge && /* @__PURE__ */ jsx("span", { className: "bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide", children: opt.badge })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400", children: opt.desc })
          ] }) }),
          level === opt.id && /* @__PURE__ */ jsx(CheckCircle, { className: "text-primary text-xl", size: 20 }),
          level !== opt.id && /* @__PURE__ */ jsx("div", { className: "size-5 rounded-full border border-slate-300 dark:border-slate-600" })
        ] }, opt.id)) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCompress,
            disabled: !file || isProcessing,
            className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              "Compress PDF ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "text-lg", size: 20 })
            ] })
          }
        )
      ] }) })
    ] })
  ] });
};
export {
  Compress as default
};
