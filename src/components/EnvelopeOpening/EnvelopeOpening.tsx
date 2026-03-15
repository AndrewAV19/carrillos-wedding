import React, { useState, useRef } from "react";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const PETAL_EMOJIS = ["🌸", "🌺", "✿", "❀"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&display=swap');

  .env-scene {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: radial-gradient(ellipse at 50% 60%, #fff5f7 0%, #fef0f4 40%, #fce8f0 100%);
  }

  .env-star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #e8a0b4;
    animation: env-twinkle 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes env-twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.8); }
  }

  .env-petal {
    position: absolute;
    top: -30px;
    pointer-events: none;
    animation: env-fall linear infinite;
    opacity: 0;
  }

  @keyframes env-fall {
    0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(110vh) rotate(540deg); opacity: 0; }
  }

  .env-center {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  .env-pretitle {
    font-family: 'Pinyon Script', cursive;
    font-size: 44px;
    color: #b5436a;
    line-height: 1;
    margin-bottom: 4px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .env-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: #c9738a;
    text-transform: uppercase;
    margin-bottom: 28px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .env-fade-out {
    opacity: 0 !important;
    transform: translateY(-10px) !important;
    pointer-events: none;
  }

  .env-wrap {
    width: 300px;
    height: 188px;
    position: relative;
    cursor: pointer;
    animation: env-float 3.5s ease-in-out infinite;
    filter: drop-shadow(0 12px 24px rgba(176, 54, 103, 0.2));
    transition: transform 0.15s;
    user-select: none;
  }

  .env-wrap:hover  { transform: scale(1.04); }
  .env-wrap:active { transform: scale(0.97); }

  .env-wrap.env-opened {
    animation: none;
    pointer-events: none;
  }

  @keyframes env-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }

  .env-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .env-flap {
    transform-origin: 50% 0%;
    transform-box: fill-box;
  }

  .env-flap.env-opening {
    animation: env-openFlap 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes env-openFlap {
    0%   { transform: rotateX(0deg); }
    100% { transform: rotateX(180deg); }
  }

  .env-heart-pulse {
    transform-origin: center;
    transform-box: fill-box;
    animation: env-pulse 1.8s ease-in-out infinite;
  }

  @keyframes env-pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.2); }
  }

  /* ── Letter card ── */
  .env-letter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 55px)) scale(0.9);
    width: 320px;
    background: #fffbf4;
    border: 0.5px solid #f0d0dc;
    border-radius: 14px;
    padding: 30px 28px 24px;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.9s cubic-bezier(0.2, 0, 0.2, 1),
                transform 0.9s cubic-bezier(0.2, 0, 0.2, 1);
    box-shadow: 0 20px 50px rgba(176, 54, 103, 0.14);
    z-index: 10;
  }

  .env-letter.env-letter-visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }

  .env-letter-deco {
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4769a, transparent);
    border-radius: 2px;
  }

  .env-letter-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .env-letter-line {
    flex: 1;
    height: 0.5px;
    background: #e8bfcc;
  }

  .env-letter-heart-icon {
    color: #d4769a;
    font-size: 11px;
  }

  .env-letter-script {
    font-family: 'Pinyon Script', cursive;
    font-size: 48px;
    color: #b5436a;
    line-height: 1;
    margin-bottom: 4px;
  }

  .env-letter-names {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #6b2040;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .env-letter-divider {
    width: 36px;
    height: 0.5px;
    background: #e8bfcc;
    margin: 0 auto 12px;
  }

  .env-letter-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 300;
    color: #8a4560;
    line-height: 1.72;
    letter-spacing: 0.02em;
  }

  .env-letter-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 400;
    color: #b5436a;
    letter-spacing: 0.14em;
    margin-top: 16px;
  }

  .env-letter-city {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #c9738a;
    margin-top: 3px;
  }
