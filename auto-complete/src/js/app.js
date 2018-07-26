let url = 'https://api.themoviedb.org/3/movie/';
let key = '?api_key=64391ca210dbae0d44b0a622177ef8d3';
const gridBox = document.querySelector('.grid-box');


const getNowPlayingURL = (language, pages) => {
  return `${url}now_playing${key}&language=${language}&page=${pages}`
}


const tmpl = (data) => {
  return data.reduce((acc, crr) => acc += `
  <img src="https://image.tmdb.org/t/p/w300${crr.backdrop_path}"></img>
  `, '');
}


const load = (url, handler) => {
  return axios.get(url).then(response => {
    handler(response.data.results);
  });
}


const getData = (param) => {
  let movies = param.map(elem => !!elem.backdrop_path && elem);
  movies = movies.filter(Boolean);
  gridBox.insertAdjacentHTML('beforeend', tmpl(movies));

};



let idx = 1;
while (idx < 10) {
  load(getNowPlayingURL('ko', idx++), getData.bind(this));
}