import React, { useState } from 'react';
import Media from './Media';
import './MediaList.scss';
import { useOutletContext } from 'react-router-dom';
import Paginator from './Paginator';

const MediaList = (props) => {
  const { mediaList, onPageChange, page } = useOutletContext();

  // console.dir('mediaList: ' + mediaList);
  // console.dir('something: ' + mediaList.map((item) => item.id))

  const mediaListToUse = props.mediaList || mediaList;
  const onPageChangeToUse = props.onPageChange || onPageChange;
  const pageToUse = props.page || page;

  return (
    <div>
      <ul className='media-list'>
        {mediaListToUse.map((media) => (
          <Media
            key={media.id}
            title={media.title}
            poster={media.poster}
            releaseDate={media.releaseDate}
            description={media.description}
          />
        ))}
      </ul>
      <Paginator
        onPageChange={onPageChangeToUse}
        currentPage={pageToUse}
      />
    </div>
  );
};

export default MediaList;