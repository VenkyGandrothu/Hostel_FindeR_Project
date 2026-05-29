import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import HostelTypes from "../components/HostelTypes";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="page-container">
        <Navbar />
        <Hero />
        <SearchBar />
        <HostelTypes />
        <Stats />
        <Services />
      </div>
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
