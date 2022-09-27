import NewApiService from './new-Api-servis';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const newApiService = new NewApiService();

const serchForm = document.querySelector('.search-form');
const onLoadMore = document.querySelector('[data-action="js-load-more"]');
const galleryEl = document.querySelector('.gallery');

serchForm.addEventListener('submit', onSerch);
onLoadMore.addEventListener('click', onMore);
let isShown = 0;
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
let simpleLightBox = new SimpleLightbox('.gallery a');

function renderGallery(elements) {
  const markup = elements
    .map(
      ({
        webformatURL,
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
                    <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b><br>${likes}</br>
                            
                        </p>
                        <p class="info-item">
                            <b>Views</b><br>
                            ${views}</br>
                        </p>
                        <p class="info-item">
                            <b>Comments</b><br>
                            ${comments}</br>
                        </p>
                        <p class="info-item">
                            <b>Downloads</b><br>
                            ${downloads}</br>
                        </p>
                    </div>
                </div>
            </a>
        `;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
}
