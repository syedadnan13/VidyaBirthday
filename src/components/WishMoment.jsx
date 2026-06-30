// components/WishMoment.jsx — cute girly edition ✨
// Full-screen "Make a Wish" shown at midnight July 17.
import { useEffect, useRef, useState } from "react";

const CANDLE_COUNT = 7;

// Pastel candle wax colors
const WAXCOLORS = [
  "linear-gradient(to bottom, #fda4af, #fb7185, #f43f5e)",
  "linear-gradient(to bottom, #d8b4fe, #c084fc, #a855f7)",
  "linear-gradient(to bottom, #fdba74, #fb923c, #f97316)",
  "linear-gradient(to bottom, #86efac, #4ade80, #22c55e)",
  "linear-gradient(to bottom, #93c5fd, #60a5fa, #3b82f6)",
  "linear-gradient(to bottom, #f9a8d4, #f472b6, #ec4899)",
  "linear-gradient(to bottom, #fde68a, #fbbf24, #f59e0b)",
];

const PETAL_EMOJIS = ["🌸","🌷","💮","🌺","🌹","💐"];
const PETALS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
  left: ((i * 67 + 11) % 96),
  delay: ((i * 0.41) % 5).toFixed(2),
  dur:   (3 + (i * 0.37) % 3).toFixed(1),
  size:  (14 + (i * 7) % 18),
}));

const SPARKLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top:  ((i * 53 + 7)  % 95),
  left: ((i * 79 + 13) % 97),
  delay: ((i * 0.17) % 2.4).toFixed(2),
  glyph: (i % 2 === 0 ? "✦" : "✧"),
}));

// ── placeholder so no ref errors ──
const STARS = Array.from({ length: 0 }, (_, i) => ({
  id: i,
  size: ((i % 3) + 1).toFixed(0),
  top: ((i * 41 + 3) % 97),
  left: ((i * 67 + 9) % 98),
  delay: ((i * 0.29) % 2.5).toFixed(2),
}));

