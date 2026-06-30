import { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { useMediaQuery } from "react-responsive";

export default function MainImage({ src }) {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  // ✅ Responsive sizing logic — constrained to parent height so it never overflows
  let maxWidth = "clamp(180px, 26vw, 300px)";
  let maxHeight = "55vh";
  let aspectRatio = "4 / 5";

  if (isBigScreen) {
    maxWidth = "clamp(260px, 24vw, 360px)";
    maxHeight = "65vh";
    aspectRatio = "4 / 5";
  }

  if (isPortrait && isTabletOrMobile) {
    maxWidth = "clamp(160px, 38vw, 220px)";
    maxHeight = "30vh";
    aspectRatio = "3 / 4";
  }

  return (
    <div className="flex justify-center items-center w-full h-full px-2 relative z-10">
      {/* Blur glow */}
      <div className="absolute inset-0 rounded-full bg-white/30 blur-3xl scale-90 pointer-events-none"></div>

      <div
        data-tilt
        className="relative"
        style={{
          width: "100%",
          maxWidth,
          maxHeight,
          aspectRatio,
        }}
      >
        <img
          src={src}
          alt="Main"
          className="rounded-2xl object-cover w-full h-full shadow-2xl transition-all duration-1000 block"
        />
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_15px_5px_rgba(255,192,203,0.5)] animate-pulse-slow"></div>
      </div>
    </div>
  );
}
