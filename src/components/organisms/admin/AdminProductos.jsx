import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { uploadToImgBB } from '../../../utils/uploadImage';

function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        tipoId: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, tiposRes] = await Promise.all([
                api.get('/productos'),
                api.get('/tipos')
            ]);
            setProductos(prodRes.data);
            setTipos(tiposRes.data);
        } catch (error) {
            console.error("Error cargando datos admin:", error);
            alert("Error cargando la lista de productos. Revisa la consola.");
        } finally {
            setLoading(false);
        }
    };

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
        console.log("🚀 INICIANDO SUBMIT...");

        if (!formData.tipoId) {
            alert("⚠️ Error: Debes seleccionar un TIPO de producto.");
            return;
        }
        if (!formData.precio || isNaN(parseFloat(formData.precio))) {
            alert("⚠️ Error: El PRECIO es inválido.");
            return;
        }

        let urlFinal = null;

        try {
            if (selectedFile) {
                console.log("📷 Subiendo imagen a ImgBB...");
                setIsUploading(true);
                urlFinal = await uploadToImgBB(selectedFile);
                setIsUploading(false);
                
                console.log("✅ Imagen subida, URL:", urlFinal);

                if (!urlFinal) {
                    alert("❌ Error: Falló la subida de imagen a ImgBB. Revisa tu API Key.");
                    return;
                }
            }

            const productoParaBackend = {
                nombre: formData.nombre,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                descripcion: formData.descripcion,
                tipo: { id: parseInt(formData.tipoId) },
                imagenes: urlFinal ? [{ url: urlFinal }] : []
            };

            console.log("📦 JSON a enviar al Backend:", productoParaBackend);

            if (editMode) {
                if (!urlFinal) delete productoParaBackend.imagenes;
                productoParaBackend.id = formData.id; 
                console.log(`📡 Enviando PUT a /productos/${formData.id}`);
                await api.put(`/productos/${formData.id}`, productoParaBackend);
                alert("✅ ¡Producto actualizado correctamente!");
            } else {
                console.log("📡 Enviando POST a /productos");
                await api.post('/productos', productoParaBackend);
                alert("✅ ¡Producto creado correctamente!");
            }
            
            closeModal();
            fetchData();

        } catch (error) {
            console.error("❌ ERROR FATAL EN EL PROCESO:", error);
            if (error.response) {
                console.error("Detalles del servidor:", error.response.data);
                alert(`Error del Servidor (${error.response.status}): ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Error de conexión: " + error.message);
            }
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
        try {
            await api.delete(`/productos/${id}`);
            alert("Producto eliminado.");
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar. Revisa la consola.");
        }
    };

    const openCreate = () => {
        setFormData({ id: null, nombre: '', precio: '', stock: '', descripcion: '', tipoId: '' });
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
        const currentImg = prod.imagenes?.[0]?.url;
        setImagePreview(currentImg || null);
        setSelectedFile(null);
        setEditMode(true);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    if (loading) return <div className="p-10 text-center">Cargando panel...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
                <button onClick={openCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Nuevo Producto
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Img</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productos.map(prod => (
                            <tr key={prod.id}>
                                <td className="px-6 py-4">
                                    <img src={prod.imagenes?.[0]?.url || "https://via.placeholder.com/50"} alt="" className="w-10 h-10 object-cover rounded"/>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prod.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${prod.precio}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.tipo?.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openEdit(prod)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                                    <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{editMode ? 'Editar Producto' : 'Crear Producto'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500"/>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-3 h-32 w-auto mx-auto object-contain rounded border" />
                                )}
                                {isUploading && <p className="text-sky-600 font-bold mt-2 animate-pulse">Subiendo imagen...</p>}
                            </div>

                            <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="w-full border p-2 rounded" />
                            
                            <div className="grid grid-cols-2 gap-2">
                                <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required className="w-full border p-2 rounded" />
                                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            
                            <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="w-full border p-2 rounded" />
                            
                            <select name="tipoId" value={formData.tipoId} onChange={handleChange} required className="w-full border p-2 rounded bg-white">
                                <option value="">Selecciona un Tipo</option>
                                {tipos.map(t => (
                                    <option key={t.id} value={t.id}>{t.nombre}</option>
                                ))}
                            </select>

                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                                <button 
                                    type="submit" 
                                    disabled={isUploading}
                                    className={`px-4 py-2 text-white rounded ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isUploading ? 'Procesando...' : 'Guardar'}
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