// ── Single Candle ──────────────────────────────────────────────────────────
function Candle({ index, blown, onClick }) {
  const [smoking, setSmoking] = useState(false);

  const heights = [88, 108, 74, 120, 96, 80, 112];
  const h = heights[index % heights.length];
  const wax = WAXCOLORS[index % WAXCOLORS.length];

  const handleClick = () => {
    if (blown || smoking) return;
    setSmoking(true);
    setTimeout(() => { onClick(index); setSmoking(false); }, 750);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      style={{ gap: 0 }}
      onClick={handleClick}
      title="Blow me out! 🌬️"
    >
      {/* Flame area */}
      <div style={{ height: "52px", width: "28px", position: "relative" }}>
        {/* Smoke puffs */}
        {smoking && [0,1,2].map(i => (
          <div key={i} style={{
            position: "absolute",
            top: `${-4 - i*4}px`,
            left: "50%",
            width: `${12 + i*8}px`,
            height: `${12 + i*8}px`,
            borderRadius: "50%",
            background: "rgba(220,180,210,0.55)",
            transform: "translateX(-50%)",
            animationName: "smokeRise",
            animationDuration: "0.75s",
            animationDelay: `${i*0.13}s`,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
            pointerEvents: "none",
          }} />
        ))}

        {!blown && !smoking && (
          <>
            {/* Glow halo */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "38px", height: "50px",
              borderRadius: "50% 50% 30% 30%",
              background: "radial-gradient(ellipse at 50% 80%, rgba(255,180,120,0.45) 0%, transparent 72%)",
              animationName: "flameGlow",
              animationDuration: "1.3s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDirection: "alternate",
            }} />
            {/* Flame */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "15px", height: "38px",
              background: "linear-gradient(to top, #f97316 0%, #fbbf24 35%, #fef3c7 75%, #fff 100%)",
              borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
              animationName: "flicker",
              animationDuration: "0.85s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              animationDirection: "alternate",
              filter: "blur(0.4px)",
            }} />
            {/* Tiny heart sparkle above flame */}
            <div style={{
              position: "absolute", top: "-2px", left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              animationName: "heartPop",
              animationDuration: "1.8s",
              animationIterationCount: "infinite",
              opacity: 0.85,
            }}>💗</div>
          </>
        )}

        {/* Blown-out puff */}
        {blown && (
          <div style={{
            position: "absolute", bottom: "8px", left: "50%",
            transform: "translateX(-50%)",
            fontSize: "16px", opacity: 0.55,
          }}>💨</div>
        )}
      </div>

      {/* Pastel wax body */}
      <div style={{
        width: "20px",
        height: `${h}px`,
        background: blown ? "linear-gradient(to bottom, #e9d5ff, #c4b5fd)" : wax,
        borderRadius: "6px 6px 3px 3px",
        boxShadow: blown ? "none" : "0 0 14px rgba(244,114,182,0.55)",
        transition: "background 0.5s, box-shadow 0.5s",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.22)",
      }}>
        {!blown && (
          <>
            <div style={{
              position: "absolute", top: "8px", left: "3px",
              width: "5px", height: "14px",
              background: "rgba(255,255,255,0.38)",
              borderRadius: "0 0 6px 6px",
            }} />
            <div style={{
              position: "absolute", top: "32%", left: "50%",
              transform: "translateX(-50%)",
              fontSize: "8px", lineHeight: 1, opacity: 0.55,
            }}>✦</div>
          </>
        )}
      </div>

      {/* Ruffled base */}
      <div style={{
        width: "30px", height: "10px",
        background: blown
          ? "linear-gradient(to bottom, #ddd6fe, #c4b5fd)"
          : "linear-gradient(to bottom, #fce7f3, #fbcfe8)",
        borderRadius: "50% 50% 4px 4px / 30% 30% 4px 4px",
        border: "1px solid rgba(244,114,182,0.4)",
      }} />
    </div>
  );
}

