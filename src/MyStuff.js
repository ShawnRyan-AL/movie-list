import React from 'react';
import "./Media.scss";
import { useNavigate } from 'react-router-dom';


const MyStuff = (props) => {
  const navigate = useNavigate();

  function onSelectHandler() {
    navigate('/media-list');
  }

  return (
    <li className='media'>
      <h2 className='media__h2'>{props.title}</h2>
      <h3>{props.itemcount}</h3>
      <button onClick={onSelectHandler}>Select</button>
    </li>
  );
};

export default MyStuff;