'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './RotatingWords.module.css';

const words = ['integrity', 'humility', 'compassion', 'excellence'];

export default function RotatingWords() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    gsap.set(wrapper, { y: 0 });

    const tl = gsap.timeline({ repeat: -1 });
    const step = 1.3; // em

    // Hold on first word
    tl.to({}, { duration: 3 });

    // Slide through each word (except the clone) with pause
    for (let i = 1; i < words.length; i++) {
      tl.to(wrapper, {
        y: `-=${step}em`,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to({}, { duration: 2.2 });
    }

    // Slide to cloned first word then reset immediately
    tl.to(wrapper, {
      y: `-=${step}em`,
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to(wrapper, { y: 0, duration: 0 });

    return () => tl.kill();
  }, []);

  return (
    <span className={styles.rotatingContainer}>
      <div ref={wrapperRef} className={styles.wrapper}>
        {words.map((w, i) => (
          <span key={i} className={styles.word}>{w}</span>
        ))}
        {/* clone for seamless loop */}
        <span className={styles.word}>{words[0]}</span>
      </div>
    </span>
  );
}

//Add resources tab under timeline section:
// ⦁	training the street
// ⦁	Recurit/ interview prep/ networking
// ⦁	Sof podcast
// ⦁	Tech workshops