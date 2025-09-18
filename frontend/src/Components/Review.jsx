import React from 'react';
import { FaStar } from "react-icons/fa";
import p1 from '../assets/images/p1.png';
import p2 from '../assets/images/p2.png';
import p3 from '../assets/images/p3.png';
import p4 from '../assets/images/p4.png';

// You can later externalize this data if needed

const reviews = [
  {
    name: "Aman S.",
  review: "SkillSwap transformed my trading approach! The options module and hands-on practice were game changers.",
    img: p1,
    rating: 5,
  },
  {
    name: "Priya T.",
    review: "The live sessions and SkillSwap mentorship were invaluable. Great content and ongoing support!",
    img: p2,
    rating: 4,
  },
  {
    name: "Rahul M.",
    review: "SkillSwap's practical strategies and real-world examples made learning easy and effective.",
    img: p3,
    rating: 5,
  },
  {
    name: "Sneha P.",
    review: "Supportive SkillSwap community and excellent resources. I feel confident in my trading now!",
    img: p4,
    rating: 4,
  },
];

function ReviewCarousel() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const total = reviews.length;
  const INTERVAL = 6000; // ms
  const prefersReducedMotion = React.useRef(false);
  const isDocumentHidden = React.useRef(false);

  const prev = React.useCallback(() => setCurrent((p) => (p === 0 ? total - 1 : p - 1)), [total]);
  const next = React.useCallback(() => setCurrent((p) => (p === total - 1 ? 0 : p + 1)), [total]);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const listener = (e) => { prefersReducedMotion.current = e.matches; };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  React.useEffect(() => {
    const visHandler = () => { isDocumentHidden.current = document.hidden; };
    document.addEventListener('visibilitychange', visHandler);
    return () => document.removeEventListener('visibilitychange', visHandler);
  }, []);

  React.useEffect(() => {
    if (isPaused || prefersReducedMotion.current || isDocumentHidden.current) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, isPaused, INTERVAL]);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const getPosition = (idx) => {
    if (idx === current) return 'center';
    if (idx === (current + 1) % total) return 'right';
    if (idx === (current + total - 1) % total) return 'left';
    return 'hidden';
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute -inset-1" />
        <div className="absolute inset-0 " />
      </div>

      <div className="relative flex items-center gap-4 md:gap-8 w-full overflow-hidden py-8">
        {/* Prev Button (floating) */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-purple-600/60 hover:bg-purple-500/80 text-white shadow-lg backdrop-blur-sm transition-all border border-purple-300/40 hover:scale-105 ms-4 "
        >
          <span className="text-xl">&#8592;</span>
        </button>

        <div className="flex-1 flex items-center justify-center relative h-[340px] md:h-[360px] select-none">
          {reviews.map((rev, idx) => {
            const pos = getPosition(idx);
            if (pos === 'hidden') return null; // only render 3 for performance
            const base = 'absolute flex flex-col items-center text-center rounded-2xl p-6 md:p-7 shadow-2xl backdrop-blur-xl border transition-all duration-500 ease-[cubic-bezier(.4,.2,.2,1)]';
            const styleMap = {
              center: 'z-20 w-[78%] md:w-[46%] bg-white/10 border-purple-500/30 scale-100 translate-x-0 opacity-100',
              left: 'z-10 w-[58%] md:w-[34%] -translate-x-[72%] md:-translate-x-[115%] scale-90 opacity-60 bg-purple-900/30 border-purple-600/10',
              right: 'z-10 w-[58%] md:w-[34%] translate-x-[72%] md:translate-x-[115%] scale-90 opacity-60 bg-purple-900/30 border-purple-600/10'
            };
            return (
              <div key={idx} className={`${base} ${styleMap[pos]}`}>
                <div className="relative mb-4">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600/30 to-pink-500/30 blur" />
                  <img
                    src={rev.img}
                    alt={rev.name}
                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-purple-400 shadow-lg bg-white/5"
                    loading="lazy"
                  />
                </div>
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg drop-shadow-sm ${i < rev.rating ? 'text-yellow-400 animate-pulse' : 'text-purple-700'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-100 italic leading-relaxed mb-3 line-clamp-5">
                  "{rev.review}"
                </p>
                <span className="text-sm font-semibold tracking-wide text-purple-300">- {rev.name}</span>
              </div>
            );
          })}
        </div>

        {/* Next Button (floating) */}
        <button
          onClick={next}
          aria-label="Next"
          className="z-20 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-purple-600/60 hover:bg-purple-500/80 text-white shadow-lg backdrop-blur-sm transition-all border border-purple-300/40 hover:scale-105 me-4"
        >
          <span className="text-xl">&#8594;</span>
        </button>
      </div>

      {/* Mobile controls */}
      <div className="flex md:hidden justify-between px-4 -mt-2 mb-4">
        <button onClick={prev} aria-label="Previous" className="px-3 py-1.5 rounded-full bg-purple-700/70 text-white text-sm border border-purple-300/30">Prev</button>
        <button onClick={next} aria-label="Next" className="px-3 py-1.5 rounded-full bg-purple-700/70 text-white text-sm border border-purple-300/30">Next</button>
      </div>

      {/* Indicators + progress */}
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="flex gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${current === idx ? 'bg-pink-400 w-8 shadow-[0_0_8px_2px_rgba(219,39,119,0.45)]' : 'bg-purple-800 w-2.5 border border-purple-500/40 hover:bg-purple-600/60'}`}
            />
          ))}
        </div>
        <div className="h-1 w-40 md:w-64 bg-purple-900/40 rounded overflow-hidden">
          <div
            key={current + '-' + INTERVAL}
            className={`h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500`}
            style={{
              animation: isPaused || prefersReducedMotion.current ? 'none' : `progress ${INTERVAL}ms linear`,
            }}
          />
        </div>
      </div>

      {/* Tailwind custom animation helper (inline) */}
      <style>{`
        @keyframes progress { from { transform: translateX(-100%);} to { transform: translateX(0);} }
      `}</style>
    </div>
  );
}

export default function ReviewsSection() {
  return (
   
    <div className="relative w-full mb-8">
      <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-br from-black via-gray-900 to-black shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)] overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(circle_at_20%_80%,rgba(167,139,250,0.18),transparent_60%)]" />
        <div className="relative z-10 pt-6 md:pt-8 pb-10">
          <div className="flex flex-col items-center gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent flex items-center gap-3 tracking-wide">
              Student Reviews
            </h2>
            <p className="text-gray-200/80 text-sm md:text-base max-w-2xl text-center">
              Real feedback from learners who elevated their <span className="text-purple-300 font-medium">options</span> with us.
            </p>
          </div>
          <ReviewCarousel />
        </div>
      </div>
    </div>
  );
}