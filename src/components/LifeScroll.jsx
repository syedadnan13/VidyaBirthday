// src/components/LifeScroll.jsx
// "This is Your Life" — cinematic horizontal-scroll timeline.
// Each chapter fades in as it enters the viewport.
import { useEffect, useRef, useState } from "react";
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

// ── Chapter data ──────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    chapter: "Chapter I",
    date: "The very beginning",
    title: "Lucky Camera",
    caption: "Somewhere, a camera took the best photo of its life and never knew it. Lucky camera.",
    src: img1,
    accent: "#f9a8d4",
    tag: "Origin Story",
  },
  {
    chapter: "Chapter II",
    date: "Golden afternoons",
    title: "Not the Lighting",
    caption: "The golden hour showed up, looked around, and said 'nah, she's doing it for me today.' Correct assessment.",
    src: img4,
    accent: "#fbbf24",
    tag: "Caught",
  },
  {
    chapter: "Chapter III",
    date: "Laughing until it hurt",
    title: "Worth Every Word",
    caption: "I would say something stupid on purpose every single day just to be the reason for that laugh. Completely worth it. No regrets.",
    src: img6,
    accent: "#86efac",
    tag: "Guilty",
  },
  {
    chapter: "Chapter IV",
    date: "Festival season",
    title: "Best Supporting Cast",
    caption: "Whole festival. Thousands of lights. Every decoration they had. All of them clocked in that day just to be your background. Respect.",
    src: img8,
    accent: "#d8b4fe",
    tag: "Main Character",
  },
  {
    chapter: "Chapter V",
    date: "That one quiet moment",
    title: "Evidence: Exhibit A",
    caption: "That smile belongs in an evidence locker. It's why I can't stay mad for more than thirty seconds. Genuinely not fair. I want a lawyer.",
    src: img10,
    accent: "#fda4af",
    tag: "Unfair",
  },
  {
    chapter: "Chapter VI",
    date: "Goa — red dress, bare feet",
    title: "Wrong Occasion, Wrong Intentions",
    caption: "Red dress. Bare feet. Wind. The ocean behind you. Every guy on that beach claimed they were 'watching the sunset.' Their cameras say otherwise.",
    src: img13,
    accent: "#f472b6",
    tag: "Dangerous",
  },
  {
    chapter: "Chapter VII",
    date: "Tuesday, 11am, office bathroom",
    title: "HR Has Concerns",
    caption: "HR called. Apparently looking this good on a random Tuesday is a workplace distraction. They asked you to stop. Respectfully, don't.",
    src: img17,
    accent: "#6ee7b7",
    tag: "Violation",
  },
  {
    chapter: "Chapter VIII",
    date: "Dog filter era",
    title: "Broke the Algorithm",
    caption: "You put on a dog filter and somehow became MORE attractive. That's not what that filter is for. You broke the system. I'm not complaining.",
    src: img20,
    accent: "#a5b4fc",
    tag: "Illegal",
  },
  {
    chapter: "Chapter IX",
    date: "That café, those Edison bulbs",
    title: "Should Be on the Menu",
    caption: "That café spent months on ambiance — Edison bulbs, plants, golden light. You walked in, laughed once, and became the whole aesthetic. They should put you on the menu.",
    src: img22,
    accent: "#fdba74",
    tag: "Hazardous",
  },
  {
    chapter: "Chapter X",
    date: "Blue kurta, office bathroom again",
    title: "She Runs the Place",
    caption: "Two office bathroom selfies on this scroll. Both are effortlessly fire. Your ID badge says 'employee.' Your entire energy says 'I run this place and everyone already knows it.'",
    src: img25,
    accent: "#fde047",
    tag: "Power Move",
  },
  {
    chapter: "Chapter XI",
    date: "Somewhere foggy and cold",
    title: "Upstaged the Mountain",
    caption: "The mountain pulled out fog, dramatic hills, moody sky — full cinematic production. Then you smiled. All that effort, completely wasted. The mountain understood.",
    src: img28,
    accent: "#fb923c",
    tag: "Scene Stealer",
  },
  {
    chapter: "Chapter XII",
    date: "July 17, 2026",
    title: "The Chef Knew 🍽️",
    caption: "That cartoon chef has been holding that tray for years, waiting for something worthy to present. He finally found it. So did everyone else. Happy Birthday, Vidya.",
    src: img31,
    accent: "#e879f9",
    tag: "Birthday 2026",
    isFinal: true,
  },
];

