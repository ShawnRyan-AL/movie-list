import React, { useState } from 'react';
import { TMDB_API_CONSTANTS } from './tmdb-api-constants';
import './SearchInput.scss';

function SearchInput({ onSearchClick }) {
  const [inputText, setInputText] = useState('');

  function inputTextHandler(event) {
    setInputText(event.target.value);
  }

  async function onSearch() {
    try {
      const movieRes = await fetch(`${TMDB_API_CONSTANTS.SEARCH_MOVIES}&query=${inputText}`);
      const tvShowRes = await fetch(`${TMDB_API_CONSTANTS.SEARCH_TV_SHOWS}&query=${inputText}`);
      const movieData = await movieRes.json();
      const tvShowData = await tvShowRes.json();
      const allData = [...movieData.results, ...tvShowData.results]
      console.log(allData);
      const sortedMedia = allData.sort((a, b) => {
        // console.log('a: ', a.popularity)
        // console.log('b: ', b.popularity)
        return b.popularity - a.popularity;
      })
      console.log(' ratings: ', sortedMedia.map((media) => media.popularity))
      const searchedMedia = sortedMedia.map(mediaData => {
        return {
          id: mediaData.id,
          title: mediaData.original_title || mediaData.name,
          poster: `https://image.tmdb.org/t/p/original${mediaData.poster_path}`,
          description: mediaData.overview,
          releaseDate: mediaData.release_date || mediaData.first_air_date,
        }
      })
      onSearchClick(searchedMedia);
    } catch (error) { 
      console.error(error);
    }
  }

  return (
    <div className='search-input'>
      <input className='search-input__input-field' onChange={inputTextHandler} />
      <button className='search-input__search-button' onClick={onSearch}>Search</button>
    </div >
  )
}

export default SearchInput;