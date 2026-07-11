import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAuthToken,
  getAuthUser,
  getUserInitials,
} from "../api/authApi";

function UserMenu() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const user = getAuthUser();

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!user) return null;

  function handleSignOut() {
    clearAuthToken();
    setIsOpen(false);
    navigate("/");
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="user-menu-avatar" aria-hidden="true">
          {getUserInitials(user.name)}
        </span>
        <span className="user-menu-meta">
          <span className="user-menu-name">{user.name}</span>
          <span className="user-menu-badge">Hostel Finder Member</span>
        </span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown" role="menu">
          <Link
            to="/account"
            className="user-menu-item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 19c1.8-3.2 4-4.8 7-4.8s5.2 1.6 7 4.8" />
              </svg>
            </span>
            My account
          </Link>

          <Link
            to="/bookings"
            className="user-menu-item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="6" width="16" height="13" rx="2" />
                <path d="M8 6V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" />
                <path d="M4 11h16" />
              </svg>
            </span>
            My bookings
          </Link>

          <Link
            to="/saved"
            className="user-menu-item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 19s-6.5-4.1-6.5-8.2A3.8 3.8 0 0 1 12 8.2a3.8 3.8 0 0 1 6.5 2.6C18.5 14.9 12 19 12 19z" />
              </svg>
            </span>
            Saved hostels
          </Link>

          <button
            type="button"
            className="user-menu-item user-menu-item--danger"
            role="menuitem"
            onClick={handleSignOut}
          >
            <span className="user-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 6H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
                <path d="M14 16l4-4-4-4" />
                <path d="M18 12H10" />
              </svg>
            </span>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
