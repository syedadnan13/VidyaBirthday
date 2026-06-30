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


function App() {
  const [gateCleared, setGateCleared] = useState(false);
  const [quote, setQuote] = useState("");
  const [mainImage, setMainImage] = useState("");

  return (
    <>
      {/* ── Intro gate — overlays until all 3 questions answered Yes ── */}
      {!gateCleared && <IntroGate onComplete={() => setGateCleared(true)} />}

      {/* ── Main birthday page — fades in once gate is cleared ── */}
      <div
        className="relative w-screen h-screen overflow-hidden flex flex-col"
        style={{
          opacity: gateCleared ? 1 : 0,
          transition: "opacity 0.9s ease",
          pointerEvents: gateCleared ? "auto" : "none",
        }}
      >
        <Background />
        <MusicToggle />
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
