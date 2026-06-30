// App.jsx
import { useState } from "react";
import Background from "./components/Background";
import Countdown from "./components/Countdown";
import QuoteSection from "./components/QuoteSection";
import MainImage from "./components/MainImage";
import Carousel from "./components/Carousel";
import MusicToggle from "./components/MusicToggle";
import PhotoModal from "./components/PhotoModal";
import IntroGate from "./components/IntroGate";
import ConfettiCannon from "./components/ConfettiCannon";
import MemoryWall from "./components/MemoryWall";
import WishMoment from "./components/WishMoment";
import LoveLetter from "./components/LoveLetter";
import WishJar from "./components/WishJar";
import LifeScroll from "./components/LifeScroll";
import FlowerGallery from "./components/FlowerGallery";
import { isBirthdayToday } from "./data/music";


function App() {
  const [gateCleared, setGateCleared]     = useState(false);
  const [showCannon,  setShowCannon]       = useState(false);
  const [showMemory,  setShowMemory]       = useState(false);
  const [showLetter,  setShowLetter]       = useState(false);
  const [showJar,     setShowJar]          = useState(false);
  const [showScroll,  setShowScroll]        = useState(false);
  const [showFlowers, setShowFlowers]      = useState(false);
  const [menuOpen,    setMenuOpen]         = useState(false);
  // WishMoment: shown on the birthday instead of the normal countdown section
  const [wishDone,    setWishDone]         = useState(false);
  const isBirthday = isBirthdayToday();
  const [quote,       setQuote]            = useState("");
  const [mainImage,   setMainImage]        = useState("");

  const handleGateComplete = () => {
    setGateCleared(true);
    // Short delay so the fade-in starts first, THEN the cannon fires
    setTimeout(() => setShowCannon(true), 600);
  };

  return (
    <>
      {!gateCleared && <IntroGate onComplete={handleGateComplete} />}

      {/* ── WishMoment overlay — only on July 17, dismisses after all candles blown ── */}
      {gateCleared && isBirthday && !wishDone && (
        <WishMoment onDone={() => setWishDone(true)} />
      )}

      {/* One-shot confetti explosion — unmounts itself after ~3.7 s */}
      {showCannon && (
        <ConfettiCannon onDone={() => setShowCannon(false)} />
      )}

      <div
        className="relative w-screen h-screen overflow-hidden flex flex-col"
        style={{
          opacity:       gateCleared ? 1 : 0,
          transition:    "opacity 0.9s ease",
          pointerEvents: gateCleared ? "auto" : "none",
        }}
      >
        <Background />
        <MusicToggle />

        {/* ── Top-left hamburger menu ── */}
        {gateCleared && (
          <div style={{ position: "fixed", top: 16, left: 16, zIndex: 50 }}>

            {/* Backdrop — closes menu on outside click */}
            {menuOpen && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: -1 }}
                onClick={() => setMenuOpen(false)}
              />
            )}

            {/* Toggle button */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                width: 46, height: 46,
                borderRadius: "50%",
                background: menuOpen
                  ? "linear-gradient(135deg, #7c3aed, #db2777)"
                  : "linear-gradient(135deg, #db2777, #7c3aed)",
                border: "none",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 5,
                boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
                transition: "transform 0.25s ease, background 0.3s ease",
                transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              {menuOpen ? (
                <span style={{ color: "white", fontSize: 22, lineHeight: 1 }}>×</span>
              ) : (
                <>
                  <span style={{ display:"block", width:20, height:2.5, background:"white", borderRadius:2 }} />
                  <span style={{ display:"block", width:14, height:2.5, background:"white", borderRadius:2 }} />
                  <span style={{ display:"block", width:20, height:2.5, background:"white", borderRadius:2 }} />
                </>
              )}
            </button>

            {/* Dropdown menu */}
            <div style={{
              position: "absolute",
              top: 54, left: 0,
              display: "flex", flexDirection: "column", gap: 10,
              pointerEvents: menuOpen ? "auto" : "none",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.95)",
              transformOrigin: "top left",
              transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.3,0.64,1)",
            }}>
              {[
                { label: "Love Letter",      emoji: "💌", bg: "linear-gradient(135deg,#c2410c,#9d174d)", shadow: "rgba(194,65,12,0.45)",   action: () => { setShowLetter(true);  setMenuOpen(false); } },
                { label: "Wish Jar",         emoji: "✨", bg: "linear-gradient(135deg,#b45309,#d97706)", shadow: "rgba(180,83,9,0.45)",    action: () => { setShowJar(true);     setMenuOpen(false); } },
                { label: "Confession Scroll",emoji: "🎥", bg: "linear-gradient(135deg,#1d4ed8,#7c3aed)", shadow: "rgba(29,78,216,0.45)",   action: () => { setShowScroll(true);  setMenuOpen(false); } },
                { label: "Flower Gallery",   emoji: "🌸", bg: "linear-gradient(135deg,#db2777,#f472b6)", shadow: "rgba(219,39,119,0.45)",  action: () => { setShowFlowers(true); setMenuOpen(false); } },
                { label: "Memory Wall",      emoji: "🖼️", bg: "linear-gradient(135deg,#db2777,#7c3aed)", shadow: "rgba(219,39,119,0.45)",  action: () => { setShowMemory(true);  setMenuOpen(false); } },
              ].map(({ label, emoji, bg, shadow, action }, i) => (
                <button
                  key={label}
                  onClick={action}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 18px",
                    borderRadius: 28,
                    background: bg,
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                    boxShadow: `0 4px 18px ${shadow}`,
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    // staggered entrance
                    transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <span style={{ fontSize: 16 }}>{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Modals ── */}
        {showLetter && <LoveLetter onClose={() => setShowLetter(false)} />}
        {showJar    && <WishJar    onClose={() => setShowJar(false)}    />}
        {showScroll && <LifeScroll onClose={() => setShowScroll(false)} />}
        {showFlowers && <FlowerGallery onClose={() => setShowFlowers(false)} />}
        {showMemory && <MemoryWall onClose={() => setShowMemory(false)} />}

        <Countdown />

        <div className="flex-1 min-h-0 relative z-10 flex flex-col md:flex-row items-center justify-center overflow-hidden px-4 md:px-8 gap-0 md:gap-4">
          <div className="w-full md:w-[46%] flex-shrink-0 min-w-0">
            <QuoteSection quote={quote} />
          </div>
          <div className="hidden md:flex flex-1 min-w-0 h-full items-center justify-center">
            <MainImage src={mainImage} />
          </div>
        </div>

        <Carousel setMainImage={setMainImage} setQuote={setQuote} />
        <PhotoModal />
      </div>
    </>
  );
}


export default App;
