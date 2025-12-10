import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductos from '../../components/organisms/admin/AdminProductos';
import AdminUsuarios from '../../components/organisms/admin/AdminUsuarios';
import AdminVentas from '../../components/organisms/admin/AdminVentas';

function Vista() {
    const [activeTab, setActiveTab] = useState('productos');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-indigo-950 text-white flex-shrink-0 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-sky-500">Admin Panel</h2>
                </div>
                <nav className="mt-6">
                    <button 
                        onClick={() => setActiveTab('productos')}
                        className={`w-full text-left px-6 py-3 hover:bg-indigo-950 transition ${activeTab === 'productos' ? 'bg-gray-800 border-l-4 border-sky-500' : ''}`}
                    >
                        Productos
                    </button>
                    <button 
                        onClick={() => setActiveTab('usuarios')}
                        className={`w-full text-left px-6 py-3 hover:bg-indigo-950 transition ${activeTab === 'usuarios' ? 'bg-gray-800 border-l-4 border-sky-500' : ''}`}
                    >
                        Usuarios
                    </button>
                    <button 
                        onClick={() => setActiveTab('ventas')}
                        className={`w-full text-left px-6 py-3 hover:bg-indigo-950 transition ${activeTab === 'ventas' ? 'bg-gray-800 border-l-4 border-sky-500' : ''}`}
                    >
                        Historial Ventas
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full text-left px-6 py-3 hover:bg-red-900 transition mt-10 text-red-400"
                    >
                        Volver a la Tienda
                    </button>
                </nav>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'productos' && <AdminProductos />}
                
                {activeTab === 'usuarios' && (
                    <AdminUsuarios />
                )}

                {activeTab === 'ventas' && (
                    <AdminVentas />
                )}
            </main>
        </div>
    );
}

export default Vista;