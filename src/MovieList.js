import React from 'react';
import Movie from './Movie';

const MovieList = (props) => { 
    return (
        <ul>
            {props.movies.map((movie) => (
                <Movie
                    key={movie.id}
                    title={movie.title}
                    poster={movie.poster}
                    releaseDate={movie.releaseDate}
                    description={movie.description}
                />
            ))}
        </ul>
    );
};

export default MovieList;