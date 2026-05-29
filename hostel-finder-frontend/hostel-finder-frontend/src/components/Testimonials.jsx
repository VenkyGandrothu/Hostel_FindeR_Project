import { useCallback, useEffect, useRef, useState } from "react";

const CARD_WIDTH = 288;
const CARD_GAP = 32;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_SCROLL_SPEED = 0.5;
const PAUSE_AFTER_ARROW_MS = 6000;
const CHAIN_COPIES = 3;

const TESTIMONIALS = [
  {
    id: "ravi",
    quote:
      "Hostel Finder helped me find a great place to stay within minutes. Super easy and reliable!",
    author: "Ravi Kumar, Student",
    avatar: "https://i.pravatar.cc/150?img=12",
    avatarPosition: "center",
  },
  {
    id: "priya",
    quote:
      "Booking was smooth and the listings felt trustworthy. I moved in without any stress.",
    author: "Priya Sharma, Student",
    avatar: "https://i.pravatar.cc/150?img=5",
    avatarPosition: "top",
  },
  {
    id: "amit",
    quote:
      "I compared hostels quickly and picked the best option near my office. Highly recommend it.",
    author: "Amit Patel, Professional",
    avatar: "https://i.pravatar.cc/150?img=33",
    avatarPosition: "cover",
  },
  {
    id: "sneha",
    quote:
      "Clean rooms, fair prices, and quick support when I had questions about amenities.",
    author: "Sneha Reddy, Student",
    avatar: "https://i.pravatar.cc/150?img=9",
    avatarPosition: "offset",
  },
  {
    id: "karthik",
    quote:
      "Found a student-friendly hostel in one evening. The whole process was very simple.",
    author: "Karthik Menon, Student",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarPosition: "center",
  },
  {
    id: "ananya",
    quote:
      "Verified listings saved me time. I did not have to visit ten places before deciding.",
    author: "Ananya Iyer, Student",
    avatar: "https://i.pravatar.cc/150?img=25",
    avatarPosition: "top",
  },
  {
    id: "rohan",
    quote:
      "Instant booking confirmation gave me peace of mind before traveling to a new city.",
    author: "Rohan Das, Professional",
    avatar: "https://i.pravatar.cc/150?img=52",
    avatarPosition: "cover",
  },
  {
    id: "meera",
    quote:
      "Support team guided me late at night when I needed help with check-in details.",
    author: "Meera Nair, Student",
    avatar: "https://i.pravatar.cc/150?img=47",
    avatarPosition: "offset",
  },
  {
    id: "vikram",
    quote:
      "Great experience from search to stay. Filters made it easy to match my budget.",
    author: "Vikram Singh, Student",
    avatar: "https://i.pravatar.cc/150?img=60",
    avatarPosition: "center",
  },
  {
    id: "divya",
    quote:
      "Hostel Finder is my go-to app now whenever friends ask for safe accommodation.",
    author: "Divya Kulkarni, Student",
    avatar: "https://i.pravatar.cc/150?img=32",
    avatarPosition: "top",
  },
];

const LOOP_SET_WIDTH = TESTIMONIALS.length * CARD_STEP;
const CHAIN_ITEMS = Array.from({ length: CHAIN_COPIES }, () => TESTIMONIALS).flat();

function StarIcon() {
  return (
    <svg
      className="testimonial-star"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7 0.5L8.76 5.26L14 5.45L10 8.74L11.52 14L7 11.09L2.48 14L4 8.74L0 5.45L5.24 5.26L7 0.5Z" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      className={`testimonial-arrow-icon testimonial-arrow-icon--${direction}`}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 7L17 14L10 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <article
      className={`testimonial-card testimonial-card--avatar-${testimonial.avatarPosition}`}
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      <div className="testimonial-avatar-wrap">
        <img
          src={testimonial.avatar}
          alt=""
          className="testimonial-avatar-img"
          aria-hidden="true"
        />
      </div>

      <blockquote className="testimonial-quote">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <footer className="testimonial-footer">
        <cite className="testimonial-author">
          <span className="testimonial-author-dash">— </span>
          <span className="testimonial-author-name">{testimonial.author}</span>
        </cite>
        <div className="testimonial-stars" aria-label="5 out of 5 stars">
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      </footer>
    </article>
  );
}

function Testimonials() {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const paintOffset = useCallback((px, { snap = false } = {}) => {
    const track = trackRef.current;
    if (!track) return;

    offsetRef.current = px;
    track.classList.toggle("testimonials-track--snap", snap);
    track.style.transform = `translate3d(-${px}px, 0, 0)`;
  }, []);

  const rewindToStartOfChain = useCallback(() => {
    const track = trackRef.current;
    if (!track || offsetRef.current < LOOP_SET_WIDTH) return;

    track.classList.remove("testimonials-track--snap");
    offsetRef.current -= LOOP_SET_WIDTH;
    track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  }, []);

  const pauseAutoScroll = useCallback((durationMs = PAUSE_AFTER_ARROW_MS) => {
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
      pauseTimerRef.current = null;
    }, durationMs);
  }, []);

  const shift = useCallback(
    (direction) => {
      const track = trackRef.current;
      if (!track) return;

      pauseAutoScroll();

      const atLast =
        offsetRef.current >= LOOP_SET_WIDTH - CARD_STEP - 0.5;
      const atFirst = offsetRef.current <= 0.5;

      if (direction > 0 && atLast) {
        paintOffset(LOOP_SET_WIDTH, { snap: true });
        return;
      }

      if (direction < 0 && atFirst) {
        track.classList.remove("testimonials-track--snap");
        offsetRef.current = LOOP_SET_WIDTH;
        track.style.transform = `translate3d(-${LOOP_SET_WIDTH}px, 0, 0)`;
        void track.offsetHeight;
        paintOffset(LOOP_SET_WIDTH - CARD_STEP, { snap: true });
        return;
      }

      paintOffset(offsetRef.current + direction * CARD_STEP, { snap: true });
    },
    [paintOffset, pauseAutoScroll],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let frameId = 0;

    const tick = () => {
      if (!pausedRef.current) {
        const track = trackRef.current;
        if (track) track.classList.remove("testimonials-track--snap");

        let next = offsetRef.current + AUTO_SCROLL_SPEED;
        if (next >= LOOP_SET_WIDTH) {
          next -= LOOP_SET_WIDTH;
        }

        paintOffset(next);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [paintOffset, reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onTransitionEnd = (event) => {
      if (event.propertyName !== "transform") return;
      rewindToStartOfChain();
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [rewindToStartOfChain]);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="testimonials-header section-header">
        <h2 id="testimonials-heading" className="section-heading">
          Testimonials
        </h2>

        <div className="testimonials-nav">
          <button
            type="button"
            className="testimonials-nav-btn"
            onClick={() => shift(-1)}
            aria-label="Previous testimonial"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className="testimonials-nav-btn"
            onClick={() => shift(1)}
            aria-label="Next testimonial"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        className="testimonials-viewport"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!pauseTimerRef.current) pausedRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          className={`testimonials-track${reduceMotion ? " testimonials-track--static" : ""}`}
        >
          {CHAIN_ITEMS.map((item, index) => (
            <TestimonialCard
              key={`${item.id}-${index}`}
              testimonial={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
