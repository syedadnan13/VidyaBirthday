import { useMediaQuery } from "react-responsive";

export default function QuoteSection({ quote }) {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Dynamic styles
  const headingSize = isMobile
    ? "text-4xl"
    : isTablet
    ? "text-5xl"
    : "text-7xl";

  const nameSize = isMobile
    ? "text-2xl"
    : isTablet
    ? "text-3xl"
    : "text-4xl";

  const quoteSize = isMobile
    ? "text-base"
    : isTablet
    ? "text-lg"
    : "text-2xl";

  const alignment = isMobile ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`w-full px-4 py-3 md:py-4 z-10 flex flex-col justify-center mt-0 ${alignment}`}>
      <h1
        className="font-dancing text-4xl sm:text-5xl md:text-6xl mb-2"
        style={{
          background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #ec4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundSize: "200% auto",
          animation: "gradient-shift 4s ease infinite",
        }}
      >
        Happy Birthday
      </h1>

      <p
        className={`font-playfair ${nameSize} mb-2 animate-fade-in opacity-0 text-pink-900`}
        style={{ animationDelay: "1s" }}
      >
        <span className="text-pink-700 font-bold italic tracking-wide">Vidya</span>
        <span className="ml-2 text-2xl">🎂</span>
      </p>

      {/* Birthday date badge */}
      <div
        className="mb-4 animate-fade-in opacity-0"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="inline-flex items-center gap-2 bg-pink-100/70 backdrop-blur-sm border border-pink-300 text-pink-700 font-montserrat text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
          <i className="fa-solid fa-calendar-days text-pink-500"></i>
          17th July 2026
        </span>
      </div>

      <div
        className={`font-montserrat ${quoteSize} text-indigo-900 leading-relaxed mb-6 max-w-md animate-fade-in opacity-0`}
        style={{ animationDelay: "1.5s" }}
      >
        "{quote}"
      </div>
    </div>
  );
}
