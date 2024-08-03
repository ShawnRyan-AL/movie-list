import React, { useState } from 'react';
import MediaList from './MediaList';
import SearchInput from './SearchInput';
import { TMDB_API_CONSTANTS, MEDIA_TYPES } from './tmdb-api-constants';


function App() {
  const [media, setMedia] = useState([]);

  async function loadMediaListHandler(mediaListType) {
    const isMovieListMediaType = mediaListType === MEDIA_TYPES.POPULAR_MOVIES_LIST;

    const fetchURL =
      isMovieListMediaType ?
        TMDB_API_CONSTANTS.POPULAR_MOVIES_LIST :
        TMDB_API_CONSTANTS.POPULAR_TV_SHOWS_LIST;

    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      // .then(res => res.json())
      // .then((data) => {
        const shortenedResults = data.results.slice(0, 10);
        const reformattedMedia = shortenedResults.map(mediaData => {
          return {
            id: mediaData.id,
            title: isMovieListMediaType ? mediaData.original_title : mediaData.name,
            poster: `https://image.tmdb.org/t/p/original${mediaData.poster_path}`,
            description: mediaData.overview,
            releaseDate: isMovieListMediaType ? mediaData.release_date : mediaData.first_air_date,
          }
        })
        setMedia(reformattedMedia);
        console.log(shortenedResults);
      // })
    } catch (error) {

    }
  }

  function onSearchClick (searchedMedia) {
    setMedia(searchedMedia);
  }

  return (
    <React.Fragment>
      <SearchInput onSearchClick={onSearchClick}/>
      <section>
        <button
          onClick={() => loadMediaListHandler(MEDIA_TYPES.POPULAR_MOVIES_LIST)}
        >
          Load Popular Movies
        </button>
      </section>
      <section>
        <button
          onClick={() => loadMediaListHandler(MEDIA_TYPES.POPULAR_TV_SHOWS_LIST)}
        >
          Load Popular TV Shows
        </button>
      </section>
      <section>
        <MediaList mediaList={media} />
      </section>
    </React.Fragment>
  )
}

export default App;