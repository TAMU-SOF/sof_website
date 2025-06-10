'use client';
import { useState, useEffect } from 'react';
import styles from './RotatingWords.module.css';

const words = ['integrity', 'humility', 'compassion', 'excellence'];

export default function RotatingWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3000); // <--- this changes the time (2.5 sec rn)
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.rotatingContainer}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`${styles.word} ${i === index ? styles.visible : ''}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
