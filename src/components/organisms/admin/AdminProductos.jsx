import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { uploadToImgBB } from '../../../utils/uploadImage';

function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(""); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null, nombre: '', precio: '', stock: '', descripcion: '', tipoId: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, tiposRes, catRes] = await Promise.all([
                api.get('/productos'),
                api.get('/tipos'),
                api.get('/categorias')
            ]);
            setProductos(prodRes.data);
            setTipos(tiposRes.data);
            setCategorias(catRes.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const tiposFiltrados = categoriaSeleccionada 
        ? tipos.filter(t => t.categoria?.id === parseInt(categoriaSeleccionada))
        : [];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.tipoId) { alert("Selecciona un Tipo."); return; }

        let urlFinal = null;
        if (selectedFile) {
            setIsUploading(true);
            urlFinal = await uploadToImgBB(selectedFile);
            setIsUploading(false);
            if (!urlFinal) return;
        }
        
        const productoParaBackend = {
            nombre: formData.nombre,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock),
            descripcion: formData.descripcion,
            tipo: { id: parseInt(formData.tipoId) },
            imagenes: urlFinal ? [{ url: urlFinal }] : []
        };

        try {
            if (editMode) {
                if (!urlFinal) delete productoParaBackend.imagenes;
                productoParaBackend.id = formData.id; 
                await api.put(`/productos/${formData.id}`, productoParaBackend);
                alert("Producto actualizado");
            } else {
                await api.post('/productos', productoParaBackend);
                alert("Producto creado");
            }
            closeModal();
            fetchData();
        } catch (error) {
            alert("Error al guardar: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar?")) return;
        try { await api.delete(`/productos/${id}`); fetchData(); } catch (e) { alert("Error al eliminar"); }
    };

    const openCreate = () => {
        setFormData({ id: null, nombre: '', precio: '', stock: '', descripcion: '', tipoId: '' });
        setCategoriaSeleccionada("");
        setSelectedFile(null);
        setImagePreview(null);
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEdit = (prod) => {
        setFormData({
            id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            stock: prod.stock,
            descripcion: prod.descripcion,
            tipoId: prod.tipo?.id || ''
        });
        
        if (prod.tipo && prod.tipo.categoria) {
            setCategoriaSeleccionada(prod.tipo.categoria.id);
        } else {
            setCategoriaSeleccionada("");
        }

        const currentImg = prod.imagenes?.[0]?.url;
        setImagePreview(currentImg || null);
        setSelectedFile(null);
        setEditMode(true);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
                <button onClick={openCreate} className="bg-green-600 text-white px-4 py-2 rounded">+ Nuevo</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Img</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cat / Tipo</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productos.map(prod => (
                            <tr key={prod.id}>
                                <td className="px-6 py-4"><img src={prod.imagenes?.[0]?.url || "https://via.placeholder.com/50"} alt="" className="w-10 h-10 object-cover rounded"/></td>
                                <td className="px-6 py-4 font-medium">{prod.nombre}</td>
                                <td className="px-6 py-4">${prod.precio}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{prod.tipo?.categoria?.nombre} &gt; {prod.tipo?.nombre}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => openEdit(prod)} className="text-blue-600">Editar</button>
                                    <button onClick={() => handleDelete(prod.id)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{editMode ? 'Editar' : 'Crear'} Producto</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="w-full border p-2 rounded" />
                            
                            <div className="grid grid-cols-2 gap-2">
                                <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required className="w-full border p-2 rounded" />
                                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-gray-500">Categoría</label>
                                    <select 
                                        value={categoriaSeleccionada} 
                                        onChange={(e) => {
                                            setCategoriaSeleccionada(e.target.value);
                                            setFormData({...formData, tipoId: ''});
                                        }} 
                                        className="w-full border p-2 rounded bg-white"
                                    >
                                        <option value="">Selecciona...</option>
                                        {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500">Tipo</label>
                                    <select 
                                        name="tipoId" 
                                        value={formData.tipoId} 
                                        onChange={handleChange} 
                                        required 
                                        disabled={!categoriaSeleccionada}
                                        className="w-full border p-2 rounded bg-white disabled:bg-gray-100"
                                    >
                                        <option value="">{categoriaSeleccionada ? "Selecciona..." : "-"}</option>
                                        {tiposFiltrados.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                                    </select>
                                </div>
                            </div>

                            <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="w-full border p-2 rounded h-20" />

                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm"/>
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-auto mx-auto object-contain rounded" />}
                                {isUploading && <p className="text-sky-600 font-bold animate-pulse">Subiendo...</p>}
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                                <button type="submit" disabled={isUploading} className={`px-4 py-2 text-white rounded ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    {isUploading ? '...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProductos;