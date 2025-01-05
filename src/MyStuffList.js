import React, { useState } from 'react';
import MyStuff from './MyStuff';
import './MediaList.scss';
import fetchUtil from './fetchUtil';
import { TMDB_API_CONSTANTS, POSTER_PATH } from './tmdb-api-constants';
import { useNavigate, Outlet, useOutletContext } from 'react-router-dom';

function MyStuffList() {
  const [listContents, setListContents] = useState({});
  const { userListData } = useOutletContext();
  const navigate = useNavigate();

  async function onListSelection(id) {
    const fetchURL = TMDB_API_CONSTANTS.LIST_CONTENTS + id;
    const listContentsResponse = await fetchUtil({ fetchURL });

    const alteredListContents = listContentsResponse.items.map((item) => {
      return {
        id: item.id,
        title: item.original_name || item.original_title,
        poster: POSTER_PATH + item.poster_path,
        releaseDate: item.first_air_date || item.release_date,
        description: item.overview,
      }
    })

    setListContents(alteredListContents);

    navigate('/my-stuff-list/list-contents');


  }

  return (
    <div>
      <ul className='media-list'>
        {userListData.map((myStuff) => (
          <MyStuff
            key={myStuff.id}
            id={myStuff.id}
            title={myStuff.title}
            itemcount={myStuff.itemCount}
            onListSelection={onListSelection}
          />
        ))}
      </ul>
      <Outlet context={{ mediaList: listContents }} />
    </div>
  );
}

export default MyStuffList;