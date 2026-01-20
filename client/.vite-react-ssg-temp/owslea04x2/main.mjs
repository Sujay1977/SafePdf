import { ViteReactSSG } from "vite-react-ssg";
import { useState, useEffect, useRef, useCallback } from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Heart, Github, X, Menu, Shield, EyeOff, Lock, ServerOff, Cpu, Zap, Ban, Monitor, Download, Trash2, FileUp, Loader2, ArrowRight, Check, CheckCircle, FileText, Unlock as Unlock$1, RotateCcw, RotateCw, GripVertical, Images, Type, MousePointer2, Edit3, Square, Eraser, Highlighter, Undo, Redo, Bold, Italic, ArrowLeft } from "lucide-react";
import { DodoPayments } from "dodopayments-checkout";
import { useDropzone } from "react-dropzone";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Paragraph, TextRun, Packer } from "docx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Reorder } from "framer-motion";
import clsx from "clsx";
import SignatureCanvas from "react-signature-canvas";
function App() {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    const publicKey = "pk_snd_091bba0fefcd4852a44cccdcf47602b5";
    {
      DodoPayments.Initialize({
        publicKey,
        mode: "live"
      });
    }
  }, []);
  const handleSupportMe = (e) => {
    e.preventDefault();
    const publicKey = "pk_snd_091bba0fefcd4852a44cccdcf47602b5";
    const productId = "pdt_0NWNP0K7PftXJmjaCc5fF";
    try {
      DodoPayments.Initialize({
        publicKey,
        mode: "live"
      });
      DodoPayments.Checkout.open({
        productId,
        quantity: 1
      });
    } catch (error) {
      console.error("Dodo Payments checkout error:", error);
      window.open(`https://checkout.dodopayments.com/buy/${productId}`, "_blank");
    }
  };
  const handleGetStarted = () => {
    const element = document.getElementById("all-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  const navLinks = [
    { name: "Merge PDF", path: "/merge" },
    { name: "Split PDF", path: "/split" },
    { name: "Compress PDF", path: "/compress" },
    { name: "Convert PDF", path: "/pdf-to-word" },
    { name: "All Tools", path: "/" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1350px] mx-auto px-4 md:px-8 h-18 flex items-center justify-between py-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-600/5 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100 dark:border-blue-900/30", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl", children: "picture_as_pdf" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold font-display text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "SafePDF" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.path,
          className: `
                                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                                ${isActive(link.path) ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"}
                            `,
          children: link.name
        },
        link.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSupportMe,
            className: "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFBF00] hover:bg-[#F2B600] text-black text-sm font-bold shadow-[0_2px_10px_rgba(255,191,0,0.2)] hover:shadow-[0_4px_15px_rgba(255,191,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Heart, { size: 16, className: "fill-black/10 stroke-[2.5px]" }),
              /* @__PURE__ */ jsx("span", { children: "Support Me" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/Sujay1977/SafePdf",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hidden sm:flex items-center justify-center p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300",
            "aria-label": "View Source on GitHub",
            children: /* @__PURE__ */ jsx(Github, { size: 22, strokeWidth: 2 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleGetStarted,
            className: "hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95",
            children: userAuth ? "Dashboard" : "Get Started"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg",
            onClick: () => setIsMenuOpen(!isMenuOpen),
            children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        )
      ] })
    ] }),
    isMenuOpen && /* @__PURE__ */ jsxs("div", { className: "lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col p-6 gap-3 animate-in slide-in-from-top-4 duration-300 z-40", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.path,
          onClick: () => setIsMenuOpen(false),
          className: `
                                    flex items-center p-4 rounded-xl text-base font-medium transition-colors
                                    ${isActive(link.path) ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}
                                `,
          children: link.name
        },
        link.name
      )) }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-slate-100 dark:bg-slate-800 my-2" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSupportMe,
            className: "flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFBF00] text-black text-sm font-bold shadow-md hover:bg-[#F2B600] transition-all",
            children: [
              /* @__PURE__ */ jsx(Heart, { size: 18, className: "fill-black/10 stroke-[2.5px]" }),
              "Support Me"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://github.com/Sujay1977/SafePdf",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all",
            children: [
              /* @__PURE__ */ jsx(Github, { size: 18 }),
              "GitHub"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              handleGetStarted();
              setIsMenuOpen(false);
            },
            className: "flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-md",
            children: userAuth ? "Dashboard" : "Get Started"
          }
        )
      ] })
    ] })
  ] });
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "w-full bg-gray-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 mt-auto", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto px-4 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-slate-900 dark:text-white", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-primary text-3xl", children: "picture_as_pdf" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-xl", children: "SafePDF" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-[280px]", children: "Professional-grade PDF tools processed entirely in your browser for maximum privacy. No server uploads, ever." }),
      /* @__PURE__ */ jsxs("div", { className: "text-slate-500 dark:text-slate-500 text-xs mt-auto", children: [
        "© 2026 SafePDF • Made by ",
        /* @__PURE__ */ jsx("a", { href: "https://x.com/sujay__raj", target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors", children: "Sujay" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Product" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/#tools", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "All Tools" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Workflows" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Pricing (Free)" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Updates" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Popular Tools" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/merge", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Merge PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/split", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Split PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/compress", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Compress PDF" }),
        /* @__PURE__ */ jsx(Link, { to: "/pdf-to-word", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "PDF to Word" }),
        /* @__PURE__ */ jsx(Link, { to: "/protect", className: "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors", children: "Protect PDF" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900 dark:text-white text-base", children: "Trust & Security" }),
      /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "100% Client-Side Processing" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "No Data Collection" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "GDPR Compliant Privacy" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800 w-fit mt-2", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-base", children: "check_circle" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wide", children: "Processed Locally" })
      ] })
    ] })
  ] }) }) });
};
const Layout = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex flex-col w-full", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const SEO = ({ title, description, type = "website", name = "SafePDF", children }) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: name }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    children
  ] });
};
const PrivacySection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full py-24 px-4 md:px-10 overflow-hidden bg-slate-50 dark:bg-[#0B1120]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6", children: [
          /* @__PURE__ */ jsx(Shield, { size: 14, className: "animate-pulse" }),
          /* @__PURE__ */ jsx("span", { children: "Client-Side Architecture" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight", children: [
          "Your documents are ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400", children: "none of our business." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg", children: "We've re-engineered the standard PDF editor. By removing the server from the equation, we guarantee your data never leaves your device." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          {
            icon: EyeOff,
            title: "No Tracking",
            desc: "Zero analytics or data collection scripts."
          },
          {
            icon: Lock,
            title: "Local Processing",
            desc: "All code runs directly in your browser."
          },
          {
            icon: ServerOff,
            title: "0% Server Data",
            desc: "We literally cannot see your files."
          },
          {
            icon: Cpu,
            title: "Native Speed",
            desc: "Powered by WebAssembly for raw performance."
          }
        ].map((item, index) => /* @__PURE__ */ jsxs("div", { className: "group p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(item.icon, { size: 20, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-slate-100 mb-1", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 leading-snug", children: item.desc })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 w-full max-w-lg flex justify-center lg:justify-end", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-square max-h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center overflow-hidden group", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full p-6 flex items-center justify-between border-b border-white/5 bg-white/5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500/80" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500/80" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-500/80" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-mono text-slate-400", children: "SECURE_TUNNEL_ACTIVE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 my-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 border border-dashed border-indigo-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-8 border border-white/5 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-32 h-32 flex items-center justify-center bg-blue-500/10 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-sm", children: [
              /* @__PURE__ */ jsx(Shield, { size: 64, className: "text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-400/20 blur-xl rounded-full animate-pulse" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full mt-8 space-y-2 font-mono text-xs md:text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-400", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsx("span", { children: "Initiating local environment..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-400 delay-100", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsx("span", { children: "Blocking external requests..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-400 delay-200", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-50", children: ">" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Status: ",
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold blink", children: "100% Client-Side" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" })
        ] })
      ] })
    ] }) })
  ] });
};
const WhySafePdf = () => {
  return /* @__PURE__ */ jsxs("section", { className: "w-full bg-slate-50 dark:bg-[#0B1120] py-24 px-4 md:px-10 overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 text-center items-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight", children: [
          "The Desktop Experience, ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400", children: "inside your Browser." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl", children: "Powerful PDF tools that run entirely on your device. No uploads, no waiting, no compromise." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsx(Shield, { size: 28, strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Privacy by Default" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md font-medium", children: "No 'Incognito' mode needed; your files never touch the cloud." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-[100px] -mr-8 -mb-8 group-hover:scale-110 transition-transform duration-500 ease-out" }),
          /* @__PURE__ */ jsx(Lock, { className: "absolute right-10 top-10 text-slate-200 dark:text-slate-700/30 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-all duration-500", strokeWidth: 1 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30", children: /* @__PURE__ */ jsx(Zap, { size: 28, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Native Performance" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium", children: "Processes large PDFs in milliseconds using your local CPU/GPU." }),
          /* @__PURE__ */ jsx("div", { className: "absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx("div", { className: "h-1 w-12 bg-purple-500/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-purple-500 animate-[loading_1s_ease-in-out_infinite] origin-left" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-rose-500/20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-rose-500/30", children: /* @__PURE__ */ jsx(Ban, { size: 28, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight", children: "Zero Friction" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium", children: "No accounts, no cookies, no subscriptions. Just open and work." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 group relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-600/30 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium mb-4", children: [
                /* @__PURE__ */ jsx(Monitor, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: "PWA Ready" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black mb-2 tracking-tight", children: "Works Offline" }),
              /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-lg leading-relaxed font-medium", children: "Lost connection? No problem. SafePDF is a Progressive Web App (PWA) that works perfectly without internet." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300 border border-white/10", children: /* @__PURE__ */ jsx(Download, { size: 32, className: "text-white", strokeWidth: 1.5 }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl" })
        ] })
      ] })
    ] })
  ] });
};
const ToolHeaderFilters = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    "All",
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "PDF Security"
  ];
  return /* @__PURE__ */ jsx("section", { className: "pt-8 pb-4 w-full px-4 md:px-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto flex flex-col items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto pb-4 px-4 w-full md:w-auto scrollbar-hide -mx-4 md:mx-0 snap-x", children: categories.map((category) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onCategoryChange(category),
      className: `
                                    whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 snap-center
                                    ${activeCategory === category ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"}
                                `,
      children: category
    },
    category
  )) }) }) }) });
};
const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into a single unified document in the order you want.",
    icon: "call_merge",
    link: "/merge",
    category: "Organize PDF"
  },
  {
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: "call_split",
    link: "/split",
    category: "Organize PDF"
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: "compress",
    link: "/compress",
    category: "Optimize PDF"
  },
  {
    title: "PDF to Word",
    description: "Convert your PDF files to editable Word documents (DOC, DOCX).",
    icon: "article",
    link: "/pdf-to-word",
    category: "Convert PDF"
  },
  {
    title: "Protect PDF",
    description: "Encrypt your PDF file with a password to ensure security.",
    icon: "lock",
    link: "/protect",
    category: "PDF Security"
  },
  {
    title: "Unlock PDF",
    description: "Remove password security from PDFs, making them free to use.",
    icon: "lock_open",
    link: "/unlock",
    category: "PDF Security"
  },
  {
    title: "Rotate PDF",
    description: "Rotate your PDF pages. You can select specific pages to rotate.",
    icon: "rotate_right",
    link: "/rotate",
    category: "Organize PDF"
  },
  {
    title: "Organize PDF",
    description: "Sort, add, and delete PDF pages. Drag and drop to reorder.",
    icon: "sort",
    link: "/organize",
    category: "Organize PDF"
  },
  {
    title: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: "image",
    link: "/pdf-to-jpg",
    category: "Convert PDF"
  },
  {
    title: "JPG to PDF",
    description: "Convert your images (JPG, PNG, BMP, GIF, TIFF) to PDF files.",
    icon: "picture_as_pdf",
    link: "/jpg-to-pdf",
    category: "Convert PDF"
  },
  {
    title: "Sign PDF",
    description: "Sign your PDF yourself or request electronic signatures from others.",
    icon: "draw",
    link: "/sign",
    category: "PDF Security"
  },
  {
    title: "Edit PDF",
    description: "Add text, shapes, comments and highlights to your PDF file.",
    icon: "edit_document",
    link: "/edit",
    category: "Organize PDF"
  }
];
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const toolsRef = useRef(null);
  const scrollToTools = () => {
    const element = document.getElementById("all-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchedTool = tools.find(
        (tool) => tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query)
      );
      if (matchedTool) {
        navigate(matchedTool.link);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ jsxs(
      SEO,
      {
        title: "SafePDF | Secure, Private PDF Processing & Tools",
        description: "Secure, Private PDF Processing. SafePDF offers free, client-side tools to merge, split, compress, and edit PDFs directly in your browser without uploading files.",
        children: [
          /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/" }),
          /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SafePDF",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web-based",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": "Merge PDF, Split PDF, Compress PDF, Edit PDF, Client-side Security"
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-full relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50 dark:border-slate-800/50", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-[1350px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center lg:items-start text-center lg:text-left gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase", children: "100% Client-Side Privacy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]", children: [
              "Your PDFs,",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400", children: "Your Privacy." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0", children: "Free, secure, and client-side PDF tools. Your files are processed in your browser and never uploaded to any server." })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: scrollToTools,
              className: "group flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300 min-w-[200px]",
              children: [
                "Get Started",
                /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform", children: "arrow_forward" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center lg:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-[3px] border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-8 border border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-16 border border-blue-500/30 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center z-10 border border-slate-100 dark:border-slate-700", children: /* @__PURE__ */ jsxs("div", { className: "relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3", children: [
            /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-white", children: "lock" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-sm text-white font-bold", children: "check" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-10 right-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-700", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-green-500 rounded-full" }),
            "Encrypted"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-10 left-10 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 animate-bounce delay-1000", children: /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }),
            "Local"
          ] }) })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-background-light dark:bg-background-dark -mt-6 z-20 relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-[800px] mx-auto px-4 md:px-10", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center h-14 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "text-slate-400 dark:text-slate-500 pl-4 pr-2 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "search" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "flex w-full flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-lg font-medium focus:outline-0 focus:ring-0 px-2 h-full",
          placeholder: "Search for PDF tools (e.g. Merge, Split)...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          onKeyDown: handleSearch
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { ref: toolsRef, id: "all-tools", className: "w-full bg-background-light dark:bg-background-dark pt-4", children: [
      /* @__PURE__ */ jsx(
        ToolHeaderFilters,
        {
          activeCategory,
          onCategoryChange: setActiveCategory
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "layout-container flex grow flex-col w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6", children: filteredTools.map((tool) => /* @__PURE__ */ jsxs(Link, { to: tool.link, className: "group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/30 dark:hover:border-blue-400/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/5 dark:bg-blue-500/10 text-primary group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-3xl", children: tool.icon }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-slate-900 dark:text-white text-lg font-bold group-hover:text-primary transition-colors", children: tool.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm leading-relaxed", children: tool.description })
          ] })
        ] }, tool.title)) }),
        filteredTools.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-lg", children: "No tools found matching your criteria." }) })
      ] }),
      /* @__PURE__ */ jsx(PrivacySection, {}),
      /* @__PURE__ */ jsx(WhySafePdf, {})
    ] })
  ] });
};
const pdfjsWorker = "/assets/pdf.worker.min-yatZIOMy.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const getPDFDocument = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument(arrayBuffer);
  return await loadingTask.promise;
};
const generateThumbnail = async (file) => {
  try {
    const pdf = await getPDFDocument(file);
    return await getPageThumbnail(pdf, 1);
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    return { thumbnail: null, numPages: 0 };
  }
};
const getPageThumbnail = async (pdfOrFile, pageNumber) => {
  try {
    let pdf = pdfOrFile;
    if (pdfOrFile instanceof File || pdfOrFile instanceof Blob) {
      pdf = await getPDFDocument(pdfOrFile);
    }
    const page = await pdf.getPage(pageNumber);
    const scale = 1;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    return {
      thumbnail: canvas.toDataURL(),
      numPages: pdf.numPages,
      originalWidth: viewport.width,
      originalHeight: viewport.height,
      pdfDoc: pdf
      // Return the pdfjs doc for further use if needed
    };
  } catch (error) {
    console.error("Error getting page thumbnail", error);
    return { thumbnail: null, numPages: 0 };
  }
};
const getPageTextCheck = async (file, pageIndex) => {
  try {
    const pdf = await getPDFDocument(file);
    const page = await pdf.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();
    const styles = textContent.styles;
    const rawItems = textContent.items.map((item) => {
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      const fontHeight = Math.sqrt(item.transform[2] * item.transform[2] + item.transform[3] * item.transform[3]);
      const width = item.width ? item.width * viewport.scale : 0;
      let fontName = item.fontName;
      if (styles && styles[fontName]) {
        fontName = styles[fontName].fontFamily;
      }
      return {
        str: item.str,
        x: tx[4],
        y: tx[5] - fontHeight,
        width,
        height: fontHeight,
        normX: tx[4] / viewport.width,
        normY: (tx[5] - fontHeight) / viewport.height,
        normWidth: width / viewport.width,
        normHeight: fontHeight / viewport.height,
        fontSize: fontHeight,
        fontName,
        // Real font family name
        dir: item.dir,
        transform: item.transform
      };
    });
    const blocks = [];
    rawItems.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
      return a.x - b.x;
    });
    let currentBlock = null;
    rawItems.forEach((item) => {
      if (!currentBlock) {
        currentBlock = {
          ...item,
          fontSize: item.fontSize,
          fontName: item.fontName,
          items: [item]
        };
        return;
      }
      const prevItem = currentBlock.items[currentBlock.items.length - 1];
      const lineHeight = Math.max(item.height, prevItem.height);
      const isSameLine = Math.abs(item.y - prevItem.y) < lineHeight * 0.5;
      const isNextLine = Math.abs(item.y - prevItem.y) < lineHeight * 3 && Math.abs(item.y - prevItem.y) > lineHeight * 0.1;
      const isHorizontalClose = item.x - (prevItem.x + prevItem.width) < lineHeight * 1.5;
      const sameFontSize = Math.abs(item.fontSize - currentBlock.fontSize) < 4;
      const sameFont = item.fontName === currentBlock.fontName;
      if (sameFontSize && sameFont && (isSameLine && isHorizontalClose || isNextLine && Math.abs(item.x - currentBlock.x) < 50)) {
        currentBlock.items.push(item);
        const gap = item.x - (prevItem.x + prevItem.width);
        const separator = isNextLine ? "\n" : gap > 2 ? " " : "";
        currentBlock.str += separator + item.str;
        const rightEdge = Math.max(currentBlock.x + currentBlock.width, item.x + item.width);
        currentBlock.width = rightEdge - currentBlock.x;
        const bottomEdge = Math.max(currentBlock.y + currentBlock.height, item.y + item.height);
        currentBlock.height = bottomEdge - currentBlock.y;
        currentBlock.normWidth = currentBlock.width / viewport.width;
        currentBlock.normHeight = currentBlock.height / viewport.height;
      } else {
        blocks.push(currentBlock);
        currentBlock = { ...item, items: [item] };
      }
    });
    if (currentBlock) blocks.push(currentBlock);
    return blocks.map((block) => ({
      text: block.str,
      x: block.x / viewport.width,
      y: (viewport.height - (block.y + block.height)) / viewport.height,
      normWidth: block.width / viewport.width,
      normHeight: block.height / viewport.height,
      fontSize: block.fontSize,
      fontName: block.fontName,
      hasEOL: block.hasEOL
    }));
  } catch (error) {
    console.error("Error extracting text", error);
    return [];
  }
};
const extractPages = async (file, pageIndices) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const compressPDF = async (file, qualityLevel = "recommended") => {
  const settings = {
    extreme: { scale: 0.8, quality: 0.4 },
    recommended: { scale: 1, quality: 0.7 },
    less: { scale: 1, quality: 0.9 }
  };
  const { scale, quality } = settings[qualityLevel] || settings.recommended;
  await file.arrayBuffer();
  const pdfToLoad = await getPDFDocument(file);
  const numPages = pdfToLoad.numPages;
  const newPdf = await PDFDocument.create();
  for (let i = 1; i <= numPages; i++) {
    const page = await pdfToLoad.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    const imgDataUrl = canvas.toDataURL("image/jpeg", quality);
    const imgBytes = await fetch(imgDataUrl).then((res) => res.arrayBuffer());
    const jpgImage = await newPdf.embedJpg(imgBytes);
    const jpgDims = jpgImage.scale(1 / scale);
    const newPage = newPdf.addPage([jpgDims.width * scale, jpgDims.height * scale]);
    newPage.setSize(jpgDims.width, jpgDims.height);
    newPage.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: jpgDims.width,
      height: jpgDims.height
    });
  }
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const convertPDFToWord = async (file) => {
  await file.arrayBuffer();
  const pdf = await getPDFDocument(file);
  const numPages = pdf.numPages;
  const doc = new Document({
    sections: []
  });
  const children = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items.map((item) => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5],
      hasEOL: item.hasEOL
    }));
    items.sort((a, b) => {
      if (Math.abs(a.y - b.y) > 5) {
        return b.y - a.y;
      }
      return a.x - b.x;
    });
    let currentLineY = -1;
    let currentLineText = [];
    items.forEach((item) => {
      if (currentLineY === -1) currentLineY = item.y;
      if (Math.abs(item.y - currentLineY) > 5) {
        children.push(new Paragraph({
          children: [new TextRun(currentLineText.join(" "))]
        }));
        currentLineText = [];
        currentLineY = item.y;
      }
      currentLineText.push(item.str);
    });
    if (currentLineText.length > 0) {
      children.push(new Paragraph({
        children: [new TextRun(currentLineText.join(" "))]
      }));
    }
  }
  doc.addSection({
    properties: {},
    children
  });
  const blob = await Packer.toBlob(doc);
  return blob;
};
const mergePDFs = async (files) => {
  const mergedPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  const pdfBytes = await mergedPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const protectPDF = async (file, password) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  pdfDoc.encrypt({
    userPassword: password,
    ownerPassword: password,
    permissions: {
      printing: "highResolution",
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: false,
      documentAssembly: false
    }
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const unlockPDF = async (file, password) => {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
  } catch (error) {
    throw new Error("Incorrect password or file error");
  }
};
const rotatePDF = async (file, rotations) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  Object.keys(rotations).forEach((pageIndex) => {
    const page = pages[parseInt(pageIndex)];
    if (page) {
      page.setRotation(degrees(rotations[pageIndex]));
    }
  });
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const pdfToImages = async (file) => {
  await file.arrayBuffer();
  const pdf = await getPDFDocument(file);
  const numPages = pdf.numPages;
  const zip = new JSZip();
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const scale = 2;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const imgDataBase64 = imgData.split(",")[1];
    zip.file(`page_${i}.jpg`, imgDataBase64, { base64: true });
  }
  return await zip.generateAsync({ type: "blob" });
};
const imagesToPDF = async (files) => {
  const newPdf = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      image = await newPdf.embedJpg(arrayBuffer);
    } else if (file.type === "image/png") {
      image = await newPdf.embedPng(arrayBuffer);
    } else {
      try {
        image = await newPdf.embedJpg(arrayBuffer);
      } catch (e) {
        try {
          image = await newPdf.embedPng(arrayBuffer);
        } catch (e2) {
          continue;
        }
      }
    }
    const { width, height } = image.scale(1);
    const page = newPdf.addPage([width, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height
    });
  }
  const pdfBytes = await newPdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const addSignatureToPDF = async (file, signatureImageBase64, position) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const page = pages[position.pageIndex];
  if (page) {
    const pngImage = await pdfDoc.embedPng(signatureImageBase64);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const x = position.x * pageWidth;
    const y = pageHeight - position.y * pageHeight - position.height * pageHeight;
    page.drawImage(pngImage, {
      x,
      y,
      width: position.width * pageWidth,
      height: position.height * pageHeight
    });
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? rgb(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ) : rgb(0, 0, 0);
};
const getStandardFont = (family, bold, italic) => {
  if (family && family.toLowerCase().includes("times")) {
    if (bold && italic) return StandardFonts.TimesRomanBoldItalic;
    if (bold) return StandardFonts.TimesRomanBold;
    if (italic) return StandardFonts.TimesRomanItalic;
    return StandardFonts.TimesRoman;
  }
  if (family && family.toLowerCase().includes("courier")) {
    if (bold && italic) return StandardFonts.CourierBoldOblique;
    if (bold) return StandardFonts.CourierBold;
    if (italic) return StandardFonts.CourierOblique;
    return StandardFonts.Courier;
  }
  if (bold && italic) return StandardFonts.HelveticaBoldOblique;
  if (bold) return StandardFonts.HelveticaBold;
  if (italic) return StandardFonts.HelveticaOblique;
  return StandardFonts.Helvetica;
};
const applyAnnotations = async (file, annotations) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  for (const ann of annotations) {
    const page = pages[ann.pageIndex];
    if (!page) continue;
    const fontToEmbed = getStandardFont(ann.fontFamily, ann.isBold, ann.isItalic);
    const font = await pdfDoc.embedFont(fontToEmbed);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const x = ann.x * pageWidth;
    const y = pageHeight - ann.y * pageHeight;
    const annColor = hexToRgb(ann.color || "#000000");
    const borderColor = hexToRgb(ann.strokeColor || "#000000");
    if (ann.isReplacement) {
      const maskX = ann.originalX * pageWidth;
      const pdfTopY = pageHeight - ann.originalY * pageHeight;
      const maskW = ann.originalWidth * pageWidth;
      const maskH = ann.originalHeight * pageHeight;
      page.drawRectangle({
        x: maskX - 2,
        y: pdfTopY - maskH - 2,
        width: maskW + 4,
        height: maskH + 4,
        color: rgb(1, 1, 1),
        opacity: 1
      });
      const fontSize = ann.fontSize || 12;
      const text = ann.text;
      const maxWidth = maskW * 1.5;
      const words = text.split(" ");
      let line = "";
      let currentTempY = pdfTopY - fontSize;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth && n > 0) {
          page.drawText(line, {
            x: maskX,
            y: currentTempY,
            size: fontSize,
            font,
            color: annColor
          });
          line = words[n] + " ";
          currentTempY -= fontSize * 1.2;
        } else {
          line = testLine;
        }
      }
      page.drawText(line, {
        x: maskX,
        y: currentTempY,
        size: fontSize,
        font,
        color: annColor
      });
      continue;
    }
    if (ann.type === "text") {
      const textSize = ann.fontSize || 12;
      if (ann.backgroundColor) {
        const textWidth = font.widthOfTextAtSize(ann.text, textSize);
        const textHeight = textSize;
        page.drawRectangle({
          x,
          y: y - textHeight,
          width: textWidth + 4,
          height: textHeight + 4,
          color: hexToRgb(ann.backgroundColor),
          opacity: 1
        });
      }
      page.drawText(ann.text, {
        x: x + (ann.backgroundColor ? 2 : 0),
        y: y - textSize,
        size: textSize,
        font,
        color: annColor
      });
    } else if (ann.type === "rectangle") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawRectangle({
        x,
        y: y - h,
        width: w,
        height: h,
        borderColor,
        borderWidth: ann.strokeWidth || 1,
        color: ann.fillColor ? hexToRgb(ann.fillColor) : void 0,
        opacity: ann.opacity || 1
      });
    } else if (ann.type === "circle") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      const size = Math.min(w, h);
      page.drawCircle({
        x: x + w / 2,
        y: y - h / 2,
        size: size / 2,
        borderColor,
        borderWidth: ann.strokeWidth || 1,
        color: ann.fillColor ? hexToRgb(ann.fillColor) : void 0
      });
    } else if (ann.type === "line") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawLine({
        start: { x, y },
        end: { x: x + w, y: y - h },
        thickness: ann.strokeWidth || 2,
        color: borderColor
      });
    } else if (ann.type === "highlight") {
      const w = ann.width * pageWidth;
      const h = ann.height * pageHeight;
      page.drawRectangle({
        x,
        y: y - h,
        width: w,
        height: h,
        color: rgb(1, 1, 0),
        // Yellow
        opacity: 0.35
      });
    } else if (ann.type === "image") {
      if (ann.imageData) {
        let embeddedImage;
        if (ann.imageData.startsWith("data:image/png")) {
          embeddedImage = await pdfDoc.embedPng(ann.imageData);
        } else {
          embeddedImage = await pdfDoc.embedJpg(ann.imageData);
        }
        const w = ann.width * pageWidth;
        const h = ann.height * pageHeight;
        page.drawImage(embeddedImage, {
          x,
          y: y - h,
          width: w,
          height: h
        });
      }
    }
  }
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};
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
      saveAs(mergedBlob, "merged.pdf");
    } catch (error) {
      console.error("Merge failed", error);
      alert("Failed to merge PDFs");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Merge PDF | Combine PDF Files for Free | SafePDF" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Merge multiple PDF files into one document securely in your browser. No upload required, 100% free and private." }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://safepdf.site/merge" })
    ] }),
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
      saveAs(newPdfBlob, `split_${file.name}`);
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
      saveAs(compressedBlob, `compressed_${file.name}`);
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
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to add file or drag and drop" })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white px-1", children: "Selected File" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 size-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400", children: /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-2xl", children: "picture_as_pdf" }) }),
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
      saveAs(docBlob, `${file.name.replace(".pdf", "")}.docx`);
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
      saveAs(protectedBlob, `protected_${file.name}`);
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
      saveAs(unlockedBlob, `unlocked_${file.name}`);
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
          /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
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
      saveAs(newPdfBlob, `rotated_${file.name}`);
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
const Organize = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
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
          newPages.push({ id: `p-${i}`, originalIndex: i - 1, thumbnail, pageNumber: i });
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
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const removePage = (id) => {
    setPages(pages.filter((p) => p.id !== id));
  };
  const handleSave = async () => {
    if (!file || pages.length === 0) return;
    setIsProcessing(true);
    try {
      const pageIndices = pages.map((p) => p.originalIndex);
      const newPdfBlob = await extractPages(file, pageIndices);
      saveAs(newPdfBlob, `organized_${file.name}`);
    } catch (error) {
      console.error("Organize failed", error);
      alert("Failed to organize PDF");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "Organize PDF" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Sort, delete, and reorder PDF pages." })
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
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-700 dark:text-slate-200", children: "Drag to Reorder" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500", children: [
            pages.length,
            " Pages"
          ] })
        ] }),
        isLoadingPages ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-primary", size: 40 }) }) : /* @__PURE__ */ jsx(Reorder.Group, { axis: "y", values: pages, onReorder: setPages, className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: pages.map((page) => /* @__PURE__ */ jsxs(Reorder.Item, { value: page, className: "group relative flex flex-col gap-2 cursor-grab active:cursor-grabbing", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[1/1.4] bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-all hover:scale-[1.02]", children: [
            /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              removePage(page.id);
            }, className: "absolute -top-2 -right-2 z-10 p-1.5 rounded-full bg-white dark:bg-slate-600 text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-md border border-slate-200 dark:border-slate-500 opacity-0 group-hover:opacity-100 transition-all", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) }),
            /* @__PURE__ */ jsx("img", { src: page.thumbnail, alt: `Page ${page.pageNumber}`, className: "w-full h-full object-contain p-2" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm", children: [
              "P. ",
              page.pageNumber
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(GripVertical, { size: 16, className: "text-slate-300" }) })
        ] }, page.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-6", children: "Organize Options" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isProcessing,
              className: "w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200",
              children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Save Organized PDF" })
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
const PDFToJPG = () => {
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
      const zipBlob = await pdfToImages(file);
      saveAs(zipBlob, `${file.name.replace(".pdf", "")}_images.zip`);
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Failed to convert PDF to Images");
    }
    setIsProcessing(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-slate-900 dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3", children: "PDF to JPG" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-normal", children: "Convert PDF pages to high-quality images. Downloads as a ZIP file." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full max-w-3xl mx-auto", children: !file ? /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "group relative flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary transition-all cursor-pointer", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors", children: "cloud_upload" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: "Click to select PDF or drag and drop" })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "size-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Images, { size: 40 }) }),
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
            children: isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx("span", { children: "Convert to JPGs" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex items-start gap-3 max-w-lg p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20", children: [
      /* @__PURE__ */ jsx(Shield, { className: "text-primary mt-0.5 shrink-0", size: 20 }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 dark:text-white mb-1", children: "100% Secure" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 dark:text-slate-400 text-xs leading-relaxed", children: "We convert files locally. Your sensitive documents never leave your device." })
      ] })
    ] })
  ] });
};
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
      saveAs(pdfBlob, "converted_images.pdf");
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
      saveAs(blob, `signed_${file.name}`);
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
    showSigCanvas && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4 text-slate-900 dark:text-white", children: "Draw Signature" }),
      /* @__PURE__ */ jsx("div", { className: "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white", children: /* @__PURE__ */ jsx(
        SignatureCanvas,
        {
          ref: sigRef,
          canvasProps: { width: 500, height: 200, className: "sigCanvas" },
          penColor: "black"
        }
      ) }),
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
const Edit = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [tool, setTool] = useState("select");
  const [annotations, setAnnotations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageTextItems, setPageTextItems] = useState([]);
  const [editedTextSchema, setEditedTextSchema] = useState({});
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");
  const fonts = [
    { name: "Helvetica", value: "Helvetica", css: "Helvetica, Arial, sans-serif" },
    { name: "Times Roman", value: "Times", css: '"Times New Roman", Times, serif' },
    { name: "Courier", value: "Courier", css: '"Courier New", Courier, monospace' }
  ];
  useEffect(() => {
    if (!file) return;
    const loadPages = async () => {
      try {
        const result = await getPageThumbnail(file, activePageIndex + 1);
        setPages((prev) => {
          const newPages = [...prev];
          newPages[activePageIndex] = result;
          return newPages;
        });
        const textItems = await getPageTextCheck(file, activePageIndex);
        setPageTextItems(textItems);
      } catch (e) {
        console.error(e);
      }
    };
    loadPages();
  }, [file, activePageIndex]);
  const onDrop = useCallback((acceptedFiles) => {
    if ((acceptedFiles == null ? void 0 : acceptedFiles.length) > 0) {
      setFile(acceptedFiles[0]);
      setPages([]);
      setActivePageIndex(0);
      setAnnotations([]);
      setHistory([]);
      setHistoryIndex(-1);
      setPageTextItems([]);
      setEditedTextSchema({});
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false
  });
  const addToHistory = (newAnnotations) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newAnnotations);
  };
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnnotations(history[historyIndex - 1]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setAnnotations([]);
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnnotations(history[historyIndex + 1]);
    }
  };
  const handleCanvasClick = (e) => {
    if (!pages[activePageIndex]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (tool === "text") {
      const newAnn = { id: crypto.randomUUID(), type: "text", pageIndex: activePageIndex, x, y, text: "Add text", fontSize, color: fontColor, fontFamily: "Helvetica" };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "eraser") {
      const newAnn = { id: crypto.randomUUID(), type: "rectangle", pageIndex: activePageIndex, x: x - 0.05, y: y - 0.025, width: 0.1, height: 0.05, strokeWidth: 0, fillColor: "#FFFFFF", opacity: 1 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "rect") {
      const newAnn = { id: crypto.randomUUID(), type: "rectangle", pageIndex: activePageIndex, x: x - 0.1, y: y - 0.05, width: 0.2, height: 0.1, strokeColor: fontColor, strokeWidth: 2 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    } else if (tool === "highlight") {
      const newAnn = { id: crypto.randomUUID(), type: "highlight", pageIndex: activePageIndex, x: x - 0.1, y: y - 0.025, width: 0.2, height: 0.05 };
      addToHistory([...annotations, newAnn]);
      setTool("select");
      setSelectedId(newAnn.id);
    }
    if (tool === "select") {
      if (e.target === e.currentTarget) {
        setSelectedId(null);
      }
    }
  };
  const updateAnnotation = (id, updates) => {
    const updated = annotations.map((a) => a.id === id ? { ...a, ...updates } : a);
    addToHistory(updated);
  };
  const getEditedState = (idx) => {
    if (editedTextSchema[idx]) return editedTextSchema[idx];
    const item = pageTextItems[idx];
    if (!item) return { text: "", fontSize: 12, fontFamily: "Helvetica", isBold: false, isItalic: false, color: "#000000" };
    let family = "Helvetica";
    const fName = (item.fontName || "").toLowerCase();
    if (fName.includes("times") || fName.includes("roman") || fName.includes("serif")) {
      family = "Times";
    } else if (fName.includes("courier") || fName.includes("mono") || fName.includes("typewriter")) {
      family = "Courier";
    }
    return {
      text: item.text || "",
      // Fixed: was item.str
      fontSize: item.fontSize,
      fontFamily: family,
      isBold: fName.includes("bold") || fName.includes("black") || fName.includes("heavy"),
      isItalic: fName.includes("italic") || fName.includes("oblique"),
      color: "#000000"
    };
  };
  const updateContentEdit = (idx, updates) => {
    const currentState = getEditedState(idx);
    setEditedTextSchema({
      ...editedTextSchema,
      [idx]: { ...currentState, ...updates }
    });
  };
  const handleSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const replacements = Object.keys(editedTextSchema).map((idx) => {
        const original = pageTextItems[idx];
        const state = editedTextSchema[idx];
        return {
          id: `rep-${idx}`,
          type: "text",
          isReplacement: true,
          pageIndex: activePageIndex,
          x: original.normX,
          y: original.normY + original.normHeight,
          text: state.text,
          fontSize: state.fontSize,
          fontFamily: state.fontFamily,
          isBold: state.isBold,
          isItalic: state.isItalic,
          color: state.color,
          originalX: original.normX,
          originalY: original.normY,
          originalWidth: original.normWidth,
          originalHeight: original.normHeight
        };
      });
      const finalAnnotations = [...annotations, ...replacements];
      const blob = await applyAnnotations(file, finalAnnotations);
      saveAs(blob, `edited_${file.name}`);
    } catch (e) {
      console.error(e);
      alert("Failed to save edits");
    }
    setIsProcessing(false);
  };
  if (!file) return /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-slate-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black text-slate-900 dark:text-white mb-2", children: "PDF Editor" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Upload a PDF to start editing" })
    ] }),
    /* @__PURE__ */ jsxs("div", { ...getRootProps(), className: "border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 bg-white dark:bg-slate-800 cursor-pointer hover:border-primary transition-colors", children: [
      /* @__PURE__ */ jsx("input", { ...getInputProps() }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-blue-50 dark:bg-slate-700 rounded-full text-primary", children: /* @__PURE__ */ jsx(Type, { size: 32 }) }),
        /* @__PURE__ */ jsx("p", { className: "font-medium dark:text-white", children: "Drag & drop or Click to Upload" })
      ] })
    ] })
  ] });
  const activePage = pages[activePageIndex];
  const selectedContentIdx = (selectedId == null ? void 0 : selectedId.startsWith("content-")) ? selectedId.split("-")[1] : null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-100 dark:bg-slate-900", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("select"), className: `p-2 rounded-lg ${tool === "select" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(MousePointer2, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("edit-content"), className: `p-2 rounded-lg ${tool === "edit-content" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Edit3, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("text"), className: `p-2 rounded-lg ${tool === "text" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Type, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("rect"), className: `p-2 rounded-lg ${tool === "rect" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Square, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("eraser"), className: `p-2 rounded-lg ${tool === "eraser" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Eraser, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setTool("highlight"), className: `p-2 rounded-lg ${tool === "highlight" ? "bg-blue-50 text-primary" : "text-slate-500 hover:bg-gray-50"}`, children: /* @__PURE__ */ jsx(Highlighter, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" }),
        /* @__PURE__ */ jsx("button", { onClick: handleUndo, disabled: historyIndex < 0, className: "p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(Undo, { size: 20 }) }),
        /* @__PURE__ */ jsx("button", { onClick: handleRedo, disabled: historyIndex >= history.length - 1, className: "p-2 rounded-lg text-slate-500 hover:bg-gray-50 disabled:opacity-30", children: /* @__PURE__ */ jsx(Redo, { size: 20 }) })
      ] }),
      selectedContentIdx && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur rounded-lg shadow-sm border border-gray-200 animate-in fade-in slide-in-from-top-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Text" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            className: "bg-transparent text-sm border-none focus:ring-0 p-0 w-24 text-slate-700 font-medium cursor-pointer",
            value: getEditedState(selectedContentIdx).fontFamily,
            onChange: (e) => updateContentEdit(selectedContentIdx, { fontFamily: e.target.value }),
            children: fonts.map((f) => /* @__PURE__ */ jsx("option", { value: f.value, children: f.name }, f.value))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            className: "w-12 bg-transparent text-sm border-none focus:ring-0 p-0 text-center",
            value: Math.round(getEditedState(selectedContentIdx).fontSize),
            onChange: (e) => updateContentEdit(selectedContentIdx, { fontSize: Number(e.target.value) })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "px" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-200" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updateContentEdit(selectedContentIdx, { isBold: !getEditedState(selectedContentIdx).isBold }),
            className: `p-1 rounded ${getEditedState(selectedContentIdx).isBold ? "bg-blue-100 text-blue-600" : "text-slate-500 hover:bg-gray-50"}`,
            children: /* @__PURE__ */ jsx(Bold, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => updateContentEdit(selectedContentIdx, { isItalic: !getEditedState(selectedContentIdx).isItalic }),
            className: `p-1 rounded ${getEditedState(selectedContentIdx).isItalic ? "bg-blue-100 text-blue-600" : "text-slate-500 hover:bg-gray-50"}`,
            children: /* @__PURE__ */ jsx(Italic, { size: 16 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex overflow-hidden relative", children: [
      /* @__PURE__ */ jsx("div", { className: "w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-4", children: "Pages" }),
        /* @__PURE__ */ jsxs("div", { className: "aspect-[1/1.4] bg-gray-100 rounded-lg border-2 border-primary ring-2 ring-primary/20 relative overflow-hidden", children: [
          activePage && /* @__PURE__ */ jsx("img", { src: activePage.thumbnail, className: "w-full h-full object-contain" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded", children: "1" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gray-100 dark:bg-slate-950 overflow-auto flex justify-center p-10 relative", children: activePage ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative bg-white shadow-2xl",
          style: { width: activePage.originalWidth, height: activePage.originalHeight, transform: "scale(1)", transformOrigin: "top center" },
          onClick: handleCanvasClick,
          children: [
            /* @__PURE__ */ jsx("img", { src: activePage.thumbnail, className: "absolute inset-0 w-full h-full pointer-events-none select-none" }),
            tool === "edit-content" && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-30", children: pageTextItems.map((item, idx) => {
              var _a;
              const state = getEditedState(idx);
              const isSelected = selectedId === `content-${idx}`;
              const cssFont = ((_a = fonts.find((f) => f.value === state.fontFamily)) == null ? void 0 : _a.css) || fonts[0].css;
              if (idx === 0) console.log("Rendering Text Items:", pageTextItems.length);
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `absolute rounded transition-all group ${isSelected ? "z-50" : "z-auto hover:z-40"}`,
                  style: {
                    top: `${item.normY * 100}%`,
                    left: `${item.normX * 100}%`,
                    width: `${item.normWidth * 100}%`,
                    height: `${item.normHeight * 100}%`,
                    pointerEvents: "auto"
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    console.log("Clicked text item", idx);
                    setSelectedId(`content-${idx}`);
                  },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `absolute -inset-1 border-2 border-transparent transition-colors pointer-events-none ${isSelected ? "border-blue-500 bg-white shadow-lg" : "group-hover:border-blue-400 group-hover:bg-blue-50/10"}` }),
                    isSelected ? /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: state.text,
                        autoFocus: true,
                        onChange: (e) => updateContentEdit(idx, { text: e.target.value }),
                        className: "relative w-full h-full p-0 m-0 border-none bg-transparent resize-none overflow-hidden outline-none text-slate-900",
                        style: {
                          fontSize: `${state.fontSize}px`,
                          fontFamily: cssFont,
                          fontWeight: state.isBold ? "bold" : "normal",
                          fontStyle: state.isItalic ? "italic" : "normal",
                          lineHeight: 1.1,
                          whiteSpace: "pre-wrap"
                        }
                      }
                    ) : (
                      // Invisible overlay to capture clicks, but lets you see original text
                      /* @__PURE__ */ jsx("div", { className: "w-full h-full cursor-text", title: `Font: ${state.fontFamily}, Size: ${Math.round(state.fontSize)}px` })
                    )
                  ]
                },
                idx
              );
            }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-20 pointer-events-none", children: tool !== "edit-content" && annotations.filter((a) => a.pageIndex === activePageIndex).map((ann) => /* @__PURE__ */ jsx(
              RndObject,
              {
                ann,
                isSelected: selectedId === ann.id,
                onSelect: () => {
                  setSelectedId(ann.id);
                  setTool("select");
                },
                onChange: (newAttrs) => updateAnnotation(ann.id, newAttrs)
              },
              ann.id
            )) })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-slate-400", children: "Loading page..." }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "h-16 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 z-30", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "text-slate-500 hover:text-primary flex items-center gap-2 text-sm font-medium", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        " Back to Dashboard"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: handleSave, disabled: isProcessing, className: "flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:bg-slate-400", children: [
        isProcessing ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", size: 20 }) : /* @__PURE__ */ jsx(Check, { size: 20 }),
        "Apply Edits"
      ] })
    ] })
  ] });
};
const RndObject = ({ ann, isSelected, onSelect, onChange }) => {
  const style = {
    position: "absolute",
    left: `${ann.x * 100}%`,
    top: `${ann.y * 100}%`,
    width: ann.width ? `${ann.width * 100}%` : "auto",
    height: ann.height ? `${ann.height * 100}%` : "auto",
    cursor: isSelected ? "move" : "pointer",
    border: isSelected ? "1px dashed #137fec" : "none",
    zIndex: isSelected ? 10 : 1,
    pointerEvents: "auto"
  };
  const handleContentChange = (e) => {
    onChange({ text: e.target.innerText });
  };
  if (ann.type === "text") {
    return /* @__PURE__ */ jsxs("div", { style, onClick: (e) => {
      e.stopPropagation();
      onSelect();
    }, className: "group", children: [
      isSelected && /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-0 text-[10px] bg-primary text-white px-1 rounded", children: "Text" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          contentEditable: isSelected,
          suppressContentEditableWarning: true,
          onBlur: handleContentChange,
          style: {
            fontSize: `${ann.fontSize}px`,
            color: ann.color,
            fontFamily: "Helvetica, sans-serif",
            whiteSpace: "nowrap",
            outline: "none"
          },
          children: ann.text
        }
      )
    ] });
  }
  if (ann.type === "rectangle") {
    const isEraser = ann.fillColor === "#FFFFFF";
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          ...style,
          border: ann.strokeWidth > 0 ? `${ann.strokeWidth || 2}px solid ${ann.strokeColor}` : "none",
          backgroundColor: ann.fillColor || "transparent",
          opacity: ann.opacity || 1
        },
        onClick: (e) => {
          e.stopPropagation();
          onSelect();
        },
        children: isEraser && isSelected && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border border-gray-300 opacity-50 flex items-center justify-center text-[8px] text-gray-500", children: "Eraser" })
      }
    );
  }
  if (ann.type === "highlight") {
    return /* @__PURE__ */ jsx("div", { style: { ...style, backgroundColor: "yellow", opacity: 0.35, mixBlendMode: "multiply" }, onClick: (e) => {
      e.stopPropagation();
      onSelect();
    } });
  }
  return null;
};
const routes = [
  { path: "/", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Home, {}) }) },
  { path: "/merge", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Merge, {}) }) },
  { path: "/split", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Split, {}) }) },
  { path: "/compress", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Compress, {}) }) },
  { path: "/pdf-to-word", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(PDFToWord, {}) }) },
  { path: "/protect", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Protect, {}) }) },
  { path: "/unlock", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Unlock, {}) }) },
  { path: "/rotate", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Rotate, {}) }) },
  { path: "/organize", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Organize, {}) }) },
  { path: "/pdf-to-jpg", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(PDFToJPG, {}) }) },
  { path: "/jpg-to-pdf", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(JPGToPDF, {}) }) },
  { path: "/sign", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Sign, {}) }) },
  { path: "/edit", element: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Edit, {}) }) }
];
const createApp = ViteReactSSG(
  App,
  { routes },
  ({ app, router, routes: routes2, isClient, initialState }) => {
  }
);
export {
  createApp
};
