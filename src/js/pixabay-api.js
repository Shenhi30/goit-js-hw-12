import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
    const API_KEY = '53545737-19e7b42de62d4244a4b01f9cf';
    const BASE_URL = 'https://pixabay.com/api/';

    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    };

    try {
        const res = await axios.get(BASE_URL, { params });
        return res.data;
    } catch (error) {
        console.error('Помилка при запиті до Pixabay:', error);
        return { hits: [], totalHits: 0 };
    }
}


