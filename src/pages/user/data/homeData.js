export const homeData = [
    {
        type: "text",
        text: [
            { id: 1, content: "Bienvenido a Groove", variant: "h1", className: "text-5xl font-extrabold text-center text-gray-900 mb-2" },
            { id: 2, content: "Tu tienda de música favorita", variant: "p", className: "text-xl text-center text-gray-500" }
        ]
    },
    {
        type: "image",
        src: "https://robbreport.com/wp-content/uploads/2022/09/378WE_MusicRoom.jpg",
        alt: "Banner Música",
        className: "w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg my-8"
    },
    {
        type: "text",
        text: [
            { id: 3, content: "Que encontrarás en nuestra web", variant: "h2", className: "text-3xl font-bold text-gray-800 border-b-4 border-groove-primary inline-block mb-6" }
        ]
    },
    {
        type: "cards",
        cards: [
            {
                card: [
                    { type: "image", src: "https://www.gearank.com/wp-content/uploads/files/field/image/electricguitars.png", alt: "Guitarras", className: "w-full h-48 object-cover rounded-lg mb-3" },
                    { type: "text", text: [{ id: 1, content: "Instrumentos", variant: "h3", className: "text-xl font-bold" }, { id: 2, content: "Encuentra tu mejor compañero de sonido.", variant: "p", className: "text-sm text-gray-500" }] }
                ]
            },
            {
                card: [
                    { type: "image", src: "https://www.concierto.cl/wp-content/uploads/2023/01/La-venta-de-vinilos-supera-a-la-cds-1024x576.jpg", alt: "Vinilos", className: "w-full h-48 object-cover rounded-lg mb-3" },
                    { type: "text", text: [{ id: 1, content: "Vinilos", variant: "h3", className: "text-xl font-bold" }, { id: 2, content: "Musica en alta calidad.", variant: "p", className: "text-sm text-gray-500" }] }
                ]
            },
            {
                card: [
                    { type: "image", src: "https://www.elderly.com/cdn/shop/collections/download_2_fe513eb1-d0ac-4d85-add9-290a61acc262.png?v=1688068053", alt: "Accesorios", className: "w-full h-48 object-cover rounded-lg mb-3" },
                    { type: "text", text: [{ id: 1, content: "Accesorios", variant: "h3", className: "text-xl font-bold" }, { id: 2, content: "Todo tipo de accesorios para tus instrumentos.", variant: "p", className: "text-sm text-gray-500" }] }
                ]
            }
        ]
    }
];