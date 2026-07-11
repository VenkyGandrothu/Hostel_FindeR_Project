import verifiedIcon from "../assets/services/Verified listing.png";
import bookingIcon from "../assets/services/instantBooking.png";
import supportIcon from "../assets/services/costomercare.png";

const SERVICES = [
  {
    id: "verified",
    title: "Verified Listings",
    description:
      "Every hostel is vetted for safety, cleanliness, and reliability.",
    image: verifiedIcon,
  },
  {
    id: "booking",
    title: "Instant Booking",
    description:
      "Reserve your spot in seconds with real-time availability checks.",
    image: bookingIcon,
  },
  {
    id: "support",
    title: "24/7 Support",
    description:
      "Our team is here day and night to help you with any query.",
    image: supportIcon,
  },
];

function Services() {
  return (
    <section className="services-section" aria-labelledby="services-heading">
      <header className="section-header">
        <h2 id="services-heading" className="section-heading">
          Services We Are Providing
        </h2>
        <p className="services-subheading">
          Everything you need to find, book, and stay with confidence.
        </p>
      </header>

      <ul className="services-grid">
        {SERVICES.map((service) => (
          <li key={service.id} className="services-grid-item">
            <article className="service-card">
              <div className="service-icon-wrap">
                <img
                  src={service.image}
                  alt=""
                  className="service-icon"
                  aria-hidden="true"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Services;
