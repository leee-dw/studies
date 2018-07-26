const url = 'https://api.themoviedb.org/3/movie/';
const key = '?api_key=64391ca210dbae0d44b0a622177ef8d3';


const getNowPlayingURL = (language, page) => {
  return axios.get(`${url}now_playing${key}&language=${language}&page=${page}`);
}

const getDetailURL = (movieId, language) => {
  return axios.get(`${url + movieId + key}&language=${language}`);
}

const getTrailerURL = (movieId) => {
  return axios.get(`${url + movieId}/videos${key}`);
}


axios.all([getNowPlayingURL('ko', 1)]).then(axios.spread(response => {


  response.data.results.reduce((acc, crr) => {

    axios.all([getDetailURL(crr.id, 'ko'), getTrailerURL(crr.id)])


      .then(axios.spread((detail, trailer) => {

        console.log(detail.data, trailer.data.results[0].key);

        
      }));


  }, '')
}

))