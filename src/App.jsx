// App.jsx
import { useState } from "react";
import Background from "./components/Background";
import Countdown from "./components/Countdown";
import QuoteSection from "./components/QuoteSection";
import MainImage from "./components/MainImage";
import Carousel from "./components/Carousel";
import MusicToggle from "./components/MusicToggle";
import PhotoModal from "./components/PhotoModal";


function App() {
  const [quote, setQuote] = useState("");
  const [mainImage, setMainImage] = useState("");

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      {/* Decorative gradient + floating elements */}
      <Background />
      {/* Music player — fixed overlay, always on top */}
      <MusicToggle />

      {/* ── Row 1: Countdown (in normal flow, reserves its own height) ── */}
      <Countdown />

      {/* ── Row 2: Quote + Main photo (flex-1 fills remaining space) ── */}
      <div className="flex-1 min-h-0 relative z-10 flex flex-col md:flex-row items-center justify-center overflow-hidden px-4 md:px-8 gap-0 md:gap-4">
        {/* Quote — full width on mobile, 46% on desktop */}
        <div className="w-full md:w-[46%] flex-shrink-0 min-w-0">
          <QuoteSection quote={quote} />
        </div>
        {/* Main photo — hidden on mobile (carousel bg fills that role), shown on desktop */}
        <div className="hidden md:flex flex-1 min-w-0 h-full items-center justify-center">
          <MainImage src={mainImage} />
        </div>
      </div>

      {/* ── Row 3: Carousel (in normal flow, pinned to bottom) ── */}
      <Carousel setMainImage={setMainImage} setQuote={setQuote} />
      <PhotoModal />
    </div>
  );
}


export default App;
