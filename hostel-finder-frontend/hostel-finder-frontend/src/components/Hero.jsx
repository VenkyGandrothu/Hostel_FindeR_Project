import heroImage from "../assets/hero/HeroImg.png";
import citiesImage from "../assets/hero/citie.png";

function Hero() {
  return (
    <section className="w-full hero-section">
      <div className="hero-image-wrapper">
        <img
          src={heroImage}
          alt=""
          className="hero-image"
          aria-hidden="true"
        />
        <div className="hero-overlay">
          <div className="hero-text">
            <h1 className="hero-title">Choose Your Perfect Hostel</h1>
            <p className="hero-subtitle">-find your home away from home.</p>
          </div>
          <img
            src={citiesImage}
            alt="Landmarks from cities across India"
            className="hero-cities"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
