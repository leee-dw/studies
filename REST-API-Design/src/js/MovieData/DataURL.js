export class MovieData {

  constructor() {
    this.url = 'https://api.themoviedb.org/3/movie/';
    this.key = '?api_key=64391ca210dbae0d44b0a622177ef8d3';

  }

  getNowPlayingURL(language, page) {
    return axios.get(`${this.url}now_playing${this.key}&language=${language}&page=${page}`).then(response => {
      console.log(response.data)
    });;
  }

  getDetailURL(movieId, language) {
    return axios.get(`${this.url + movieId + this.key}&language=${language}`);
  }

  getTrailerURL(movieId) {
    return axios.get(`${this.url + movieId}/videos${this.key}`);
  }

}