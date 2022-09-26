import NewApiService from './new-Api-servis';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const newApiService = new NewApiService();

const serchForm = document.querySelector('.search-form');
const onLoadMore = document.querySelector('[data-action="js-load-more"]');
const galleryEl = document.querySelector('.gallery');

let isShown = 0;

serchForm.addEventListener('submit', onSerch);
onLoadMore.addEventListener('click', onMore);

function onSerch(e) {
  e.preventDefault();

  isShown = 0;
  galleryEl.innerHTML = '';

  newApiService.query = e.target.elements.searchQuery.value.trim();
  newApiService.resetPage();
  newApiService.fetchArticles();
}

function onMore() {
  newApiService.fetchArticles();
}
