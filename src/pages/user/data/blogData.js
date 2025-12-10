export const blogData = [
    {
        type: "text",
        text: [
            { 
                id: 1, 
                content: "Nuestro Blog", 
                variant: "h1", 
                className: "text-4xl font-bold text-center text-groove-dark mb-2" 
            },
            { 
                id: 2, 
                content: "Recopilación de distintos temas relacionados con Groove", 
                variant: "p", 
                className: "text-xl text-center text-gray-500 mb-10" 
            }
        ]
    },

    {
        type: "cards",
        cards: [
            {
                card: [
                    { 
                        type: "image", 
                        src: "https://media.istockphoto.com/id/1253252695/es/vector/firma-de-ne%C3%B3n-cyber-monday-sobre-un-fondo-oscuro.jpg?s=612x612&w=0&k=20&c=VDYFBIPFU2zLKqDmOlcK0YB4ViNpC-WnnKGFXXGQKw8=", 
                        alt: "Foto de Cyber Monday", 
                        className: "w-full h-56 object-cover rounded-lg mb-4" 
                    },
                    { 
                        type: "text", 
                        text: [
                            { id: 1, content: "Ofertas", variant: "span", className: "text-xs font-bold text-indigo-500 uppercase tracking-wide" },
                            { id: 2, content: "Se viene Cyber Monday en Groove", variant: "h3", className: "text-xl font-bold text-gray-900 mt-2 mb-2" },
                            { id: 3, content: "El siguiente 30 de febrero comenzaremos con la época de rebajas de nuestro sitio web, donde veras descuentos de hasta el 90% en productos seleccionados.", variant: "p", className: "text-gray-600 text-sm" }
                        ] 
                    }
                ]
            },
            {
                card: [
                    { 
                        type: "image", 
                        src: "https://yt3.googleusercontent.com/dccxrm2IjX5GBZXy7nAcciwkwrAIzOnlv0P9SASumsbduJFpA744ivXVbu3zm32OmoVPJJxN=s900-c-k-c0x00ffffff-no-rj", 
                        alt: "Imagen de 31 minutos", 
                        className: "w-full h-56 object-cover rounded-lg mb-4" 
                    },
                    { 
                        type: "text", 
                        text: [
                            { id: 1, content: "Patrocinio", variant: "span", className: "text-xs font-bold text-indigo-500 uppercase tracking-wide" },
                            { id: 2, content: "Somos patrocinadores de 31 minutos!", variant: "h3", className: "text-xl font-bold text-gray-900 mt-2 mb-2" },
                            { id: 3, content: "Logramos un acuerdo de palabara para ser los proveedores de instrumentos a los famosos artistas de 31 minutos", variant: "p", className: "text-gray-600 text-sm" }
                        ] 
                    }
                ]
            },
            {
                card: [
                    { 
                        type: "image", 
                        src: "https://i.ytimg.com/vi/PvOETWUy7WY/maxresdefault.jpg", 
                        alt: "Huevito rey tocando la guitarra", 
                        className: "w-full h-56 object-cover rounded-lg mb-4" 
                    },
                    { 
                        type: "text", 
                        text: [
                            { id: 1, content: "Tienda", variant: "span", className: "text-xs font-bold text-indigo-500 uppercase tracking-wide" },
                            { id: 2, content: "Proximamente Kit de inicio para tu banda", variant: "h3", className: "text-xl font-bold text-gray-900 mt-2 mb-2" },
                            { id: 3, content: "Estamos prontos de introducir nuestro kit inicial para principiantes que quieren dar un paso adelante en su sueño de ser estrellas mundiales.", variant: "p", className: "text-gray-600 text-sm" }
                        ] 
                    }
                ]
            }
        ]
    }
];