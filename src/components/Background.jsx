// components/Background.jsx
export default function Background() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 opacity-80 pointer-events-none overflow-hidden">
      {/* ── Soft glow orbs ── */}
      <div className="absolute w-20 h-20 rounded-full bg-pink-300/30 blur-xl top-1/4 left-[8%] animate-float"></div>
      <div className="absolute w-32 h-32 rounded-full bg-purple-300/20 blur-xl top-2/3 right-1/4 animate-float-slow"></div>
      <div className="absolute w-16 h-16 rounded-full bg-yellow-200/30 blur-xl top-1/2 left-1/3 animate-pulse-slow"></div>
      <div className="absolute w-24 h-24 rounded-full bg-indigo-300/20 blur-xl bottom-1/4 right-1/3 animate-float"></div>
      <div className="absolute w-40 h-40 rounded-full bg-pink-400/10 blur-2xl top-10 right-[10%] animate-float-slow"></div>
      <div className="absolute w-28 h-28 rounded-full bg-yellow-300/15 blur-2xl bottom-[10%] left-[20%] animate-float"></div>

      {/* ── Floating balloons ── */}
      <div className="absolute text-4xl top-[18%] left-[3%] animate-balloon" style={{animationDelay: '0s'}}>🎈</div>
      <div className="absolute text-3xl top-[35%] right-[4%] animate-balloon" style={{animationDelay: '1.8s'}}>🎈</div>
      <div className="absolute text-4xl top-[60%] left-[6%] animate-balloon" style={{animationDelay: '0.9s'}}>🎈</div>
      <div className="absolute text-3xl bottom-[18%] right-[7%] animate-balloon" style={{animationDelay: '2.4s'}}>🎈</div>
      <div className="absolute text-3xl top-[12%] right-[20%] animate-balloon" style={{animationDelay: '3.1s'}}>🎀</div>

      {/* ── Twinkling stars ── */}
      <div className="absolute text-xl top-[8%]  left-[25%] animate-twinkle" style={{animationDelay: '0.4s'}}>⭐</div>
      <div className="absolute text-lg  top-[22%] right-[30%] animate-twinkle" style={{animationDelay: '1.2s'}}>✨</div>
      <div className="absolute text-xl bottom-[30%] left-[40%] animate-twinkle" style={{animationDelay: '0.7s'}}>⭐</div>
      <div className="absolute text-lg  bottom-[15%] right-[35%] animate-twinkle" style={{animationDelay: '2s'}}>✨</div>
      <div className="absolute text-lg  top-[45%] left-[18%] animate-twinkle" style={{animationDelay: '1.6s'}}>🌟</div>

      {/* ── Floating heart icons ── */}
      <div className="absolute w-6 h-6 text-pink-400 top-10 left-1/4 animate-float-slow">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-6 h-6 text-pink-300 top-1/3 right-[15%] animate-float">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-8 h-8 text-purple-300 bottom-1/4 left-[12%] animate-float-slow">
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="absolute w-5 h-5 text-red-300 top-[55%] right-[25%] animate-float" style={{animationDelay: '1s'}}>
        <i className="fa-solid fa-heart"></i>
      </div>

      {/* ── Ambient glow layers ── */}
      <div className="absolute w-full h-40 bg-white/10 blur-3xl bottom-0 left-0 animate-pulse-slow"></div>
      <div className="absolute w-80 h-80 bg-white/5 blur-3xl top-1/4 right-1/4 animate-pulse-slow"></div>

      {/* ── Sparkle dots ── */}
      <div className="absolute w-2 h-2 bg-yellow-200 rounded-full top-[15%] left-[18%] animate-sparkle"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full top-[30%] right-[28%] animate-sparkle delay-75"></div>
      <div className="absolute w-2 h-2 bg-pink-200 rounded-full bottom-[22%] left-[32%] animate-sparkle delay-150"></div>
      <div className="absolute w-2 h-2 bg-yellow-100 rounded-full bottom-[35%] right-[22%] animate-sparkle delay-200"></div>
      <div className="absolute w-3 h-3 bg-purple-200 rounded-full top-[50%] left-[50%] animate-sparkle" style={{animationDelay:'0.5s'}}></div>
      <div className="absolute w-2 h-2 bg-pink-300 rounded-full top-[70%] right-[15%] animate-sparkle" style={{animationDelay:'1.1s'}}></div>
      <div className="absolute w-2 h-2 bg-indigo-200 rounded-full top-[38%] left-[55%] animate-sparkle" style={{animationDelay:'0.8s'}}></div>

      {/* ── Cake emoji accent ── */}
      <div className="absolute text-2xl bottom-[8%] left-[8%] animate-float-slow opacity-60" style={{animationDelay:'2s'}}>🎂</div>
      <div className="absolute text-xl top-[75%] right-[18%] animate-float opacity-50" style={{animationDelay:'1.3s'}}>🎁</div>
    </div>
  );
}