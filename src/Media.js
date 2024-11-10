import React from 'react';
import "./Media.scss";

const Media = (props) => {
  return (
    <li className='media'>
      <h2 className='media__h2'>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <img className='media__img' src={props.poster} />
      <details>
        <summary>Details</summary>
        <p className='media__details'>{props.description}</p>
      </details>
    </li>
  );
};

export default Media;