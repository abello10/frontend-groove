import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../../services/api';

function Registro() {
    const [form, setForm] = useState({ 
        nombre: '', apellido: '', correo: '', contrasena: '', 
        rol: { id: 2 }
    });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.correo.trim() || !form.correo.includes('@')||!form.correo.trim()||!form.correo.includes('.')||!form.correo.trim()) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return; 
        }

        if (form.contrasena.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return; 
        }
        

        try {
            await api.post('/usuarios', form);
            alert("Cuenta creada con exito");
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Error al registrarse");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-groove-dark">Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="nombre" placeholder="Nombre" required onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                        <input type="text" name="apellido" placeholder="Apellido" required onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                    </div>
                    <input type="email" name="correo" placeholder="Correo" required onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                    <input type="password" name="contrasena" placeholder="Contraseña" required onChange={handleChange} className="px-4 py-2 border rounded-lg w-full" />
                    
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-bold">
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-sky-500 hover:underline">Ingresa aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default Registro;