// ── Single chapter card ───────────────────────────────────────────────────
function ChapterCard({ data, index }) {
  const ref        = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVis(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        flexShrink: 0,
        width: "clamp(280px, 78vw, 360px)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : `translateY(${isEven ? 32 : -32}px) scale(0.94)`,
        transition: `opacity 0.65s ease ${index * 0.05}s, transform 0.65s ease ${index * 0.05}s`,
        position: "relative",
      }}
    >
      {/* Chapter label */}
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: data.accent,
        marginBottom: "8px",
        paddingLeft: "2px",
        opacity: 0.85,
      }}>
        {data.chapter}
      </div>

      {/* Photo card */}
      <div style={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1.5px ${data.accent}44`,
        aspectRatio: "3/4",
        background: "#111",
        flexShrink: 0,
      }}>
        <img
          src={data.src}
          alt={data.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Tag pill */}
        <div style={{
          position: "absolute",
          top: "12px", right: "12px",
          padding: "3px 10px",
          borderRadius: "999px",
          background: `${data.accent}22`,
          border: `1px solid ${data.accent}66`,
          backdropFilter: "blur(8px)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          color: data.accent,
          letterSpacing: "0.08em",
        }}>
          {data.tag}
        </div>

        {/* Final card badge */}
        {data.isFinal && (
          <div style={{
            position: "absolute",
            top: "12px", left: "12px",
            fontSize: "20px",
            filter: `drop-shadow(0 0 8px ${data.accent})`,
            animationName: "finalGlow",
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            animationDirection: "alternate",
          }}>💜</div>
        )}

        {/* Bottom text overlay on photo */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "16px 14px 14px",
        }}>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.15rem, 3vw, 1.45rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: "2px",
            textShadow: `0 0 20px ${data.accent}88`,
          }}>{data.title}</p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            color: data.accent,
            letterSpacing: "0.06em",
            opacity: 0.9,
          }}>{data.date}</p>
        </div>
      </div>

      {/* Caption below */}
      <div style={{
        padding: "14px 4px 0",
        fontFamily: "'Dancing Script', cursive",
        fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
        color: "rgba(255,255,255,0.7)",
        lineHeight: 1.65,
        fontStyle: "italic",
      }}>
        "{data.caption}"
      </div>
    </div>
  );
}

// ── Main LifeScroll overlay ───────────────────────────────────────────────
export default function LifeScroll({ onClose }) {
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Update progress bar as user scrolls horizontally
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Arrow key / touch scroll helper
  useEffect(() => {
    const onKey = (e) => {
      const el = trackRef.current;
      if (!el) return;
      if (e.key === "ArrowRight") el.scrollBy({ left: 340, behavior: "smooth" });
      if (e.key === "ArrowLeft")  el.scrollBy({ left: -340, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @keyframes overlayFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes titleDrop {
          from { opacity:0; transform:translateY(-24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes finalGlow {
          from { filter:drop-shadow(0 0 6px #e879f9); }
          to   { filter:drop-shadow(0 0 18px #e879f9); }
        }
        @keyframes shimmerTitle {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes connectorPulse {
          0%,100% { opacity:0.25; }
          50%     { opacity:0.55; }
        }
        .life-track {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .life-track::-webkit-scrollbar { display:none; }
        .life-track > * { scroll-snap-align: center; }
      `}</style>

      {/* ── Full-screen backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: "linear-gradient(160deg, #05010f 0%, #0e0520 50%, #120a28 100%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          flexShrink: 0,
          padding: "20px 24px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div>
            {/* Eyebrow */}
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(249,168,212,0.55)",
              marginBottom: "4px",
              animation: "titleDrop 0.7s ease both",
            }}>12 confessions I should've said sooner 🤫</p>

            {/* Main title — shimmer */}
            <h1 style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
              fontWeight: 700,
              background: "linear-gradient(90deg, #f9a8d4 0%, #e879f9 22%, #c084fc 44%, #f9a8d4 66%, #fbbf24 88%, #f9a8d4 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmerTitle 4s linear infinite, titleDrop 0.7s 0.1s ease both",
              display: "block",
            }}>
              Confession Scroll 💌
            </h1>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.4)",
              width: "40px", height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "20px",
              flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="rgba(255,255,255,0.4)"; }}
          >×</button>
        </div>

        {/* ── Progress bar ── */}
        <div style={{
          flexShrink: 0,
          height: "3px",
          background: "rgba(255,255,255,0.07)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0,
            height: "100%",
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #f472b6, #c084fc, #fbbf24)",
            transition: "width 0.1s linear",
            borderRadius: "0 2px 2px 0",
            boxShadow: "0 0 8px rgba(244,114,182,0.7)",
          }} />
        </div>

        {/* ── Horizontal scrolling track ── */}
        <div
          ref={trackRef}
          className="life-track"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "28px 40px 32px",
            gap: "48px",
            minHeight: 0,
          }}
        >
          {/* Opening title card */}
          <div style={{
            flexShrink: 0,
            width: "clamp(260px, 75vw, 320px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            animation: "titleDrop 1s 0.3s ease both",
            opacity: mounted ? 1 : 0,
          }}>
            <div style={{ fontSize: "56px", filter: "drop-shadow(0 0 24px rgba(249,168,212,0.8))" }}>🎬</div>
            <h2 style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.8rem, 6vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 0 40px rgba(249,168,212,0.5)",
              lineHeight: 1.2,
            }}>
              Things I Think<br />About At 2AM
            </h2>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "260px",
            }}>
              12 confessions. Zero shame. Mostly.
            </p>
            {/* Scroll hint */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              color: "rgba(249,168,212,0.5)",
              letterSpacing: "0.1em",
              marginTop: "8px",
              animationName: "connectorPulse",
              animationDuration: "2s",
              animationIterationCount: "infinite",
            }}>
              <span>scroll or use</span>
              <span style={{
                padding: "1px 7px",
                border: "1px solid rgba(249,168,212,0.3)",
                borderRadius: "4px",
                fontSize: "11px",
              }}>→</span>
            </div>
          </div>

          {/* Connector line from opener */}
          <div style={{ flexShrink: 0, width: "60px", height: "2px",
            background: "linear-gradient(90deg, rgba(244,114,182,0.6), rgba(192,132,252,0.6))",
            borderRadius: "2px",
            alignSelf: "center",
            animationName: "connectorPulse",
            animationDuration: "2s",
            animationIterationCount: "infinite",
          }} />

          {/* Chapter cards with connectors */}
          {CHAPTERS.map((ch, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "48px", flexShrink: 0 }}>
              <ChapterCard data={ch} index={i} />

              {/* Connector (not after last card) */}
              {i < CHAPTERS.length - 1 && (
                <div style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "2px",
                  background: `linear-gradient(90deg, ${ch.accent}88, ${CHAPTERS[i+1].accent}88)`,
                  borderRadius: "2px",
                  alignSelf: "center",
                  animationName: "connectorPulse",
                  animationDuration: "2s",
                  animationDelay: `${i * 0.2}s`,
                  animationIterationCount: "infinite",
                }} />
              )}
            </div>
          ))}

          {/* Closing card */}
          <div style={{
            flexShrink: 0,
            width: "clamp(240px, 70vw, 300px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            textAlign: "center",
            padding: "32px 20px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(244,114,182,0.08), rgba(192,132,252,0.06))",
            border: "1.5px solid rgba(244,114,182,0.25)",
          }}>
            <div style={{ fontSize: "40px", filter: "drop-shadow(0 0 16px rgba(232,121,249,0.8))" }}>💜</div>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              fontWeight: 700,
              color: "#f9a8d4",
              textShadow: "0 0 20px rgba(249,168,212,0.5)",
            }}>The scroll ends.<br />The feelings don't.</p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.7,
            }}>
              12 confessions down.<br />A lifetime of them left.
            </p>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "#e879f9",
              marginTop: "4px",
            }}>Happy Birthday, Vidya 🎂</p>
          </div>
        </div>

        {/* ── Bottom nav hint ── */}
        <div style={{
          flexShrink: 0,
          padding: "8px 24px 14px",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          {[
            { label: "← prev",  onClick: () => trackRef.current?.scrollBy({ left: -340, behavior: "smooth" }) },
            { label: "next →",  onClick: () => trackRef.current?.scrollBy({ left:  340, behavior: "smooth" }) },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(249,168,212,0.5)",
                background: "none",
                border: "1px solid rgba(249,168,212,0.2)",
                padding: "5px 16px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color="#f9a8d4"; e.currentTarget.style.borderColor="rgba(249,168,212,0.6)"; e.currentTarget.style.background="rgba(249,168,212,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgba(249,168,212,0.5)"; e.currentTarget.style.borderColor="rgba(249,168,212,0.2)"; e.currentTarget.style.background="none"; }}
            >{btn.label}</button>
          ))}
        </div>
      </div>
    </>
  );
}
