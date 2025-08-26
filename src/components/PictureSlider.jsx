'use client';

import { useState, useEffect } from 'react';
import styles from './PictureSlider.module.css';

const PictureSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 (first real image)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Default images if none provided
  const defaultImages = [
    '/LDP.jpg',
    '/RI1.jpg',
    '/RI2.jpg',
    '/RI3.jpg',
  ];

  const slideImages = images.length > 0 ? images : defaultImages;
  
  // Create extended array with clones for infinite effect
  const extendedImages = [
    slideImages[slideImages.length - 1], // Clone of last image at beginning
    ...slideImages,
    slideImages[0] // Clone of first image at end
  ];

  // Preload images for better quality
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slideImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, [slideImages]);

  // Auto-rotate timer with reset capability
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesLoaded, currentIndex]); // Reset timer when currentIndex changes

  // Handle infinite loop logic
  useEffect(() => {
    if (currentIndex === 0) {
      // At clone of last image, jump to real last image without transition
      setTimeout(() => {
        const track = document.querySelector(`.${styles.imageTrack}`);
        if (track) {
          track.classList.add(styles.noTransition);
          setCurrentIndex(slideImages.length);
          setTimeout(() => {
            track.classList.remove(styles.noTransition);
          }, 10);
        }
      }, 400);
    } else if (currentIndex === slideImages.length + 1) {
      // At clone of first image, jump to real first image without transition
      setTimeout(() => {
        const track = document.querySelector(`.${styles.imageTrack}`);
        if (track) {
          track.classList.add(styles.noTransition);
          setCurrentIndex(1);
          setTimeout(() => {
            track.classList.remove(styles.noTransition);
          }, 10);
        }
      }, 400);
    }
  }, [currentIndex, slideImages.length]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of the clone at the beginning
    setTimeout(() => setIsTransitioning(false), 400);
  };

  if (slideImages.length === 0) {
    return <div className={styles.slider}>No images to display</div>;
  }

  return (
    <div className={styles.slider}>
      <div className={`${styles.imageContainer} ${isTransitioning ? styles.transitioning : ''} ${!imagesLoaded ? styles.loading : ''}`}>
        <div 
          className={styles.imageTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedImages.map((image, index) => (
            <picture key={`extended-${index}`} className={styles.pictureWrapper}>
              <img 
                src={image} 
                alt={`Slide ${index}`}
                className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
                loading={index <= 2 ? "eager" : "lazy"} // Eager load first few images
                decoding="async"
                // Add high-quality attributes
                style={{
                  imageRendering: 'high-quality',
                  WebkitImageSmoothing: 'high-quality',
                  MozImageSmoothing: 'high-quality',
                  msImageSmoothing: 'high-quality',
                  imageSmoothing: 'high-quality'
                }}
              />
            </picture>
          ))}
        </div>
        
        {/* Loading indicator */}
        {!imagesLoaded && (
          <div className={styles.loadingIndicator}>
            <div className={styles.spinner}></div>
          </div>
        )}
        
        {/* Dots indicator */}
        <div className={styles.dotsContainer}>
          {slideImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${(currentIndex - 1) === index ? styles.activeDot : ''}`}
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
          disabled={!imagesLoaded}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goToNext}
          aria-label="Next image"
          disabled={!imagesLoaded}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PictureSlider;