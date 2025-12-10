import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        rolId: '' 
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, rolesRes] = await Promise.all([
                api.get('/usuarios'),
                api.get('/roles')
            ]);
            setUsuarios(usersRes.data);
            setRoles(rolesRes.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const usuarioBackend = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            contrasena: formData.contrasena,
            rol: { id: parseInt(formData.rolId) }
        };

        try {
            if (editMode) {
                usuarioBackend.id = formData.id;
                await api.put(`/usuarios/${formData.id}`, usuarioBackend);
                alert("Usuario actualizado");
            } else {
                await api.post('/usuarios', usuarioBackend);
                alert("Usuario creado");
            }
            closeModal();
            fetchData();
        } catch (error) {
            alert("Error al guardar: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return;
        try {
            await api.delete(`/usuarios/${id}`);
            fetchData();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    const openCreate = () => {
        setFormData({ id: null, nombre: '', apellido: '', correo: '', contrasena: '', rolId: '' });
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEdit = (user) => {
        setFormData({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            contrasena: '',
            rolId: user.rol?.id || ''
        });
        setEditMode(true);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (loading) return <div>Cargando usuarios...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
                <button onClick={openCreate} className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
                    + Nuevo Usuario
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map(u => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 text-sm text-gray-500">{u.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.nombre} {u.apellido}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{u.correo}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.rol?.nombre === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                        {u.rol?.nombre}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <button onClick={() => openEdit(u)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                    <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{editMode ? 'Editar Usuario' : 'Crear Usuario'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border p-2 rounded" />
                                <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className="border p-2 rounded" />
                            </div>
                            <input type="email" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required className="w-full border p-2 rounded" />
                            
                            <input 
                                type="password" 
                                name="contrasena" 
                                placeholder={editMode ? "Nueva contraseña (opcional)" : "Contraseña"} 
                                value={formData.contrasena} 
                                onChange={handleChange} 
                                required={!editMode}
                                className="w-full border p-2 rounded" 
                            />

                            <select name="rolId" value={formData.rolId} onChange={handleChange} required className="w-full border p-2 rounded bg-white">
                                <option value="">Selecciona Rol</option>
                                {roles.map(rol => (
                                    <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                                ))}
                            </select>

                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsuarios;