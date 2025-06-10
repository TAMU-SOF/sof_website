import Image from 'next/image';
import './globals.css';

export default function HomePage() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Adrian JSM</div>
        <div className="nav-links">
          <a href="#">Work</a>
          <a href="#">Experience</a>
          <a href="#">Skills</a>
          <a href="#">Testimonials</a>
        </div>
        <button className="contact-button">Contact me</button>
      </nav>

      <main className="main-content">
        <div className="text-section">
          <h1>
            Shaping <span className="highlight">🎯</span> Designs <br />
            into Real Projects <br />
            that Deliver Results
          </h1>
          <p>
            Hi, I'm Adrian, a developer based in Croatia with a passion for code.
          </p>
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
