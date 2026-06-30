// src/components/LoveLetter.jsx
// A full-screen love letter that types itself out, ending with a wax seal.
import { useEffect, useRef, useState } from "react";

// ── Letter content ────────────────────────────────────────────────────────
const LINES = [
  "My dearest Vidya,",
  "",
  "I have been sitting here, trying to find words worthy of you —",
  "and failing beautifully at it.",
  "",
  "Some people arrive in your life like a soft ray of sunlight",
  "through curtains — warm, quiet, and impossible to ignore.",
  "That is exactly how you arrived in mine.",
  "",
  "You have a way of making ordinary moments feel like memories",
  "worth keeping forever. Your laugh, your kindness, the way you",
  "care — these are not small things. They are everything.",
  "",
  "On this birthday, I just want you to know:",
  "you are deeply loved, wonderfully made, and endlessly cherished.",
  "The world is so much brighter because you are in it. 🌸",
  "",
  "May this year bring you everything your heart has quietly",
  "wished for. May every dream find its way to you.",
  "",
  "Happy Birthday, Vidya. 💜",
];

const CLOSING  = "With all my love,";
const SIG_NAME = "Syed Adnan";

const CHAR_SPEED = 26;  // ms per character — main body
const SIG_SPEED  = 65;  // ms per character — signature (slower = more dramatic)

// Ink-blot corner decorations (pure CSS)
const INK_BLOTS = [
  { top: "2%",    left: "1.5%",  w: 58, h: 44, rot: -14 },
  { top: "2%",    right: "1.5%", w: 44, h: 54, rot:  22 },
  { bottom: "2%", left: "2%",    w: 54, h: 40, rot:   9 },
  { bottom: "2%", right: "1%",   w: 48, h: 52, rot:  -7 },
];

