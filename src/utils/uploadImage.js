import Resizer from 'react-image-file-resizer';
import axios from 'axios';

const API_KEY = "45799c7bb10ca7ed1bef67cf136b2cec";

export const uploadToImgBB = async (file) => {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            800,
            'WEBP',
            100,
            0,
            async (uri) => {
                try {
                    const body = new FormData();
                    body.append('image', uri, 'upload.webp');

                    const response = await axios.post(
                        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
                        body
                    );

                    resolve(response.data.data.url); 
                } catch (error) {
                    console.error("Error subiendo imagen a ImgBB:", error);
                    resolve(null);
                }
            },
            'blob'
        );
    });
};