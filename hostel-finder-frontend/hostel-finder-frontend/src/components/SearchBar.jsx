import { useState } from "react";

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
        fill="#000000"
      />
    </svg>
  );
}

function SearchBar({ className, style }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    // Hook up search routing or API here
  };

  return (
    <div
      className={className}
      style={{
        width: "100%",
        background: "var(--surface-white, #ffffff)",
        borderRadius: "22px",
        padding: "10px 14px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
        ...style,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "52px",
          paddingLeft: "8px",
          paddingRight: "6px",
          gap: "14px",
          backgroundColor: "transparent",
          border: "none",
          margin: 0,
        }}
      >
        <LocationPinIcon />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Which City you want to stay?"
          aria-label="Which city do you want to stay in?"
          className="search-bar-input"
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "18px",
            fontFamily: "var(--font-main), 'Open Sans', sans-serif",
            fontWeight: 400,
            color: "#1A1A1A",
          }}
        />

        <button
          type="submit"
          style={{
            flexShrink: 0,
            height: "48px",
            paddingLeft: "32px",
            paddingRight: "32px",
            backgroundColor: "var(--search-btn, #FBC02D)",
            color: "#FFFFFF",
            fontSize: "18px",
            fontFamily: "var(--font-main), 'Open Sans', sans-serif",
            fontWeight: 600,
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Lets go
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
