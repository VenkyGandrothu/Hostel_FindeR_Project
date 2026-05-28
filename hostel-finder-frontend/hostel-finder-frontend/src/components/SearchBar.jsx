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
      className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="var(--text-primary)"
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
      className={`w-full rounded-[var(--radius-xl)] bg-[var(--surface-white)] px-3 py-2 shadow-[var(--shadow-floating)] sm:px-[14px] sm:py-[10px] ${className ?? ""}`}
      style={style}
    >
      <form
        onSubmit={handleSubmit}
        className="m-0 flex h-auto w-full items-center gap-3 border-none bg-transparent px-1 py-1 sm:h-[52px] sm:gap-[14px] sm:px-2 sm:py-0 sm:pr-[6px]"
      >
        <LocationPinIcon />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Which City you want to stay?"
          aria-label="Which city do you want to stay in?"
          autoComplete="off"
          spellCheck={false}
          className="search-bar-input min-w-0 flex-1 border-none bg-transparent text-base font-normal text-[var(--text-primary)] outline-none sm:text-lg"
          style={{ fontFamily: "var(--font-main)" }}
        />

        <button
          type="submit"
          className="secondary-btn inline-flex shrink-0 items-center justify-center whitespace-nowrap"
        >
          Lets go
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
