'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import styles from './Timeline.module.css';


export default function Timeline({ items = [], heading = '' }) {
  const safeItems = Array.isArray(items) ? items : [];
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const [progress, setProgress] = useState(0);         // 0..1 center-synced
  const [secH, setSecH] = useState(0);                 // section height (px)
  const [milestones, setMilestones] = useState([]);    // [{rel, yPx}] per card

  // Center-synced progress (like snakepath)
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const sec = sectionRef.current;
      if (sec) {
        const r = sec.getBoundingClientRect();
        const topAbs = window.scrollY + r.top;
        const h = sec.offsetHeight || 1;
        const centerAbs = window.scrollY + window.innerHeight / 2;

        const raw = (centerAbs - topAbs) / h;
        const p = Math.max(0, Math.min(1, raw));
        setProgress(p);
        setSecH(h);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Measure card centers -> map to section progress + px for subjects/dots
  useEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const r = sec.getBoundingClientRect();
      const topAbs = window.scrollY + r.top;
      const h = sec.offsetHeight || 1;

      const ms = cardRefs.current.map((el) => {
        if (!el) return { rel: 0, yPx: 0 };
        const cr = el.getBoundingClientRect();
        const centerAbs = window.scrollY + cr.top + cr.height / 2;
        const rel = (centerAbs - topAbs) / h;               // 0..1
        const yPx = Math.max(0, Math.min(h, rel * h));      // px inside section
        return { rel, yPx };
      });

      setMilestones(ms);
      setSecH(h);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    cardRefs.current.forEach((el) => el && ro.observe(el));

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });

    // remeasure when images load
    const imgs = Array.from(sectionRef.current?.querySelectorAll('img') || []);
    const onImg = () => measure();
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', onImg);
        img.addEventListener('error', onImg);
      }
    });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
      imgs.forEach((img) => {
        img.removeEventListener('load', onImg);
        img.removeEventListener('error', onImg);
      });
    };
  }, [safeItems.length]);

  // Full-length fill height in px
  const fillPx = useMemo(() => {
    const h = Math.max(0, secH);
    const raw = Math.max(0, Math.min(h, progress * h));

    if (milestones.length > 0) {
      const lastY = milestones[milestones.length - 1].yPx;
      return Math.min(raw, lastY); // stop at last dot
    }
    return raw;
  }, [progress, secH, milestones]);


  // Current/active index (closest subject to progress)
  const activeIndex = useMemo(() => {
    if (!milestones.length) return 0;
    let best = 0, bestD = Infinity;
    milestones.forEach((m, i) => {
      const d = Math.abs(m.rel - progress);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }, [milestones, progress]);

  return (
    <section ref={sectionRef} className={styles.wrapper}>
      <div className={styles.inner}>
        {/* SUBJECTS (left) */}
        <div className={styles.titlesCol}>
          <div className={styles.titlesLayer}>
            {safeItems.map((it, i) => (
              <div
                key={i}
                className={`${styles.title} ${i === activeIndex ? styles.titleActive : ''}`}
                style={{ top: `${milestones[i]?.yPx ?? 0}px` }}
              >
                {it.title}
              </div>
            ))}
          </div>
        </div>

        {/* PATH (center) */}
        <div className={styles.pathCol}>
          <div className={styles.fullRail}>
            <div className={styles.fullLine} />
            <div className={styles.fullFill} style={{ height: `${fillPx}px` }} />
          </div>

          {/* Milestone dots light up once passed */}
          <div className={styles.milestoneLayer}>
            {milestones.map((m, i) => {
              const passed = progress >= m.rel - 0.0001;
              return (
                <div
                  key={i}
                  className={`${styles.milestoneDot} ${passed ? styles.milestoneDotVisible : ''}`}
                  style={{ top: `${m.yPx}px` }}
                  aria-hidden
                />
              );
            })}
          </div>
        </div>

        {/* CARDS (right) */}
        <div className={styles.rightCol}>
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}

          {safeItems.map((it, i) => (
            <article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
            >
              <div className={styles.mediaWrap}>
                <img src={it.image} alt={it.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
              </div>
            </article>
          ))}

          <div className={styles.afterSpacer} aria-hidden />
        </div>
      </div>
    </section>
  );
}
