import { useEffect, useId, useRef, useState } from "react";
import { getAllLocations, searchLocations } from "../api/hostelApi";

function CityBuildingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h2v4M13 21v-4h2v4M9 9h1M9 12h1M9 15h1M14 9h1M14 12h1M14 15h1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor"
      />
    </svg>
  );
}

function CityPicker({ isOpen, title, hostelType, onClose, onCitySelect }) {
  const titleId = useId();
  const searchInputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setCities([]);
      setLoadError("");
      return;
    }

    searchInputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const trimmed = query.trim();
    let cancelled = false;

    async function loadCities() {
      setIsLoading(true);
      setLoadError("");

      try {
        const results = trimmed
          ? await searchLocations(trimmed)
          : await getAllLocations();

        if (!cancelled) {
          setCities(Array.isArray(results) ? results : []);
        }
      } catch {
        if (!cancelled) {
          setCities([]);
          setLoadError(
            trimmed
              ? "Could not search cities. Please try again."
              : "Could not load cities. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    const timer = setTimeout(loadCities, trimmed ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isOpen, query]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleCityPick(city) {
    onCitySelect(city, hostelType);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      handleCityPick(trimmed);
    }
  }

  return (
    <div className="city-picker-overlay" onClick={onClose}>
      <div
        className="city-picker-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="city-picker-header">
          <div>
            <h2 id={titleId} className="city-picker-title">
              {title}
            </h2>
            <p className="city-picker-subtitle">Select a city or search below</p>
          </div>
          <button
            type="button"
            className="city-picker-close"
            onClick={onClose}
            aria-label="Close city picker"
          >
            ×
          </button>
        </header>

        <form className="city-picker-search" onSubmit={handleSearchSubmit}>
          <span className="city-picker-search-icon" aria-hidden="true">
            <LocationPinIcon />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city..."
            className="city-picker-search-input"
            aria-label="Search city"
          />
          {query.trim() && (
            <button type="submit" className="city-picker-search-btn">
              Search
            </button>
          )}
        </form>

        <div className="city-picker-body">
          {isLoading && (
            <p className="city-picker-message" role="status">
              {query.trim()
                ? `Searching for "${query.trim()}"...`
                : "Loading cities..."}
            </p>
          )}

          {!isLoading && loadError && (
            <p className="city-picker-message city-picker-message--error" role="alert">
              {loadError}
            </p>
          )}

          {!isLoading && !loadError && cities.length === 0 && (
            <p className="city-picker-message">
              {query.trim()
                ? `No cities found for "${query.trim()}". Press Search to try anyway.`
                : "No cities available yet."}
            </p>
          )}

          {!isLoading && !loadError && cities.length > 0 && (
            <ul className="city-picker-list" role="listbox" aria-label="Cities">
              {cities.map((city) => (
                <li key={city} role="presentation">
                  <button
                    type="button"
                    className="city-picker-item"
                    role="option"
                    onClick={() => handleCityPick(city)}
                  >
                    <span className="city-picker-item-icon" aria-hidden="true">
                      <CityBuildingIcon />
                    </span>
                    <span>{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CityPicker;
