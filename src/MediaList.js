import React from 'react';
import Media from './Media';
import './MediaList.scss';
import { useOutletContext } from 'react-router-dom';

const MediaList = () => {
  const [mediaList] = useOutletContext();

  return (
    <ul className='media-list'>
      {mediaList.map((media) => (
        <Media
          key={media.id}
          title={media.title}
          poster={media.poster}
          releaseDate={media.releaseDate}
          description={media.description}
        />
      ))}
    </ul>
  );
};

export default MediaList;