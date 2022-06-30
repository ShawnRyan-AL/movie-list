import React from 'react';

const Movie = (props) => {
    return (
        <li>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.description}</p>
        </li>
    );
};

export default Movie;