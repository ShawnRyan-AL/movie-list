import React from 'react';
import "./Movie.scss";

const Media = (props) => {
    return (
        <li>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <img className='movie__img' src={props.poster}/>
            <p>{props.description}</p>
        </li>
    );
};

export default Media;