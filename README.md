# 🛡️ SafePdf — Privacy-First Client-Side PDF Tools

**SafePdf** is an open-source web application that allows you to manage and manipulate PDF files directly in your browser. Unlike traditional tools, **your files never leave your computer.** All processing happens locally using your browser's resources.

---

## 🌟 Why SafePdf?

Most online PDF tools upload your sensitive documents to their servers for processing. SafePdf changes that:
* **100% Private:** Files are processed via WebAssembly and JavaScript locally.
* **Zero Server Uploads:** No risk of data leaks or document storage on third-party servers.
* **Fast & Free:** No queues, no limits, and no subscriptions.

## 🚀 Features
* **Merge PDFs:** Combine multiple documents into a single file.
* **Split PDFs:** Extract pages or split one document into many.
* **Compress:** Reduce file size while keeping high quality.
* **Watermark:** Secure your documents with custom text or image overlays.
* **Secure & Open:** 100% open-source and transparent.

## 🛠️ Technical Architecture
This project is built using the **MERN Stack** but utilizes powerful client-side libraries for document handling:

* **Frontend:** React.js & Tailwind CSS for a modern, responsive UI.
* **PDF Engine:** `pdf-lib` and `browser-image-compression` for local processing.
* **Backend:** Node.js/Express (used only for serving the app and static assets).
* **No Database Required:** Since we don't store your files, no database is used for document storage.


## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
