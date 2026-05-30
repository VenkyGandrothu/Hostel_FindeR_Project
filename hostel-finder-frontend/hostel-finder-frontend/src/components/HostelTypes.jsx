import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImage from "../assets/HotelTyepes/Men.png";
import womenImage from "../assets/HotelTyepes/Women.png";
import colivingImage from "../assets/HotelTyepes/Coliving.png";
import CityPicker from "./CityPicker";

const HOSTEL_TYPES = [
  {
    id: "men",
    title: "Professional Mens",
    image: menImage,
    backendType: "Mens",
  },
  {
    id: "women",
    title: "Professional Womens",
    image: womenImage,
    backendType: "Girls",
  },
  {
    id: "coliving",
    title: "Co-living",
    image: colivingImage,
    backendType: "Co-living",
  },
];

function HostelTypes() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  function handleTypeClick(type) {
    setSelectedType(type);
  }

  function handleClosePicker() {
    setSelectedType(null);
  }

  function handleCitySelect(city, hostelType) {
    const params = new URLSearchParams({ city });

    if (hostelType?.backendType) {
      params.set("type", hostelType.backendType);
    }

    navigate(`/search?${params.toString()}`);
    setSelectedType(null);
  }

  return (
    <>
      <section className="hostel-types-section" aria-labelledby="hostel-types-heading">
        <header className="section-header">
          <h2 id="hostel-types-heading" className="section-heading">
            Choose Your Type
          </h2>
        </header>

        <ul className="hostel-types-grid">
          {HOSTEL_TYPES.map((type) => (
            <li key={type.id} className="hostel-types-grid-item">
              <button
                type="button"
                className={`hostel-type-card hostel-type-card--${type.id}`}
                onClick={() => handleTypeClick(type)}
              >
                <img
                  src={type.image}
                  alt=""
                  className="hostel-type-bg"
                  aria-hidden="true"
                />
                <div className="hostel-type-gradient" aria-hidden="true" />
                <h3 className="hostel-type-title">{type.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <CityPicker
        isOpen={Boolean(selectedType)}
        title={
          selectedType
            ? `Choose a city for ${selectedType.title}`
            : "Choose a city"
        }
        hostelType={selectedType}
        onClose={handleClosePicker}
        onCitySelect={handleCitySelect}
      />
    </>
  );
}

export default HostelTypes;
