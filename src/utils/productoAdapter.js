export const adaptarProductos = (productosBackend) => {
    
    if (!productosBackend || !Array.isArray(productosBackend)) return [];

    const tarjetas = productosBackend.map((producto) => {
        const imagenUrl = (producto.imagenes && producto.imagenes.length > 0) 
            ? producto.imagenes[0].url 
            : "https://via.placeholder.com/100";

        const nombreTipo = producto.tipo ? producto.tipo.nombre : "Producto General";

        return {
            card: [
                {
                    type: "image",
                    src: imagenUrl,
                    alt: producto.nombre,
                    className: "w-full h-64 object-cover rounded-t-lg mb-4"
                },
                {
                    type: "text",
                    text: [
                        { 
                            id: 1, 
                            content: producto.nombre, 
                            variant: "h3", 
                            className: "text-lg font-bold text-gray-900 leading-tight mb-1" 
                        },
                        { 
                            id: 2, 
                            content: nombreTipo,
                            variant: "span", 
                            className: "text-xs font-semibold text-gray-500 uppercase tracking-wide block" 
                        },
                        { 
                            id: 3, 
                            content: `$${producto.precio?.toLocaleString('es-CL')}`,
                            variant: "p", 
                            className: "text-2xl font-bold text-sky-600 mt-3" 
                        }
                    ]
                }
            ]
        };
    });

    return [
        {
            type: "text",
            text: [{ 
                id: 0, 
                content: "Nuestros Productos", 
                variant: "h2", 
                className: "text-3xl font-extrabold text-center mb-10 text-gray-800 border-b-4 border-sky-500 inline-block pb-2" 
            }]
        },
        { 
            type: "cards", 
            cards: tarjetas 
        }
    ];
};