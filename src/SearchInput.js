import React, { useState } from 'react';
import { TMDB_API_CONSTANTS } from './tmdb-api-constants';

function SearchInput({ onSearchClick }) {
  const [inputText, setInputText] = useState('');

  function inputTextHandler(event) {
    setInputText(event.target.value);
  }

  async function onSearch() {
    try {
      const res = await fetch(`${TMDB_API_CONSTANTS.SEARCH_MOVIES}&query=${inputText}`);
      const data = await res.json();
      const searchedMedia = data.results.map(mediaData => {
        return {
          id: mediaData.id,
          title: mediaData.original_title,
          poster: `https://image.tmdb.org/t/p/original${mediaData.poster_path}`,
          description: mediaData.overview,
          releaseDate: mediaData.release_date,
        }
      })
      onSearchClick(searchedMedia);
      console.log(data.results);
    } catch (error) { }
  }

  return (
    <div>
      <input onChange={inputTextHandler} />
      <button onClick={onSearch}>Search</button>
    </div >
  )
}

export default SearchInput;