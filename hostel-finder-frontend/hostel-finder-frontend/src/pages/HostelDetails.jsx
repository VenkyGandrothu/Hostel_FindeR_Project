import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getHostelById } from "../api/hostelApi";
import { getAuthUser } from "../api/authApi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  TYPE_BREADCRUMB,
  TYPE_LABELS,
  formatPrice,
  getDirectionUrl,
  getHostelAmenityChips,
  getHostelFoodDetails,
  getHostelImages,
  getHostelOccupancies,
  getHostelServiceChips,
} from "../utils/hostelUtils";

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11V8a2 2 0 012-2h12a2 2 0 012 2v3M4 11v5h16v-5M4 16v3h16v-3M7 11V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChipIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  };

  switch (name) {
    case "bath":
      return (
        <svg {...common}>
          <path d="M4 12h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M6 12V7a2 2 0 012-2h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "ac":
      return (
        <svg {...common}>
          <path d="M4 8h16v3H4V8z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 14v3M12 14v4M16 14v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "water":
      return (
        <svg {...common}>
          <path d="M12 3c3.5 4 6 7.2 6 10a6 6 0 11-12 0c0-2.8 2.5-6 6-10z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "fire":
      return (
        <svg {...common}>
          <path d="M12 3c2 3 5 4.5 5 8a5 5 0 11-10 0c0-2 1-3.5 2.5-5C10 7.5 11 8.5 12 3z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "meals":
      return (
        <svg {...common}>
          <path d="M8 4v8M6 4v5a2 2 0 004 0V4M16 4v16M14 4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "veg":
      // FSSAI-style pure veg mark
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="none" stroke="#15803d" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" fill="#15803d" />
        </svg>
      );
    case "nonveg":
      // FSSAI-style non-veg mark
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="none" stroke="#b91c1c" strokeWidth="2" />
          <path d="M12 7.2L17.2 16.8H6.8L12 7.2Z" fill="#b91c1c" />
        </svg>
      );
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 9.5a10 10 0 0114 0M7.5 12.5a6.5 6.5 0 019 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.4" fill="currentColor" />
        </svg>
      );
    case "laundry":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "housekeeping":
      return (
        <svg {...common}>
          <path d="M4 13l8-8 8 8M6 11v8h12v-8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "security":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
  }
}

function HostelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const authUser = getAuthUser();

  const [hostel, setHostel] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [visitTab, setVisitTab] = useState("schedule");
  const [formName, setFormName] = useState(authUser?.name ?? "");
  const [formPhone, setFormPhone] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHostel() {
      setStatus("loading");
      setError("");
      setHostel(null);
      setActiveImage(0);

      try {
        const data = await getHostelById(id);
        if (!cancelled) {
          setHostel(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load hostel details.");
          setStatus("error");
        }
      }
    }

    loadHostel();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (location.hash === "#schedule" && status === "success") {
      document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash, status]);

  const images = useMemo(() => getHostelImages(hostel?.imageUrls), [hostel]);
  const occupancies = useMemo(() => getHostelOccupancies(hostel), [hostel]);
  const amenityChips = useMemo(() => getHostelAmenityChips(hostel), [hostel]);
  const serviceChips = useMemo(() => getHostelServiceChips(hostel), [hostel]);
  const foodDetails = useMemo(() => getHostelFoodDetails(hostel), [hostel]);
  const directionUrl = hostel ? getDirectionUrl(hostel) : "#";
  const typeLabel = TYPE_LABELS[hostel?.type] ?? hostel?.type;
  const typeCrumb = TYPE_BREADCRUMB[hostel?.type] ?? "Hostels";

  function handleScheduleSubmit(event) {
    event.preventDefault();
    setFormMessage("");

    if (!formName.trim() || !formPhone.trim()) {
      setFormMessage("Please enter your name and phone number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formPhone.trim())) {
      setFormMessage("Enter a valid 10-digit phone number.");
      return;
    }

    if (!acceptedTerms) {
      setFormMessage("Please accept the terms and privacy policy.");
      return;
    }

    setFormMessage(
      visitTab === "schedule"
        ? "Visit request noted! The hostel owner will contact you soon."
        : "Reservation interest noted! We will call you to confirm.",
    );
  }

  return (
    <>
      <Navbar />
      <main className="hostel-details-page">
        {status === "loading" && (
          <p className="hostel-details-status">Loading hostel details...</p>
        )}

        {status === "error" && (
          <div className="hostel-details-status hostel-details-status--error">
            <p>{error}</p>
            <Link to="/search" className="login-btn">
              Back to search
            </Link>
          </div>
        )}

        {status === "success" && hostel && (
          <div className="hostel-details-shell">
            <nav className="hostel-details-breadcrumb" aria-label="Breadcrumb">
              <Link to={`/search?city=${encodeURIComponent(hostel.location)}`}>
                {hostel.location}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                to={`/search?city=${encodeURIComponent(hostel.location)}&type=${encodeURIComponent(
                  hostel.type || "",
                )}`}
              >
                {typeCrumb}
              </Link>
              <span aria-hidden="true">/</span>
              <span>{hostel.name}</span>
            </nav>

            <div className="hostel-details-layout">
              <section className="hostel-details-main">
                <header className="hostel-details-header">
                  <div className="hostel-details-heading-block">
                    <div className="hostel-details-title-row">
                      <h1 className="hostel-details-title">{hostel.name}</h1>
                      <span className="hostel-details-type-pill">{typeLabel}</span>
                    </div>
                    <p className="hostel-details-address">{hostel.address}</p>
                  </div>

                  <div className="hostel-details-header-actions">
                    <a
                      href={directionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hostel-details-map-link"
                    >
                      <MapPinIcon />
                      Show on Map
                    </a>
                  </div>
                </header>

                <div className="hostel-details-gallery-wrap">
                  <div className="hostel-details-gallery">
                    <span className="hostel-details-gallery-tag">
                      Preferred By Students &amp; Professionals
                    </span>
                    <img
                      src={images[activeImage]}
                      alt={`${hostel.name} photo ${activeImage + 1}`}
                      className="hostel-details-gallery-image"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="hostel-details-gallery-nav hostel-details-gallery-nav--prev"
                          aria-label="Previous photo"
                          onClick={() =>
                            setActiveImage((index) =>
                              index === 0 ? images.length - 1 : index - 1,
                            )
                          }
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="hostel-details-gallery-nav hostel-details-gallery-nav--next"
                          aria-label="Next photo"
                          onClick={() =>
                            setActiveImage((index) => (index + 1) % images.length)
                          }
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="hostel-details-gallery-dots" role="tablist" aria-label="Photos">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          role="tab"
                          aria-selected={index === activeImage}
                          className={`hostel-details-dot${
                            index === activeImage ? " is-active" : ""
                          }`}
                          onClick={() => setActiveImage(index)}
                          aria-label={`Show photo ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="hostel-details-price-block">
                  <span className="hostel-details-price-label">Starts from</span>
                  <p className="hostel-details-price">
                    ₹{formatPrice(hostel.price)}
                    <span className="hostel-details-price-suffix">/mo*</span>
                  </p>
                </div>

                <p className="hostel-details-description">{hostel.description}</p>

                <section className="hostel-details-section">
                  <h2>Available Occupancies</h2>
                  <div className="hostel-occupancy-grid">
                    {occupancies.map((room) => (
                      <article key={room.key} className="hostel-occupancy-card">
                        <span className="hostel-occupancy-badge" aria-hidden="true">
                          <BedIcon />
                          <span>x {room.capacity}</span>
                        </span>
                        <p className="hostel-occupancy-label">{room.label}</p>
                        <p className="hostel-occupancy-price">
                          ₹{formatPrice(room.price)}
                          <span>/mo*</span>
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                {amenityChips.length > 0 && (
                  <section className="hostel-details-section">
                    <h2>Amenities</h2>
                    <ul className="hostel-chip-row">
                      {amenityChips.map((item) => (
                        <li key={item.key} className="hostel-feature-chip">
                          <span className="hostel-feature-chip-icon">
                            <ChipIcon name={item.icon} />
                          </span>
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {serviceChips.length > 0 && (
                  <section className="hostel-details-section">
                    <h2>Services</h2>
                    <ul className="hostel-chip-row hostel-chip-row--wrap">
                      {serviceChips.map((item) => (
                        <li key={item.key} className="hostel-feature-chip">
                          <span className="hostel-feature-chip-icon">
                            <ChipIcon name={item.icon} />
                          </span>
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {foodDetails && (
                  <section className="hostel-details-section">
                    <h2>Food Details</h2>
                    <div
                      className={`hostel-food-card${
                        foodDetails.available ? "" : " hostel-food-card--unavailable"
                      }`}
                    >
                      <div className="hostel-food-card-top">
                        <span className="hostel-food-status">
                          {foodDetails.available ? "Available" : "Not available"}
                        </span>
                        <h3>{foodDetails.title}</h3>
                        <p>{foodDetails.summary}</p>

                        {foodDetails.diet?.length > 0 && (
                          <ul className="hostel-food-diet" aria-label="Food type">
                            {foodDetails.diet.map((item) => (
                              <li
                                key={item.key}
                                className={`hostel-food-diet-item hostel-food-diet-item--${item.icon}`}
                              >
                                <ChipIcon name={item.icon} />
                                <span>{item.label}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {foodDetails.chips.length > 0 && (
                        <ul className="hostel-chip-row hostel-chip-row--wrap">
                          {foodDetails.chips.map((item) => (
                            <li key={item.key} className="hostel-feature-chip">
                              <span className="hostel-feature-chip-icon">
                                <ChipIcon name={item.icon} />
                              </span>
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                )}

                {(hostel.nearbyPlaces || hostel.ownerName || hostel.email || hostel.contactNumber) && (
                  <section className="hostel-details-section">
                    <h2>More info</h2>
                    <div className="hostel-more-info-card">
                      {hostel.nearbyPlaces && (
                        <div className="hostel-more-info-row">
                          <span className="hostel-more-info-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                              />
                              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                            </svg>
                          </span>
                          <div className="hostel-more-info-content">
                            <span className="hostel-more-info-label">Nearby</span>
                            <p className="hostel-more-info-value">{hostel.nearbyPlaces}</p>
                          </div>
                        </div>
                      )}

                      {hostel.ownerName && (
                        <div className="hostel-more-info-row">
                          <span className="hostel-more-info-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                              <path
                                d="M5 19c1.8-3.2 4-4.8 7-4.8s5.2 1.6 7 4.8"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <div className="hostel-more-info-content">
                            <span className="hostel-more-info-label">Owner</span>
                            <p className="hostel-more-info-value">{hostel.ownerName}</p>
                          </div>
                        </div>
                      )}

                      {hostel.contactNumber && (
                        <div className="hostel-more-info-row">
                          <span className="hostel-more-info-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M8 4h3l1.5 4-2 1.5a12 12 0 005 5L17 13l4 1.5v3a2 2 0 01-2 2A15 15 0 016 6a2 2 0 012-2z"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <div className="hostel-more-info-content">
                            <span className="hostel-more-info-label">Phone</span>
                            <a
                              className="hostel-more-info-value hostel-more-info-link"
                              href={`tel:${hostel.contactNumber}`}
                            >
                              {hostel.contactNumber}
                            </a>
                          </div>
                        </div>
                      )}

                      {hostel.email && (
                        <div className="hostel-more-info-row">
                          <span className="hostel-more-info-icon" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <rect
                                x="3"
                                y="5"
                                width="18"
                                height="14"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.7"
                              />
                              <path
                                d="M4 7l8 6 8-6"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <div className="hostel-more-info-content">
                            <span className="hostel-more-info-label">Email</span>
                            <a
                              className="hostel-more-info-value hostel-more-info-link"
                              href={`mailto:${hostel.email}`}
                            >
                              {hostel.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </section>

              <aside className="hostel-details-sidebar" id="schedule">
                <div className="hostel-visit-card">
                  <div className="hostel-visit-tabs" role="tablist" aria-label="Booking options">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={visitTab === "schedule"}
                      className={`hostel-visit-tab${visitTab === "schedule" ? " is-active" : ""}`}
                      onClick={() => setVisitTab("schedule")}
                    >
                      Schedule a Visit
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={visitTab === "reserve"}
                      className={`hostel-visit-tab${visitTab === "reserve" ? " is-active" : ""}`}
                      onClick={() => setVisitTab("reserve")}
                    >
                      Reserve Now
                    </button>
                  </div>

                  <form className="hostel-visit-form" onSubmit={handleScheduleSubmit} noValidate>
                    <div className="hostel-visit-fields">
                      <label className="visually-hidden" htmlFor="visit-name">
                        Name
                      </label>
                      <input
                        id="visit-name"
                        className="hostel-visit-input"
                        value={formName}
                        onChange={(event) => setFormName(event.target.value)}
                        placeholder="Name"
                        required
                      />

                      <label className="visually-hidden" htmlFor="visit-phone">
                        Mobile Number
                      </label>
                      <div className="hostel-visit-phone">
                        <span className="hostel-visit-phone-prefix" aria-hidden="true">
                          <span className="hostel-visit-flag" title="India">
                            <svg
                              className="hostel-visit-flag-svg"
                              viewBox="0 0 30 20"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                              aria-label="India"
                            >
                              <rect width="30" height="20" rx="2" fill="#FFFFFF" />
                              <rect width="30" height="6.67" y="0" fill="#FF9933" />
                              <rect width="30" height="6.67" y="13.33" fill="#138808" />
                              <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.7" />
                              <circle cx="15" cy="10" r="0.45" fill="#000080" />
                              <g stroke="#000080" strokeWidth="0.35">
                                <line x1="15" y1="7.4" x2="15" y2="12.6" />
                                <line x1="12.4" y1="10" x2="17.6" y2="10" />
                                <line x1="13.16" y1="8.16" x2="16.84" y2="11.84" />
                                <line x1="16.84" y1="8.16" x2="13.16" y2="11.84" />
                                <line x1="12.55" y1="9.05" x2="17.45" y2="10.95" />
                                <line x1="17.45" y1="9.05" x2="12.55" y2="10.95" />
                                <line x1="13.05" y1="11.45" x2="16.95" y2="8.55" />
                                <line x1="16.95" y1="11.45" x2="13.05" y2="8.55" />
                              </g>
                            </svg>
                          </span>
                          <span>+91</span>
                        </span>
                        <input
                          id="visit-phone"
                          className="hostel-visit-phone-input"
                          value={formPhone}
                          onChange={(event) =>
                            setFormPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                          placeholder="Mobile Number"
                          inputMode="numeric"
                          required
                        />
                      </div>

                      <p className="hostel-visit-note">
                        We accept bookings with a minimum stay of 3 months.
                      </p>
                    </div>

                    <div className="hostel-visit-whatsapp">
                      <span className="hostel-visit-whatsapp-label">
                        <span className="hostel-visit-whatsapp-icon" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.94.54 3.76 1.48 5.32L2 22l4.98-1.55a9.86 9.86 0 004.99 1.27h.01c5.46 0 9.89-4.4 9.89-9.84C21.87 6.4 17.5 2 12.04 2zm5.52 13.98c-.23.64-1.33 1.18-1.84 1.25-.47.07-1.07.1-1.73-.11-.4-.12-.91-.28-1.57-.55-2.76-1.19-4.55-3.97-4.69-4.15-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.23.57.79 1.97.86 2.11.07.14.12.31.02.49-.1.19-.14.31-.28.47-.14.17-.3.37-.42.49-.14.14-.29.29-.12.57.17.28.75 1.23 1.61 2 .99.89 1.82 1.17 2.1 1.3.28.14.44.12.61-.07.17-.19.71-.82.9-1.1.19-.28.38-.23.64-.14.26.1 1.67.79 1.96.93.28.14.47.21.54.33.07.12.07.7-.16 1.34z" />
                          </svg>
                        </span>
                        Get updates over WhatsApp
                      </span>
                      <button
                        type="button"
                        className={`hostel-visit-toggle${whatsappUpdates ? " is-on" : ""}`}
                        role="switch"
                        aria-checked={whatsappUpdates}
                        aria-label="Get updates over WhatsApp"
                        onClick={() => setWhatsappUpdates((value) => !value)}
                      >
                        <span className="hostel-visit-toggle-knob" />
                      </button>
                    </div>

                    <label className="hostel-visit-terms">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(event) => setAcceptedTerms(event.target.checked)}
                      />
                      <span>
                        I have read and agreed to the{" "}
                        <a href="/know-more" onClick={(event) => event.stopPropagation()}>
                          terms and conditions
                        </a>{" "}
                        and{" "}
                        <a href="/know-more" onClick={(event) => event.stopPropagation()}>
                          privacy policy
                        </a>{" "}
                        and hereby confirm to proceed.
                      </span>
                    </label>

                    {formMessage && (
                      <p className="hostel-visit-message" role="status">
                        {formMessage}
                      </p>
                    )}

                    <button type="submit" className="hostel-visit-submit">
                      {visitTab === "schedule" ? "Schedule a Visit" : "Reserve Now"}
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default HostelDetails;
