import axios from 'axios';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchArticles() {
    const BASE_URL = `https://pixabay.com/api/`;
    const KEY = `30150755-c61622b73d763821aed9d9577`;
    const url = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    return url.data;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
