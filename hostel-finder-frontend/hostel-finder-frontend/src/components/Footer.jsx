import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Know More", to: "/know-more" },
];

const FOOTER_LINKS = [
  { label: "Student Hostels", to: "/" },
  { label: "Co-living", to: "/" },
  { label: "Verified Listings", to: "/" },
  { label: "Contact Support", to: "/" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link to="/" className="site-footer-logo-link">
            <img
              src={logo}
              alt="Hostel Finder"
              className="site-footer-logo"
            />
          </Link>
          <p className="site-footer-tagline">
            Find safe, affordable hostels near your college or workplace — fast
            and hassle-free.
          </p>
        </div>

        <nav className="site-footer-nav" aria-label="Quick links">
          <h3 className="site-footer-nav-title">Quick Links</h3>
          <ul className="site-footer-link-list">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="site-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer-nav" aria-label="Explore">
          <h3 className="site-footer-nav-title">Explore</h3>
          <ul className="site-footer-link-list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="site-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer-contact">
          <h3 className="site-footer-nav-title">Contact</h3>
          <ul className="site-footer-contact-list">
            <li>
              <a href="mailto:support@hostelfinder.com" className="site-footer-link">
                support@hostelfinder.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="site-footer-link">
                +91 98765 43210
              </a>
            </li>
            <li className="site-footer-contact-note">Available 24/7</li>
          </ul>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p className="site-footer-copy">
          &copy; {year} Hostel Finder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
