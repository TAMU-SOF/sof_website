'use client';

import { forwardRef, useRef } from 'react';
import './Glow.css';

const Glow = forwardRef(function Glow({ children, index }, ref) {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty('--start', angle + 60);
  };

  return (
    <div
      ref={(el) => {
        cardRefs.current[index] = el;
        if (ref) ref(el);
      }}
      onMouseMove={handleMouseMove(index)}
      className="glow-card"
    >
      <div className="glow"></div>
      {children}
    </div>
  );
});

export default Glow;
