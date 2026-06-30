// src/components/WishJar.jsx
// A glowing mason jar — click to add stars + wishes. Fill all 7 to unlock a hidden message.
import { useEffect, useRef, useState } from "react";

const TOTAL_STARS = 7;

const WISHES = [
  "May you always laugh until your stomach hurts 🤣",
  "May every morning feel like your favourite song 🎵",
  "May the universe keep surprising you with beautiful things ✨",
  "May your heart stay light and your dreams stay loud 💫",
  "May you always find warmth in the people who love you 🌸",
  "May this year overflow with joy, travel, and cake 🎂",
  "May every wish you've ever kept secret finally come true 🌟",
];

const HIDDEN_MSG = [
  "You opened every single star. 🌟",
  "",
  "Here's the secret this jar was keeping:",
  "",
  "There is someone who thinks of you",
  "every single day — not just on birthdays.",
  "",
  "Someone who hopes you wake up tomorrow",
  "a little happier than today.",
  "",
  "That someone is me.",
  "",
  "Happy Birthday, Vidya. 💜",
  "— Syed Adnan",
];

// Flying star particle
function StarParticle({ id, onDone }) {
  const angle = (Math.random() * 40 - 20);   // random slight spread
  const dur   = 500 + Math.random() * 200;
  useEffect(() => {
    const t = setTimeout(onDone, dur + 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: "absolute",
      top: "50%", left: "50%",
      fontSize: "22px",
      pointerEvents: "none",
      zIndex: 10,
      animationName: "starFly",
      animationDuration: `${dur}ms`,
      animationFillMode: "forwards",
      animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      "--angle": `${angle}deg`,
    }}>⭐</div>
  );
}

