import React, { useState } from 'react';
import MovieList from './MovieList';

function App () {
  const [movies, setMovies] = useState([]);

  function loadMoviesHandler() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=2aa3c6dc8b4575cb4b74b946ab3f376f')
      .then(res => res.json())
      .then((data) => {
        const reformattedMovies = data.results.map(movieData => {
          return {
            id: movieData.id,
            title: movieData.original_title,
            poster: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
            description: movieData.overview,
            releaseDate: movieData.release_date,
          }
        })
        setMovies(reformattedMovies);
        console.log(data);
      })
  }
  
  return (
    <React.Fragment>
      <section>
        <button onClick={loadMoviesHandler}>Load Popular Movies</button>
      </section>
      <section>
        <MovieList movies={movies}/>
      </section>
    </React.Fragment>
  )
}

export default App;