import React, { useState, useRef, useEffect } from "react";
import { BougainvilleaScatter } from "../../WeddingInvitation/WeddingInvitation";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&display=swap');

  /* ── Bougainvillea (mismo movimiento que en la tarjeta principal) ── */
  @keyframes wi-sway {
    0%, 100% { transform: rotate(var(--r, 0deg)) translateY(0); }
    50%       { transform: rotate(calc(var(--r, 0deg) + 3deg)) translateY(-3px); }
  }
  .wi-bougan {
    animation: wi-sway 5s ease-in-out infinite;
    transform-origin: 50% 50%;
  }
  @media (prefers-reduced-motion: reduce) {
    .wi-bougan { animation: none; }
  }

  .env-scene {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: radial-gradient(ellipse at 50% 60%, #faf0f5 0%, #f5e8ef 35%, #ede0e8 65%, #e8d5e0 100%);
  }

  .env-star {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #d4a8b8;
    animation: env-twinkle 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes env-twinkle {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.8); }
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
    color: #8b5a6b;
    line-height: 1;
    margin-bottom: 4px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .env-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    letter-spacing: 0.2em;
    color: #a87a8a;
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
    filter: drop-shadow(0 12px 24px rgba(139, 90, 107, 0.15));
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

  .env-rings-sparkle {
    transform-origin: center;
    transform-box: fill-box;
    animation: env-sparkle 2.5s ease-in-out infinite;
  }

  @keyframes env-sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  .env-ring1 {
    transform-origin: 150px 116px;
    transform-box: fill-box;
    animation: env-ringFloat 3s ease-in-out infinite;
  }

  .env-ring2 {
    transform-origin: 150px 116px;
    transform-box: fill-box;
    animation: env-ringFloat 3s ease-in-out infinite 0.5s;
  }

  @keyframes env-ringFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }

  /* ── Letter card ── */
  .env-letter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 55px)) scale(0.9);
    width: 340px;
    background: linear-gradient(135deg, #fffbf8 0%, #fdf7f5 100%);
    border: 0.5px solid #e8d0d8;
    border-radius: 16px;
    padding: 34px 30px 28px;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.9s cubic-bezier(0.2, 0, 0.2, 1),
                transform 0.9s cubic-bezier(0.2, 0, 0.2, 1);
    box-shadow: 0 25px 60px rgba(139, 90, 107, 0.12), 
                0 8px 20px rgba(139, 90, 107, 0.06);
    z-index: 10;
    overflow: hidden;
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
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c9a0b0, #d4a8b8, #c9a0b0, transparent);
    border-radius: 2px;
  }

  .env-letter-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .env-letter-line {
    flex: 1;
    height: 0.5px;
    background: #e4cdd5;
  }

  .env-letter-heart-icon {
    color: #c9a0b0;
    font-size: 11px;
  }

  .env-letter-script {
    font-family: 'Pinyon Script', cursive;
    font-size: 50px;
    color: #8b5a6b;
    line-height: 1;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
  }

  .env-letter-names {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #5a3a45;
    letter-spacing: 0.05em;
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
  }

  .env-letter-divider {
    width: 40px;
    height: 0.5px;
    background: #e4cdd5;
    margin: 0 auto 14px;
    position: relative;
    z-index: 1;
  }

  .env-letter-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15.5px;
    font-weight: 300;
    color: #7a5a68;
    line-height: 1.8;
    letter-spacing: 0.02em;
    position: relative;
    z-index: 1;
  }

  .env-letter-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    color: #8b5a6b;
    letter-spacing: 0.14em;
    margin-top: 18px;
    position: relative;
    z-index: 1;
  }

  .env-letter-city {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #a87a8a;
    margin-top: 3px;
    position: relative;
    z-index: 1;
  }
