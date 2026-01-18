## 🛡️ SafePdf — Privacy-First Client-Side PDF Tools

**SafePdf** is an open-source web application that allows you to manage and manipulate PDF files directly in your browser. Unlike traditional tools, **your files never leave your computer.** All processing happens locally using your browser's resources.

---

## 🔒 Why SafePDF?
Most online PDF editors require you to upload your sensitive documents to their cloud servers for processing. This creates a massive security risk.

100% Client-Side: We use WebAssembly and modern browser APIs to process your files locally on your own CPU/GPU.

Zero Data Collection: We do not track you, we do not require sign-ups, and we never see your data.

Open Source: Our code is public and auditable by anyone. Transparency is the foundation of trust.

PWA Ready: SafePDF is a Progressive Web App that works perfectly even if you lose your internet connection.

## 🛠️ Features
* **Merge PDF**: Combine multiple files into one professional document.

* **Split PDF**: Extract specific pages or divide one file into many.

* **Compress PDF**: Reduce file size while maintaining the highest possible quality.

* **Convert PDF**: High-fidelity conversion to and from Word, JPG, and more.

* **PDF Security**: Encrypt or unlock your documents with bank-grade security.

## 🚀 Tech Stack
SafePDF is built using a modern, high-performance stack:

* **Frontend**: React.js with Tailwind CSS for a sophisticated "Elite" UI.

* **Logic**: 100% JavaScript (Client-side).

* **Backend**: Node.js & Express (used only for routing and metadata, never for file processing).

* **Deployment**: Vercel.

## ⚙️ How to Run Locally
If you want to run your own instance of SafePDF on your machine:

* **Clone the repository**:

Bash

git clone https://github.com/Sujay1977/SafePdf.git
Install dependencies:

Bash

cd SafePdf/client && npm install
cd ../server && npm install
Start the development server:

Bash

# In the server folder
npm start
Open your browser: Visit http://localhost:5000.

## 🛡️ Security Audit
We encourage security researchers and users to audit our implementation. All PDF manipulation logic is contained within the client/src directory.

* **No API Uploads**: You can verify in your browser's "Network" tab that no document data is sent to our backend or any third-party server during processing.

* **Environment Variables**: All sensitive payment integration keys are stored securely using .env files and are never committed to this public repository.

## 🤝 Support the Project
If SafePDF helped you, please consider:

Starring this repository on GitHub.

Clicking the "Support Me" button on our website.

## 📄 License: 
Distributed under the MIT License. See LICENSE for more information.
