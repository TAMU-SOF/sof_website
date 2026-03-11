'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Timeline.module.css';

export default function Timeline({ items = [], heading = '' }) {
  const pathColRef = useRef(null);   // reference frame for all Y measurements
  const cardRefs  = useRef([]);

  // dots[i].yPx  = card-center Y, measured from pathCol top
  const [dots,       setDots]       = useState([]);
  const [railOffset, setRailOffset] = useState(0);  // top of rail  (= dots[0].yPx)
  const [railHeight, setRailHeight] = useState(0);  // total rail length
  const [fillHeight, setFillHeight] = useState(0);  // filled portion
  const [activeIdx,  setActiveIdx]  = useState(0);

  const safeItems = Array.isArray(items) ? items : [];

  /* ---------- measure card centres relative to pathCol ---------- */
  const measure = useCallback(() => {
    const pathCol = pathColRef.current;
    if (!pathCol) return;

    const pathTopAbs = window.scrollY + pathCol.getBoundingClientRect().top;

    const newDots = cardRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { yPx: window.scrollY + r.top + r.height / 2 - pathTopAbs };
    }).filter(Boolean);

    setDots(newDots);
    if (newDots.length >= 1) {
      setRailOffset(newDots[0].yPx);
      setRailHeight(newDots[newDots.length - 1].yPx - newDots[0].yPx);
    }
  }, []);

  /* ---------- update fill & active item on scroll ---------- */
  const handleScroll = useCallback(() => {
    const pathCol = pathColRef.current;
    if (!pathCol || dots.length === 0) return;

    const pathTopAbs    = window.scrollY + pathCol.getBoundingClientRect().top;
    const viewCenterAbs = window.scrollY + window.innerHeight / 2;
    const relCenter     = viewCenterAbs - pathTopAbs;

    const firstY = dots[0].yPx;
    const lastY  = dots[dots.length - 1].yPx;
    const clamped = Math.max(firstY, Math.min(lastY, relCenter));
    setFillHeight(Math.max(0, clamped - firstY));

    let best = 0, bestD = Infinity;
    dots.forEach((d, i) => {
      const dist = Math.abs(d.yPx - relCenter);
      if (dist < bestD) { bestD = dist; best = i; }
    });
    setActiveIdx(best);
  }, [dots]);

  /* ---------- attach measurement observers ---------- */
  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (pathColRef.current) ro.observe(pathColRef.current);
    cardRefs.current.forEach(el => el && ro.observe(el));

    // re-measure after images load (they change card heights)
    const imgs = cardRefs.current.flatMap(el =>
      el ? Array.from(el.querySelectorAll('img')) : []
    );
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', measure, { once: true });
    });

    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, safeItems.length]);

  /* ---------- attach scroll listener ---------- */
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className={styles.wrapper}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}

      <div className={styles.inner}>
        {/* ── LEFT: title labels ── */}
        <div className={styles.titlesCol}>
          {safeItems.map((item, i) => (
            <span
              key={i}
              className={`${styles.title} ${i === activeIdx ? styles.titleActive : ''}`}
              style={{ top: dots[i]?.yPx ?? 0 }}
            >
              {item.title}
            </span>
          ))}
        </div>

        {/* ── CENTRE: progress bar ── */}
        <div ref={pathColRef} className={styles.pathCol}>
          {/* grey background rail */}
          <div
            className={styles.rail}
            style={{ top: railOffset, height: railHeight }}
          />
          {/* maroon fill */}
          <div
            className={styles.fill}
            style={{ top: railOffset, height: fillHeight }}
          />
          {/* dots — one per card */}
          {dots.map((d, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i <= activeIdx ? styles.dotActive : ''}`}
              style={{ top: d.yPx }}
            />
          ))}
        </div>

        {/* ── RIGHT: cards ── */}
        <div className={styles.cardsCol}>
          {safeItems.map((item, i) => (
            <article
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className={styles.card}
            >
              {item.image && (
                <div className={styles.mediaWrap}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
              )}
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
