import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

function Carrito() {
    const { cart, removeFromCart, clearCart, total, addToCart, decreaseQuantity } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [isProcessing, setIsProcessing] = useState(false);
    
    const [envioSeleccionado, setEnvioSeleccionado] = useState("");
    const [pagoSeleccionado, setPagoSeleccionado] = useState("");

    const metodosEnvio = [
        { id: 1, nombre: "Delivery" },
        { id: 2, nombre: "Retiro en Tienda" }
    ];

    const metodosPago = [
        { id: 1, nombre: "Débito" },
        { id: 2, nombre: "Crédito" },
        { id: 3, nombre: "Transferencia Bancaria" }
    ];

    const handleCheckout = async () => {
        if (!user) {
            alert("Debes iniciar sesión para finalizar la compra.");
            navigate('/login');
            return;
        }

        if (!envioSeleccionado || !pagoSeleccionado) {
            alert("Por favor selecciona un método de envío y de pago.");
            return;
        }

        if (!window.confirm(`¿Confirmar compra por $${total.toLocaleString('es-CL')}?`)) return;

        setIsProcessing(true);

        try {
            const ventaParaBackend = {
                //fecha: new Date().toISOString(),   me tiró error al usarlo, asi que lo deje predeterminado asi sin usar :P
                estado: "EMITIDA",
                total: total,
                usuario: { id: user.id },
                
                metodoPago: { id: parseInt(pagoSeleccionado) },
                metodoEnvio: { id: parseInt(envioSeleccionado) },

                productos: cart.map(item => ({
                    cantidad: item.quantity,
                    producto: { id: item.id }
                }))
            };

            console.log("Enviando venta:", ventaParaBackend);

            await api.post('/ventas', ventaParaBackend);

            alert("¡Compra exitosa! Gracias por tu preferencia.");
            clearCart();
            navigate('/');

        } catch (error) {
            console.error("Error al comprar:", error);
            const msg = error.response?.data?.message || "Error al procesar la venta.";
            alert("Hubo un error: " + msg);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-400 mb-4">Tu carrito está vacío</h2>
                <Link to="/catalogo" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition">
                    Ir a comprar
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Carrito de Compras</h1>

                <div className="space-y-6 mb-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-4 gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img src={item.imagenes?.[0]?.url || "https://via.placeholder.com/100"} alt={item.nombre} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.nombre}</h3>
                                    <p className="text-xs text-gray-500 font-mono">${item.precio?.toLocaleString('es-CL')} c/u</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => decreaseQuantity(item.id)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-bold hover:bg-gray-300 flex items-center justify-center transition">-</button>
                                <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
                                <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-bold hover:bg-gray-300 flex items-center justify-center transition">+</button>
                            </div>

                            <div className="text-right min-w-[100px]">
                                <p className="font-bold text-sky-600 text-lg">${(item.precio * item.quantity).toLocaleString('es-CL')}</p>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:text-red-700 font-medium mt-1">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Método de envío</label>
                        <select 
                            value={envioSeleccionado}
                            onChange={(e) => setEnvioSeleccionado(e.target.value)}
                            className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Selecciona Envío...</option>
                            {metodosEnvio.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Método de pago</label>
                        <select 
                            value={pagoSeleccionado}
                            onChange={(e) => setPagoSeleccionado(e.target.value)}
                            className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Selecciona pago...</option>
                            {metodosPago.map(m => (
                                <option key={m.id} value={m.id}>{m.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                        Total a Pagar: <span className="text-sky-600">${total.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={clearCart} className="flex-1 md:flex-none text-gray-500 hover:text-red-500 font-medium px-4 py-2 border border-gray-300 rounded-lg hover:border-red-500 transition">
                            Vaciar
                        </button>
                        
                        <button 
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-bold text-white transition shadow-md transform hover:scale-105 
                                ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;