import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { a as getPageThumbnail, h as getPageTextCheck, j as applyAnnotations, F as FileSaver_minExports } from "./FileSaver.min-c40pLNAl.js";
import { Type, MousePointer2, Edit3, Square, Eraser, Highlighter, Undo, Redo, Bold, Italic, ArrowLeft, Loader2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import "tslib";
import "@pdf-lib/standard-fonts";
import "pako";
import "@pdf-lib/upng";
import "pdfjs-dist";
import "docx";
import "lie";
import "setimmediate";
import "readable-stream";
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
      FileSaver_minExports.saveAs(blob, `edited_${file.name}`);
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
export {
  Edit as default
};
