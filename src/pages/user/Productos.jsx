import React, { useState, useEffect } from 'react';
import Section from '../../components/templates/Section';
import ProductoService from '../../services/ProductoService';
import { adaptarProductos } from '../../utils/productoAdapter';

function Productos() {
    const [pageData, setPageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            setLoading(true);
            
            const productosBackend = await ProductoService.getAllProductos();

            if (!productosBackend || productosBackend.length === 0) {
                setPageData([
                    {
                        type: "text",
                        text: [
                            { id: 1, content: "Catálogo de productos", variant: "h1", className: "text-4xl font-bold text-center mb-4 text-gray-800" },
                            { id: 2, content: "No hay productos disponibles por el momento.", variant: "p", className: "text-center text-gray-500 text-lg" }
                        ]
                    }
                ]);
            } else {
                const dataVisual = adaptarProductos(productosBackend);
                setPageData(dataVisual);
            }

        } catch (err) {
            console.error("Error al cargar productos:", err);
            setError("Hubo un problema cargando el catálogo.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition"
                >
                    Recargar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <Section content={pageData} />
            </div>
        </div>
    );
}

export default Productos;