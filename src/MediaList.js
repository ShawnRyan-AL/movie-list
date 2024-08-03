import React from 'react';
import Media from './Media';

const MediaList = (props) => { 
    return (
        <ul>
            {props.mediaList.map((media) => (
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