import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

function Login() {
    const [form, setForm] = useState({ correo: '', contrasena: '' });
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post('/usuarios/login', form);
            
            login(response.data);
            
            if (response.data.rol.nombre === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (err) {
            console.error(err);
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-groove-dark">Iniciar Sesión</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input type="email" name="correo" required onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input type="password" name="contrasena" required onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition font-bold">
                        Entrar
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <Link to="/registro" className="text-sky-500 hover:underline">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;