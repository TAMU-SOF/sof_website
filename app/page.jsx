import Image from 'next/image';
import './globals.css';
import RotatingWords from './components/RotatingWords';
import PictureSlider from './components/PictureSlider';
import Navbar from './components/Navbar';


export default function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <main className="main-content pt-28">
        <div className="text-section">
          <h1 className="text-5xl font-bold leading-[4rem]">
            Shaping <RotatingWords/> <br/>
            in student leaders <br/>
            across Texas A&M
          </h1>
        </div>
          <PictureSlider/>
        <div/>
      </main>
    </div>
  );
}