export default function WishJar({ onClose }) {
  const [stars,       setStars]       = useState(0);       // 0–7 filled
  const [currentWish, setCurrentWish] = useState(null);    // index of shown wish
  const [particles,   setParticles]   = useState([]);      // flying star particles
  const [unlocked,    setUnlocked]    = useState(false);   // hidden message
  const [wishVisible, setWishVisible] = useState(false);   // wish card animation
  const [mounted,     setMounted]     = useState(false);
  const [shaking,     setShaking]     = useState(false);   // jar shake on click
  const nextId = useRef(0);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleJarClick = () => {
    if (stars >= TOTAL_STARS) return;

    // Shake jar
    setShaking(true);
    setTimeout(() => setShaking(false), 500);

    // Spawn flying star
    const pid = nextId.current++;
    setParticles(p => [...p, pid]);

    // After fly, add star & show wish
    setTimeout(() => {
      setStars(s => {
        const next = s + 1;
        setCurrentWish(s); // s is 0-indexed, wish[s] matches this star
        setWishVisible(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setWishVisible(true)));
        if (next === TOTAL_STARS) {
          setTimeout(() => setUnlocked(true), 1800);
        }
        return next;
      });
    }, 550);
  };

  const removeParticle = (id) => setParticles(p => p.filter(x => x !== id));

  // Jar fill level (0–7 → 0–100%)
  const fillPct = (stars / TOTAL_STARS) * 80; // max 80% height of jar body

  return (
    <>
      <style>{`
        @keyframes overlayFade { from{opacity:0} to{opacity:1} }
        @keyframes jarFloat {
          0%,100% { transform:translateY(0) rotate(-1deg); }
          50%      { transform:translateY(-8px) rotate(1deg); }
        }
        @keyframes jarShake {
          0%,100% { transform:translateX(0) rotate(-1deg); }
          20%     { transform:translateX(-6px) rotate(-3deg); }
          40%     { transform:translateX(6px) rotate(2deg); }
          60%     { transform:translateX(-4px) rotate(-2deg); }
          80%     { transform:translateX(4px) rotate(1deg); }
        }
        @keyframes starFly {
          from { transform:translate(-50%,-50%) scale(0.4); opacity:1; }
          to   { transform:translate(-50%, -280%) scale(1.3) rotate(calc(var(--angle))); opacity:0; }
        }
        @keyframes wishSlide {
          from { opacity:0; transform:translateY(18px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes fillRise {
          from { height:0; }
          to   { height:var(--fill-h); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 30px rgba(250,204,21,0.35), 0 0 60px rgba(250,204,21,0.15); }
          50%     { box-shadow: 0 0 50px rgba(250,204,21,0.65), 0 0 100px rgba(250,204,21,0.3); }
        }
        @keyframes sparkIn {
          0%   { opacity:0; transform:scale(0) rotate(-30deg); }
          60%  { opacity:1; transform:scale(1.2) rotate(5deg);  }
          100% { opacity:1; transform:scale(1)   rotate(0deg);  }
        }
        @keyframes starInJar {
          from { opacity:0; transform:scale(0) translateY(8px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes unlockBurst {
          0%   { opacity:0; transform:scale(0.6) translateY(20px); }
          65%  { opacity:1; transform:scale(1.04) translateY(-4px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes floatHeart {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-6px); }
        }
        @keyframes shimmerGold {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 20%, #fde68a 40%, #fbbf24 60%, #f97316 80%, #fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(8, 2, 20, 0.9)",
          backdropFilter: "blur(10px)",
          animation: "overlayFade 0.4s ease both",
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="gold-shimmer" style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2rem, 6vw, 2.8rem)",
              fontWeight: 700,
              display: "block",
            }}>
              Wish Jar ✨
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(253,230,138,0.6)",
              marginTop: "4px",
            }}>
              {stars < TOTAL_STARS
                ? `Click the jar to add a wish — ${TOTAL_STARS - stars} star${TOTAL_STARS - stars !== 1 ? "s" : ""} to go`
                : "All wishes collected! ✨"}
            </p>
          </div>

          {/* ── Jar SVG-like structure ── */}
          <div style={{ position: "relative", cursor: stars < TOTAL_STARS ? "pointer" : "default" }}
            onClick={handleJarClick}>

            {/* Flying star particles */}
            {particles.map(id => (
              <StarParticle key={id} id={id} onDone={() => removeParticle(id)} />
            ))}

            {/* Outer glow ring */}
            <div style={{
              position: "absolute", inset: "-16px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(250,204,21,0.18) 0%, transparent 72%)",
              animation: "glowPulse 2.5s ease-in-out infinite",
              pointerEvents: "none",
            }} />

            {/* Jar lid */}
            <div style={{
              width: "120px",
              height: "22px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(200,200,200,0.1))",
              borderRadius: "8px 8px 0 0",
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderBottom: "none",
              margin: "0 auto",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 -4px 12px rgba(250,204,21,0.15)",
            }} />

            {/* Jar collar ring */}
            <div style={{
              width: "134px",
              height: "14px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(180,180,180,0.12))",
              borderRadius: "4px",
              border: "1.5px solid rgba(255,255,255,0.22)",
              margin: "-2px auto 0",
              position: "relative",
              zIndex: 2,
            }} />

            {/* Jar body */}
            <div style={{
              width: "148px",
              height: "190px",
              borderRadius: "10px 10px 22px 22px",
              background: [
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                "linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.08) 100%)",
              ].join(", "),
              border: "1.5px solid rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
              animation: shaking
                ? "jarShake 0.5s ease"
                : "jarFloat 4s ease-in-out infinite",
              boxShadow: [
                "0 8px 32px rgba(0,0,0,0.5)",
                "0 0 0 1px rgba(255,255,255,0.06)",
                "inset 2px 0 6px rgba(255,255,255,0.07)",
              ].join(", "),
            }}>
              {/* Liquid fill — rises with each star */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: `${fillPct}%`,
                background: "linear-gradient(to top, rgba(250,204,21,0.55), rgba(253,230,138,0.25))",
                transition: "height 0.7s cubic-bezier(0.34,1.56,0.64,1)",
                borderRadius: "0 0 20px 20px",
              }}>
                {/* Liquid shimmer */}
                <div style={{
                  position: "absolute", top: 0, left: "-50%",
                  width: "200%", height: "8px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  borderRadius: "50%",
                  transform: "translateY(-50%)",
                  animation: "shimmerGold 2s linear infinite",
                }} />
              </div>

              {/* Stars inside the jar */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-end",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 12px 18px",
              }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} style={{
                    fontSize: "22px",
                    animation: `starInJar 0.4s ${i === stars - 1 ? "0s" : "0s"} ease both`,
                    display: "inline-block",
                    filter: "drop-shadow(0 0 6px rgba(250,204,21,0.9))",
                    textShadow: "0 0 10px rgba(250,204,21,1)",
                  }}>⭐</span>
                ))}
              </div>

              {/* Jar reflection streak */}
              <div style={{
                position: "absolute",
                top: "10%", left: "12%",
                width: "6px", height: "55%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
                borderRadius: "4px",
                pointerEvents: "none",
              }} />
            </div>

            {/* Click hint */}
            {stars === 0 && (
              <div style={{
                textAlign: "center",
                marginTop: "10px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                color: "rgba(253,230,138,0.45)",
                animation: "floatHeart 2s ease-in-out infinite",
              }}>👆 tap to add a wish</div>
            )}
          </div>

          {/* ── Wish card ── */}
          {currentWish !== null && !unlocked && (
            <div
              key={currentWish}
              style={{
                width: "100%",
                padding: "18px 24px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(253,230,138,0.06))",
                border: "1.5px solid rgba(250,204,21,0.3)",
                backdropFilter: "blur(6px)",
                textAlign: "center",
                animation: wishVisible ? "wishSlide 0.5s ease both" : "none",
                opacity: wishVisible ? 1 : 0,
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌟</div>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
                color: "#fde68a",
                lineHeight: 1.6,
                textShadow: "0 0 16px rgba(250,204,21,0.4)",
              }}>
                {WISHES[currentWish]}
              </p>
              <div style={{
                marginTop: "10px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                color: "rgba(253,230,138,0.4)",
                letterSpacing: "0.1em",
              }}>
                {stars}/{TOTAL_STARS} stars ✦
              </div>
            </div>
          )}

          {/* ── Hidden message unlock ── */}
          {unlocked && (
            <div style={{
              width: "100%",
              padding: "24px 28px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(192,132,252,0.12), rgba(244,114,182,0.09))",
              border: "1.5px solid rgba(244,114,182,0.4)",
              backdropFilter: "blur(8px)",
              textAlign: "center",
              animation: "unlockBurst 0.8s ease both",
            }}>
              <div style={{
                fontSize: "30px",
                marginBottom: "12px",
                animation: "sparkIn 0.6s 0.3s ease both",
                display: "inline-block",
              }}>💜</div>

              <div style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1rem, 3vw, 1.25rem)",
                lineHeight: 2,
                color: "#e9d5ff",
              }}>
                {HIDDEN_MSG.map((line, i) => (
                  <div key={i} style={{
                    minHeight: line === "" ? "0.6em" : undefined,
                    fontWeight: line.startsWith("—") ? 700 : 400,
                    color: line.startsWith("—") ? "#f9a8d4" : "#e9d5ff",
                    fontSize: line.startsWith("—") ? "clamp(1.2rem, 4vw, 1.6rem)" : undefined,
                    animation: `unlockBurst 0.6s ${0.1 + i * 0.06}s ease both`,
                    opacity: 0,
                    animationFillMode: "both",
                  }}>{line}</div>
                ))}
              </div>

              <div style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                fontSize: "20px",
                animation: "unlockBurst 0.6s 1.2s both",
              }}>
                {["🌟","💜","✨","💖","🌸","⭐","🦋"].map((e, i) => (
                  <span key={i} style={{
                    animation: `floatHeart 2.2s ${i*0.2}s ease-in-out infinite`,
                    display: "inline-block",
                  }}>{e}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Close × */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "14px", right: "18px",
            background: "none",
            border: "1.5px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.4)",
            width: "36px", height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="rgba(255,255,255,0.4)"; }}
        >×</button>
      </div>
    </>
  );
}
