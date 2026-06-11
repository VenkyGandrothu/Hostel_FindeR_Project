import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

function Navbar() {
  return (
    <nav className="bg-[var(--surface-white)]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link to="/">
          <img
            src={logo}
            alt="Hostel Finder"
            className="h-12 w-auto cursor-pointer object-contain sm:h-[60px]"
          />
        </Link>
        <div className="navbar-actions">
          <Link to="/know-more" className="nav-know-more">
            Know More
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
