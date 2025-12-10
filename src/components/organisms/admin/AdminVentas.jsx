import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

function AdminVentas() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await api.get('/ventas');
                setVentas(response.data);
            } catch (error) {
                console.error("Error cargando ventas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVentas();
    }, []);

    if (loading) return <div>Cargando historial...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Ventas</h2>

            {ventas.length === 0 ? (
                <p className="text-gray-500">No hay ventas registradas.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Venta</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                                        #{venta.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(venta.fecha).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {venta.usuario ? `${venta.usuario.nombre} ${venta.usuario.apellido}` : 'Usuario Eliminado'}
                                        <div className="text-xs text-gray-400">{venta.usuario?.correo}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                        ${venta.total?.toLocaleString('es-CL')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {venta.estado || 'COMPLETADO'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminVentas;