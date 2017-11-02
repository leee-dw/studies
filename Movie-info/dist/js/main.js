$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

const getMovies = (searchText) => {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=64391ca210dbae0d44b0a622177ef8d3&vote_count.gte=100&query=' + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="card text-center">
              <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    })
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false
}


function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://api.themoviedb.org/3/movie/'+movieId+'?api_key=64391ca210dbae0d44b0a622177ef8d3')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w342${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.original_language}</li>
              <li class="list-group-item"><strong>Run Time:</strong> ${movie.runtime}min</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="card">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go back to search</a>
          </div>
        </div>
      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    })

}