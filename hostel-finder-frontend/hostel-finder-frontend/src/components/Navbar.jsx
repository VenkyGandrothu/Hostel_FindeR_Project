import { Link, useLocation } from "react-router-dom";
import { getAuthToken } from "../api/authApi";
import logo from "../assets/logo/logo.png";
import UserMenu from "./UserMenu";

function Navbar() {
  const { pathname } = useLocation();
  const isLoggedIn = Boolean(getAuthToken());
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
            <>
              <a href="tel:7993948171" className="nav-callback-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
                </svg>
                Request a callback
              </a>
              <Link to="/know-more" className="nav-know-more">
                Know More
              </Link>
            </>
          )}

          {isLoginPage && !isLoggedIn && (
            <>
              <Link to="/" className="nav-know-more">
                Home
              </Link>
              <Link to="/signup" className="login-btn">
                Sign Up
              </Link>
            </>
          )}

          {isSignupPage && !isLoggedIn && (
            <>
              <Link to="/" className="nav-know-more">
                Home
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          )}

          {isAuthPage && isLoggedIn && (
            <Link to="/" className="nav-know-more">
              Home
            </Link>
          )}

          {!isAuthPage && !isLoggedIn && (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}

          {!isAuthPage && isLoggedIn && <UserMenu />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
