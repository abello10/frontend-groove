import React, { useState, useEffect } from 'react';
import ProductoService from '../../services/ProductoService';
import { useCart } from '../../context/CartContext';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await ProductoService.getAllProductos();
                setProductos(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 border-b-4 border-sky-500 inline-block pb-2">
                Catálogo de Productos
            </h1>

            {productos.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">No hay productos disponibles por el momento.</p>
                </div>
            ) : (
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productos.map((prod) => (
                        <div key={prod.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                            
                            <div className="h-56 overflow-hidden bg-gray-200 relative group">
                                <img 
                                    src={prod.imagenes?.[0]?.url || "https://via.placeholder.com/300?text=Sin+Imagen"} 
                                    alt={prod.nombre} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                                        {prod.nombre}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                        {prod.descripcion || "Sin descripción disponible."}
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-xl font-bold text-sky-600">
                                        ${prod.precio?.toLocaleString('es-CL')}
                                    </span>
                                    
                                    <button 
                                        onClick={() => {
                                            addToCart(prod);
                                            alert(`¡${prod.nombre} agregado al carrito!`);
                                        }}
                                        className="bg-gray-900 text-white p-2 rounded-full hover:bg-sky-500 transition-colors shadow-md transform active:scale-90"
                                        title="Agregar al carrito"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Productos;