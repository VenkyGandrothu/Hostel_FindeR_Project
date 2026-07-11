import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchHostelsByLocation } from "../api/hostelApi";
import Footer from "../components/Footer";
import HostelCard from "../components/HostelCard";
import Navbar from "../components/Navbar";

const TYPE_OPTIONS = [
  { value: "", label: "All" },
  { value: "Mens", label: "Male" },
  { value: "Girls", label: "Female" },
  { value: "Co-living", label: "Co-living" },
];

const PRICE_PRESETS = [
  { label: "Any", min: "", max: "" },
  { label: "Under ₹6,000", min: "", max: "6000" },
  { label: "₹6,000 – ₹9,000", min: "6000", max: "9000" },
  { label: "₹9,000 – ₹12,000", min: "9000", max: "12000" },
  { label: "Above ₹12,000", min: "12000", max: "" },
];

function parseOptionalNumber(value) {
  if (value == null || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city")?.trim() ?? "";
  const type = searchParams.get("type")?.trim() ?? "";
  const minPrice = searchParams.get("minPrice")?.trim() ?? "";
  const maxPrice = searchParams.get("maxPrice")?.trim() ?? "";
  const beds = searchParams.get("beds")?.trim() ?? "";

  const [draftType, setDraftType] = useState(type);
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);
  const [draftBeds, setDraftBeds] = useState(beds);

  const [status, setStatus] = useState("loading");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Keep draft inputs in sync when URL changes (back/forward, links)
  useEffect(() => {
    setDraftType(type);
    setDraftMinPrice(minPrice);
    setDraftMaxPrice(maxPrice);
    setDraftBeds(beds);
  }, [type, minPrice, maxPrice, beds]);

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

      try {
        const data = await searchHostelsByLocation(city, {
          page: 0,
          size: 30,
          type: type || undefined,
          minPrice: parseOptionalNumber(minPrice),
          maxPrice: parseOptionalNumber(maxPrice),
          beds: parseOptionalNumber(beds),
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
  }, [city, type, minPrice, maxPrice, beds]);

  const hostels = result?.content ?? [];
  const total = result?.totalElements ?? 0;

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (type) count += 1;
    if (minPrice || maxPrice) count += 1;
    if (beds) count += 1;
    return count;
  }, [type, minPrice, maxPrice, beds]);

  function updateFilters(next) {
    const params = new URLSearchParams();
    if (city) params.set("city", city);

    const nextType = next.type ?? draftType;
    const nextMin = next.minPrice ?? draftMinPrice;
    const nextMax = next.maxPrice ?? draftMaxPrice;
    const nextBeds = next.beds ?? draftBeds;

    if (nextType) params.set("type", nextType);
    if (nextMin) params.set("minPrice", nextMin);
    if (nextMax) params.set("maxPrice", nextMax);
    if (nextBeds) params.set("beds", nextBeds);

    setSearchParams(params);
  }

  function applyDraftFilters(event) {
    event.preventDefault();
    updateFilters({
      type: draftType,
      minPrice: draftMinPrice,
      maxPrice: draftMaxPrice,
      beds: draftBeds,
    });
  }

  function clearFilters() {
    setDraftType("");
    setDraftMinPrice("");
    setDraftMaxPrice("");
    setDraftBeds("");
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    setSearchParams(params);
  }

  function selectType(value) {
    setDraftType(value);
    updateFilters({
      type: value,
      minPrice: draftMinPrice,
      maxPrice: draftMaxPrice,
      beds: draftBeds,
    });
  }

  function selectPricePreset(preset) {
    setDraftMinPrice(preset.min);
    setDraftMaxPrice(preset.max);
    updateFilters({
      type: draftType,
      minPrice: preset.min,
      maxPrice: preset.max,
      beds: draftBeds,
    });
  }

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

          {city && status !== "error" && (
            <div className="search-results-layout">
              <header className="search-results-toolbar">
                <div>
                  <h1 className="search-results-heading">Hostels in {city}</h1>
                  <p className="search-results-count">
                    {status === "loading"
                      ? "Searching..."
                      : `${total} hostel${total === 1 ? "" : "s"} found`}
                    {activeFilterCount > 0 ? ` · ${activeFilterCount} filter(s)` : ""}
                  </p>
                </div>
                <Link to="/" className="search-results-link search-results-link--inline">
                  Change city
                </Link>
              </header>

              <div className="search-filters" aria-label="Hostel filters">
                <form className="search-filters-form" onSubmit={applyDraftFilters}>
                  <div className="search-filters-top">
                    <h2>Filters</h2>
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        className="search-filters-clear"
                        onClick={clearFilters}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="search-filters-row">
                    <fieldset className="search-filter-group">
                      <legend>Hostel type</legend>
                      <div className="search-filter-chips">
                        {TYPE_OPTIONS.map((option) => (
                          <button
                            key={option.value || "all"}
                            type="button"
                            className={`search-filter-chip${
                              draftType === option.value ? " is-active" : ""
                            }`}
                            onClick={() => selectType(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="search-filter-group search-filter-group--budget">
                      <legend>Budget (₹ / month)</legend>
                      <div className="search-filter-chips">
                        {PRICE_PRESETS.map((preset) => {
                          const isActive =
                            draftMinPrice === preset.min &&
                            draftMaxPrice === preset.max;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              className={`search-filter-chip${
                                isActive ? " is-active" : ""
                              }`}
                              onClick={() => selectPricePreset(preset)}
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <fieldset className="search-filter-group search-filter-group--price">
                      <legend>Custom range</legend>
                      <div className="search-filter-price-inputs">
                        <label>
                          <span>Min</span>
                          <input
                            type="number"
                            min="500"
                            step="100"
                            placeholder="500"
                            value={draftMinPrice}
                            onChange={(event) => setDraftMinPrice(event.target.value)}
                          />
                        </label>
                        <label>
                          <span>Max</span>
                          <input
                            type="number"
                            min="500"
                            step="100"
                            placeholder="20000"
                            value={draftMaxPrice}
                            onChange={(event) => setDraftMaxPrice(event.target.value)}
                          />
                        </label>
                      </div>
                    </fieldset>

                    <fieldset className="search-filter-group search-filter-group--beds">
                      <legend>Min beds</legend>
                      <select
                        className="search-filter-select"
                        value={draftBeds}
                        onChange={(event) => setDraftBeds(event.target.value)}
                      >
                        <option value="">Any</option>
                        <option value="20">20+</option>
                        <option value="30">30+</option>
                        <option value="40">40+</option>
                        <option value="50">50+</option>
                      </select>
                    </fieldset>

                    <div className="search-filters-actions">
                      <button type="submit" className="search-filters-apply">
                        Apply filters
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="search-results-main">
                {status === "loading" && (
                  <div className="search-results-card search-results-card--inline">
                    <p className="search-results-status">Searching for {city}...</p>
                    <p className="search-results-text">
                      Looking for hostels that match your filters.
                    </p>
                  </div>
                )}

                {status === "success" && hostels.length === 0 && (
                  <div className="search-results-card search-results-card--inline">
                    <p className="search-results-empty">
                      No hostels match these filters in &ldquo;{city}&rdquo;.
                      Try clearing filters or choosing another budget.
                    </p>
                    <button
                      type="button"
                      className="search-filters-clear search-filters-clear--button"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {status === "success" && hostels.length > 0 && (
                  <ul className="hostel-results-list">
                    {hostels.map((hostel) => (
                      <li key={hostel.id} className="hostel-results-list-item">
                        <HostelCard hostel={hostel} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
