'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './PictureSlider.module.css';

const PictureSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 (first real image)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Drag/swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0); // current drag offset in px
  const startXRef = useRef(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Control transition usage (also used for loop jump)
  const [disableTransition, setDisableTransition] = useState(false);

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

  // Auto-rotate timer (pause while dragging)
  useEffect(() => {
    if (!imagesLoaded || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesLoaded, isDragging, currentIndex]);

  // Handle infinite loop logic (jump without transition at the edges)
  useEffect(() => {
    if (currentIndex === 0) {
      // At clone of last image, jump to real last image without transition
      const jump = () => {
        setDisableTransition(true);
        setCurrentIndex(slideImages.length);
        // allow browser to apply style
        setTimeout(() => setDisableTransition(false), 10);
      };
      // give time for the previous transition to finish
      const t = setTimeout(jump, 400);
      return () => clearTimeout(t);
    } else if (currentIndex === slideImages.length + 1) {
      // At clone of first image, jump to real first image without transition
      const jump = () => {
        setDisableTransition(true);
        setCurrentIndex(1);
        setTimeout(() => setDisableTransition(false), 10);
      };
      const t = setTimeout(jump, 400);
      return () => clearTimeout(t);
    }
  }, [currentIndex, slideImages.length]);

  const goToPrevious = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((i) => i - 1);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToNext = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((i) => i + 1);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToSlide = (index) => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of the clone at the beginning
    setTimeout(() => setIsTransitioning(false), 400);
  };

// ----- Drag/Swipe handlers (pointer events) -----
const onPointerDown = (e) => {
  if (!imagesLoaded) return;

  // 🛑 Ignore drags that start on interactive UI (arrows, dots, links)
  const el = e.target;
  if (el.closest('button') || el.closest('a')) return;

  setIsDragging(true);
  setDisableTransition(true);
  const clientX =
    e.clientX ??
    (e.touches && e.touches[0]?.clientX) ??
    0;
  startXRef.current = clientX;

  // Capture pointer (best-effort)
  const container = containerRef.current;
  if (container && e.pointerId != null && container.setPointerCapture) {
    try { container.setPointerCapture(e.pointerId); } catch {}
  }
};

const onPointerMove = (e) => {
  if (!isDragging) return;
  const clientX =
    e.clientX ??
    (e.touches && e.touches[0]?.clientX) ??
    0;
  const delta = clientX - startXRef.current;
  setDragPx(delta);
};

const endDrag = () => {
  if (!isDragging) return;

  const width = containerRef.current?.offsetWidth || 1;
  const thresholdPx = Math.max(40, width * 0.15);

  if (Math.abs(dragPx) > thresholdPx) {
    setCurrentIndex((i) => (dragPx < 0 ? i + 1 : i - 1));
  }

  setIsDragging(false);
  setDisableTransition(false);
  setDragPx(0);
};


  // Convert drag px to percentage for the translateX calc
  const dragPercent = (() => {
    const width = containerRef.current?.offsetWidth || 1;
    return (dragPx / width) * 100;
  })();

  // Base % shift for current index (each slide = 100%)
  const basePercent = currentIndex * 100;

  if (slideImages.length === 0) {
    return <div className={styles.slider}>No images to display</div>;
  }

  return (
    <div className={styles.slider}>
      <div
        ref={containerRef}
        className={`${styles.imageContainer} ${isTransitioning ? styles.transitioning : ''} ${!imagesLoaded ? styles.loading : ''}`}
        // Pointer events for mouse/touch
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // Fallback touch events (older browsers)
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
      >
        <div
          ref={trackRef}
          className={styles.imageTrack}
          style={{
            // During drag, disable CSS transition; re-enable otherwise
            transition: disableTransition ? 'none' : undefined,
            transform: `translateX(calc(-${basePercent}% + ${dragPercent}%))`,
          }}
        >
          {extendedImages.map((image, index) => (
            <picture key={`extended-${index}`} className={styles.pictureWrapper}>
              <img
                src={image}
                alt={`Slide ${index}`}
                className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
                loading={index <= 2 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  imageRendering: 'high-quality',
                  WebkitImageSmoothing: 'high-quality',
                  MozImageSmoothing: 'high-quality',
                  msImageSmoothing: 'high-quality',
                  imageSmoothing: 'high-quality',
                  userSelect: 'none',
                  pointerEvents: 'none', // avoid image intercepting drags
                }}
                draggable={false}
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
          disabled={!imagesLoaded || isDragging}
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
          disabled={!imagesLoaded || isDragging}
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
