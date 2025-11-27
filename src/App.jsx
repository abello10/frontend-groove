import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import Home from './pages/user/Home';
import Blog from './pages/user/Blog';
import Productos from './pages/user/Productos';
import Login from './pages/user/auth/Login';
import Registro from './pages/user/auth/Registro';
import Carrito from './pages/user/Carrito';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<div className="p-20 text-center">Página no encontrada :c </div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;