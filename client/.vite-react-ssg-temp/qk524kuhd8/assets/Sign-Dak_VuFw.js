import { jsxs, jsx } from "react/jsx-runtime";
import { S as SEO } from "../main.mjs";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { a as getPageThumbnail, f as addSignatureToPDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Loader2 } from "lucide-react";
import "pdfjs-dist";
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
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const SignatureCanvas = React.lazy(() => import("./index-BWKWHhB4.js"));
const Sign = () => {
  const [file, setFile] = useState(null);
  const [page, setPage] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSigCanvas, setShowSigCanvas] = useState(false);
  const [signature, setSignature] = useState(null);
  const [sigPosition, setSigPosition] = useState({ x: 0.5, y: 0.5 });
  const sigRef = useRef();
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
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
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
      const signatureWidth = 0.2;
      const signatureHeight = 0.05;
      const blob = await addSignatureToPDF(file, signature, {
        pageIndex,
        x: sigPosition.x - signatureWidth / 2,
        y: sigPosition.y - signatureHeight / 2,
        width: signatureWidth,
        height: signatureHeight
      });
      FileSaver_minExports.saveAs(blob, `signed_${file.name}`);
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
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 relative", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Sign PDF | Electronically Sign PDF Documents",
        description: "Sign your PDF documents online directly in your browser. No upload required, 100% free and private.",
        url: "/sign",
        children: /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/sign" })
      }
    ),
    showSigCanvas && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4 text-slate-900 dark:text-white", children: "Draw Signature" }),
      /* @__PURE__ */ jsx("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white", children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(
        SignatureCanvas,
        {
          ref: sigRef,
          canvasProps: { width: 500, height: 200, className: "sigCanvas" },
          penColor: "black"
        }
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => sigRef.current.clear(), className: "px-4 py-2 text-slate-500 hover:text-slate-700", children: "Clear" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowSigCanvas(false), className: "px-4 py-2 text-slate-500 hover:text-slate-700", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: saveSignature, className: "px-6 py-2 bg-primary text-white rounded-lg font-bold", children: "Save" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-2xl mx-auto mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black mb-2 dark:text-white", children: "Sign PDF" }) }),
    !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "w-full max-w-2xl h-64 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer border-slate-300 dark:border-slate-700 hover:border-primary", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsx("p", { className: "dark:text-white", children: "Drag & drop PDF" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 w-full max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-8 flex justify-center overflow-auto min-h-[500px]", children: page && /* @__PURE__ */ jsxs("div", { className: "relative shadow-lg cursor-crosshair", onClick: handleClickPage, children: [
        /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: "Page", className: "max-w-full h-auto" }),
        signature && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              left: `${sigPosition.x * 100}%`,
              top: `${sigPosition.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20%"
            },
            className: "border-2 border-blue-500 border-dashed bg-white/30",
            children: /* @__PURE__ */ jsx("img", { src: signature, alt: "Sig", className: "w-full" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "w-80 shrink-0 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold mb-4 dark:text-white", children: "Actions" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setShowSigCanvas(true), className: "w-full py-3 bg-white border-2 border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white rounded-lg font-bold mb-4 hover:border-primary transition-colors", children: signature ? "Redraw Signature" : "Create Signature" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mb-4", children: "Click on the document to place your signature." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4 border-t pt-4 dark:border-slate-700", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setPageIndex(Math.max(0, pageIndex - 1)), disabled: pageIndex === 0, className: "p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50", children: "Prev" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm dark:text-white", children: [
              "Page ",
              pageIndex + 1
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setPageIndex(pageIndex + 1), disabled: !page || pageIndex >= page.numPages - 1, className: "p-2 bg-slate-100 dark:bg-slate-700 rounded disabled:opacity-50", children: "Next" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleSign, disabled: !signature || isProcessing, className: "w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors disabled:bg-slate-400", children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mx-auto" }) : "Download Signed PDF" })
      ] })
    ] })
  ] });
};
export {
  Sign as default
};
