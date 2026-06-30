// components/ConfettiCannon.jsx
// Fires a one-shot confetti explosion from the viewport centre on mount.
// Pure CSS animations — no external library.
import { useEffect, useRef } from "react";

// ── Config ───────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 120;
const EMOJI_COUNT    = 22;
const DURATION_MS    = 3200;   // how long until the container removes itself

const COLORS = [
  "#f472b6","#ec4899","#a78bfa","#8b5cf6",
  "#34d399","#fbbf24","#fb923c","#60a5fa",
  "#f43f5e","#e879f9","#fde68a","#4ade80",
];

const EMOJIS = ["🎉","🌸","💜","🎊","⭐","✨","🎈","💖","🌟","🎀"];

// Shapes for confetti pieces
const SHAPES = ["circle","rect","ribbon"];

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr)       { return arr[Math.floor(Math.random() * arr.length)]; }

// ── Generate all particle data once (deterministic per mount) ─────────────
function generateParticles() {
  const particles = [];

  // — Colored confetti pieces —
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle   = rand(0, 360);                    // launch direction (deg)
    const speed   = rand(120, 420);                  // px of travel
    const spinDeg = rand(-720, 720);                 // end rotation
    const delay   = rand(0, 280);                    // ms stagger
    const dur     = rand(1600, DURATION_MS);         // animation length ms
    const size    = rand(6, 14);
    const shape   = pick(SHAPES);
    const color   = pick(COLORS);

    const rad     = (angle * Math.PI) / 180;
    const tx      = Math.cos(rad) * speed;
    const ty      = Math.sin(rad) * speed - rand(60, 200); // slight upward bias

    particles.push({ type: "piece", tx, ty, spinDeg, delay, dur, size, shape, color });
  }

  // — Emoji confetti —
  for (let i = 0; i < EMOJI_COUNT; i++) {
    const angle  = rand(0, 360);
    const speed  = rand(80, 280);
    const dur    = rand(1400, DURATION_MS);
    const delay  = rand(0, 400);
    const size   = rand(18, 32);
    const rad    = (angle * Math.PI) / 180;
    const tx     = Math.cos(rad) * speed;
    const ty     = Math.sin(rad) * speed - rand(40, 160);

    particles.push({ type: "emoji", tx, ty, delay, dur, size, emoji: pick(EMOJIS) });
  }

  return particles;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function ConfettiCannon({ onDone }) {
  const containerRef = useRef(null);
  const particles    = useRef(generateParticles());

  // Remove container after longest animation + a buffer, then notify parent
  useEffect(() => {
    const id = setTimeout(() => {
      onDone?.();
    }, DURATION_MS + 500);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Inject the keyframe once via a <style> tag */}
      <style>{`
        @keyframes cc-fly {
          0%   { transform: translate(0,0) rotate(0deg) scale(1);   opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--spin)) scale(0.4); opacity: 0; }
        }
      `}</style>

      {particles.current.map((p, i) => {
        const sharedStyle = {
          position:        "absolute",
          left:            "50%",
          top:             "50%",
          willChange:      "transform, opacity",
          "--tx":          `${p.tx}px`,
          "--ty":          `${p.ty}px`,
          "--spin":        p.type === "piece" ? `${p.spinDeg}deg` : "0deg",
          animation:       `cc-fly ${p.dur}ms cubic-bezier(0.22,1,0.36,1) ${p.delay}ms both`,
        };

        if (p.type === "emoji") {
          return (
            <span
              key={i}
              style={{
                ...sharedStyle,
                fontSize:       `${p.size}px`,
                lineHeight:     1,
                userSelect:     "none",
                transform:      "translate(-50%,-50%)",
              }}
            >
              {p.emoji}
            </span>
          );
        }

        // Colored piece
        const isCircle  = p.shape === "circle";
        const isRibbon  = p.shape === "ribbon";
        return (
          <div
            key={i}
            style={{
              ...sharedStyle,
              width:            isRibbon ? `${p.size * 0.4}px` : `${p.size}px`,
              height:           isRibbon ? `${p.size * 2.2}px` : `${p.size}px`,
              background:       p.color,
              borderRadius:     isCircle ? "50%" : isRibbon ? "2px" : "2px",
              opacity:          1,
              transform:        "translate(-50%,-50%)",
              boxShadow:        `0 0 ${p.size / 2}px ${p.color}55`,
            }}
          />
        );
      })}
    </div>
  );
}
