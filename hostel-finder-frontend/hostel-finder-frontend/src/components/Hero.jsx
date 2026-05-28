import heroImage from "../assets/hero/heroBg.png";
import citiesImage from "../assets/hero/citie.png";
import SearchBar from "./SearchBar";

function Hero() {
  return (
    <section className="mt-5 bg-[var(--surface-white)]">
      <div className="mx-auto flex w-full max-w-[1280px] justify-center px-4 sm:px-5 lg:px-10">
        <div className="relative h-[700px] w-full overflow-hidden rounded-[var(--radius-2xl)] sm:h-[560px] lg:h-[520px]">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            className="block h-full w-full object-fill"
          />
          <div className="pointer-events-none absolute inset-0 z-[5]">
            <div className="flex h-full items-start justify-between sm:items-center">
              <div className="min-w-0 flex-1 max-w-[520px] p-5 pt-12 text-left sm:p-8 sm:pt-8 lg:p-12 lg:pt-10">
              <h1 className="m-0 font-[var(--font-display)] text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.1] text-white">
                Choose a city
              </h1>
              <p className="mt-2 max-w-[480px] font-[var(--font-display)] text-[clamp(18px,2.5vw,26px)] font-medium leading-[1.3] text-white/90">
                and find your home away from home
              </p>
              </div>

              <div className="hidden p-4 pr-6 sm:flex sm:p-6 sm:pr-10 lg:p-8 lg:pr-14">
                <div className="ml-2 flex-[0_1_auto] items-center justify-end">
                  <img
                    src={citiesImage}
                    alt="Cities Illustration"
                    className="h-auto max-h-[220px] w-auto max-w-[min(320px,38vw)] -translate-x-3 object-contain drop-shadow-[var(--shadow-soft)] lg:max-h-[268px] lg:max-w-[min(400px,38vw)] lg:-translate-x-9"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto absolute bottom-6 left-1/2 z-10 w-[94%] max-w-[860px] -translate-x-1/2 sm:bottom-11 sm:w-[90%]">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
