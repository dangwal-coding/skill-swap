import React from 'react';
import { FaStar } from "react-icons/fa";
import './Review.css';

// You can later externalize this data if needed

const reviews = [
  {
    name: "Aman S.",
    review: "This course transformed my trading approach! Highly recommended for anyone serious about VOFA.",
    img: "/3Dmodels/second/textures/p1.png",
    rating: 5,
  },
  {
    name: "Priya T.",
    review: "The live sessions and mentorship were invaluable. Great content and support!",
    img: "/3Dmodels/second/textures/p2.png",
    rating: 4,
  },
  {
    name: "Rahul M.",
    review: "Practical strategies and real-world examples made learning easy and effective.",
    img: "/3Dmodels/second/textures/p3.png",
    rating: 3,
  },
  {
    name: "Sneha P.",
    review: "Supportive community and excellent resources. I feel confident in my trading now!",
    img: "/3Dmodels/second/textures/p4.png",
    rating: 2,
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
      className="review-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Floating previous button (visible on md+) */}
      <button onClick={prev} aria-label="Previous" className="review-btn d-none d-md-inline-flex me-2">
        <span aria-hidden>←</span>
      </button>

      <div className="review-inner">
        {reviews.map((rev, idx) => {
          const pos = getPosition(idx);
          if (pos === 'hidden') return null;
          return (
            <div key={idx} className={`review-card ${pos}`}>
              <div className="mb-3 position-relative">
                <img src={rev.img} alt={rev.name} className="review-avatar" loading="lazy" />
              </div>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} style={{ color: i < rev.rating ? '#fbbf24' : '#6b21a8' }} />
                ))}
              </div>
              <p className="review-text">"{rev.review}"</p>
              <span className="review-author">- {rev.name}</span>
            </div>
          );
        })}
      </div>

      {/* Floating next button (visible on md+) */}
      <button onClick={next} aria-label="Next" className="review-btn d-none d-md-inline-flex ms-2">
        <span aria-hidden>→</span>
      </button>

      {/* Mobile controls */}
      <div className="d-flex d-md-none justify-content-between w-100 mt-3 mb-3 px-3">
        <button onClick={prev} className="btn btn-sm btn-primary">Prev</button>
        <button onClick={next} className="btn btn-sm btn-primary">Next</button>
      </div>

      {/* Indicators + progress (bottom center) */}
      <div className="indicators-bottom-center">
        <div className="review-indicators">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`review-indicator ${current === idx ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="review-progress">
          <div
            key={current + '-' + INTERVAL}
            className={`bar ${isPaused || prefersReducedMotion.current ? '' : 'animate-progress'}`}
            style={{ ['--interval']: `${INTERVAL}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <div className="review-section w-100 mt-4 mt-md-5 mb-4 px-3 px-md-4">
      <div className="review-card-wrap w-100 rounded-3xl overflow-hidden shadow-lg position-relative">
        <div className="overlay-gradient" />
        <div className="overlay-radial" />
        <div className="position-relative z-10 py-4 py-md-5">
          <div className="d-flex flex-column align-items-center gap-2 mb-4 text-center">
            <h2 className="h3 h-md-2 fw-bold gradient-text mb-2">Student Reviews</h2>
            <p className="text-muted small mb-0">
              Real feedback from learners who elevated their <span className="text-purple fw-medium">options & VOFA trading journey</span> with us.
            </p>
          </div>
          <ReviewCarousel />
        </div>
      </div>
    </div>
  );
}