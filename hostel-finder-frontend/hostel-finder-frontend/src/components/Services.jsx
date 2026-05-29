const SERVICES = [
  {
    id: "verified",
    title: "Verified Listings",
    description:
      "Every hostel is vetted for safety, cleanliness, and reliability.",
    image: "https://placehold.co/100x100/png?text=Verified",
    variant: "solid",
  },
  {
    id: "booking",
    title: "Instant Booking",
    description:
      "Reserve your spot in seconds with real‑time availability checks.",
    image: "https://placehold.co/100x100/png?text=Booking",
    variant: "gradient",
  },
  {
    id: "support",
    title: "24/7 Support",
    description:
      "Our team is here day and night to help you with any query.",
    image: "https://placehold.co/100x100/png?text=Support",
    variant: "gradient",
  },
];

function Services() {
  return (
    <section className="services-section" aria-labelledby="services-heading">
      <header className="services-header">
        <h2 id="services-heading" className="services-heading">
          Services We Are Providing
        </h2>
      </header>

      <ul className="services-grid">
        {SERVICES.map((service) => (
          <li key={service.id} className="services-grid-item">
            <article
              className={`service-card service-card--${service.variant}`}
            >
              <img
                src={service.image}
                alt=""
                className="service-icon"
                aria-hidden="true"
              />
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Services;