`;

const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const calledOnOpen = useRef(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const [letterHeight, setLetterHeight] = useState(420);

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

  // Mide la altura real de la notita una vez que se muestra,
  // para que las flores (BougainvilleaScatter) se distribuyan
  // correctamente a lo largo de todo su borde.
  useEffect(() => {
    if (!showLetter) return;

    const measure = () => {
      if (letterRef.current) {
        const h = letterRef.current.offsetHeight;
        if (h > 0) setLetterHeight(h);
      }
    };

    const timeoutId = setTimeout(measure, 60);
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measure);
    };
  }, [showLetter]);

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
                  <stop offset="0%" stopColor="#fcf6f8" />
                  <stop offset="100%" stopColor="#f5e8ef" />
                </linearGradient>
                <linearGradient id="env-flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5e8ef" />
                  <stop offset="100%" stopColor="#eddce5" />
                </linearGradient>
                <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c878" />
                  <stop offset="50%" stopColor="#f5e0a0" />
                  <stop offset="100%" stopColor="#d4b060" />
                </linearGradient>
                <linearGradient id="ringSilver" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d8d8d8" />
                  <stop offset="50%" stopColor="#f0f0f0" />
                  <stop offset="100%" stopColor="#c0c0c0" />
                </linearGradient>
                <filter id="ringShadow">
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1.5"
                    floodOpacity="0.2"
                  />
                </filter>
              </defs>

              {/* Envelope body */}
              <rect
                x="0"
                y="56"
                width="300"
                height="132"
                rx="8"
                fill="url(#env-bodyGrad)"
                stroke="#e4cdd5"
                strokeWidth="0.8"
              />

              {/* Left wing */}
              <polygon
                points="0,62 0,188 130,128"
                fill="#f5e5ec"
                stroke="#e4cdd5"
                strokeWidth="0.6"
              />

              {/* Right wing */}
              <polygon
                points="300,62 300,188 170,128"
                fill="#f5e5ec"
                stroke="#e4cdd5"
                strokeWidth="0.6"
              />

              {/* Bottom fold */}
              <polygon
                points="0,188 300,188 150,116"
                fill="#eddce5"
                stroke="#e4cdd5"
                strokeWidth="0.6"
              />

              {/* Flap */}
              <g className={`env-flap${opened ? " env-opening" : ""}`}>
                <polygon
                  points="0,62 300,62 150,148"
                  fill="url(#env-flapGrad)"
                  stroke="#e4cdd5"
                  strokeWidth="0.8"
                />
              </g>

              {/* Wax seal background */}
              <circle
                cx="150"
                cy="116"
                r="24"
                fill="#fcf6f8"
                stroke="#e4cdd5"
                strokeWidth="0.8"
              />

              {/* Inner decorative circle */}
              <circle
                cx="150"
                cy="116"
                r="20"
                fill="none"
                stroke="#d4a8b8"
                strokeWidth="0.5"
                strokeDasharray="3 3"
              />

              {/* ── ANILLOS DE COMPROMISO ── */}
              <g filter="url(#ringShadow)">
                {/* Anillo 1 (Oro) - Izquierda */}
                <g className="env-ring1">
                  {/* Banda del anillo */}
                  <ellipse
                    cx="143"
                    cy="116"
                    rx="12"
                    ry="6"
                    fill="none"
                    stroke="url(#ringGold)"
                    strokeWidth="2.5"
                    transform="rotate(-15, 143, 116)"
                  />
                  {/* Diamante del anillo 1 */}
                  <polygon
                    points="143,109 144.5,111 143,113 141.5,111"
                    fill="#e8f4f8"
                    stroke="#c0d8e0"
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  {/* Brillos del diamante */}
                  <circle
                    cx="143"
                    cy="110"
                    r="0.8"
                    fill="white"
                    opacity="0.8"
                  />
                  <circle
                    cx="142.5"
                    cy="111.5"
                    r="0.5"
                    fill="white"
                    opacity="0.6"
                  />
                </g>

                {/* Anillo 2 (Plata) - Derecha, entrelazado */}
                <g className="env-ring2">
                  {/* Banda del anillo */}
                  <ellipse
                    cx="157"
                    cy="116"
                    rx="12"
                    ry="6"
                    fill="none"
                    stroke="url(#ringSilver)"
                    strokeWidth="2.5"
                    transform="rotate(15, 157, 116)"
                  />
                  {/* Diamante del anillo 2 */}
                  <polygon
                    points="157,109 158.5,111 157,113 155.5,111"
                    fill="#e8f4f8"
                    stroke="#c0d8e0"
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  {/* Brillos del diamante */}
                  <circle
                    cx="157"
                    cy="110"
                    r="0.8"
                    fill="white"
                    opacity="0.8"
                  />
                  <circle
                    cx="156.5"
                    cy="111.5"
                    r="0.5"
                    fill="white"
                    opacity="0.6"
                  />
                </g>
              </g>

              {/* Partículas de brillo alrededor de los anillos */}
              <g className="env-rings-sparkle">
                <circle cx="138" cy="112" r="0.8" fill="#e8c878" opacity="0.6">
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="162" cy="112" r="0.8" fill="#e8c878" opacity="0.6">
                  <animate
                    attributeName="opacity"
                    values="0.6;0.2;0.6"
                    dur="2s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="150" cy="106" r="0.6" fill="#fff" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="2.5s"
                    begin="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="135" cy="119" r="0.6" fill="#fff" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.4;0.1;0.4"
                    dur="2.8s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="165" cy="119" r="0.6" fill="#fff" opacity="0.4">
                  <animate
                    attributeName="opacity"
                    values="0.4;0.1;0.4"
                    dur="2.8s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Rose decorations */}
              <text x="18" y="95" fontSize="14" opacity="0.4">
                🌸
              </text>
              <text x="265" y="95" fontSize="14" opacity="0.4">
                🌸
              </text>
            </svg>
          </div>

          {/* Letter */}
          <div
            ref={letterRef}
            className={`env-letter${showLetter ? " env-letter-visible" : ""}`}
          >
            {/* Flores de buganbilia en los bordes, igual que en la tarjeta principal */}
            <BougainvilleaScatter
              cardHeight={letterHeight}
              flowerSpacing={20}
              minPosition={100}
              maxPosition={120}
            />

            <div className="env-letter-deco" />

            <div className="env-letter-row">
              <div className="env-letter-line" />
              <span className="env-letter-heart-icon">♥</span>
              <div className="env-letter-line" />
            </div>

            <div className="env-letter-script">Con Amor</div>
            <div className="env-letter-names">Jesús &amp; Gabriela</div>
            <div className="env-letter-divider" />

            <div className="env-letter-body">
              Con todo el amor de nuestros corazones,
              <br />
              te invitamos a celebrar junto a nosotros
              <br />
              nuestra maravillosa unión.
            </div>

            <div className="env-letter-date">26 · Septiembre · 2026</div>

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
