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
    // console.log(mediaType);
    const fetchURL =
      mediaType === MEDIA_TYPES.MOVIES ?
        TMDB_API_CONSTANTS.POPULAR_MOVIES_LIST :
        TMDB_API_CONSTANTS.POPULAR_TV_SHOWS_LIST;
    // console.dir(fetchURL);
    const data = await fetchUtil({ fetchURL, requestParams: { page: page } });
    // setTotalPages(data.total_pages);
    // console.log(data);
    // const shortenedResults = data.results.slice(0, 10);
    // console.log(shortenedResults);
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
    // console.dir(reformattedMedia);
  }

  function onPageChange(pageNumber) {
    setPage(pageNumber);
    // console.dir('check:' + pageNumber);
  }

  return (
    <div>
      <Outlet context={{ mediaList, onPageChange, page }} />
    </div>
  )
}