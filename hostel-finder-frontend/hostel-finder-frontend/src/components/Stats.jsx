import citiesIcon from "../assets/stats/location.png";
import hostelsIcon from "../assets/stats/building.png";
import usersIcon from "../assets/stats/user.png";
import clientsIcon from "../assets/stats/clients.png";

const STATS = [
  {
    id: "cities",
    value: "20+",
    label: "Cities",
    image: citiesIcon,
  },
  {
    id: "hostels",
    value: "50+",
    label: "Hostels",
    image: hostelsIcon,
  },
  {
    id: "users",
    value: "100+",
    label: "Users",
    image: usersIcon,
  },
  {
    id: "clients",
    value: "30+",
    label: "Clients",
    image: clientsIcon,
  },
];

function Stats() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <header className="section-header">
        <h2 id="stats-heading" className="section-heading">
          Our Impact in Numbers
        </h2>
      </header>

      <div className="stats-card">
        <ul className="stats-list">
          {STATS.map((stat) => (
            <li key={stat.id} className="stats-item">
              <div className="stats-icon">
                <img
                  src={stat.image}
                  alt=""
                  className="stats-icon-img"
                  aria-hidden="true"
                />
              </div>
              <div className="stats-text">
                <p className="stats-value">{stat.value}</p>
                <p className="stats-label">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Stats;
