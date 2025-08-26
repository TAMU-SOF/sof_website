'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './StatBox.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Total AUM', value: 59140, prefix: '$' },
  { label: 'Holdings in Portfolio', value: 10 },
  { label: 'Days Since Inception', value: 235 },
];

function StatBox({ label, value, prefix = '', index }) {
  const boxRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          onEnter: () => {
            if (hasStarted.current) return;
            hasStarted.current = true;
            
            // GSAP animation for the counter
            gsap.to({ value: 0 }, {
              value: value,
              duration: 2,
              ease: "power2.out", // You can change this to "none" for linear, "power1.out" for gentler
              onUpdate: function () {
                const currentValue = this.targets()[0].value;

                // For Sharpe Ratio (with decimals), keep the decimal
                // For integers (like Holdings or Days), you might want to floor it
                if (label === 'Sharpe Ratio') {
                  setCount(currentValue.toFixed(2));
                } else {
                  setCount(Math.floor(currentValue));
                }
              }
            });
          },
        },
      }
    );
  }, [value]);

  // Calculate a negative delay so the 8s loop is offset evenly:
  const offset = (index * (5 / stats.length)).toFixed(2);
  const delay = `-${offset}s`;

  return (
    <div ref={boxRef} className={styles.statBox}>
      <div className={styles.statValue}>
        <span 
          className={styles.glowOutline}
          style={{ animationDelay: delay }}
        >
          {prefix}{count.toLocaleString()}
        </span>
        <span
          className={styles.glowText}
          style={{ animationDelay: delay }}
        >
          {prefix}{count.toLocaleString()}
        </span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function StatBoxSection() {
  return (
    <div className={styles.statContainer}>
      {stats.map((s, i) => (
        <StatBox
          key={i}
          index={i}
          label={s.label}
          value={s.value}
          prefix={s.prefix}
        />
      ))}
    </div>
  );
}