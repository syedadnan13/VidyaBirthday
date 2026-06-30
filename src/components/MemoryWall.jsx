// components/MemoryWall.jsx
import { useEffect, useRef, useState } from "react";
import { memories } from "../data/memories";

// ── Individual timeline card ──────────────────────────────────────────────
function MemoryCard({ memory, index }) {
  const ref  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex items-start gap-0 w-full"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms`,
      }}
    >
      {/* ── Timeline spine dot ── */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: "48px" }}>
        <div
          className="w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 mt-6"
          style={{ background: memory.accent }}
        />
        {index < memories.length - 1 && (
          <div
            className="absolute top-10 w-0.5 h-full"
            style={{ background: `linear-gradient(to bottom, ${memory.accent}88, transparent)` }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div
        className="flex-1 mb-10 rounded-2xl overflow-hidden shadow-xl ml-3"
        style={{
          background: memory.color,
          border: `1.5px solid ${memory.accent}30`,
        }}
      >
        {/* Photo strip */}
        <div className="relative w-full" style={{ height: "200px" }}>
          <img
            src={memory.src}
            alt={memory.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Torn-paper bottom edge illusion */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12"
            style={{
              background: `linear-gradient(to bottom, transparent, ${memory.color})`,
            }}
          />
          {/* Tag pill */}
          <span
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-montserrat font-semibold shadow"
            style={{ background: memory.accent }}
          >
            {memory.tag}
          </span>
        </div>

        {/* Text body */}
        <div className="px-5 pb-5 pt-1">
          {/* Handwritten-style date */}
          <p
            className="font-dancing text-sm mb-1"
            style={{ color: memory.accent, opacity: 0.8 }}
          >
            {memory.date}
          </p>

          {/* Title */}
          <h3
            className="font-playfair font-bold text-gray-800 text-lg mb-2 leading-snug"
          >
            {memory.title}
          </h3>

          {/* Memory note — handwritten feel */}
          <p
            className="font-dancing text-gray-600 text-base leading-relaxed"
            style={{ fontSize: "1.05rem" }}
          >
            {memory.note}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Modal shell ────────────────────────────────────────────────────────────
export default function MemoryWall({ onClose }) {
  const [mounted, setMounted] = useState(false);

  // Animate in
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:  "rgba(0,0,0,0.72)",
        backdropFilter: "blur(6px)",
        opacity:     mounted ? 1 : 0,
        transition:  "opacity 0.35s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width:       "min(520px, 94vw)",
          height:      "min(82vh, 820px)",
          background:  "linear-gradient(160deg, #fff0fb 0%, #f5f3ff 100%)",
          transform:   mounted ? "scale(1) translateY(0)" : "scale(0.93) translateY(30px)",
          transition:  "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex-shrink-0 px-6 pt-6 pb-4 text-center relative"
          style={{
            background:   "linear-gradient(135deg, #fdf2f8, #ede9fe)",
            borderBottom: "1px solid rgba(219,39,119,0.15)",
          }}
        >
          <div className="text-4xl mb-2">💌</div>
          <h2
            className="font-dancing text-3xl font-bold"
            style={{
              background:           "linear-gradient(135deg, #db2777, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}
          >
            Memory Wall
          </h2>
          <p className="font-montserrat text-xs text-purple-400 mt-1 tracking-widest uppercase">
            A love letter in pictures &amp; words
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(219,39,119,0.12)",
              color:      "#db2777",
              fontSize:   "1rem",
            }}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* ── Scrollable timeline ── */}
        <div
          className="flex-1 overflow-y-auto px-4 pt-6 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="relative">
            {memories.map((memory, i) => (
              <MemoryCard key={i} memory={memory} index={i} />
            ))}
          </div>

          {/* Bottom flourish */}
          <div className="text-center py-6 font-dancing text-pink-400 text-xl">
            — made with 💜 just for you —
          </div>
        </div>
      </div>
    </div>
  );
}
