'use client';

import './globals.css';
import RotatingWords from './components/RotatingWords';
import PictureSlider from './components/PictureSlider';
import Navbar from './components/Navbar';
import StatBoxSection from './components/StatBox';
import SnakeTimeline from './components/SnakeTimeline';

export default function HomePage() {
  return (
    <div className="container">
      <Navbar />

      <main className="main-content pt-32 md:pt-36">
        <div className="text-section">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed md:leading-[5rem]">
            Shaping <RotatingWords /> <br />
            in student leaders <br />
            across Texas A&M
          </h1>
        </div>
        <PictureSlider />
      </main>

      <StatBoxSection />
      <SnakeTimeline />
    </div>
  );
}
