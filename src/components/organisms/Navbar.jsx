import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    const navigation = [
        { name: 'Menú Principal', href: '/' },
        { name: 'Productos', href: '/productos' },
        { name: 'Blog', href: '/blog' },
    ];

    const { totalItems } = useCart();

    return (
        <nav className="bg-sky-500 text-white shadow-lg sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-sky-100 transition">
                            GROOVE
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 
                                    ${isActive 
                                        ? 'text-white border-b-2 border-white pb-1'
                                        : 'text-sky-100 hover:text-white hover:bg-sky-600/20 px-3 py-2 rounded-md'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">

                        <div className="hidden md:flex items-center gap-4 mr-2">
                            {user ? (
                                <>
                                    <span className="text-sm font-semibold">Hola, {user.nombre}</span>
                                    
                                    {user.rol?.nombre?.toUpperCase() === 'ADMIN' && (
                                        <Link to="/admin" className="bg-white text-sky-600 px-3 py-1 rounded text-xs font-bold hover:bg-sky-50 transition">
                                            ADMIN
                                        </Link>
                                    )}

                                    <button 
                                        onClick={handleLogout}
                                        className="text-sm bg-sky-700 hover:bg-sky-800 px-3 py-1 rounded transition"
                                    >
                                        Salir
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm hover:text-sky-200 font-medium">
                                        Ingresar
                                    </Link>
                                    <Link to="/registro" className="text-sm bg-white text-sky-600 px-4 py-2 rounded-full font-bold hover:bg-sky-50 shadow-sm transition">
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>

                        <Link to="/carrito" className="relative p-2 text-sky-100 hover:text-white transition-colors border-l border-sky-400 pl-4">
                            <span className="sr-only">Ver carrito</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-sky-600 transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full">
                                {totalItems}
                            </span>
                        </Link>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-sky-100 hover:text-white hover:bg-sky-600 focus:outline-none"
                            >
                                <span className="sr-only">Abrir menú</span>
                                {isOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-sky-600">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium 
                                    ${isActive 
                                        ? 'bg-sky-700 text-white' 
                                        : 'text-sky-100 hover:text-white hover:bg-sky-500'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        <div className="border-t border-sky-400 mt-4 pt-4 pb-2">
                            {user ? (
                                <>
                                    <div className="px-3 mb-2 text-sky-200 text-sm font-semibold">
                                        Conectado como: <span className="text-white">{user.nombre}</span>
                                    </div>
                                    {user.rol?.nombre?.toUpperCase() === 'ADMIN' && (
                                        <Link to="/admin" className="bg-white text-sky-600 px-3 py-1 rounded text-xs font-bold hover:bg-sky-50 transition">
                                            ADMIN
                                        </Link>
                                    )}
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-red-200 hover:bg-sky-500 hover:text-white rounded-md"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-2 px-2">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-center bg-sky-700 text-white py-2 rounded-md hover:bg-sky-800">
                                        Ingresar
                                    </Link>
                                    <Link to="/registro" onClick={() => setIsOpen(false)} className="text-center bg-white text-sky-600 py-2 rounded-md font-bold hover:bg-gray-100">
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;