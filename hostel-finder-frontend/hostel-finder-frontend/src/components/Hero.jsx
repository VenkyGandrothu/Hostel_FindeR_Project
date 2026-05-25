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
        }}
      >
        <img
          src={heroImage}
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover",
            objectPosition: "center 38%",
            display: "block",
          }}
        />

        {/* Text left, cities right — like Figma reference */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            columnGap: "24px",
            padding: "40px 28px 96px 64px",
            zIndex: 5,
            pointerEvents: "none",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "left", alignSelf: "center" }}>
            <h1
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Choose a city
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                color: "#FFFFFF",
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(16px, 2.2vw, 24px)",
                fontWeight: 700,
                lineHeight: 1.35,
                maxWidth: "520px",
              }}
            >
              and find your home away from home
            </p>
          </div>

          <img
            src={citiesImage}
            alt=""
            aria-hidden
            style={{
              height: "auto",
              maxHeight: "240px",
              width: "auto",
              maxWidth: "min(400px, 38vw)",
              objectFit: "contain",
              objectPosition: "right center",
              justifySelf: "end",
              alignSelf: "center",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "55px",
            transform: "translateX(-50%)",
            width: "85%",
            maxWidth: "860px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
