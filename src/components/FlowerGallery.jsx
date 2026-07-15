// components/FlowerGallery.jsx — SVG Flower Bloom Gallery (redesigned)
// Organic SVG petals with gradients, veins, inner ring, sparkle burst, gold photo ring.
import { useState, useEffect, useCallback } from "react";
import img1  from "../assets/images/1.jpeg";
import img4  from "../assets/images/4.jpeg";
import img6  from "../assets/images/6.jpeg";
import img8  from "../assets/images/8.jpeg";
import img10 from "../assets/images/10.jpeg";
import img13 from "../assets/images/13.jpeg";
import img17 from "../assets/images/17.jpeg";
import img20 from "../assets/images/20.jpeg";
import img22 from "../assets/images/22.jpeg";
import img25 from "../assets/images/25.jpeg";
import img28 from "../assets/images/28.jpeg";
import img31 from "../assets/images/31.jpeg";
import img48 from "../assets/images/48.jpeg";
import img49 from "../assets/images/49.jpeg";
import img50 from "../assets/images/50.jpeg";
import img51 from "../assets/images/51.jpeg";
import img52 from "../assets/images/52.jpeg";
import img53 from "../assets/images/53.jpeg";
import img54 from "../assets/images/54.jpeg";

// ─── Flower data — each flower has its own color palette ──────────────────────
const FLOWERS = [
  // ── New 7 — shown first, bralette pic leads ──
  { src: img54, o1: "#93c5fd", o2: "#1e40af", i1: "#eff6ff", i2: "#bfdbfe", stamen: "#fbbf24", msg: "Blue lace. Black pants. Sand in her hair. Face to the sun. The sun blinked first." },
  { src: img48, o1: "#bae6fd", o2: "#0c4a6e", i1: "#e0f2fe", i2: "#7dd3fc", stamen: "#fef08a", msg: "The sea looked at her. She looked back. One of them was impossibly beautiful. The sea just happened to be in the photo too." },
  { src: img49, o1: "#fde8d8", o2: "#9a3412", i1: "#fff7ed", i2: "#fdba74", stamen: "#fef08a", msg: "The camera was already doing its best. You made it look effortless." },
  { src: img50, o1: "#1e1b4b", o2: "#312e81", i1: "#e0e7ff", i2: "#a5b4fc", stamen: "#fbbf24", msg: "Black tank. Black jacket. Black pants. All black everything — and still the brightest thing anywhere." },
  { src: img51, o1: "#bfdbfe", o2: "#1d4ed8", i1: "#eff6ff", i2: "#93c5fd", stamen: "#fde68a", msg: "That dress called. It said thank you for doing it justice." },
  { src: img52, o1: "#fde68a", o2: "#92400e", i1: "#fffbeb", i2: "#fcd34d", stamen: "#f97316", msg: "Golden hour. Black saree. White flower. Poetry tried to describe this. Gave up." },
  { src: img53, o1: "#bae6fd", o2: "#0369a1", i1: "#e0f2fe", i2: "#7dd3fc", stamen: "#fef08a", msg: "Sat at the shore and looked out at the sea. The waves kept coming back. Can't blame them." },
  // ── Original 12 ──
  { src: img1,  o1: "#ffd6e7", o2: "#f43f5e", i1: "#fff0f5", i2: "#fda4af", stamen: "#fbbf24", msg: "Some flowers only bloom once a year. Lucky for us — so do you." },
  { src: img4,  o1: "#e9d5ff", o2: "#7c3aed", i1: "#f5f3ff", i2: "#c4b5fd", stamen: "#fde68a", msg: "The book had no competition. Neither did the view." },
  { src: img6,  o1: "#bbf7d0", o2: "#059669", i1: "#ecfdf5", i2: "#6ee7b7", stamen: "#fef08a", msg: "That smile costs nothing and fixes absolutely everything." },
  { src: img8,  o1: "#f3e8ff", o2: "#9333ea", i1: "#faf5ff", i2: "#d8b4fe", stamen: "#fde68a", msg: "The whole garden leaned in. Same." },
  { src: img10, o1: "#bae6fd", o2: "#0284c7", i1: "#e0f2fe", i2: "#7dd3fc", stamen: "#fef08a", msg: "The ocean matched your energy. It didn't win." },
  { src: img13, o1: "#fecdd3", o2: "#e11d48", i1: "#fff1f2", i2: "#fda4af", stamen: "#fbbf24", msg: "Red flag? No. Red dress. Completely different problem." },
  { src: img17, o1: "#a7f3d0", o2: "#047857", i1: "#ecfdf5", i2: "#6ee7b7", stamen: "#fef08a", msg: "Looked this good on a Tuesday. Zero apologies." },
  { src: img20, o1: "#fed7aa", o2: "#c2410c", i1: "#fff7ed", i2: "#fdba74", stamen: "#fef3c7", msg: "Dog ears and still the most dangerous thing on screen." },
  { src: img22, o1: "#fef08a", o2: "#b45309", i1: "#fefce8", i2: "#fde047", stamen: "#f97316", msg: "That laugh should be bottled and sold. Cure for everything." },
  { src: img25, o1: "#c7d2fe", o2: "#3730a3", i1: "#eef2ff", i2: "#a5b4fc", stamen: "#fde68a", msg: "Power dressed in blue, quietly running the whole place." },
  { src: img28, o1: "#f5d0fe", o2: "#a21caf", i1: "#fdf4ff", i2: "#e879f9", stamen: "#fef08a", msg: "The mountain was cold. You were warm. Easy winner." },
  { src: img31, o1: "#fde68a", o2: "#b45309", i1: "#fffbeb", i2: "#fcd34d", stamen: "#f97316", msg: "Even the cartoon chef stopped to stare. Happy Birthday, Vidya! 🎂" },
];

