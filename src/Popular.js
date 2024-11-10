import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { TMDB_API_CONSTANTS, MEDIA_TYPES } from './tmdb-api-constants';
import fetchUtil from './fetchUtil';



export default function Popular() {
  const [mediaList, setMediaList] = useState();
  const [mediaType] = useOutletContext();
  const navigate = useNavigate();


  useEffect(() => {
    HelperFunction();
  },
    [])

  async function HelperFunction() {
    // console.log(mediaType);
    const fetchURL =
      mediaType ?
        TMDB_API_CONSTANTS.POPULAR_MOVIES_LIST :
        TMDB_API_CONSTANTS.POPULAR_TV_SHOWS_LIST;

    const data = await fetchUtil({ fetchURL });
    // console.log(data);
    const shortenedResults = data.results.slice(0, 10);
    // console.log(shortenedResults);
    const reformattedMedia = shortenedResults.map(mediaData => {
      return {
        id: mediaData.id,
        title: mediaData.original_title || mediaData.name,
        poster: `https://image.tmdb.org/t/p/original${mediaData.poster_path}`,
        description: mediaData.overview,
        releaseDate: mediaData.release_date || mediaData.first_air_date,
      }
    })

    if (mediaType === MEDIA_TYPES.POPULAR_MOVIES_LIST) {
      navigate('/popular/movies')
    }
    // console.log(reformattedMedia);
  }


  return (
    <div>
      <h2>'asdf'</h2>
    </div>
  )
}