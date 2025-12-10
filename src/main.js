import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions.js';

const formElement = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.js-btn');

const PAGE_SIZE = 15;
let totalPages = 0;
let query = '';
let currentPage = 0;

// --- Пошук ---
formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    query = formData.get('search-text').trim();

    if (!query) {
        iziToast.error({
            message: 'Please enter a search query',
            position: 'topRight',
        });
        return;
    }

    showLoader();
    clearGallery();
    hideLoadMoreButton();
    currentPage = 1;

    try {
        const res = await getImagesByQuery(query, currentPage);
        const { hits, totalHits } = res;
        totalPages = Math.ceil(totalHits / PAGE_SIZE);

        if (hits.length === 0) {
            iziToast.error({
                message: 'No images found. Try another query.',
                position: 'topRight',
            });
            return;
        }

        createGallery(hits);
        checkBtnStatus();
    } catch (error) {
        iziToast.error({
            message: 'Request failed. Please try again.',
            position: 'topRight',
        });
        console.error(error);
    } finally {
        hideLoader();
        e.target.reset();
    }
});

// --- Load More ---
loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const res = await getImagesByQuery(query, currentPage);
        if (res.hits.length > 0) {
            createGallery(res.hits);
            checkBtnStatus();
            smoothScroll();
        }
    } catch (error) {
        iziToast.error({
            message: 'Failed to load more images. Please try again.',
            position: 'topRight',
        });
        console.error(error);
        if (currentPage < totalPages) showLoadMoreButton();
    } finally {
        hideLoader();
    }
});

// --- Плавне скролювання ---
function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-item');
    if (!galleryItem) return;
    const cardHeight = galleryItem.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

// --- Статус кнопки Load More ---
function checkBtnStatus() {
    if (currentPage < totalPages) {
        showLoadMoreButton();
    } else {
        hideLoadMoreButton();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results",
            position: 'topRight',
        });
    }
}