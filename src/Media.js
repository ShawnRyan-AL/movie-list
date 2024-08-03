import React, { useState } from 'react';
import "./Movie.scss";

const Media = (props) => {
  const [isViewingDescription, setIsViewingDescription] = useState(false);

  function openDescriptionHandler() {
    setIsViewingDescription(true);
  }

  function closeDescriptionHandler() {
    setIsViewingDescription(false);
  }

  return (
    <li>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <img className='movie__img' src={props.poster} />
      {
        isViewingDescription ?
          <button onClick={closeDescriptionHandler}>{props.description}</button> :
          <button onClick={openDescriptionHandler}>Expand Description</button>
      }
    </li>
  );
};

export default Media;