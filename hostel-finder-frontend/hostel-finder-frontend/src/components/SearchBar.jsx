import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchLocations } from "../api/hostelApi";

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
      width="22"
      height="22"
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

function SearchBar() {
  const navigate = useNavigate();
  const listboxId = useId();
  const comboboxRef = useRef(null);

  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchError, setSearchError] = useState("");

  const goToCitySearch = useCallback(
    (cityName) => {
      const trimmed = cityName.trim();
      if (!trimmed) return;

      setCity(trimmed);
      setIsDropdownOpen(false);
      navigate(`/search?city=${encodeURIComponent(trimmed)}`);
    },
    [navigate],
  );

  useEffect(() => {
    const query = city.trim();

    if (!query) {
      setSuggestions([]);
      setIsSearching(false);
      setSearchError("");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setIsDropdownOpen(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(query);
        setSuggestions(Array.isArray(results) ? results : []);
      } catch {
        setSuggestions([]);
        setSearchError("Could not search cities. Please try again.");
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!comboboxRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    goToCitySearch(city);
  };

  const trimmedCity = city.trim();
  const showDropdown = isDropdownOpen && trimmedCity.length > 0;

  return (
    <div className="search-bar">
      <form className="search-bar-card" onSubmit={handleSubmit}>
        <div className="search-bar-combobox" ref={comboboxRef}>
          <div className="search-bar-field">
            <span className="search-bar-icon" aria-hidden="true">
              <LocationPinIcon />
            </span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => city.trim() && setIsDropdownOpen(true)}
              placeholder="Which City you want to stay?"
              aria-label="Which city do you want to stay in?"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              aria-controls={showDropdown ? listboxId : undefined}
              autoComplete="off"
              spellCheck={false}
              className="search-bar-input"
              role="combobox"
            />
          </div>

          {showDropdown && (
            <ul
              id={listboxId}
              className="search-bar-dropdown"
              role="listbox"
              aria-label="City suggestions"
            >
              {isSearching && (
                <li className="search-bar-dropdown-message" role="status">
                  Searching for &ldquo;{city.trim()}&rdquo;...
                </li>
              )}

              {!isSearching && searchError && (
                <li className="search-bar-dropdown-message" role="alert">
                  {searchError}
                </li>
              )}

              {!isSearching &&
                !searchError &&
                suggestions.length === 0 && (
                  <li className="search-bar-dropdown-message">
                    No cities found for &ldquo;{city.trim()}&rdquo;
                  </li>
                )}

              {!isSearching &&
                suggestions.map((location) => (
                  <li key={location} role="presentation">
                    <button
                      type="button"
                      className="search-bar-dropdown-item"
                      role="option"
                      onClick={() => goToCitySearch(location)}
                    >
                      <span
                        className="search-bar-dropdown-icon"
                        aria-hidden="true"
                      >
                        <CityBuildingIcon />
                      </span>
                      <span className="search-bar-dropdown-city">{location}</span>
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="search-bar-btn"
          disabled={!city.trim() || isSearching}
        >
          Lets go
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
