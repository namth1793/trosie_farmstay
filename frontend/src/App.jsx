import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Coffee from './pages/Coffee';
import CoffeeShop from './pages/CoffeeShop';
import ProductDetail from './pages/ProductDetail';
import LuuTru from './pages/LuuTru';
import Restaurant from './pages/Restaurant';
import SUP from './pages/SUP';
import RoseGarden from './pages/RoseGarden';
import Activities from './pages/Activities';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <LangProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/ca-phe" element={<Coffee />} />
        <Route path="/ca-phe/shop" element={<CoffeeShop />} />
        <Route path="/ca-phe/shop/:slug" element={<ProductDetail />} />
        <Route path="/luu-tru" element={<LuuTru />} />
        <Route path="/nha-hang" element={<Restaurant />} />
        <Route path="/cheo-sup" element={<SUP />} />
        <Route path="/vuon-hoa-hong" element={<RoseGarden />} />
        <Route path="/hoat-dong" element={<Activities />} />
        <Route path="/tin-tuc" element={<Blog />} />
        <Route path="/tin-tuc/:slug" element={<BlogDetail />} />
        <Route path="/lien-he" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </LangProvider>
  );
}
