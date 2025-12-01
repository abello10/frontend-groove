import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Carrito() {
    const { cart, removeFromCart, clearCart, total } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            alert("Debes iniciar sesión para finalizar la compra.");
            navigate('/login');
            return;
        }

        alert(`Compra realizada con exito. Usuario: ${user.nombre}. Total: $${total}`);
        clearCart();
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-400 mb-4">Tu carrito está vacío 🛒</h2>
                <Link to="/productos" className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition">
                    Ir a comprar
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Carrito de Compras</h1>

                <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-4">
                                <img src={item.imagenes?.[0]?.url || "https://placehold.co/400x400?text=Groove"} alt={item.nombre} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.nombre}</h3>
                                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sky-600">${(item.precio * item.quantity).toLocaleString('es-CL')}</p>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 text-xs hover:underline mt-1"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg">
                    <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                        Total: <span className="text-sky-600">${total.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={clearCart} className="text-gray-500 hover:text-red-500 font-medium px-4 py-2">
                            Vaciar
                        </button>
                        <button 
                            onClick={handleCheckout}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md transform hover:scale-105"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carrito;