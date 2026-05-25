import logo from "../assets/logo/logo.png";

function Navbar() {
  return (
    <nav
      style={{
        background: "var(--surface-white, #ffffff)",
      }}
    >
      <div
        className="flex justify-between items-center"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "20px 40px"
        }}
      >
        {/* Logo */}

        <img
          src={logo}
          alt="Hostel Finder"
          style={{
            width: "202px",
            height: "60px",
            objectFit: "contain",
            cursor: "pointer"
          }}
        />

        {/* Right side */}

        <div className="flex items-center">

          <button
            style={{
              height: "50px",
              paddingLeft: "41px",
              paddingRight: "41px",
              paddingTop: "16px",
              paddingBottom: "16px",
              background: "#FBC02D",
              borderRadius: "15px",
              border: "none",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer"
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "16px",
                fontFamily: "Poppins",
                fontWeight: 300
              }}
            >
              Login
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;