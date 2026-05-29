import { useEffect, useRef, useState } from "react";

const CITY_SEARCH_API =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const MIN_KEYWORD_LENGTH = 1;
const SEARCH_DEBOUNCE_MS = 350;

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function GpsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

function normalizeCities(payload) {
  const list = Array.isArray(payload)
    ? payload
    : payload?.cities ?? payload?.data ?? [];

  return list
    .map((item) => {
      if (typeof item === "string") {
        return { id: item, name: item };
      }
      if (item?.name) {
        return { id: String(item.id ?? item.name), name: item.name };
      }
      return null;
    })
    .filter(Boolean);
}

async function fetchCitySuggestions(keyword, signal) {
  const response = await fetch(`${CITY_SEARCH_API}/api/cities/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword }),
    signal,
  });

  if (!response.ok) {
    throw new Error("City search request failed");
  }

  const data = await response.json();
  return normalizeCities(data);
}

async function reverseGeocode(latitude, longitude) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not resolve location name");
  }

  const data = await response.json();
  const address = data.address ?? {};

  return (
    address.city ||
    address.town ||
    address.village ||
    address.suburb ||
    address.state_district ||
    data.display_name?.split(",")[0] ||
    "Near me"
  );
}

function SearchBar() {
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);
  const [coords, setCoords] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const abortRef = useRef(null);

  useEffect(() => {
    if (gpsActive) {
      setSuggestions([]);
      setShowDropdown(false);
      setHasSearched(false);
      return;
    }

    const keyword = location.trim();

    if (keyword.length < MIN_KEYWORD_LENGTH) {
      setSuggestions([]);
      setShowDropdown(false);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSearching(true);
      setShowDropdown(true);
      setHasSearched(false);

      try {
        const cities = await fetchCitySuggestions(keyword, controller.signal);
        setSuggestions(cities);
        setHasSearched(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
          setHasSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [location, gpsActive]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const query = location.trim();
    if (!query) return;

    setShowDropdown(false);

    if (gpsActive && coords) {
      console.log("Nearby search:", { query, ...coords });
      return;
    }

    console.log("Search:", query);
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      window.alert("Geolocation is not supported in this browser.");
      return;
    }

    setShowDropdown(false);
    setSuggestions([]);
    setHasSearched(false);
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        try {
          const placeName = await reverseGeocode(latitude, longitude);
          setLocation(placeName);
          setGpsActive(true);
          console.log("Nearby search:", {
            label: placeName,
            latitude,
            longitude,
          });
        } catch {
          setLocation("Near me");
          setGpsActive(true);
          console.log("Nearby search:", { latitude, longitude });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setGpsActive(false);
        setCoords(null);

        if (error.code === error.PERMISSION_DENIED) {
          window.alert("Allow location access to search hostels near you.");
          return;
        }

        window.alert("Unable to get your location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  }

  function handleInputChange(event) {
    setLocation(event.target.value);
    setGpsActive(false);
    setCoords(null);
  }

  function handleInputFocus() {
    const keyword = location.trim();
    if (keyword.length >= MIN_KEYWORD_LENGTH && (isSearching || hasSearched)) {
      setShowDropdown(true);
    }
  }

  function handleInputBlur() {
    window.setTimeout(() => setShowDropdown(false), 150);
  }

  function handleSelectCity(city) {
    setLocation(city.name);
    setSuggestions([]);
    setShowDropdown(false);
    setHasSearched(false);
    setGpsActive(false);
    setCoords(null);
  }

  const keyword = location.trim();
  const showResults =
    showDropdown && keyword.length >= MIN_KEYWORD_LENGTH && !gpsActive;

  return (
    <main className="search-bar" aria-label="Search hostels">
      <form className="search-bar-card" onSubmit={handleSubmit}>
        <div className="search-bar-combobox">
          <div className="search-bar-field">
            <span className="search-bar-icon">
              <LocationIcon />
            </span>
            <input
              type="text"
              value={location}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Enter city or area"
              className="search-bar-input"
              aria-label="Search location"
              aria-autocomplete="list"
              aria-expanded={showResults}
              aria-controls="city-suggestions-list"
            />
            <button
              type="button"
              className={`search-bar-gps-btn${gpsActive ? " is-active" : ""}`}
              onClick={handleUseMyLocation}
              disabled={isLocating}
              aria-label="Use my location to search nearby hostels"
              title="Search near my location"
            >
              <GpsIcon />
            </button>
          </div>

          {showResults && (
            <ul
              id="city-suggestions-list"
              className="search-bar-dropdown"
              role="listbox"
              aria-label="City suggestions"
            >
              {isSearching && (
                <li className="search-bar-dropdown-message" role="status">
                  Searching cities...
                </li>
              )}

              {!isSearching && hasSearched && suggestions.length === 0 && (
                <li className="search-bar-dropdown-message" role="status">
                  No city found
                </li>
              )}

              {!isSearching &&
                suggestions.map((city) => (
                  <li key={city.id} role="option">
                    <button
                      type="button"
                      className="search-bar-dropdown-item"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleSelectCity(city)}
                    >
                      <span className="search-bar-dropdown-icon">
                        <LocationIcon />
                      </span>
                      <span className="search-bar-dropdown-city">{city.name}</span>
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button type="submit" className="search-bar-btn">
          {gpsActive ? "Search nearby" : "Search"}
        </button>
      </form>
    </main>
  );
}

export default SearchBar;