export default function LoveLetter({ onClose }) {
  // Typing phases: "letter" → "closing" → "signame" → "seal" → "done"
  const [phase,       setPhase]       = useState("letter");
  const [lineIdx,     setLineIdx]     = useState(0);
  const [charIdx,     setCharIdx]     = useState(0);
  const [closingIdx,  setClosingIdx]  = useState(0);
  const [sigIdx,      setSigIdx]      = useState(0);
  const [sealCracked, setSealCracked] = useState(false);
  const [mounted,     setMounted]     = useState(false);

  // Revealed letter lines
  const [revealedLines, setRevealedLines] = useState(LINES.map(() => ""));

  const scrollRef = useRef(null);

  // Fade in
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Escape key closes
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Phase: letter typing ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "letter") return;
    const line = LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setRevealedLines(prev => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(c => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    } else {
      // End of current line → advance
      if (lineIdx < LINES.length - 1) {
        const pause = line === "" ? 80 : 130;
        const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, pause);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("closing"), 500);
        return () => clearTimeout(t);
      }
    }
  }, [phase, lineIdx, charIdx]);

  // ── Phase: closing line ───────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "closing") return;
    if (closingIdx < CLOSING.length) {
      const t = setTimeout(() => setClosingIdx(i => i + 1), SIG_SPEED);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("signame"), 350);
      return () => clearTimeout(t);
    }
  }, [phase, closingIdx]);

  // ── Phase: signature name ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "signame") return;
    if (sigIdx < SIG_NAME.length) {
      const t = setTimeout(() => setSigIdx(i => i + 1), SIG_SPEED);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("seal"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, sigIdx]);

  // Auto-scroll to bottom as text appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [revealedLines, closingIdx, sigIdx, phase]);

  return (
    <>
      <style>{`
        @keyframes letterSlideIn {
          from { opacity:0; transform:translateY(28px) rotate(-1.5deg); }
          to   { opacity:1; transform:translateY(0)    rotate(-0.4deg); }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes sealBounceIn {
          0%   { transform:scale(0) rotate(-25deg); opacity:0; }
          55%  { transform:scale(1.18) rotate(5deg); opacity:1; }
          75%  { transform:scale(0.93) rotate(-3deg); }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes sealCrack {
          0%   { transform:scale(1)    rotate(0deg); }
          20%  { transform:scale(1.18) rotate(-10deg); }
          40%  { transform:scale(0.88) rotate(7deg); }
          60%  { transform:scale(1.12) rotate(-5deg); }
          80%  { transform:scale(0.96) rotate(2deg); }
          100% { transform:scale(1)    rotate(0deg); }
        }
        @keyframes sealOpen {
          from { transform:scale(0.5); opacity:0; }
          to   { transform:scale(1);   opacity:1; }
        }
        @keyframes overlayIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes inkDrop {
          from { transform:scale(0) rotate(var(--rot)); opacity:0; }
          to   { transform:scale(1) rotate(var(--rot)); opacity:0.07; }
        }
        @keyframes sigSlide {
          from { opacity:0; transform:translateX(-10px) skewX(-3deg); }
          to   { opacity:1; transform:translateX(0)     skewX(-1.5deg); }
        }
        @keyframes floatHeart {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-6px) scale(1.15); }
        }
        .letter-scroll::-webkit-scrollbar { display:none; }
        .letter-scroll { scrollbar-width:none; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8"
        style={{
          background: "rgba(12, 4, 28, 0.88)",
          backdropFilter: "blur(8px)",
          animation: "overlayIn 0.5s ease both",
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* ── Paper ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "680px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "3px",
            transform: "rotate(-0.4deg)",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "letterSlideIn 0.9s ease both" : "none",
            boxShadow: [
              "0 40px 100px rgba(0,0,0,0.7)",
              "0 0 0 1px rgba(180,140,90,0.35)",
              "4px 4px 0 rgba(180,140,90,0.12)",
              "inset 0 0 80px rgba(139,90,43,0.05)",
            ].join(", "),
            // Paper texture via layered gradients
            background: [
              "radial-gradient(ellipse at center, transparent 55%, rgba(139,90,43,0.13) 100%)",
              "repeating-linear-gradient(transparent 0px, transparent 31px, rgba(180,140,90,0.11) 32px)",
              "linear-gradient(160deg, #fdf8ee 0%, #faf1dc 55%, #f4e4c0 100%)",
            ].join(", "),
          }}
        >
          {/* Corner ink blots */}
          {INK_BLOTS.map((b, i) => (
            <div key={i} style={{
              position: "absolute",
              top: b.top, left: b.left, right: b.right, bottom: b.bottom,
              width: b.w, height: b.h,
              background: "radial-gradient(ellipse, #3d1f00 0%, transparent 72%)",
              borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
              "--rot": `${b.rot}deg`,
              transform: `rotate(${b.rot}deg)`,
              opacity: 0.07,
              pointerEvents: "none",
              animation: `inkDrop 1s ${0.2 + i * 0.15}s ease both`,
            }} />
          ))}

          {/* Top ornament */}
          <div style={{
            textAlign: "center",
            padding: "16px 0 6px",
            fontFamily: "'Dancing Script', cursive",
            fontSize: "20px",
            color: "rgba(139,90,43,0.45)",
            letterSpacing: "8px",
            borderBottom: "1px solid rgba(180,140,90,0.2)",
            margin: "0 28px",
            flexShrink: 0,
          }}>
            ✦ ✦ ✦
          </div>

          {/* ── Scrollable letter body ── */}
          <div
            ref={scrollRef}
            className="letter-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "22px 40px 12px",
            }}
          >
            <div style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.05rem, 2.4vw, 1.28rem)",
              lineHeight: "2.0",
              color: "#3d2000",
            }}>
              {/* Typed lines */}
              {revealedLines.map((line, i) => (
                <div key={i} style={{ minHeight: "2.0em" }}>
                  {line}
                  {phase === "letter" && i === lineIdx && (
                    <span style={{
                      display: "inline-block",
                      width: "2px", height: "1.1em",
                      background: "#b85c10",
                      marginLeft: "2px",
                      verticalAlign: "text-bottom",
                      animation: "blink 0.85s step-end infinite",
                    }} />
                  )}
                </div>
              ))}

              {/* Closing + signature — appear once letter finishes */}
              {phase !== "letter" && (
                <div style={{ marginTop: "0.5em", color: "#5a3010" }}>
                  {/* "With all my love," */}
                  <div>
                    {CLOSING.slice(0, closingIdx)}
                    {phase === "closing" && (
                      <span style={{
                        display: "inline-block", width: "2px", height: "1.1em",
                        background: "#b85c10", marginLeft: "2px",
                        verticalAlign: "text-bottom",
                        animation: "blink 0.85s step-end infinite",
                      }} />
                    )}
                  </div>

                  {/* Signature name — bigger, bolder, slanted */}
                  {sigIdx > 0 && (
                    <div style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: "clamp(1.7rem, 4.5vw, 2.4rem)",
                      fontWeight: 700,
                      color: "#7c3a00",
                      marginTop: "2px",
                      letterSpacing: "0.02em",
                      display: "inline-block",
                      animation: "sigSlide 0.5s ease both",
                    }}>
                      {SIG_NAME.slice(0, sigIdx)}
                      {phase === "signame" && (
                        <span style={{
                          display: "inline-block", width: "2px", height: "1.2em",
                          background: "#b85c10", marginLeft: "2px",
                          verticalAlign: "text-bottom",
                          animation: "blink 0.85s step-end infinite",
                        }} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Wax seal row ── */}
          {(phase === "seal" || phase === "done") && (
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              padding: "6px 36px 14px",
              flexShrink: 0,
            }}>
              {!sealCracked && (
                <span style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "12px",
                  color: "rgba(139,90,43,0.5)",
                  fontStyle: "italic",
                }}>click the seal ↓</span>
              )}
              <div
                onClick={() => { if (!sealCracked) setSealCracked(true); }}
                title={sealCracked ? "" : "Click to break the seal!"}
                style={{
                  width: "68px", height: "68px",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: sealCracked ? "default" : "pointer",
                  userSelect: "none",
                  flexShrink: 0,
                  // Closed seal: deep crimson wax with sheen
                  ...(sealCracked ? {
                    background: "radial-gradient(circle at 40% 38%, #fff0f5, #fce7f3)",
                    boxShadow: "0 0 22px rgba(244,114,182,0.65), 0 4px 16px rgba(0,0,0,0.2)",
                    fontSize: "34px",
                    animation: "sealCrack 0.5s ease, sealOpen 0.45s 0.45s ease both",
                  } : {
                    background: "radial-gradient(circle at 38% 32%, #e85d54, #8b0000)",
                    boxShadow: "0 6px 24px rgba(139,0,0,0.55), inset 0 2px 4px rgba(255,160,150,0.4)",
                    fontSize: "24px",
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: 700,
                    color: "#ffd0cc",
                    animation: "sealBounceIn 0.75s ease both",
                  }),
                }}
              >
                {sealCracked ? "💌" : "A"}
              </div>
            </div>
          )}

          {/* Floating hearts after seal cracks */}
          {sealCracked && (
            <div style={{
              position: "absolute",
              bottom: "56px", right: "28px",
              display: "flex", gap: "6px",
              pointerEvents: "none",
            }}>
              {["💗","💜","💖"].map((h, i) => (
                <span key={i} style={{
                  fontSize: "16px",
                  animation: `floatHeart 2s ${i * 0.3}s ease-in-out infinite`,
                  display: "inline-block",
                }}>{h}</span>
              ))}
            </div>
          )}

          {/* Bottom ornament */}
          <div style={{
            textAlign: "center",
            padding: "4px 0 12px",
            fontFamily: "'Dancing Script', cursive",
            fontSize: "14px",
            color: "rgba(139,90,43,0.32)",
            letterSpacing: "4px",
            borderTop: "1px solid rgba(180,140,90,0.16)",
            margin: "0 28px 0",
            flexShrink: 0,
          }}>
            ✦ ✦ ✦
          </div>
        </div>

        {/* Close × */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "14px", right: "18px",
            background: "none",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.45)",
            width: "36px", height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            zIndex: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "rgba(255,255,255,0.45)";
          }}
        >×</button>
      </div>
    </>
  );
}
