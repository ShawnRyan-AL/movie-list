import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, Outlet } from 'react-router-dom';
import { TMDB_API_CONSTANTS, MEDIA_TYPES, POSTER_PATH } from './tmdb-api-constants';
import fetchUtil from './fetchUtil';


export default function Popular() {
  const { mediaType } = useOutletContext();
  const [mediaList, setMediaList] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    requestPopularList();
  },
    [mediaType, page])

  async function requestPopularList() {
    const fetchURL =
      mediaType === MEDIA_TYPES.MOVIES ?
        TMDB_API_CONSTANTS.POPULAR_MOVIES_LIST :
        TMDB_API_CONSTANTS.POPULAR_TV_SHOWS_LIST;

    const data = await fetchUtil({ fetchURL, requestParams: { page: page } });

    const reformattedMedia = data.results.map(mediaData => {
      return {
        id: mediaData.id,
        title: mediaData.original_title || mediaData.name,
        poster: POSTER_PATH + mediaData.poster_path,
        description: mediaData.overview,
        releaseDate: mediaData.release_date || mediaData.first_air_date,
      }
    })

    setMediaList(reformattedMedia);

    if (mediaType === MEDIA_TYPES.MOVIES) {
      navigate('/popular/movies')
    } else if (mediaType === MEDIA_TYPES.TV_SHOWS) {
      navigate('/popular/tv-shows')
    }
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
  }

  return (
    <div>
      <Outlet context={{ mediaList, onPageChange, page }} />
    </div>
  )
}