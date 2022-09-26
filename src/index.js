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
  fetchImages();
}

function onMore() {
  newApiService.incrementPage();
  fetchImages();
}
onLoadMore.classList.add('is-hidden');

async function fetchImages() {
  const response = await newApiService.fetchArticles();
  const { hits, total } = response;

  if (!hits.length) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  renderGallery(hits);

  isShown += hits.length;

  if (isShown < total) {
    onLoadMore.classList.remove('is-hidden');
  }
  if (isShown >= total) {
    Notiflix.Notify.info(
      `We are sorry, but you have reached the end of search results.`
    );
  }
}

function renderGallery(elements) {
  const markup = elements
    .map(
      ({
        userImageURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
            <a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                    <img class="gallery__img" src="${userImageURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
            </a>
        `;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  const simpleLightBox = new SimpleLightbox('.gallery a');
}
