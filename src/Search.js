import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import fetchUtil from './fetchUtil';
import { TMDB_API_CONSTANTS } from './tmdb-api-constants';
import MediaList from "./MediaList";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const { inputText } = useOutletContext();

  useEffect(() => {
    onSearch()
  },
    [inputText, page]
  );

  async function onSearch() {
    try {
      const movieRes = await fetchUtil({
        fetchURL: `${TMDB_API_CONSTANTS.SEARCH_MOVIES}`,
        requestParams: {
          query: inputText,
          page: page,
        },
        testParam: true,
      });
      // console.dir(movieRes);
      const tvShowRes = await fetchUtil({
        fetchURL: `${TMDB_API_CONSTANTS.SEARCH_TV_SHOWS}`,
        requestParams: {
          query: inputText,
          page: page,
        },
        testParam: true,
      });

      // const movieData = await movieRes.json();
      // const tvShowData = await tvShowRes.json();
      const allData = [...movieRes.results, ...tvShowRes.results]
      // console.log(allData);
      const sortedMedia = allData.sort((a, b) => {
        // console.log('a: ', a.popularity)
        // console.log('b: ', b.popularity)
        return b.popularity - a.popularity;
      })
      // console.log(' ratings: ', sortedMedia.map((media) => media.popularity))
      const searchedMedia = sortedMedia.map(mediaData => {
        return {
          id: mediaData.id,
          title: mediaData.original_title || mediaData.name,
          poster: `https://image.tmdb.org/t/p/original${mediaData.poster_path}`,
          description: mediaData.overview,
          releaseDate: mediaData.release_date || mediaData.first_air_date,
        }
      })
      setSearchResults(searchedMedia);
    } catch (error) {
      console.error(error);
    }
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
    // console.dir('check:' + pageNumber);
  }

  return (
    <div>
      <MediaList
        mediaList={searchResults}
        onPageChange={onPageChange}
        page={page}
      />
    </div>
  )

}