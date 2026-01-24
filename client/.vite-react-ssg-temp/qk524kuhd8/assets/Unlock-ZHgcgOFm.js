import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { u as unlockPDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Trash2, Unlock as Unlock$1, Loader2, ArrowRight, Shield } from "lucide-react";
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
const Unlock = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setError("");
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const handleUnlock = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    setError("");
    try {
      const unlockedBlob = await unlockPDF(file, password);
      FileSaver_minExports.saveAs(unlockedBlob, `unlocked_${file.name}`);
    } catch (error2) {
      console.error("Unlock failed", error2);
      setError("Incorrect password or failed to unlock.");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Unlock PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Remove password security from PDFs, making them free to use." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center p-6", children: [
          /* @__PURE__ */ jsx(ClientOnly, { children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Drop PDF here" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6 aspect-square justify-center relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Unlock$1, { size: 40 }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-2 break-all", children: file.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400", children: [
            (file.size / 1024 / 1024).toFixed(2),
            " MB"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-4", children: "Unlock Settings" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Enter the current password to remove it." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Enter current password",
                className: clsx(
                  "w-full rounded-lg bg-transparent dark:text-white focus:ring-primary focus:border-primary",
                  error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-600"
                )
              }
            ),
            error && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 font-medium", children: error })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleUnlock,
              disabled: !file || !password || isProcessing,
              className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                "Unlock PDF ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
              ] })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "Secure Decryption" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "Your password allows us to unlock the file locally. It is not stored or sent anywhere." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  Unlock as default
};
