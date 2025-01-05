import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TMDB_API_CONSTANTS, MEDIA_TYPES } from './tmdb-api-constants';
import fetchUtil from './fetchUtil';
import './App.scss';
import SearchInput from './SearchInput';


function App() {
  const [inputText, setInputText] = useState('');
  const [mediaType, setMediaType] = useState('')
  const [userId, setUserId] = useState('');
  const [userListData, setUserListData] = useState([]);
  const hasInitiallyRendered = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.search;
    const requestTokenMatch = currentUrl.match(/(?<=request_token=)([0-z])*/g);
    const approvalStatusMatch = currentUrl.match(/(?<=approved=)([a-z])*/g);
    const sessionStorageSessionId = sessionStorage.getItem('session_id')

    if (requestTokenMatch && approvalStatusMatch) {
      getSessionIdAndClearUrl(requestTokenMatch[0]);
    } else if (!!sessionStorageSessionId) {
      getUserId();
    }
  },
    []
  );

  useEffect(() => {
    if (hasInitiallyRendered.current) {
      navigate('/search')
    }
  },
    [inputText]
  );

  useEffect(() => {
    hasInitiallyRendered.current = true;
  },
    []
  );

  async function getSessionIdAndClearUrl(requestToken) {
    const requestBody = JSON.stringify({ request_token: requestToken })
    const sessionIdResponse = await fetchUtil({
      fetchURL: TMDB_API_CONSTANTS.SESSION_ID_REQUEST,
      method: 'POST',
      body: requestBody,
    });

    sessionStorage.setItem('session_id', sessionIdResponse.session_id)
    window.location.assign('http://localhost:3000/')
  }

  async function getUserId() {
    const fetchURL = TMDB_API_CONSTANTS.DETAILS;
    const userIdResponse = await fetchUtil({ fetchURL })
    setUserId(userIdResponse.id);
  }

  async function tokenRequestHandler() {
    const { request_token } = await fetchUtil({
      fetchURL: TMDB_API_CONSTANTS.TOKEN_REQUEST,
      method: 'GET',
    });

    window.location.assign(
      TMDB_API_CONSTANTS.AUTHENTICATION_REQUEST +
      request_token +
      TMDB_API_CONSTANTS.AUTHENTICATION_REDIRECT_URL,
    );
  }


  async function getUserListsHandler() {
    const fetchURL = TMDB_API_CONSTANTS.DISPLAY_LISTS + userId + '/lists'

    const displayListResponse = await fetchUtil({ fetchURL });

    const displayLists = displayListResponse.results.map(listData => {
      return {
        id: listData.id,
        title: listData.name,
        itemCount: listData.item_count,
      }
    });

    setUserListData(displayLists);

    navigate('/my-stuff-list');
  }

  function onPopularMovieClick() {
    setMediaType(MEDIA_TYPES.MOVIES);
    navigate('popular');
  }

  function onPopularTVShowsClick() {
    setMediaType(MEDIA_TYPES.TV_SHOWS);
    navigate('popular');
  }

  function onSearchClickHandler(text) {
    setInputText(text);
    navigate('/search');
  }

  return (
    <div>
      {
        !userId &&
        <button onClick={tokenRequestHandler}>Link Account</button>
      }
      <SearchInput onSearchClick={onSearchClickHandler} />
      <div className='app__buttons-container'>
        <button
          className='app__button'
          onClick={onPopularMovieClick}
        >
          Load Popular Movies
        </button>
        <button
          className='app__button'
          onClick={onPopularTVShowsClick}
        >
          Load Popular TV Shows
        </button>
        <button
          className='app__button'
          onClick={getUserListsHandler}
          disabled={!userId}
          title='Link a TMDB user account to access My Stuff'
        >
          My Stuff
        </button>
      </div>
      <Outlet context={{ mediaType, userListData, inputText }} />
    </div>
  )
}

export default App;