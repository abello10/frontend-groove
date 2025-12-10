import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('groove_carrito');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error al leer el carrito:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('groove_carrito', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        
        const stockDisponible = product.stock !== undefined ? product.stock : 0;

        if (existingItem) {
            if (existingItem.quantity + 1 > stockDisponible) {
                alert(`Lo sentimos, solo quedan ${stockDisponible} unidades disponibles.`);
                return; 
            }
        } else {
            if (stockDisponible < 1) {
                alert("Este producto ya está agotado.");
                return; 
            }
        }

        setCart(prevCart => {
            const isItemInCart = prevCart.find(item => item.id === product.id);

            if (isItemInCart) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, item.quantity - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);

  
    const total = cart.reduce((sum, item) => sum + (Number(item.precio) * Number(item.quantity)), 0);
    const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            decreaseQuantity, 
            removeFromCart, 
            clearCart, 
            total, 
            totalItems 
        }}>
            {children}
        </CartContext.Provider>
    );
};