// ── Main WishMoment overlay ────────────────────────────────────────────────
export default function WishMoment({ onDone }) {
  const [blown, setBlown]        = useState(Array(CANDLE_COUNT).fill(false));
  const [allOut, setAllOut]      = useState(false);
  const [burstVisible, setBurst] = useState(false);
  const [hint, setHint]          = useState(true);
  const [mounted, setMounted]    = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Hide hint after 3.5 s
  useEffect(() => {
    const id = setTimeout(() => setHint(false), 3500);
    return () => clearTimeout(id);
  }, []);

  const blowCandle = (index) => {
    setBlown((prev) => {
      const next = [...prev];
      next[index] = true;
      const allBlown = next.every(Boolean);
      if (allBlown) {
        setTimeout(() => {
          setAllOut(true);
          setTimeout(() => setBurst(true), 400);
        }, 300);
      }
      return next;
    });
  };

  const blownCount = blown.filter(Boolean).length;

  return (
    <>
      {/* ── Injected keyframes ── */}
      <style>{`
        @keyframes flicker {
          0%   { transform: translateX(-50%) scaleX(1)    scaleY(1)    rotate(-1deg); }
          100% { transform: translateX(-50%) scaleX(0.82) scaleY(1.12) rotate(2.5deg); }
        }
        @keyframes flameGlow {
          0%   { opacity:0.45; transform:translateX(-50%) scale(1); }
          100% { opacity:0.9;  transform:translateX(-50%) scale(1.28); }
        }
        @keyframes smokeRise {
          0%   { opacity:0.7; transform:translateX(-50%) translateY(0)     scale(0.5); }
          100% { opacity:0;   transform:translateX(-50%) translateY(-40px) scale(2);   }
        }
        @keyframes heartPop {
          0%,100% { transform:translateX(-50%) scale(1)    translateY(0);   opacity:0.75; }
          50%     { transform:translateX(-50%) scale(1.4)  translateY(-5px); opacity:1; }
        }
        @keyframes petalFall {
          0%   { transform:translateY(-30px) rotate(0deg);   opacity:0.9; }
          100% { transform:translateY(110vh)  rotate(540deg); opacity:0;   }
        }
        @keyframes sparkleWink {
          0%,100% { opacity:0.1; transform:scale(0.7); }
          50%     { opacity:1;   transform:scale(1.3); }
        }
        @keyframes wishBurst {
          0%   { opacity:0; transform:scale(0.55) translateY(24px); }
          65%  { opacity:1; transform:scale(1.05) translateY(-5px);  }
          100% { opacity:1; transform:scale(1)    translateY(0);     }
        }
        @keyframes textPop {
          0%   { opacity:0; letter-spacing:-0.04em; transform:scale(0.9); }
          70%  { opacity:1; letter-spacing: 0.05em; transform:scale(1.02); }
          100% { opacity:1; letter-spacing: 0.01em; transform:scale(1); }
        }
        @keyframes floatUp {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ribbonGlow {
          0%,100% { box-shadow:0 0 22px rgba(244,114,182,0.3), inset 0 0 20px rgba(255,255,255,0.04); }
          50%     { box-shadow:0 0 50px rgba(244,114,182,0.65), inset 0 0 30px rgba(255,255,255,0.09); }
        }
        .wish-shimmer {
          background: linear-gradient(90deg, #f9a8d4 0%, #e879f9 20%, #c084fc 40%, #f9a8d4 60%, #fb7185 80%, #f9a8d4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* ── Outer wrapper — soft deep-rose/plum gradient ── */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #2d0036 0%, #1a0030 30%, #0f0225 60%, #1c0a3a 100%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        {/* Falling flower petals */}
        {PETALS.map(p => (
          <div key={p.id} style={{
            position: "absolute", top: "-40px", left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
            pointerEvents: "none",
          }}>{p.emoji}</div>
        ))}

        {/* Sparkle field */}
        {SPARKLES.map(s => (
          <div key={s.id} style={{
            position: "absolute", top: `${s.top}%`, left: `${s.left}%`,
            color: "#f9a8d4", fontSize: "14px",
            animation: `sparkleWink ${1.5 + parseFloat(s.delay)}s ${s.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }}>{s.glyph}</div>
        ))}

        {/* ── Candle scene ── */}
        {!allOut && (
          <div className="flex flex-col items-center gap-5 px-4"
            style={{ opacity: allOut ? 0 : 1, transition: "opacity 0.6s" }}>

            {/* Heading */}
            <div className="text-center">
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
                color: "rgba(249,168,212,0.65)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "6px",
                animation: "textPop 0.9s both",
              }}>✦ July 17, 2026 · Midnight ✦</p>

              <h1 className="wish-shimmer" style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2.2rem, 6.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                animation: "textPop 1s 0.15s both",
                display: "block",
              }}>
                Make a Wish, Vidya 🎀
              </h1>

              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                color: "rgba(216,180,254,0.75)",
                marginTop: "8px",
                animation: "textPop 1s 0.3s both",
              }}>
                {blownCount === 0
                  ? "💨 Click each candle to blow it out ~"
                  : blownCount === CANDLE_COUNT
                  ? "✨ All done, your wish is on its way! ✨"
                  : `🕯️ ${CANDLE_COUNT - blownCount} little flame${CANDLE_COUNT - blownCount !== 1 ? "s" : ""} still dancing...`}
              </p>
            </div>

            {/* Cake card */}
            <div style={{
              animation: "ribbonGlow 2.5s ease-in-out infinite",
              padding: "24px 28px 16px",
              borderRadius: "28px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(244,114,182,0.06) 100%)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(244,114,182,0.3)",
            }}>
              {/* Candle row */}
              <div className="flex items-end gap-3 md:gap-5 justify-center">
                {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
                  <Candle key={i} index={i} blown={blown[i]} onClick={blowCandle} />
                ))}
              </div>

              {/* Cake tier 1 */}
              <div style={{
                marginTop: "8px",
                height: "28px",
                background: "linear-gradient(90deg, #fce7f3, #fdf2f8, #f3e8ff, #fce7f3)",
                backgroundSize: "200% auto",
                animation: "shimmer 4s linear infinite",
                borderRadius: "10px 10px 0 0",
                border: "1.5px solid rgba(244,114,182,0.45)",
                borderBottom: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              }}>
                {["🌸","🎀","💜","🎀","🌸"].map((e,i) => (
                  <span key={i} style={{ fontSize: "12px" }}>{e}</span>
                ))}
              </div>

              {/* Cake tier 2 */}
              <div style={{
                height: "36px",
                background: "linear-gradient(90deg, #fbcfe8, #fce7f3, #e9d5ff, #fbcfe8)",
                backgroundSize: "200% auto",
                animation: "shimmer 3.5s linear infinite",
                borderRadius: "0 0 14px 14px",
                border: "1.5px solid rgba(244,114,182,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              }}>
                {["💗","✨","🌷","💕","⭐","🌷","💗"].map((e,i) => (
                  <span key={i} style={{ fontSize: "11px" }}>{e}</span>
                ))}
              </div>
            </div>

            {/* Floating hint */}
            {hint && blownCount === 0 && (
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                color: "rgba(249,168,212,0.5)",
                animation: "floatUp 2s ease-in-out infinite",
              }}>
                💗 tap a candle to blow it out 💗
              </div>
            )}
          </div>
        )}

        {/* ── Post-burst: birthday message ── */}
        {burstVisible && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ animation: "wishBurst 1s both" }}
          >
            {/* Giant floating cake */}
            <div style={{
              fontSize: "clamp(4rem, 12vw, 7rem)",
              marginBottom: "16px",
              animation: "floatUp 3s ease-in-out infinite",
              filter: "drop-shadow(0 0 30px rgba(244,114,182,0.9)) drop-shadow(0 0 60px rgba(192,132,252,0.5))",
            }}>🎂</div>

            {/* Shimmer heading */}
            <h1 className="wish-shimmer" style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              fontWeight: 700,
              marginBottom: "12px",
              animation: "textPop 1s 0.2s both",
            }}>
              Happy Birthday, Vidya! 🎀
            </h1>

            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
              color: "#f9a8d4",
              marginBottom: "6px",
              animation: "wishBurst 1s 0.4s both",
              textShadow: "0 0 20px rgba(244,114,182,0.6)",
            }}>Your wish has been sent to the stars ✨</p>

            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1rem, 2.8vw, 1.6rem)",
              color: "#d8b4fe",
              marginBottom: "28px",
              animation: "wishBurst 1s 0.6s both",
            }}>May every dream bloom like flowers 🌸💜</p>

            {/* Emoji balloons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10" style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              animation: "wishBurst 1s 0.9s both",
            }}>
              {["🎉","🌸","💜","🎊","💖","🌷","✨","🎈","🌟","🎀","💗","🦋"].map((e, i) => (
                <span key={i} className="animate-balloon"
                  style={{ animationDelay:`${i*0.12}s`, display:"inline-block" }}>
                  {e}
                </span>
              ))}
            </div>

            {/* Cute dismiss pill */}
            <button
              onClick={onDone}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "10px 28px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #f472b6, #c084fc)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(244,114,182,0.6)",
                animation: "wishBurst 1s 1.2s both",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.07)"; e.currentTarget.style.boxShadow="0 0 38px rgba(244,114,182,0.85)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";    e.currentTarget.style.boxShadow="0 0 24px rgba(244,114,182,0.6)"; }}
            >
              Enter the celebration 🌸
            </button>
          </div>
        )}
      </div>
    </>
  );
}