// ─── Petal SVG path (organic bezier, base at bottom-center) ──────────────────
// w = petal width, h = petal height. Base is at (w/2, h), tip at (w/2, 0).
function makePetalPath(w, h) {
  const cx = w / 2;
  return (
    `M${cx},${h} ` +
    `C${w * 0.08},${h * 0.73} ${w * 0.05},${h * 0.25} ${cx},0 ` +
    `C${w * 0.95},${h * 0.25} ${w * 0.92},${h * 0.73} ${cx},${h}Z`
  );
}

const OW = 30, OH = 70;   // outer petal dimensions
const IW = 20, IH = 46;   // inner petal dimensions
const OUTER_PATH = makePetalPath(OW, OH);
const INNER_PATH = makePetalPath(IW, IH);
const PETAL_COUNT = 8;

// ─── Single flower bud ────────────────────────────────────────────────────────
function FlowerBud({ src, msg, o1, o2, i1, i2, stamen, index }) {
  const [open, setOpen]   = useState(false);

  const toggle = useCallback((e) => { e.preventDefault(); setOpen((v) => !v); }, []);

  const outerAngles = Array.from({ length: PETAL_COUNT }, (_, i) => (i / PETAL_COUNT) * 360);
  const innerAngles = Array.from({ length: PETAL_COUNT }, (_, i) => (i / PETAL_COUNT) * 360 + 22.5);

  return (
    <div className="flex flex-col items-center" style={{ width: 170, paddingBottom: 8 }}>

      {/* ── Flower head container ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Tap to bloom"
        style={{
          width: 176, height: 176,
          position: "relative",
          cursor: "pointer",
          flexShrink: 0,
          animation: `flowerEntrance 0.55s ease ${index * 65}ms both`,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onTouchStart={toggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen((v) => !v); }}
      >
        {/* ── Ambient glow when open ── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 180, height: 180,
          marginTop: -90, marginLeft: -90,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${o2}28 25%, transparent 68%)`,
          opacity: open ? 1 : 0,
          transition: "opacity 0.55s ease 0.15s",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── Photo circle ── */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 108, height: 108,
          marginTop: -54, marginLeft: -54,
          borderRadius: "50%",
          overflow: "hidden",
          zIndex: 2,
          border: open ? `3.5px solid #fbbf24` : "3.5px solid transparent",
          boxShadow: open
            ? `0 0 0 2px ${o2}55, 0 0 22px ${o2}55`
            : `0 2px 10px rgba(0,0,0,0.18)`,
          transition: "border-color 0.4s ease 0.22s, box-shadow 0.4s ease 0.22s",
        }}>
          <img src={src} alt="" draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* ── Outer petals (8) ── */}
        {outerAngles.map((angle, i) => (
          <div key={`o${i}`} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: OW, height: OH,
            marginTop: -OH,
            marginLeft: -(OW / 2),
            transformOrigin: `${OW / 2}px ${OH}px`,
            transform: open
              ? `rotate(${angle}deg) translateY(-16px)`
              : `rotate(3deg) scaleX(0.06) translateY(2px)`,
            transition: `transform 0.7s cubic-bezier(0.34,1.48,0.64,1) ${i * 30}ms`,
            pointerEvents: "none",
            zIndex: 3,
          }}>
            <svg width={OW} height={OH} viewBox={`0 0 ${OW} ${OH}`} overflow="visible">
              <defs>
                <radialGradient id={`fg${index}o${i}`} cx="50%" cy="74%" r="75%">
                  <stop offset="0%"   stopColor={o1} />
                  <stop offset="100%" stopColor={o2} />
                </radialGradient>
              </defs>
              {/* Petal body */}
              <path d={OUTER_PATH} fill={`url(#fg${index}o${i})`} />
              {/* Center vein */}
              <line x1={OW/2} y1={OH-2} x2={OW/2} y2={OH*0.09}
                stroke="rgba(255,255,255,0.45)" strokeWidth="0.85" />
              {/* Side veins */}
              <line x1={OW/2} y1={OH*0.60} x2={OW*0.18} y2={OH*0.38}
                stroke="rgba(255,255,255,0.22)" strokeWidth="0.55" />
              <line x1={OW/2} y1={OH*0.60} x2={OW*0.82} y2={OH*0.38}
                stroke="rgba(255,255,255,0.22)" strokeWidth="0.55" />
              {/* Shimmer highlight */}
              <ellipse cx={OW*0.37} cy={OH*0.28} rx={OW*0.12} ry={OH*0.09}
                fill="rgba(255,255,255,0.32)" />
            </svg>
          </div>
        ))}

        {/* ── Inner petals (8, offset 22.5°, shorter) ── */}
        {innerAngles.map((angle, i) => (
          <div key={`in${i}`} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: IW, height: IH,
            marginTop: -IH,
            marginLeft: -(IW / 2),
            transformOrigin: `${IW / 2}px ${IH}px`,
            transform: open
              ? `rotate(${angle}deg) translateY(-7px)`
              : `rotate(3deg) scaleX(0.07) translateY(2px)`,
            transition: `transform 0.65s cubic-bezier(0.34,1.5,0.64,1) ${i * 24 + 70}ms`,
            pointerEvents: "none",
            zIndex: 4,
          }}>
            <svg width={IW} height={IH} viewBox={`0 0 ${IW} ${IH}`}>
              <defs>
                <radialGradient id={`fg${index}in${i}`} cx="50%" cy="74%" r="75%">
                  <stop offset="0%"   stopColor={i1} />
                  <stop offset="100%" stopColor={i2} />
                </radialGradient>
              </defs>
              <path d={INNER_PATH} fill={`url(#fg${index}in${i})`} />
              <line x1={IW/2} y1={IH-1} x2={IW/2} y2={IH*0.09}
                stroke="rgba(255,255,255,0.42)" strokeWidth="0.7" />
              <ellipse cx={IW*0.37} cy={IH*0.29} rx={IW*0.14} ry={IH*0.1}
                fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
        ))}

        {/* ── Stamen — golden disc, visible when open ── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 28, height: 28,
          marginTop: -14, marginLeft: -14,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 34%, #fef9c3, #fbbf24 55%, #f59e0b)",
          boxShadow: open ? "0 0 14px #fbbf2466" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.2)",
          transition: "opacity 0.28s ease 0.32s, transform 0.32s cubic-bezier(0.34,1.6,0.64,1) 0.28s, box-shadow 0.3s ease 0.32s",
          zIndex: 7,
        }} />

        {/* ── Closed bud nub ── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 32, height: 32,
          marginTop: -16, marginLeft: -16,
          borderRadius: "50%",
          background: `radial-gradient(circle at 38% 32%, ${i1}, ${o2})`,
          opacity: open ? 0 : 1,
          transform: open ? "scale(0)" : "scale(1)",
          transition: "opacity 0.18s ease, transform 0.22s ease",
          zIndex: 8,
        }} />

        {/* ── Calyx — 5 green sepals, hide on open ── */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`c${i}`} style={{
            position: "absolute",
            width: 15, height: 26,
            top: "50%", left: "50%",
            marginTop: -26, marginLeft: -7.5,
            transformOrigin: "7.5px 26px",
            borderRadius: "50% 50% 36% 36% / 60% 60% 40% 40%",
            background: "linear-gradient(168deg, #86efac, #15803d)",
            transform: `rotate(${(i / 5) * 360}deg) translateY(-14%)`,
            opacity: open ? 0 : 0.9,
            transition: `opacity 0.2s ease ${i * 18}ms`,
            zIndex: 6,
          }} />
        ))}

        {/* ── Sparkle burst — only mounted when open, animates immediately ── */}
        {open && Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * 360;
          const rad   = ((angle - 90) * Math.PI) / 180;
          const dist  = 78 + (i % 2) * 14;
          const tx    = Math.cos(rad) * dist;
          const ty    = Math.sin(rad) * dist;
          const size  = i % 2 === 0 ? 9 : 6;
          return (
            <div key={i} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: size, height: size,
              marginTop: -(size / 2), marginLeft: -(size / 2),
              pointerEvents: "none", zIndex: 9,
              // CSS custom props for the keyframe
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              animation: `sparkBurst 0.8s ease ${i * 35}ms forwards`,
            }}>
              <svg width={size} height={size} viewBox="0 0 10 10">
                <path d="M5 0 L5.8 4.2 L10 5 L5.8 5.8 L5 10 L4.2 5.8 L0 5 L4.2 4.2 Z"
                  fill={i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? o2 : o1} />
              </svg>
            </div>
          );
        })}
      </div>

      {/* ── Stem ── */}
      <div style={{
        width: 5, height: 54,
        background: "linear-gradient(to bottom, #86efac, #166534)",
        borderRadius: "0 0 3px 3px",
        flexShrink: 0, position: "relative",
      }}>
        <div style={{ position:"absolute", width:26, height:14,
          background:"linear-gradient(138deg,#86efac,#15803d)",
          borderRadius:"100% 0 100% 0",
          top:12, right:"100%",
          transform:"rotate(-28deg)", transformOrigin:"right center" }} />
        <div style={{ position:"absolute", width:26, height:14,
          background:"linear-gradient(222deg,#4ade80,#166534)",
          borderRadius:"0 100% 0 100%",
          top:28, left:"100%",
          transform:"rotate(28deg)", transformOrigin:"left center" }} />
      </div>

      {/* ── Message ── */}
      <p style={{
        marginTop: 10, minHeight: 50, maxWidth: 152,
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.45s ease 0.28s, transform 0.45s ease 0.28s",
        textAlign: "center",
        fontFamily: "Dancing Script, cursive",
        fontSize: 14, lineHeight: 1.5,
        color: o2,
        padding: "0 4px",
        pointerEvents: "none", userSelect: "none",
      }}>
        {msg}
      </p>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function FlowerGallery({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <style>{`
        @keyframes flowerEntrance {
          from { opacity: 0; transform: translateY(24px) scale(0.82); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes titleBob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%       { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes sparkBurst {
          0%   { transform: translate(0,0) scale(0.4); opacity: 1; }
          65%  { opacity: 0.9; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.7); opacity: 0; }
        }
      `}</style>

      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "rgba(253,244,255,0.2)",
        backdropFilter: "blur(7px)",
      }} onClick={onClose} />

      {/* Panel */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 91,
          background: "linear-gradient(150deg, #fff0fb 0%, #f0fdf4 50%, #fefce8 100%)",
          overflowY: "auto",
          display: "flex", flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close flower gallery"
          style={{
            position: "fixed", top: 20, right: 20, zIndex: 92,
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #db2777, #7c3aed)",
            color: "white", border: "none", cursor: "pointer",
            fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(219,39,119,0.45)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "44px 24px 16px", userSelect: "none" }}>
          <h1 style={{
            fontFamily: "Dancing Script, cursive",
            fontSize: "clamp(30px, 6vw, 50px)",
            color: "#be185d",
            marginBottom: 10,
            animation: "titleBob 3.8s ease-in-out infinite",
            display: "inline-block",
          }}>
            🌸 Flower Bloom Gallery
          </h1>
          <p style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 13, letterSpacing: "0.08em",
            color: "#9d174d", fontWeight: 500,
          }}>
            hover or tap each flower to reveal a secret 🌷
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "4px 12px",
          padding: "16px 32px 72px",
          maxWidth: 1060,
          margin: "0 auto",
          width: "100%",
          alignItems: "start",
        }}>
          {FLOWERS.map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <FlowerBud {...f} index={i} />
            </div>
          ))}
        </div>

        {/* Grass footer */}
        <div style={{
          position: "sticky", bottom: 0, height: 36,
          background: "linear-gradient(to top, #bbf7d0aa, transparent)",
          pointerEvents: "none",
        }} />
      </div>
    </>
  );
}