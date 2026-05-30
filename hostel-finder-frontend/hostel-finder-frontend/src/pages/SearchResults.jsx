import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchHostelsByLocation } from "../api/hostelApi";
import Footer from "../components/Footer";
import HostelCard from "../components/HostelCard";
import Navbar from "../components/Navbar";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city")?.trim() ?? "";
  const type = searchParams.get("type")?.trim() ?? "";

  const [status, setStatus] = useState("loading");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) {
      setStatus("idle");
      setResult(null);
      setError("");
      return;
    }

    let cancelled = false;

    async function runSearch() {
      setStatus("loading");
      setError("");
      setResult(null);

      try {
        const data = await searchHostelsByLocation(city, {
          page: 0,
          size: 20,
          type: type || undefined,
        });
        if (!cancelled) {
          setResult(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong. Please try again.");
          setStatus("error");
        }
      }
    }

    runSearch();

    return () => {
      cancelled = true;
    };
  }, [city, type]);

  const hostels = result?.content ?? [];
  const total = result?.totalElements ?? 0;

  return (
    <>
      <div className="page-container">
        <Navbar />

        <section className="search-results-section" aria-live="polite">
          {!city && (
            <div className="search-results-card">
              <h1 className="search-results-title">Search for a city</h1>
              <p className="search-results-text">
                Enter a city on the home page to find hostels near you.
              </p>
              <Link to="/" className="search-results-link">
                Back to home
              </Link>
            </div>
          )}

          {city && status === "loading" && (
            <div className="search-results-card">
              <p className="search-results-status">Searching for {city}...</p>
              <p className="search-results-text">
                Looking for hostels in {city}. This may take a moment.
              </p>
            </div>
          )}

          {city && status === "error" && (
            <div className="search-results-card">
              <p className="search-results-status search-results-status--error">
                Search failed
              </p>
              <p className="search-results-text">{error}</p>
              <Link to="/" className="search-results-link">
                Try another city
              </Link>
            </div>
          )}

          {city && status === "success" && result && (
            <div className="search-results-page">
              {hostels.length === 0 ? (
                <div className="search-results-card">
                  <p className="search-results-empty">
                    No hostels found in &ldquo;{city}&rdquo;. Try another city
                    or check the spelling.
                  </p>
                  <Link to="/" className="search-results-link">
                    Search another city
                  </Link>
                </div>
              ) : (
                <ul className="hostel-results-list">
                  {hostels.map((hostel) => (
                    <li key={hostel.id} className="hostel-results-list-item">
                      <HostelCard hostel={hostel} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
