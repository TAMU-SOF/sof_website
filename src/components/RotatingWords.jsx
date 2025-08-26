'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './RotatingWords.module.css';

const words = ['integrity', 'humility', 'compassion', 'excellence'];

export default function RotatingWords({ heightEm = 1, className = '' }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    // Keep CSS height in sync (so baseline/line-height are correct)
    container.style.setProperty('--rw-h', `${heightEm}em`);

    const build = () => {
      // Measure the actual pixel height of one word/row
      const stepPx = container.getBoundingClientRect().height || 0;

      // Rebuild timeline whenever size changes
      if (tlRef.current) tlRef.current.kill();
      gsap.set(wrapper, { y: 0, force3D: true });

      const tl = gsap.timeline({ repeat: -1 });
      tl.to({}, { duration: 3 }); // hold first word

      for (let i = 1; i < words.length; i++) {
        tl.to(wrapper, { y: `-=${stepPx}`, duration: 0.8, ease: 'power2.inOut' })
          .to({}, { duration: 2.2 });
      }
      tl.to(wrapper, { y: `-=${stepPx}`, duration: 0.8, ease: 'power2.inOut' })
        .set(wrapper, { y: 0 });

      tlRef.current = tl;
    };

    // Build after fonts load so em → px is stable
    const ready = () => requestAnimationFrame(build);
    if (document.fonts?.ready) {
      document.fonts.ready.then(ready);
    } else {
      ready();
    }

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [heightEm]);

  return (
    <span
      ref={containerRef}
      className={`${styles.rotatingContainer} ${className}`}
      style={{ '--rw-h': `${heightEm}em` }}
    >
      {/* use spans to avoid <div> inside <p> */}
      <span ref={wrapperRef} className={styles.wrapper}>
        {words.map((w, i) => (
          <span key={i} className={styles.word}>{w}</span>
        ))}
        {/* clone for seamless loop */}
        <span className={styles.word}>{words[0]}</span>
      </span>
    </span>
  );
}
