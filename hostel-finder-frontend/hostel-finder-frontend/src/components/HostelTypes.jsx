import studentImage from "../assets/HotelTyepes/Student.png";
import menImage from "../assets/HotelTyepes/Men.png";
import womenImage from "../assets/HotelTyepes/Women.png";
import colivingImage from "../assets/HotelTyepes/Coliving.png";

const HOSTEL_TYPES = [
  {
    id: "students",
    title: "Student Friendly",
    image: studentImage,
  },
  {
    id: "men",
    title: "Professional Mens",
    image: menImage,
  },
  {
    id: "women",
    title: "Professional Womens",
    image: womenImage,
  },
  {
    id: "coliving",
    title: "Co-living",
    image: colivingImage,
  },
];

function HostelTypes() {
  function handleTypeClick(typeId) {
    console.log("Selected hostel type:", typeId);
  }

  return (
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
              onClick={() => handleTypeClick(type.id)}
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
  );
}

export default HostelTypes;
