import Image from 'next/image';
import './globals.css';
import RotatingWords from './components/RotatingWords';
import PictureSlider from './components/PictureSlider';
import Navbar from './components/Navbar';


export default function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <main className="main-content">
        <div className="text-section pt-28">
          <h1>
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