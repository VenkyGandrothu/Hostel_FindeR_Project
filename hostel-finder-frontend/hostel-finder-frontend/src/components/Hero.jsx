import heroImage from "../assets/hero/heroBg.png";
import citiesImage from "../assets/hero/citie.png";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <section
      className="mt-5 flex w-full justify-center px-5"
      style={{ background: "var(--surface-white, #ffffff)" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1280px",
          borderRadius: "32px",
          overflow: "hidden",
          height: "420px",
        }}
      >
        <img
          src={heroImage}
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 90px 92px 88px",
            gap: "12px",
            zIndex: 5,
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              textAlign: "left",
              flex: "1",
              minWidth: 0,
              maxWidth: "520px",
              paddingTop: "8px",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Choose a city
            </h1>
            <p
              style={{
                margin: "8px 0 0",
                color: "#FFFFFF",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 500,
                lineHeight: 1.3,
                maxWidth: "480px",
                opacity: 0.9,
              }}
            >
              and find your home away from home
            </p>
          </div>

          <div
            style={{
              flex: "0 1 auto",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            <img
              src={citiesImage}
              alt="Cities Illustration"
              style={{
                height: "auto",
                maxHeight: "268px",
                width: "auto",
                maxWidth: "min(400px, 38vw)",
                objectFit: "contain",
                transform: "translateX(-36px)",
                filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "44px",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "860px",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
