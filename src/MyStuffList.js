import React from 'react';
import MyStuff from './MyStuff';
import './MediaList.scss';
import { useOutletContext } from 'react-router-dom';

function MyStuffList() {
  const [mediaList, userListData] = useOutletContext();

  return (
    <ul className='media-list'>
      {userListData.map((myStuff) => (
        <MyStuff
          key={myStuff.id}
          title={myStuff.title}
          itemcount={myStuff.itemCount}
        />
      ))}
    </ul>
  );
}

export default MyStuffList;