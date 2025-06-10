import Image from 'next/image';
import './globals.css';
import RotatingWords from './components/RotatingWords';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <main className="main-content">
        <div className="text-section">
          <h1>
            Shaping <RotatingWords/> <br/>
            in student leaders <br/>
            across Texas A&M
          </h1>
          <button className="cta-button">SEE MY WORK</button>
        </div>
          <Image
            src="/IMG_5893.JPG"
            alt="3D Office"
            width={600}
            height={400}
            className="office-image"
          />
        <div/>
      </main>
    </div>
  );
}
