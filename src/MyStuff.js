import React from 'react';
import "./Media.scss";

function MyStuff (props) {
  return (
    <li className='media'>
      <h2 className='media__h2'>{props.title}</h2>
      <h3>{props.itemcount}</h3>
      <button onClick={() => props.onListSelection(props.id)}>Select</button>
    </li>
  );
};

export default MyStuff;