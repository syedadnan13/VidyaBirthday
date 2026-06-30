import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import firecrackerGif from "../assets/images/gif/an1.gif";
import firecrackerBgGif from "../assets/images/gif/an2.gif";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Your 5 responsive queries
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  // 🎉 Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [daysToGoText, setDaysToGoText] = useState("");
  const fireworksRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date("2026-07-17T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
        if (days > 0) {
          setDaysToGoText(`${days} day${days === 1 ? '' : 's'} to go! 🎂`);
        } else if (days === 0) {
          setDaysToGoText("Today's the day! 🎉");
        } else {
          setDaysToGoText("");
        }
        setShowCelebration(false);
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setDaysToGoText("");
        setShowCelebration(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Ensure playlist switches at midnight if date changes while app is open
  useEffect(() => {
    if (!showCelebration) return;
    const midnightCheck = setInterval(() => {
      const today = new Date();
      if (
        today.getMonth() === 6 && // June (0-indexed)
        today.getDate() === 17
      ) {
        // Optionally trigger a callback or event here if needed
        window.dispatchEvent(new Event('birthday-date-hit'));
      }
    }, 1000 * 60); // check every minute
    return () => clearInterval(midnightCheck);
  }, [showCelebration]);

  // 🎯 Font & box size logic based on query
  const fontSize = isBigScreen
    ? "text-4xl"
    : isDesktopOrLaptop
      ? "text-3xl"
      : isTabletOrMobile
        ? "text-2xl"
        : "text-xl";

  const unitSize = isBigScreen
    ? "text-base"
    : isTabletOrMobile
      ? "text-sm"
      : "text-xs";

  const boxSize = isBigScreen
    ? "min-w-[80px] p-4"
    : isDesktopOrLaptop
      ? "min-w-[70px] p-3"
      : "min-w-[60px] p-2";

  // Remove spinner, add animated linear line revolving around each countdown card
  return (
    <div className="relative z-30 text-center w-full px-4 pt-3 pb-1 flex-shrink-0">
      {/* Firecracker background GIF on celebration */}
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-2 whitespace-nowrap">
        <i className="fa-solid fa-heart text-pink-500 text-lg animate-pulse"></i>
        <h2
          className={`font-dancing ${fontSize}`}
          style={{
            background: "linear-gradient(135deg, #be185d, #7c3aed, #0ea5e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Birthday Countdown
        </h2>
        <i className="fa-solid fa-heart text-pink-500 text-lg animate-pulse"></i>
      </div>
      {/* Days to go text */}
      {daysToGoText && !showCelebration && (
        <div className="mb-1 animate-bounce text-pink-700 font-bold text-lg md:text-xl font-dancing drop-shadow-lg">
          {daysToGoText}
        </div>
      )}
      {/* Countdown Row with animated spinner border and firecracker animation */}
      <div className="flex flex-nowrap justify-center gap-3 mt-[] overflow-x-auto scrollbar-hide">
        {Object.entries(timeLeft).map(([unit, value], idx) => (
          <div
            key={unit}
            className={`backdrop-blur-md rounded-xl text-center ${boxSize} relative flex flex-col items-center justify-center overflow-visible`}
            style={{
              background: "rgba(10, 4, 45, 0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Animated pipe border with traveling gradient */}
            <span className="absolute inset-0 pointer-events-none z-20 rounded-lg">
              <span className="block w-full h-full rounded-lg border-4 border-transparent" style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(270deg, #ff80b5, #9089fc, #ff80b5)',
                backgroundSize: '400% 400%',
                borderImage: 'linear-gradient(270deg, #ff80b5, #9089fc, #ff80b5) 1',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: 'pipe-gradient 2s linear infinite',
                zIndex: 20
              }}></span>
            </span>
            {/* Firecracker GIF on celebration */}
            {showCelebration && (
              <img
                src={firecrackerGif}
                alt="Firecracker"
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 object-contain pointer-events-none select-none z-20"
              />
            )}
            <div
              className={`font-playfair font-bold text-white ${fontSize} relative z-10`}
              style={{ textShadow: "0 0 18px rgba(236,72,153,0.85)" }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div className={`font-montserrat text-pink-300 ${unitSize} relative z-10 tracking-wider`}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          </div>
        ))}
        {showCelebration && Object.entries(timeLeft).map(([unit, value], idx) => (
          <img
            src={firecrackerGif}
            alt="Firecracker"
            className="absolute -top-0 left-1/2 -translate-x-1/2 w-12 h-12 object-contain pointer-events-none select-none z-20"
          />
        ))}
      </div>
      {/* Celebration effect */}
      {showCelebration && (
        <div className="mt-6 w-full flex flex-col items-center justify-center gap-3">
          <div className="animate-bounce font-dancing text-pink-600 drop-shadow-lg">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap flex items-center gap-3">
              <span role="img" aria-label="party">🎉</span>
              Happy Birthday, Vidya!
              <span role="img" aria-label="party">🎉</span>
            </span>
          </div>
          <div className="font-montserrat text-purple-700 text-base sm:text-lg md:text-xl animate-pulse-slow drop-shadow">
            🎂 Wishing you the most magical day! ✨
          </div>
          <div className="flex gap-4 text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>
            <span>🌸</span><span>💜</span><span>🌟</span><span>💜</span><span>🌸</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* Add to your tailwind.config.js (or in index.css for custom keyframes):
@layer utilities {
  @keyframes revolve-line {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .animate-revolve-line {
    animation: revolve-line 2s linear infinite;
    transform-origin: 50% 50%;
  }
}
*/
