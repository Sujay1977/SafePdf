import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Merge from './pages/Merge';
import Split from './pages/Split';
import Compress from './pages/Compress';
import PDFToWord from './pages/PDFToWord';
import Protect from './pages/Protect';
import Unlock from './pages/Unlock';
import Rotate from './pages/Rotate';
import Organize from './pages/Organize';
import PDFToJPG from './pages/PDFToJPG';
import JPGToPDF from './pages/JPGToPDF';
import Sign from './pages/Sign';
import Edit from './pages/Edit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/merge" element={<Layout><Merge /></Layout>} />
                <Route path="/split" element={<Layout><Split /></Layout>} />
                <Route path="/compress" element={<Layout><Compress /></Layout>} />
                <Route path="/pdf-to-word" element={<Layout><PDFToWord /></Layout>} />
                <Route path="/protect" element={<Layout><Protect /></Layout>} />
                <Route path="/unlock" element={<Layout><Unlock /></Layout>} />
                <Route path="/rotate" element={<Layout><Rotate /></Layout>} />
                <Route path="/organize" element={<Layout><Organize /></Layout>} />
                <Route path="/pdf-to-jpg" element={<Layout><PDFToJPG /></Layout>} />
                <Route path="/jpg-to-pdf" element={<Layout><JPGToPDF /></Layout>} />
                <Route path="/sign" element={<Layout><Sign /></Layout>} />
                <Route path="/edit" element={<Layout><Edit /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
