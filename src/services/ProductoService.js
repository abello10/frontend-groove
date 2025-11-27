import axios from 'axios';

const BASE_URL = 'https://groove-api-saw4.onrender.com/api/v1/productos';

class ProductoService {
    async getAllProductos() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            return [];
        }
    }
}

export default new ProductoService();