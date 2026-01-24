import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { a as getPageThumbnail, r as rotatePDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import * as pdfjsLib from "pdfjs-dist";
import { FileUp, RotateCcw, RotateCw, Loader2, Trash2 } from "lucide-react";
import "clsx";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const Rotate = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [rotations, setRotations] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      setIsLoadingPages(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const newPages = [];
        for (let i = 1; i <= numPages; i++) {
          const { thumbnail } = await getPageThumbnail(pdf, i);
          newPages.push({ pageNumber: i, thumbnail });
        }
        setPages(newPages);
        setRotations({});
      } catch (error) {
        console.error("Error loading pages", error);
      }
      setIsLoadingPages(false);
    };
    loadPages();
  }, [file]);
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
  const rotatePage = (pageIndex, direction) => {
    setRotations((prev) => {
      const current = prev[pageIndex] || 0;
      const change = direction === "cw" ? 90 : -90;
      let next = (current + change) % 360;
      if (next < 0) next += 360;
      return { ...prev, [pageIndex]: next };
    });
  };
  const rotateAll = (direction) => {
    setRotations((prev) => {
      const newRotations = {};
      pages.forEach((_, idx) => {
        const current = prev[idx] || 0;
        const change = direction === "cw" ? 90 : -90;
        let next = (current + change) % 360;
        if (next < 0) next += 360;
        newRotations[idx] = next;
      });
      return newRotations;
    });
  };
  const handleSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const newPdfBlob = await rotatePDF(file, rotations);
      FileSaver_minExports.saveAs(newPdfBlob, `rotated_${file.name}`);
    } catch (error) {
      console.error("Rotate failed", error);
      alert("Failed to rotate PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Rotate PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Rotate specific pages or the entire document." })
    ] }),
    !file ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "relative flex flex-col items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 cursor-pointer group", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 p-6 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "size-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(FileUp, { size: 32 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Drag & drop your PDF here" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "or click to browse your files" })
      ] })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[1280px] flex flex-col lg:flex-row gap-8 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200", children: "Page Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => rotateAll("ccw"), className: "px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
              " Rotate All Left"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => rotateAll("cw"), className: "px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RotateCw, { size: 16 }),
              " Rotate All Right"
            ] })
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 40 }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page, index) => {
          const rotation = rotations[index] || 0;
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full h-full p-2 transition-transform duration-300", style: { transform: `rotate(${rotation}deg)` }, children: /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: "w-full h-full object-contain" }) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
                "P. ",
                page.pageNumber
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => rotatePage(index, "ccw"), className: "p-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-sm", children: /* @__PURE__ */ jsx(RotateCcw, { size: 14 }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => rotatePage(index, "cw"), className: "p-1.5 rounded-full bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 shadow-sm", children: /* @__PURE__ */ jsx(RotateCw, { size: 14 }) })
            ] })
          ] }, index);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-6", children: "Rotate Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Save Rotated PDF" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setFile(null), className: "flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 transition-colors", children: [
          /* @__PURE__ */ jsx(Trash2, { size: 16 }),
          " Cancel"
        ] })
      ] })
    ] })
  ] });
};
export {
  Rotate as default
};
