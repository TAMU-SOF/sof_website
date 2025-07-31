'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SnakeTimeline.module.css';

const SnakeTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const leftPathRef = useRef(null);
  const rightPathRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Timeline data with your content
  const timelineData = [
    {
      id: 1,
      title: 'Speaker Series',
      description: 'The SOF Speaker Series aims to provide members with valuable insights, inspiration, and knowledge from industry professionals and Texas A&M Alumni. These sessions help members understand the practical applications of finance principles, gain career advice, and learn about current trends and challenges in the finance industry. By facilitating direct interactions with experienced professionals, the Speaker Series enhances the educational experience and supports the professional development of SOF members.',
      image: '/speaker-series.jpg',
      side: 'left'
    },
    {
      id: 2,
      title: 'LDP',
      description: 'The Leadership Development Program (LDP) is an 8-week program designed to equip members with the principles and skills to be ethical and effective leaders. The program is rooted in the 12 principles and 4 SOF values: Integrity, Humility, Compassion, and Excellence. It aims to provide a comprehensive foundation for personal and professional growth, preparing members for leadership roles in the finance industry.',
      image: '/ldp.jpg',
      side: 'right'
    },
    {
      id: 3,
      title: 'Socials',
      description: 'SOF TAMU will host a few socials throughout the year. In the fall semester, look out for tailgates and crawfish boil in the spring. We also host other fun events every month!',
      image: '/socials.jpg',
      side: 'left'
    },
    {
      id: 4,
      title: 'Stock Pitch Comp',
      description: 'Every year, SOF and AIC host the annual TAMU stock pitch competition. Texas A&M students will be able to pitch a stock they researched to industry professionals for cash prizes.',
      image: '/stock-pitch.jpg',
      side: 'right'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const scrolled = window.scrollY - timelineRef.current.offsetTop + window.innerHeight * 0.5;
      const height = timelineRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, scrolled / height));
      
      setScrollProgress(progress);

      // Update both paths
      [leftPathRef, rightPathRef].forEach(pathRef => {
        if (pathRef.current) {
          const pathLength = pathRef.current.getTotalLength();
          pathRef.current.style.strokeDasharray = pathLength;
          pathRef.current.style.strokeDashoffset = pathLength * (1 - progress);
        }
      });

      // Check which items should be visible
      const items = timelineRef.current.querySelectorAll(`.${styles.timelineItem}`);
      const newVisibleItems = new Set();
      
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < window.innerHeight * 0.8) {
          newVisibleItems.add(index);
        }
      });
      
      setVisibleItems(newVisibleItems);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.timelineSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.gradientText}>What We Do</span>
        </h1>
        
        <div ref={timelineRef} className={styles.timeline}>
          {/* Left Path SVG */}
          <svg
            className={`${styles.pathSvg} ${styles.leftPath}`}
            viewBox="0 0 100 2000"
            preserveAspectRatio="none"
          >
            <path
              ref={leftPathRef}
              d="M 50 50 
                 C 50 350, 50 350, 50 650
                 C 50 950, 50 950, 50 1250
                 C 50 1550, 50 1550, 50 1850"
              fill="none"
              stroke="url(#leftGradient)"
              strokeWidth="4"
              className={styles.path}
            />
            <defs>
              <linearGradient id="leftGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7b2cbf" />
                <stop offset="33%" stopColor="#9d174d" />
                <stop offset="66%" stopColor="#500000" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
            </defs>
          </svg>

          {/* Right Path SVG */}
          <svg
            className={`${styles.pathSvg} ${styles.rightPath}`}
            viewBox="0 0 100 2000"
            preserveAspectRatio="none"
          >
            <path
              ref={rightPathRef}
              d="M 50 200 
                 C 50 500, 50 500, 50 800
                 C 50 1100, 50 1100, 50 1400
                 C 50 1700, 50 1700, 50 1950"
              fill="none"
              stroke="url(#rightGradient)"
              strokeWidth="4"
              className={styles.path}
            />
            <defs>
              <linearGradient id="rightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7b2cbf" />
                <stop offset="33%" stopColor="#9d174d" />
                <stop offset="66%" stopColor="#500000" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.timelineItem} ${styles[item.side]} ${
                visibleItems.has(index) ? styles.visible : ''
              }`}
              style={{
                top: `${(index / (timelineData.length - 1)) * 75}%`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={styles.card}>
                {/* Image */}
                <div className={styles.imageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={styles.image}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="${styles.imagePlaceholder}">
                          <span>${item.title}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>
                    {item.title}
                  </h3>
                  <p className={styles.description}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className={`${styles.node} ${styles[`${item.side}Node`]}`}>
                <div className={styles.nodeInner} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnakeTimeline;