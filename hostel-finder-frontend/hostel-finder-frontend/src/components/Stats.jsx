const STATS = [
  {
    id: "cities",
    value: "20+",
    label: "Cities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "hostels",
    value: "50+",
    label: "Hostels",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 10h18v11H3V10zM7 10V6h10v4M10 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "users",
    value: "100+",
    label: "Users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "clients",
    value: "30+",
    label: "Clients",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 21v-1a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Stats() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <header className="stats-header">
        <h2 id="stats-heading" className="stats-heading">
          Our Impact in Numbers
        </h2>
        <p className="stats-subheading">
        </p>
      </header>

      <div className="stats-card">
        <ul className="stats-list">
          {STATS.map((stat) => (
            <li key={stat.id} className={`stats-item stats-item--${stat.id}`}>
              <div className="stats-icon">{stat.icon}</div>
              <div className="stats-text">
                <span className="stats-value">{stat.value}</span>
                <span className="stats-label">{stat.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Stats;
