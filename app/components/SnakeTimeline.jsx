'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SnakeTimeline.module.css';

const SnakeTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Timeline data with your content
  const timelineData = [
    {
      id: 1,
      title: 'Speaker Series',
      description: 'The SOF Speaker Series aims to provide members with valuable insights, inspiration, and knowledge from industry professionals and Texas A&M Alumni. These sessions help members understand the practical applications of finance principles, gain career advice, and learn about current trends and challenges in the finance industry.',
      image: '/speaker-series.jpg',
      side: 'left'
    },
    {
      id: 2,
      title: 'LDP',
      description: 'The Leadership Development Program (LDP) is an 8-week program designed to equip members with the principles and skills to be ethical and effective leaders. The program is rooted in the 12 principles and 4 SOF values: Integrity, Humility, Compassion, and Excellence.',
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
      if (!timelineRef.current || !pathRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const componentHeight = rect.height;
      
      // Calculate scroll progress through the component
      const scrolled = -rect.top + windowHeight / 2;
      const totalScrollDistance = componentHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      
      setScrollProgress(progress);

      // Update path animation
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      
      // Set up the stroke dash
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength * (1 - progress);

      // Calculate active section
      const sectionProgress = progress * timelineData.length;
      const newActiveSection = Math.min(Math.floor(sectionProgress), timelineData.length - 1);
      setActiveSection(newActiveSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate the winding path
  const generatePath = () => {
    const startY = 10;
    const endY = 90;
    const leftX = 25;
    const rightX = 75;
    const centerX = 50;
    
    // Create a winding path that goes between sections
    const sectionHeight = (endY - startY) / (timelineData.length - 1);
    
    let pathData = `M ${centerX} ${startY}`;
    
    timelineData.forEach((item, index) => {
      const y = startY + (sectionHeight * index);
      const x = item.side === 'left' ? leftX : rightX;
      
      if (index === 0) {
        // First curve from center to first point
        pathData += ` Q ${centerX} ${y - 5}, ${x} ${y}`;
      } else {
        const prevItem = timelineData[index - 1];
        const prevX = prevItem.side === 'left' ? leftX : rightX;
        const midY = y - sectionHeight / 2;
        
        // Create S-curve between points
        if (prevX !== x) {
          // Crossing from one side to the other
          pathData += ` C ${prevX} ${midY - 10}, ${x} ${midY + 10}, ${x} ${y}`;
        } else {
          // Same side - slight curve
          pathData += ` Q ${x + (x === leftX ? -5 : 5)} ${midY}, ${x} ${y}`;
        }
      }
    });
    
    return pathData;
  };

  return (
    <div className={styles.timelineSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.gradientText}>What We Do</span>
        </h1>
        
        <div ref={timelineRef} className={styles.timeline}>
          {/* SVG Path */}
          <svg className={styles.timelineSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7b2cbf" />
                <stop offset="50%" stopColor="#9d174d" />
                <stop offset="100%" stopColor="#500000" />
              </linearGradient>
            </defs>
            
            {/* Background path */}
            <path
              d={generatePath()}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
              opacity="0.3"
            />
            
            {/* Animated path */}
            <path
              ref={pathRef}
              d={generatePath()}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Points at each section */}
            {timelineData.map((item, index) => {
              const y = 10 + ((90 - 10) / (timelineData.length - 1)) * index;
              const x = item.side === 'left' ? 25 : 75;
              const isActive = index <= activeSection;
              
              return (
                <g key={item.id}>
                  {/* Outer circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill={isActive ? "url(#pathGradient)" : "#e0e0e0"}
                    className={styles.timelinePoint}
                  />
                  {/* Inner circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="1"
                    fill="#fff"
                  />
                </g>
              );
            })}
          </svg>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.timelineItem} ${styles[item.side]} ${
                index <= activeSection ? styles.active : ''
              }`}
              style={{
                top: `${10 + ((90 - 10) / (timelineData.length - 1)) * index}%`
              }}
            >
              <div className={styles.content}>
                <div className={styles.imageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={styles.image}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="${styles.imagePlaceholder}">${item.title}</div>`;
                    }}
                  />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Progress Indicator */}
          <div className={styles.progressIndicator}>
            <div 
              className={styles.progressBar}
              style={{ transform: `scaleY(${scrollProgress})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeTimeline;