import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function KnowMore() {
  return (
    <>
      <Navbar />
      <main className="page-container know-more-page">
        <h1 className="know-more-title">Know More</h1>
        <p className="know-more-text">
          Learn how Hostel Finder helps you discover safe, affordable stays near
          colleges and workplaces across India.
        </p>
        <Link to="/" className="know-more-back-link">
          Back to Home
        </Link>
      </main>
    </>
  );
}

export default KnowMore;
