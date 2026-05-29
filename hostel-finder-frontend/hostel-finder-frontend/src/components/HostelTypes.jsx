const HOSTEL_TYPES = [
  {
    id: "boys",
    title: "Boys Hostel",
    description: "Safe and comfortable stays for male students.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "girls",
    title: "Girls Hostel",
    description: "Secure hostels designed for female students.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 21v-1a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "coed",
    title: "Co-ed Hostel",
    description: "Mixed accommodation with separate wings or floors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "pg",
    title: "PG",
    description: "Paying guest rooms with food and basic amenities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 10h18v11H3V10zM7 10V6h10v4M10 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function HostelTypes() {
  function handleTypeClick(typeId) {
    console.log("Selected hostel type:", typeId);
  }

  return (
    <section className="hostel-types-section" aria-labelledby="hostel-types-heading">
      <header className="hostel-types-header">
        <h2 id="hostel-types-heading" className="hostel-types-heading">
          Choose Your Type
        </h2>
        <p className="hostel-types-subheading">
          Pick the kind of stay that fits you best and explore matching hostels.
        </p>
      </header>

      <ul className="hostel-types-grid">
        {HOSTEL_TYPES.map((type) => (
          <li key={type.id}>
            <button
              type="button"
              className={`hostel-type-card hostel-type-card--${type.id}`}
              onClick={() => handleTypeClick(type.id)}
            >
              <div className="hostel-type-icon">{type.icon}</div>
              <h3 className="hostel-type-title">{type.title}</h3>
              <p className="hostel-type-desc">{type.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HostelTypes;
