import axios from 'axios';

export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const response = await axios.get(BASE_URL, {
        params: {
            key: `53545737-19e7b42de62d4244a4b01f9cf`,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: PER_PAGE,
        },
    });

    return response.data;
}