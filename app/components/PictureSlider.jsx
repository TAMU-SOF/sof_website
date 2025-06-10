'use client';

import { useState, useEffect } from 'react';
import styles from './PictureSlider.module.css';

const PictureSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Default images if none provided
  const defaultImages = [
    '/IMG_5893.JPG',
    '/IMG_1237.JPG',
    '/IMG_5893.JPG',
    '/IMG_1237.JPG',
    '/IMG_5893.JPG',
    '/IMG_1237.JPG',
  ];

  const slideImages = images.length > 0 ? images : defaultImages;

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slideImages.length, currentIndex]); // Reset interval when currentIndex changes

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex === 0 ? slideImages.length - 1 : currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex === slideImages.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  if (slideImages.length === 0) {
    return <div className={styles.slider}>No images to display</div>;
  }

  return (
    <div className={styles.slider}>
      <div className={`${styles.imageContainer} ${isTransitioning ? styles.transitioning : ''}`}>
        <div 
          className={styles.imageTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Slide ${index + 1}`}
              className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
        
        {/* Dots indicator - moved inside image container */}
        <div className={styles.dotsContainer}>
          {slideImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          ‹
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default PictureSlider;