`;

const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const calledOnOpen = useRef(false);

  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 12 + Math.random() * 10,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    })),
  );

  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })),
  );

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    setTimeout(() => {
      setShowLetter(true);
      setTimeout(() => {
        if (!calledOnOpen.current) {
          calledOnOpen.current = true;
          onOpen();
        }
      }, 8500);
    }, 900);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="env-scene">
        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="env-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

        {/* Petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="env-petal"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        <div className="env-center">
          {/* Heading */}
          <div className={`env-pretitle${opened ? " env-fade-out" : ""}`}>
            Para ti
          </div>
          <div className={`env-subtitle${opened ? " env-fade-out" : ""}`}>
            Toca el sobre para abrir la invitación
          </div>

          {/* Envelope */}
          <div
            className={`env-wrap${opened ? " env-opened" : ""}`}
            onClick={handleOpen}
            role="button"
            aria-label="Abrir invitación"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
          >
            <svg
              className="env-svg"
              viewBox="0 0 300 188"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="env-bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff6f8" />
                  <stop offset="100%" stopColor="#fce8ef" />
                </linearGradient>
                <linearGradient id="env-flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fce8ef" />
                  <stop offset="100%" stopColor="#f9d0de" />
                </linearGradient>
              </defs>

              {/* Envelope body */}
              <rect
                x="0"
                y="56"
                width="300"
                height="132"
                rx="8"
                fill="url(#env-bodyGrad)"
                stroke="#f0c4d4"
                strokeWidth="0.8"
              />

              {/* Left wing */}
              <polygon
                points="0,62 0,188 130,128"
                fill="#fde0e9"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Right wing */}
              <polygon
                points="300,62 300,188 170,128"
                fill="#fde0e9"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Bottom fold */}
              <polygon
                points="0,188 300,188 150,116"
                fill="#f9d0de"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Flap */}
              <g className={`env-flap${opened ? " env-opening" : ""}`}>
                <polygon
                  points="0,62 300,62 150,148"
                  fill="url(#env-flapGrad)"
                  stroke="#f0c4d4"
                  strokeWidth="0.8"
                />
              </g>

              {/* Wax seal */}
              <circle
                cx="150"
                cy="116"
                r="22"
                fill="#fff0f4"
                stroke="#f0c4d4"
                strokeWidth="0.8"
              />

              {/* Heart in seal */}
              <path
                className="env-heart-pulse"
                d="M150,124 C147.5,119.5 139,114 139,107.5 C139,103.5 141.8,101 145.5,101 C147.2,101 148.8,101.7 150,103.2 C151.2,101.7 152.8,101 154.5,101 C158.2,101 161,103.5 161,107.5 C161,114 152.5,119.5 150,124 Z"
                fill="#e8748a"
              />

              {/* Rose decorations */}
              <text x="18" y="95" fontSize="14" opacity="0.5">
                🌸
              </text>
              <text x="265" y="95" fontSize="14" opacity="0.5">
                🌸
              </text>
            </svg>
          </div>

          {/* Letter */}
          <div
            className={`env-letter${showLetter ? " env-letter-visible" : ""}`}
          >
            <div className="env-letter-deco" />

            <div className="env-letter-row">
              <div className="env-letter-line" />
              <span className="env-letter-heart-icon">♥</span>
              <div className="env-letter-line" />
            </div>

            <div className="env-letter-script">Con Amor</div>
            <div className="env-letter-names">Jesús &amp; Ana Gabriela</div>
            <div className="env-letter-divider" />

            <div className="env-letter-body">
              Con todo el amor de nuestros corazones,
              <br />
              te invitamos a celebrar el inicio
              <br />
              de nuestra nueva vida juntos.
            </div>

            <div className="env-letter-date">26 · Septiembre · 2026</div>
            <div className="env-letter-city">Grand Jardín</div>

            <div className="env-letter-row" style={{ marginTop: 18 }}>
              <div className="env-letter-line" />
              <span className="env-letter-heart-icon">♥</span>
              <div className="env-letter-line" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvelopeOpening;
