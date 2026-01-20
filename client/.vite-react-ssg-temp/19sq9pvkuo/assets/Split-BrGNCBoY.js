import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { a as getPageThumbnail, e as extractPages, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import * as pdfjsLib from "pdfjs-dist";
import { FileUp, Loader2, Check, ArrowRight, Shield } from "lucide-react";
import clsx from "clsx";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const Split = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState(/* @__PURE__ */ new Set());
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
      setPages([]);
      setSelectedPages(/* @__PURE__ */ new Set());
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const togglePage = (pageNumber) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageNumber)) {
      newSelected.delete(pageNumber);
    } else {
      newSelected.add(pageNumber);
    }
    setSelectedPages(newSelected);
  };
  const handleSplit = async () => {
    if (!file || selectedPages.size === 0) return;
    setIsProcessing(true);
    try {
      const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
      const pageIndices = sortedPages.map((p) => p - 1);
      const newPdfBlob = await extractPages(file, pageIndices);
      FileSaver_minExports.saveAs(newPdfBlob, `split_${file.name}`);
    } catch (error) {
      console.error("Split failed", error);
      alert("Failed to split PDF");
    }
    setIsProcessing(false);
  };
  const selectAll = () => {
    if (pages.length === 0) return;
    if (selectedPages.size === pages.length) {
      setSelectedPages(/* @__PURE__ */ new Set());
    } else {
      setSelectedPages(new Set(pages.map((p) => p.pageNumber)));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Split PDF File" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Select specific pages to extract into a new PDF document." })
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
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2", children: "Page Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("button", { onClick: selectAll, className: "text-sm font-medium text-primary hover:text-primary/80 transition-colors", children: selectedPages.size === pages.length ? "Deselect All" : "Select All" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: [
              file.name,
              " (",
              pages.length,
              " Pages)"
            ] })
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary mb-4", size: 40 }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Loading pages..." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page) => {
          const isSelected = selectedPages.has(page.pageNumber);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => togglePage(page.pageNumber),
              className: "group relative flex flex-col gap-2 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxs("div", { className: clsx(
                  "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border-2 overflow-hidden transition-all hover:-translate-y-1",
                  isSelected ? "border-primary" : "border-transparent border-slate-200 dark:border-slate-600 hover:border-primary/50"
                ), children: [
                  /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: clsx("w-full h-full object-contain", isSelected ? "opacity-40" : "opacity-100") }),
                  isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-primary text-white rounded-full p-1 shadow-md transform scale-110", children: /* @__PURE__ */ jsx(Check, { size: 20 }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
                    "P. ",
                    page.pageNumber
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: clsx("text-center text-sm font-medium", isSelected ? "text-primary" : "text-slate-500 dark:text-slate-400"), children: isSelected ? "Selected" : `Page ${page.pageNumber}` })
              ]
            },
            page.pageNumber
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-96 shrink-0 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sticky top-24", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "Split Options" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-2", children: [
                "Selected Pages: ",
                selectedPages.size
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: selectedPages.size > 0 ? Array.from(selectedPages).sort((a, b) => a - b).join(", ") : "No pages selected" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSplit,
                disabled: selectedPages.size === 0 || isProcessing,
                className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
                children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("span", { children: "Extract Pages" }),
                  /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
                ] })
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "w-full py-2 text-sm text-slate-500 hover:text-red-500 transition-colors", children: "Cancel / New File" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Secure" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "All splitting happens in your browser. Your PDF file is never uploaded to any server." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  Split as default
};
