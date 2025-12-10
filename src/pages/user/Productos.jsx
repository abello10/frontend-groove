import React, { useState, useEffect, useEffectEvent } from 'react';
import ProductoService from '../../services/ProductoService';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const [filtroTipo, setFiltroTipo] = useState(null);
    const [ordenPrecio, setOrdenPrecio] = useState("");

    useEffect(() =>{
        const cargarTipos = async () => {
            try {
                const res = await api.get('/tipos');
                setTipos(res.data);
            } catch (err) {
                console.error("Error al cargas los tipos", err)
            }
        };
        cargarTipos();
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            try {
                let data = [];

                if (filtroTipo) {
                    const res = await api.get(`/productos/buscarPorTipo?tipo=${filtroTipo}`);
                    data = res.data;
                    if (ordenPrecio === 'asc') data.sort((a, b) => a.precio - b.precio);
                    if (ordenPrecio === 'desc') data.sort((a, b) => b.precio - a.precio);
                } 
                
                else if (ordenPrecio) {
                    const res = await api.get(`/productos/ordenar?orden=${ordenPrecio}`);
                    data = res.data;
                } 
                
                else {
                    const res = await api.get('/productos');
                    data = res.data;
                }

                setProductos(data || []);
            } catch (err) {
                console.error("Error cargando productos:", err);
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [filtroTipo, ordenPrecio]);

    const handleTipoChange = (id) => {
        if (filtroTipo === id) setFiltroTipo(null);
        else setFiltroTipo(id);
    };

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
            <div className="w-full text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-sky-500 inline-block pb-2">
                    Catálogo
                </h1>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                
                <aside className="w-full md:w-64 flex-shrink-0 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="font-bold text-gray-800 text-lg">Categoría</h3>
                            {filtroTipo && (
                                <button onClick={() => setFiltroTipo(null)} className="text-xs text-red-500 hover:underline">
                                    Limpiar
                                </button>
                            )}
                        </div>
                        <div className="space-y-2">
                            {tipos.map((tipo) => (
                                <label key={tipo.id} className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-50 p-1 rounded">
                                    <input 
                                        type="checkbox" 
                                        checked={filtroTipo === tipo.id}
                                        onChange={() => handleTipoChange(tipo.id)}
                                        className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                                    />
                                    <span className={`text-sm ${filtroTipo === tipo.id ? 'font-bold text-sky-600' : 'text-gray-600'}`}>
                                        {tipo.nombre}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">Precio</h3>
                        <select 
                            value={ordenPrecio}
                            onChange={(e) => setOrdenPrecio(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 bg-white text-sm"
                        >
                            <option value="">Destacados</option>
                            <option value="asc">Menor a Mayor</option>
                            <option value="desc">Mayor a Menor</option>
                        </select>
                    </div>
                </aside>

                <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-4">
                        Mostrando {productos.length} productos
                    </p>

                    {loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div></div>
                    ) : productos.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded border border-gray-100">
                            <p className="text-gray-500 text-xl">No hay productos con este filtro.</p>
                            <button onClick={() => setFiltroTipo(null)} className="text-sky-500 underline mt-2">Ver todos</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {productos.map((prod) => (
                                <div key={prod.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 group">
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        <img 
                                            src={prod.imagenes?.[0]?.url || "https://via.placeholder.com/100"} 
                                            alt={prod.nombre} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {prod.tipo?.nombre}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{prod.nombre}</h3>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{prod.descripcion}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <span className="text-xl font-bold text-sky-600">${prod.precio?.toLocaleString('es-CL')}</span>
                                            <button onClick={() => addToCart(prod)} className="bg-gray-900 text-white p-2 rounded-full hover:bg-sky-500 transition shadow">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Productos;