import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Restaurant from './pages/Restaurant';
import Spa from './pages/Spa';
import Activities from './pages/Activities';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Offers from './pages/Offers';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phong-farmstay" element={<Rooms />} />
        <Route path="/phong-farmstay/:slug" element={<RoomDetail />} />
        <Route path="/nha-hang-bar" element={<Restaurant />} />
        <Route path="/herbal-spa" element={<Spa />} />
        <Route path="/hoat-dong" element={<Activities />} />
        <Route path="/tin-tuc" element={<Blog />} />
        <Route path="/tin-tuc/:slug" element={<BlogDetail />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/uu-dai" element={<Offers />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
