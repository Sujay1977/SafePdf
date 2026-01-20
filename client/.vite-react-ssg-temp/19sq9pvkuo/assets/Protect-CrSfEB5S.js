import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { p as protectPDF, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Trash2, Lock, Loader2, ArrowRight, Shield } from "lucide-react";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
const Protect = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const handleProtect = async () => {
    if (!file || !password) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsProcessing(true);
    try {
      const protectedBlob = await protectPDF(file, password);
      FileSaver_minExports.saveAs(protectedBlob, `protected_${file.name}`);
    } catch (error) {
      console.error("Protection failed", error);
      alert("Failed to protect PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Protect PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Encrypt your PDF file with a password to ensure security." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center p-6", children: [
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Dropp PDF here" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6 aspect-square justify-center relative", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFile(null), className: "absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Lock, { size: 40 }) }),
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
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-4", children: "Security Settings" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Set Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Enter password",
                  className: "w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent dark:text-white focus:ring-primary focus:border-primary"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: "Confirm Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Repeat password",
                  className: "w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent dark:text-white focus:ring-primary focus:border-primary"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleProtect,
                disabled: !file || !password || isProcessing,
                className: "flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]",
                children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  "Protect PDF ",
                  /* @__PURE__ */ jsx(ArrowRight, { size: 20 })
                ] })
              }
            ),
            password !== confirmPassword && password && confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-2 text-center", children: "Passwords do not match" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
          /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "Strong Encryption" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "We use standard PDF encryption. The password is never sent to our servers." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
export {
  Protect as default
};
