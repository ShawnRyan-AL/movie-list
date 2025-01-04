import React, {useState} from 'react';
import './SearchInput.scss';

function SearchInput({ onSearchClick }) {
  const [inputText, setInputText] = useState('');

  function inputTextHandler(event) {
    setInputText(event.target.value)
  }

  return (
    <div className='search-input'>
      <input className='search-input__input-field' onChange={inputTextHandler}/>
      <button className='search-input__search-button' onClick={() => onSearchClick(inputText)}>Search</button>
    </div >
  )
}

export default SearchInput;