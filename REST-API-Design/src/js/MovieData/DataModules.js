export class MovieData {

  constructor() {
    this.url = 'https://api.themoviedb.org/3/movie/';
    this.key = '?api_key=64391ca210dbae0d44b0a622177ef8d3';
  }
  
  getNowPlayingURL(language, page) {
    return `${this.url}now_playing${this.key}&language=${language}&page=${page}`
  }

  getDetailURL(movieId, language) {
    return `${this.url + movieId + this.key}&language=${language}`
  }

  getTrailerURL(movieId, language) {
    return `${this.url + movieId}/videos${this.key}&language=${language}`;
  }
}