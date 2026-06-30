// components/IntroGate.jsx
import { useState, useEffect, useMemo } from "react";

const questions = [
  {
    text: "Is today the most special day of the entire year?",
    emoji: "🌟",
    sub: "Think verrry carefully...",
  },
  {
    text: "Does our birthday queen deserve ALL the love in the universe?",
    emoji: "💖",
    sub: "There's only one right answer here...",
  },
  {
    text: "Ready to make this Vidya's most magical birthday ever?",
    emoji: "🎉",
    sub: "Final question — make it count!",
  },
];

const noMessages = [
  ["Hmm... think again! 🤔", "Are you suuuure? 🥺", "One more chance! 😅"],
  ["Wait... WHAT?! Think harder! 😮", "Of course she does! Try again 🌸", "Come onnnn! 🥹"],
  ["Noooo you HAVE to be! 😤", "I believe in you! 🎊", "Final answer?! 😅"],
];

export default function IntroGate({ onComplete }) {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [message, setMessage] = useState("");
  const [questionKey, setQuestionKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Deterministic star positions — no random on each render
  const stars = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      size: ((i % 3) + 1.2).toFixed(1),
      top: ((i * 37 + 7) % 97),
      left: ((i * 61 + 11) % 98),
      delay: ((i * 0.31) % 2.8).toFixed(1),
      duration: (((i % 4) + 1.6)).toFixed(1),
    }))
  , []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleYes = () => {
    setMessage("");
    if (step < questions.length - 1) {
      setNoCount(0);
      setStep((s) => s + 1);
      setQuestionKey((k) => k + 1);
    } else {
      setLeaving(true);
      setTimeout(onComplete, 700);
    }
  };

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    setMessage(noMessages[step][Math.min(next - 1, noMessages[step].length - 1)]);
  };

  // Yes grows, No shrinks the more No is clicked
  const yesScale = Math.min(1 + noCount * 0.3, 2.8);
  const noScale  = Math.max(1 - noCount * 0.22, 0.28);
  const yesGlow  = Math.min(20 + noCount * 12, 70);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a3e 100%)",
        opacity: visible && !leaving ? 1 : 0,
        transform: visible && !leaving ? "scale(1)" : "scale(0.96)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* ── Twinkling star field ── */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none animate-twinkle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* ── Glowing orb accents ── */}
      <div className="absolute w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", top: "10%", left: "5%" }} />
      <div className="absolute w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)", bottom: "5%", right: "8%" }} />

      {/* ── Floating corner emojis ── */}
      <span className="absolute text-5xl select-none pointer-events-none top-[8%]  left-[5%]  animate-balloon opacity-70" style={{ animationDelay: "0s"   }}>🎈</span>
      <span className="absolute text-4xl select-none pointer-events-none top-[12%] right-[7%] animate-balloon opacity-70" style={{ animationDelay: "1.6s" }}>🎀</span>
      <span className="absolute text-4xl select-none pointer-events-none bottom-[14%] left-[7%] animate-balloon opacity-70" style={{ animationDelay: "0.9s" }}>🎁</span>
      <span className="absolute text-5xl select-none pointer-events-none bottom-[10%] right-[6%] animate-balloon opacity-70" style={{ animationDelay: "2.2s" }}>🎊</span>
      <span className="absolute text-3xl select-none pointer-events-none top-[45%]  left-[2%]  animate-balloon opacity-30" style={{ animationDelay: "1.2s" }}>✨</span>
      <span className="absolute text-3xl select-none pointer-events-none top-[55%]  right-[3%] animate-balloon opacity-30" style={{ animationDelay: "3s"   }}>🌟</span>

      {/* ── Progress indicator ── */}
      <div className="absolute top-8 flex gap-3 items-center">
        {questions.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width:      i <= step ? "32px" : "12px",
              height:     "12px",
              background: i < step  ? "rgba(236,72,153,0.8)"
                        : i === step ? "#fff"
                        : "rgba(255,255,255,0.22)",
              boxShadow: i === step ? "0 0 14px rgba(255,255,255,0.9)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Question card ── */}
      <div
        key={questionKey}
        className="mx-6 max-w-xl w-full text-center"
        style={{ animation: "slideUpFade 0.45s cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        {/* Glowing emoji */}
        <div
          className="text-7xl md:text-8xl mb-6 select-none"
          style={{ filter: "drop-shadow(0 0 28px rgba(236,72,153,0.85))" }}
        >
          {questions[step].emoji}
        </div>

        {/* Question text */}
        <h2
          className="font-dancing text-white leading-tight mb-3"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            textShadow: "0 2px 24px rgba(0,0,0,0.6)",
          }}
        >
          {questions[step].text}
        </h2>

        <p className="font-montserrat text-white/35 text-sm mb-12 italic tracking-widest">
          {questions[step].sub}
        </p>

        {/* ── Yes / No buttons ── */}
        <div
          className="flex items-center justify-center gap-14 flex-wrap"
          style={{ minHeight: "90px" }}
        >
          {/* YES — grows on each No click */}
          <button
            onClick={handleYes}
            className="font-montserrat font-bold text-white rounded-2xl cursor-pointer"
            style={{
              transform: `scale(${yesScale})`,
              transformOrigin: "center",
              background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              padding: "14px 40px",
              fontSize: "1.1rem",
              border: "none",
              boxShadow: `0 6px ${yesGlow}px rgba(236,72,153,0.65)`,
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
            }}
          >
            Yes! 💝
          </button>

          {/* NO — shrinks on each click */}
          <button
            onClick={handleNo}
            className="font-montserrat text-white/55 rounded-xl cursor-pointer"
            style={{
              transform: `scale(${noScale})`,
              transformOrigin: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "10px 24px",
              fontSize: "0.9rem",
              opacity: Math.max(noScale, 0.22),
              transition: "transform 0.35s ease, opacity 0.35s ease",
            }}
          >
            No...
          </button>
        </div>

        {/* Cute no-response message */}
        {message && (
          <div
            key={message}
            className="mt-10 font-dancing text-pink-300"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
              animation: "slideUpFade 0.3s ease forwards",
              textShadow: "0 0 20px rgba(244,114,182,0.6)",
            }}
          >
            {message}
          </div>
        )}
      </div>

      {/* Step counter */}
      <div className="absolute bottom-8 font-montserrat text-white/22 text-xs tracking-widest uppercase">
        Question {step + 1} of {questions.length}
      </div>
    </div>
  );
}
