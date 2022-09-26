import axios from 'axios';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchArticles() {
    const url = await axios.get(
      `https://pixabay.com/api/?key=30150755-c61622b73d763821aed9d9577&q=${this.searchQuery}&per_page=40&page=${this.page}`
    );
    return url.data;

    // fetch(url)
    //   .then(r => r.json())
    //   .then(() => {
    //     this.incrementPage();
    //   });
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
