import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [videos, setVideos] = useState([1, 2, 3, 4, 5]);  // Start with 5 videos
  const containerRef = useRef(null);
  const scrollPosition = useRef(0);  // Track scroll position

  const videoHeight = 900; // Height of each video container (adjustable)
  const visibleCount = 3; // Number of videos to be visible on screen at once

  // Function to add new videos dynamically
  const addNewVideos = () => {
    setVideos(prevVideos => [
      ...prevVideos,
      prevVideos.length + 1,
      prevVideos.length + 2,
      prevVideos.length + 3
    ]);
  };

  // Scroll event handler for mouse wheel scroll
  const handleWheel = (event) => {
    // Update scroll position based on wheel scroll direction
    scrollPosition.current += event.deltaY;

    // Trigger smooth scrolling
    smoothScroll();
  };

  // Smooth scroll function
  const smoothScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const maxScroll = (videos.length * videoHeight) - window.innerHeight; // Maximum scroll position

    // Constrain scroll position between 0 and maxScroll
    const constrainedPosition = Math.max(0, Math.min(scrollPosition.current, maxScroll));

    // Apply the transform property with smooth scroll effect
    container.style.transform = `translateY(-${constrainedPosition}px)`;

    // Add new videos once the user scrolls down near the bottom
    if (constrainedPosition >= maxScroll - videoHeight * 2) {
      addNewVideos();
    }
  };

  // Attach wheel event listener and add more videos when user scrolls
  useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [videos]);

  // Get the visible range of videos
  const getVisibleVideos = () => {
    const startIndex = Math.max(0, Math.floor(scrollPosition.current / videoHeight) - 1); // Ensures no video above the first one
    const endIndex = startIndex + visibleCount + 2; // Load two more videos ahead

    // Return the slice of visible videos
    return videos.slice(startIndex, endIndex);
  };

  return (
    <div className="app">
      <div className="video-container-wrapper" ref={containerRef}>
        {getVisibleVideos().map((video, index) => (
          <div key={index} className="video-container">
            <video className="video" src={`https://www.w3schools.com/html/mov_bbb.mp4`} controls />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
