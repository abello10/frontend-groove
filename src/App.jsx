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
import Vista from './pages/admin/Vista';
import { useAuth } from './context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user || user.rol?.nombre?.toUpperCase() !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

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
        <Route path="/admin" element={<AdminRoute> <Vista /> </AdminRoute>} />
        <Route path="*" element={<div className="p-20 text-center">Página no encontrada :c </div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;