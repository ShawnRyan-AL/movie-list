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
    // console.log(requestTokenMatch);
    const approvalStatusMatch = currentUrl.match(/(?<=approved=)([a-z])*/g);
    // console.log(approvalStatusMatch);
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
    // console.log('requestToken: ' + requestToken);
    const requestBody = JSON.stringify({ request_token: requestToken })
    //  console.log('requestBody: ' + requestBody);
    const sessionIdResponse = await fetchUtil({
      fetchURL: TMDB_API_CONSTANTS.SESSION_ID_REQUEST,
      method: 'POST',
      body: requestBody,
    });

    // console.log('session id: ' + Object.keys(sessionIdResponse));
    // console.log('session id: ' + Object.values(sessionIdResponse));

    sessionStorage.setItem('session_id', sessionIdResponse.session_id)
    window.location.assign('http://localhost:3000/')
  }

  async function getUserId() {
    const fetchURL = TMDB_API_CONSTANTS.DETAILS;
    const userIdResponse = await fetchUtil({ fetchURL })
    // console.log(userIdResponse);
    setUserId(userIdResponse.id);
    // console.log(userId);
  }

  // console.log(requestToken);
  async function tokenRequestHandler() {
    const { request_token } = await fetchUtil({
      fetchURL: TMDB_API_CONSTANTS.TOKEN_REQUEST,
      method: 'GET',
    });
    // console.log('Request Token: ' + request_token);

    window.location.assign(
      TMDB_API_CONSTANTS.AUTHENTICATION_REQUEST +
      request_token +
      TMDB_API_CONSTANTS.AUTHENTICATION_REDIRECT_URL,
    );

    // console.log('state request token: ' + requestToken);
  }


  async function getUserListsHandler() {
    const fetchURL = TMDB_API_CONSTANTS.DISPLAY_LISTS + userId + '/lists'
    // console.dir(fetchURL);

    const displayListResponse = await fetchUtil({ fetchURL });
    // console.log('Display Lists: ' + JSON.stringify(displayListResponse));

    // console.log('session id: ' + Object.keys(displayListResponse.results[0]));
    // console.log('session id: ' + Object.values(displayListResponse.results[0]));

    const displayLists = displayListResponse.results.map(listData => {
      return {
        id: listData.id,
        title: listData.name,
        itemCount: listData.item_count,
      }
    });
    // console.log(displayLists)

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

  //  console.dir(mediaType);

  function onSearchClickHandler(text) {
    setInputText(text);
    // console.dir(text);
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
        // disabled={mediaType === MEDIA_TYPES.MOVIES}
        >
          Load Popular Movies
        </button>
        <button
          className='app__button'
          onClick={onPopularTVShowsClick}
        // disabled={mediaType === MEDIA_TYPES.TV_SHOWS}
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