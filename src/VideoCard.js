import React from 'react';
import ReactPlayer from 'react-player';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <ReactPlayer
        url={video.url}  // Video URL
        width="100%"
        height="100%"
        playing={false}  // Set to true for autoplay
        controls={true}  // Display video controls (like play/pause)
      />
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
