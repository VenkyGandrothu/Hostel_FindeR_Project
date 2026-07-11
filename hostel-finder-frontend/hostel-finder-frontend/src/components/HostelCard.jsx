import { useNavigate } from "react-router-dom";
import {
  TYPE_LABELS,
  formatPrice,
  getDirectionUrl,
  getHostelImage,
  getRoomTypeTags,
} from "../utils/hostelUtils";

function MaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 9V4h-5v2h1.586l-3.207 3.207a6.5 6.5 0 10-2.121 2.121L11.586 8H9V6h5v3h2zM6.5 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3a5 5 0 110 10 5 5 0 010-10zm0 12a7 7 0 00-7 7h2a5 5 0 0110 0h2a7 7 0 00-7-7z" />
    </svg>
  );
}

function CoLivingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function WashroomIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h12v2H6V3zm10 4v11a2 2 0 01-2 2H8a2 2 0 01-2-2V7h10z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function TypeBadgeIcon({ type }) {
  if (type === "Girls") return <FemaleIcon />;
  if (type === "Co-living") return <CoLivingIcon />;
  return <MaleIcon />;
}

function HostelCard({ hostel }) {
  const navigate = useNavigate();
  const typeLabel = TYPE_LABELS[hostel.type] ?? hostel.type?.toUpperCase();
  const roomTypes = getRoomTypeTags(hostel.roomType);
  const directionUrl = getDirectionUrl(hostel);
  const detailsPath = `/hostels/${hostel.id}`;

  function openDetails() {
    navigate(detailsPath);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  }

  return (
    <article
      className="hostel-card hostel-card--clickable"
      role="link"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${hostel.name}`}
    >
      <div className="hostel-card-media">
        <img
          src={getHostelImage(hostel.imageUrls)}
          alt={hostel.name}
          className="hostel-card-image"
          loading="lazy"
        />
      </div>

      <div className="hostel-card-body">
        <div className="hostel-card-top">
          <h2 className="hostel-card-title">{hostel.name}</h2>
          <span
            className={`hostel-card-type-badge hostel-card-type-badge--${hostel.type
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <TypeBadgeIcon type={hostel.type} />
            {typeLabel}
          </span>
        </div>

        <div className="hostel-card-feature-row">
          {hostel.attachedBathroom && (
            <span className="hostel-card-feature-tag">
              <WashroomIcon />
              Attached washroom
            </span>
          )}
        </div>

        <div className="hostel-card-room-row">
          {roomTypes.length > 0 && (
            <ul className="hostel-card-room-types" aria-label="Room types">
              {roomTypes.map((room) => (
                <li key={room}>
                  <span className="hostel-card-room-tag">
                    <BedIcon />
                    {room}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <a
            href={directionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hostel-card-direction"
            onClick={(event) => event.stopPropagation()}
          >
            <MapPinIcon />
            View Direction
          </a>
        </div>

        <div className="hostel-card-footer">
          <p className="hostel-card-price">
            ₹{formatPrice(hostel.price)}
            <span className="hostel-card-price-suffix">/mo*</span>
          </p>

          <div className="hostel-card-actions">
            <button
              type="button"
              className="hostel-card-btn hostel-card-btn--primary"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`${detailsPath}#schedule`);
              }}
            >
              Schedule A Visit
            </button>
            {hostel.contactNumber ? (
              <a
                href={`tel:${hostel.contactNumber}`}
                className="hostel-card-btn hostel-card-btn--outline"
                onClick={(event) => event.stopPropagation()}
              >
                Request a call
              </a>
            ) : (
              <button
                type="button"
                className="hostel-card-btn hostel-card-btn--outline"
                onClick={(event) => event.stopPropagation()}
              >
                Request a call
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default HostelCard;
