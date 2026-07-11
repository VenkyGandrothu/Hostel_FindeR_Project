import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/logo.png";

function Navbar() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";
  const isAuthPage = isLoginPage || isSignupPage;

  return (
    <nav className={`site-navbar${isAuthPage ? " site-navbar--auth" : ""}`}>
      <div className="site-navbar-inner">
        <Link to="/" className="site-navbar-logo-link">
          <img
            src={logo}
            alt="Hostel Finder"
            className="site-navbar-logo"
          />
        </Link>

        <div className="navbar-actions">
          {!isAuthPage && (
            <Link to="/know-more" className="nav-know-more">
              Know More
            </Link>
          )}

          {isLoginPage && (
            <>
              <Link to="/" className="nav-know-more">
                Home
              </Link>
              <Link to="/signup" className="login-btn">
                Sign Up
              </Link>
            </>
          )}

          {isSignupPage && (
            <>
              <Link to="/" className="nav-know-more">
                Home
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          )}

          {!isAuthPage && (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
