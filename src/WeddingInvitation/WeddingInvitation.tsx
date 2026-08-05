import React, { useState, useEffect, memo, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  alpha,
  Paper,
  Button,
  IconButton,
  Fade,
  Grow,
  Zoom,
  Modal,
  Backdrop,
  Chip,
  Grid,
  Stack,
  Slide,
  useTheme,
} from "@mui/material";
import {
  Favorite as HeartIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  DryCleaning as DryCleaningIcon,
  PhotoCamera as PhotoIcon,
  History as HistoryIcon,
  ChevronLeft as LeftIcon,
  Close as CloseIcon,
  Church as ChurchIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Palette as PaletteIcon,
  CardGiftcard as GiftIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";
import HistorySection from "../components/HistorySection/HistorySection";
import Gallery from "../components/Gallery/Gallery";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import AttendanceForm from "../components/AttendanceForm/AttendanceForm";

const ColorPaletteModal = ({
  imageUrl,
  open,
  onOpen,
  onClose,
}: {
  imageUrl: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <IconButton
        onClick={onOpen}
        sx={{
          position: "fixed",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          zIndex: 9999,
          width: 56,
          height: 56,
          background: `linear-gradient(135deg, #C2255C, #E8618F)`,
          color: "#fff",
          boxShadow: "0 4px 20px rgba(194, 37, 92, 0.45)",
          "&:hover": {
            transform: "translateY(-50%) scale(1.1)",
            boxShadow: "0 8px 30px rgba(194, 37, 92, 0.55)",
          },
          transition: "all 0.3s ease",
          border: "2px solid rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <PaletteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90%",
              maxHeight: "90%",
              outline: "none",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 10,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  background: "rgba(0,0,0,0.8)",
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s ease",
                width: 40,
                height: 40,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                color: "#fff",
                zIndex: 10,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textAlign: "center",
                }}
              >
                Paleta de colores
              </Typography>
            </Box>

            <img
              src={imageUrl}
              alt="Paleta de colores"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

const Bougainvillea = ({
  size = 90,
  rotate = 0,
  src = "/flowers/bougan-1.png",
  flip = false,
  style = {},
}: {
  size?: number;
  rotate?: number;
  src?: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    style={{
      width: size,
      height: "auto",
      transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
      filter: "drop-shadow(0 6px 14px rgba(61,31,45,0.22))",
      userSelect: "none",
      ...style,
    }}
  />
);

const GoldCorner = ({
  position,
  size = 74,
}: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
}) => {
  const flips: Record<string, string> = {
    tl: "scaleX(1) scaleY(1)",
    tr: "scaleX(-1) scaleY(1)",
    bl: "scaleX(1) scaleY(-1)",
    br: "scaleX(-1) scaleY(-1)",
  };
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: -2, left: -2 },
    tr: { top: -2, right: -2 },
    bl: { bottom: -2, left: -2 },
    br: { bottom: -2, right: -2 },
  };
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        zIndex: 2,
        pointerEvents: "none",
        ...pos[position],
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ transform: flips[position] }}
      >
        <path
          d="M2 46 L2 12 Q2 2 12 2 L46 2"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M2 28 Q 20 28 28 8"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="11" cy="11" r="3" fill="#E8A33D" opacity="0.75" />
        <path
          d="M11 11 Q 4 4 -3 7"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <path
          d="M11 11 Q 18 4 25 8"
          fill="none"
          stroke="#E8A33D"
          strokeWidth="0.8"
          opacity="0.5"
        />
      </svg>
    </Box>
  );
};

export interface BougainvilleaScatterProps {
  cardHeight?: number;
  flowerSpacing?: number;
  minPosition?: number;
  maxPosition?: number;
}

export const BougainvilleaScatter = ({
  cardHeight = 1000,
  flowerSpacing = 5,
  minPosition = 150,
  maxPosition = 200,
}: BougainvilleaScatterProps = {}) => {
  const calculateFlowerPositions = () => {
    const positions = [];
    const startPosition = minPosition;
    const endPosition = cardHeight - maxPosition;

    const numberOfFlowers = Math.floor(
      (endPosition - startPosition) / flowerSpacing,
    );

    for (let i = 0; i < numberOfFlowers; i++) {
      const basePos =
        startPosition +
        (i * (endPosition - startPosition)) / (numberOfFlowers - 1 || 1);
      const variation = Math.floor(Math.random() * 30 - 15);
      const finalPos = Math.max(
        startPosition,
        Math.min(endPosition, basePos + variation),
      );
      positions.push(finalPos);
    }

    return positions;
  };

  const [flowerPositions, setFlowerPositions] = useState<number[]>([]);

  useEffect(() => {
    setFlowerPositions(calculateFlowerPositions());
  }, [cardHeight, flowerSpacing, minPosition, maxPosition]);

  if (flowerPositions.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -8,
            left: -26,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={16} src="/flowers/bougan-1.png" />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -60,
            left: 76,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={600} src="/flowers/bougan-1.png" />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -60,
            left: 146,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={600} src="/flowers/bougan-1.png" />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -60,
            left: 236,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={600} src="/flowers/bougan-1.png" />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -60,
            left: 326,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={600} src="/flowers/bougan-1.png" />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -60,
            left: 416,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={600} src="/flowers/bougan-1.png" />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            top: -8,
            right: -26,
            zIndex: 2,
            "--r": "-12deg",
          } as any
        }
      >
        <Bougainvillea size={110} rotate={-256} src="/flowers/bougan-1.png" />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -26,
            right: -14,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={256}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -56,
            right: 54,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={136}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -56,
            right: 124,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={136}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -56,
            right: 194,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={136}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -56,
            right: 274,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={136}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>
      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -56,
            right: 384,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={110}
          rotate={136}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>

      <Box
        className="wi-bougan"
        sx={
          {
            position: "absolute",
            bottom: -10,
            left: -24,
            zIndex: 2,
            animationDelay: "1.1s",
            "--r": "168deg",
          } as any
        }
      >
        <Bougainvillea
          size={100}
          rotate={-356}
          src="/flowers/bougan-1.png"
          flip
        />
      </Box>

      {flowerPositions.map((topPosition, index) => (
        <Box
          key={`right-${index}`}
          className="wi-bougan"
          sx={
            {
              position: "absolute",
              top: topPosition,
              right: -8,
              zIndex: 2,
              opacity: 0.85,
              animationDelay: `${0.3 + index * 0.04}s`,
              "--r": "55deg",
            } as any
          }
        >
          <Bougainvillea
            size={40 + (index % 3) * 5}
            rotate={-100 + ((index * 7) % 20) - 10}
            src="/flowers/bougan-3.png"
          />
        </Box>
      ))}

      {flowerPositions.map((topPosition, index) => (
        <Box
          key={`left-${index}`}
          className="wi-bougan"
          sx={
            {
              position: "absolute",
              top: topPosition,
              left: -20,
              zIndex: 0,
              opacity: 0.85,
              animationDelay: `${0.3 + index * 0.04}s`,
              "--r": "55deg",
            } as any
          }
        >
          <Bougainvillea
            size={40 + (index % 3) * 5}
            rotate={100 + ((index * 7) % 20) - 10}
            src="/flowers/bougan-3.png"
          />
        </Box>
      ))}
    </>
  );
};

const CountdownTimer = memo(
  ({
    rose,
    rosePale,
    ink,
  }: {
    rose: string;
    rosePale: string;
    ink: string;
  }) => {
    const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const target = new Date("2026-09-26T17:00:00").getTime();
      const tick = () => {
        const diff = target - Date.now();
        if (diff > 0) {
          setCd({
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          });
        }
      };
      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, []);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1.5, sm: 3 },
          mb: 4,
        }}
      >
        {[
          { v: cd.days, l: "Días" },
          { v: cd.hours, l: "Horas" },
          { v: cd.minutes, l: "Min" },
          { v: cd.seconds, l: "Seg" },
        ].map(({ v, l }) => (
          <Box key={l} sx={{ textAlign: "center" }}>
            <Paper
              elevation={0}
              sx={{
                width: { xs: 54, sm: 64 },
                height: { xs: 54, sm: 64 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                background: `linear-gradient(145deg, ${rosePale}, #fff)`,
                border: `1px solid ${alpha(rose, 0.35)}`,
                mb: 0.75,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "1.5rem", sm: "1.8rem" },
                  fontWeight: 600,
                  color: rose,
                  lineHeight: 1,
                }}
              >
                {String(v).padStart(2, "0")}
              </Typography>
            </Paper>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: alpha(rose, 0.8),
                fontWeight: 600,
              }}
            >
              {l}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  },
);

const RomanticCarousel = memo(
  ({
    images,
    rose,
    gold,
    cream,
  }: {
    images: string[];
    rose: string;
    gold: string;
    cream: string;
  }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      if (isPaused || images.length <= 1) return;
      const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 4500);
      return () => clearInterval(id);
    }, [isPaused, images.length]);

    if (images.length === 0) return null;

    const goTo = (i: number) =>
      setIndex(((i % images.length) + images.length) % images.length);

    return (
      <Box sx={{ mb: 5 }}>
        <Box
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            maxHeight: 460,
            mx: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            border: `2px solid ${alpha(gold, 0.55)}`,
            boxShadow: `0 16px 48px ${alpha(rose, 0.22)}`,
          }}
        >
          {images.map((src, i) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={`Foto de la pareja ${i + 1}`}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === index ? 1 : 0,
                transform: i === index ? "scale(1)" : "scale(1.06)",
                transition: "opacity 1.2s ease, transform 6s ease",
              }}
            />
          ))}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 60%, ${alpha("#2A1420", 0.55)} 100%)`,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 8,
              border: `1px solid ${alpha(cream, 0.5)}`,
              borderRadius: "14px",
              pointerEvents: "none",
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                onClick={() => goTo(index - 1)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  width: 34,
                  height: 34,
                  background: alpha("#000", 0.35),
                  color: "#fff",
                  backdropFilter: "blur(4px)",
                  "&:hover": { background: alpha("#000", 0.55) },
                }}
              >
                <LeftIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                onClick={() => goTo(index + 1)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%) rotate(180deg)",
                  width: 34,
                  height: 34,
                  background: alpha("#000", 0.35),
                  color: "#fff",
                  backdropFilter: "blur(4px)",
                  "&:hover": { background: alpha("#000", 0.55) },
                }}
              >
                <LeftIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </>
          )}

          <Typography
            sx={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "1.9rem",
              color: "#fff",
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            Nuestros momentos
          </Typography>
        </Box>

        {images.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 1.5,
            }}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={() => goTo(i)}
                sx={{
                  width: i === index ? 20 : 8,
                  height: 8,
                  borderRadius: "100px",
                  background: i === index ? rose : alpha(rose, 0.3),
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  },
);

const SingleImageCarousel = memo(
  ({
    image,
    rose,
    gold,
    cream,
  }: {
    image: string;
    rose: string;
    gold: string;
    cream: string;
  }) => {
    return (
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            maxHeight: 460,
            mx: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            border: `2px solid ${alpha(gold, 0.55)}`,
            boxShadow: `0 16px 48px ${alpha(rose, 0.22)}`,
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Foto de la pareja"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 6s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 60%, ${alpha("#2A1420", 0.55)} 100%)`,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 8,
              border: `1px solid ${alpha(cream, 0.5)}`,
              borderRadius: "14px",
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    );
  },
);

interface WeddingInvitationProps {
  novio?: string;
  novia?: string;
  fecha?: string;
  hora?: string;
  horaFiesta?: string;
  lugar?: string;
  lugarCeremonia?: string;
  direccion?: string;
  mensaje?: string;
  historia?: string;
  fotos?: string[];
  codigoVestimenta?: string;
  frasePersonal?: string;
  coordenadasGPS?: { lat: number; lng: number };
  codigoDresscode?: string;
  notasAdicionales?: string;
}

const ROMANTIC_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&display=swap');

  @keyframes wi-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-8px) rotate(0.5deg); }
    66%       { transform: translateY(-4px) rotate(-0.5deg); }
  }
  @keyframes wi-pulse-heart {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50%       { transform: scale(1.25); opacity: 1; }
  }
  @keyframes wi-petal-fall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.4; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes wi-twinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.8); }
    50%       { opacity: 0.7; transform: scale(1.3); }
  }
  @keyframes wi-appear {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wi-sway {
    0%, 100% { transform: rotate(var(--r, 0deg)) translateY(0); }
    50%       { transform: rotate(calc(var(--r, 0deg) + 3deg)) translateY(-3px); }
  }

  .wi-card-detail {
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease !important;
  }
  .wi-card-detail:hover { transform: translateY(-6px) !important; }

  .wi-petal {
    position: fixed;
    top: -40px;
    pointer-events: none;
    animation: wi-petal-fall linear infinite;
    opacity: 0;
    z-index: 0;
  }
  .wi-star {
    position: fixed;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #d4a0b8;
    pointer-events: none;
    animation: wi-twinkle ease-in-out infinite;
    z-index: 0;
  }
  .wi-section-appear {
    animation: wi-appear 0.8s cubic-bezier(0.2,0,0.2,1) forwards;
  }
  .wi-bougan {
    animation: wi-sway 5s ease-in-out infinite;
    transform-origin: 50% 50%;
  }
  @media (prefers-reduced-motion: reduce) {
    .wi-bougan { animation: none; }
  }
`;

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  novio = "Jesús Carrillo Salcedo",
  novia = "Ana Gabriela López Aguilar",
  fecha = "26 de Septiembre, 2026",
  hora = "5:00 PM",
  horaFiesta = "7:00 PM",
  lugar = "Grand Jardín",
  lugarCeremonia = "Parroquia Santa Mónica",
  direccion = "La Barca, Jalisco",
  mensaje = "Con la bendición de Dios y nuestros padres, nos unimos en matrimonio y queremos compartir esta alegría contigo.",
  historia = `Lo que comenzó como un sueño de niños, Dios lo hizo realidad. 13 años después, el destino nos ha traído de vuelta al mismo punto: al abrazo de quien siempre fue nuestro destino.`,
  fotos = [],
  codigoVestimenta = "Formal",
  frasePersonal = "Y en un beso, supimos que era para siempre",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
  codigoDresscode = "Nos reservamos el blanco",
  notasAdicionales = "Nuestra boda será una celebración muy íntima y especial. Por ello, hemos reservado lugares específicos para quienes más queremos; si estás en nuestra lista, es porque eres pieza fundamental en nuestra historia. Te pedimos confirmar tu asistencia lo antes posible, ya que cada detalle está planeado pensando para ti.",
}) => {
  const [activeSection, setActiveSection] = useState<
    "invitation" | "history" | "gallery" | "details"
  >("invitation");
  const [openModal, setOpenModal] = useState(false);
  const [openColorPalette, setOpenColorPalette] = useState(false);
  const [cardHeight, setCardHeight] = useState(1200);
  const [modalHeight, setModalHeight] = useState(600);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    const measureCard = () => {
      if (cardRef.current) {
        const height = cardRef.current.offsetHeight;
        if (height > 0) {
          setCardHeight(height);
        }
      }
    };

    const timeoutId = setTimeout(measureCard, 100);
    window.addEventListener("resize", measureCard);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureCard);
    };
  }, [activeSection]);

  useEffect(() => {
    if (!openModal) return;

    const measureModal = () => {
      if (modalRef.current) {
        const height = modalRef.current.offsetHeight;
        if (height > 0) {
          setModalHeight(height);
        }
      }
    };

    const timeoutId = setTimeout(measureModal, 100);
    window.addEventListener("resize", measureModal);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureModal);
    };
  }, [openModal]);

  const openMaps = () => {
    if (coordenadasGPS) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`,
        "_blank",
      );
    }
  };

  const openMapsIglesia = () => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5188516411395!2d-102.54972!3d20.278779999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842ec2145c5f2387%3A0xd2e57aab01bade3b!2sSanta%20Monica%20parish%20of%20La%20Barca!5e0!3m2!1sen!2smx!4v1783645127070!5m2!1sen!2smx",
      "_blank",
    );
  };

  const rose = "#C2255C";
  const roseL = "#E8618F";
  const roseDeep = "#8E1743";
  const rosePale = "#FBE1EA";
  const gold = "#E8A33D";
  const goldDark = "#C97B1F";
  const cream = "#FFFBF6";
  const ink = "#5C3A21";

  const Ornament = () => (
    <Typography
      component="span"
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.1rem",
        color: gold,
        opacity: 0.9,
        mx: 1,
      }}
    >
      ✦
    </Typography>
  );

  const SectionDivider = ({ label }: { label?: string }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "80%",
        mx: "auto",
        my: 3,
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${alpha(rose, 0.65)})`,
        }}
      />
      <Ornament />
      {label && (
        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: roseDeep,
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      )}
      <Ornament />
      <Box
        sx={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, ${alpha(rose, 0.65)}, transparent)`,
        }}
      />
    </Box>
  );

  const GoldFrameLine = () => (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${gold} 30%, ${rose} 50%, ${gold} 70%, transparent)`,
          opacity: 0.75,
        }}
      />
      <Box
        sx={{
          width: "70%",
          height: 1,
          mx: "auto",
          mt: "3px",
          background: `linear-gradient(90deg, transparent, ${alpha(gold, 0.6)}, transparent)`,
        }}
      />
    </Box>
  );

  const DetailCard = ({
    icon: Icon,
    title,
    value,
    sub,
    delay = 0,
    onClick,
  }: {
    icon: React.ElementType;
    title: string;
    value: string;
    sub?: string;
    delay?: number;
    onClick?: () => void;
  }) => (
    <Fade in timeout={800 + delay}>
      <Paper
        className="wi-card-detail"
        elevation={0}
        onClick={onClick}
        sx={{
          p: { xs: 2.5, sm: 3 },
          height: "100%",
          background: "#C05C3E", // ← Terracota principal
          backdropFilter: "blur(2px)",
          border: `1px solid ${alpha("#D4A373", 0.55)}`, // ← Dorado suave
          borderRadius: "20px",
          boxShadow: `0 4px 24px ${alpha("#8B3A2A", 0.15)}`, // ← Sombra terracota oscuro
          "&:hover": {
            boxShadow: `0 16px 40px ${alpha("#8B3A2A", 0.3)}`, // ← Sombra más intensa
            ...(onClick && { transform: "translateY(-6px)" }),
          },
          cursor: onClick ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 90% 10%, ${alpha("#D4A373", 0.15)} 0%, transparent 60%)`, // ← Dorado tenue
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: "1.8rem",
            color: alpha("#F8EDE3", 0.15), // ← Crema muy sutil
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1,
          }}
        >
          ❧
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              flexShrink: 0,
              background: `linear-gradient(135deg, ${alpha("#F8EDE3", 0.15)}, ${alpha("#D4A373", 0.2)})`, // ← Fondo sutil
              border: `1px solid ${alpha("#F8EDE3", 0.25)}`, // ← Borde crema
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 20, color: "#F8EDE3" }} />{" "}
            {/* ← Icono crema */}
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4A373", // ← Dorado suave para título
                fontWeight: 600,
                mb: 0.3,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.05rem", sm: "1.15rem" },
                fontWeight: 500,
                color: "#F8EDE3", // ← Crema para valor principal
                lineHeight: 1.3,
              }}
            >
              {value}
            </Typography>
            {sub && (
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.88rem",
                  color: "#F8EDE3", // ← Crema para subtítulo
                  fontStyle: "italic",
                  fontWeight: 400,
                  opacity: 0.85,
                  mt: 0.3,
                }}
              >
                {sub}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
  const NoteCard = ({
    icon: Icon,
    title,
    text,
    delay = 0,
  }: {
    icon: React.ElementType;
    title: string;
    text: string;
    delay?: number;
  }) => (
    <Fade in timeout={900 + delay}>
      <Paper
        className="wi-card-detail"
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          mb: 8,
          borderRadius: 4,
          background: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
            padding: "2px",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: 8,
            right: 12,
            fontSize: "1.8rem",
            color: alpha(gold, 0.2),
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1,
          }}
        >
          ❧
        </Typography>

        <Box
          sx={{
            width: 44,
            height: 44,
            mx: "auto",
            mb: 1.5,
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${alpha(rose, 0.18)}, ${alpha(gold, 0.22)})`,
            border: `1px solid ${alpha(rose, 0.35)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ fontSize: 20, color: rose }} />
        </Box>

        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: roseDeep,
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontStyle: "italic",
            fontWeight: 400,
            color: alpha(ink, 0.85),
            lineHeight: 1.85,
          }}
        >
          {text}
        </Typography>
      </Paper>
    </Fade>
  );

  const InvitationSection = () => (
    <Grow in timeout={900}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <GoldFrameLine />
        </Box>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            sx={{
              fontSize: "2rem",
              color: alpha(gold, 0.55),
              lineHeight: 1,
              mb: 1,
              animation: "wi-float 6s ease-in-out infinite",
              display: "block",
            }}
          >
            ♛
          </Typography>

          {/* Cuadro decorativo alrededor del texto de introducción */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              mb: 4,
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",

              // Igual que el Paper del video
              background: alpha(theme.palette.common.black, 0.01),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,

              transition: "all 0.3s ease",

              "&:hover": {
                borderColor: alpha(theme.palette.primary.main, 0.4),
                boxShadow: `0 20px 40px -12px ${alpha(
                  theme.palette.primary.main,
                  0.3,
                )}`,
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                letterSpacing: "0.06em",
                textAlign: "center",
                color: ink,
                fontWeight: 400,
                lineHeight: 1.9,
                fontStyle: "italic",
                position: "relative",
                zIndex: 1,
              }}
            >
              Hay momentos en la vida que son especiales por sí solos, pero
              compartirlos con quienes más amamos los hace inolvidables. Por
              eso, queremos que sean parte del día en que unimos nuestras vidas.
            </Typography>

            {/* Esquina superior izquierda */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 20,
                height: 20,
                borderTop: `2px solid ${alpha(gold, 0.35)}`,
                borderLeft: `2px solid ${alpha(gold, 0.35)}`,
                borderRadius: "4px 0 0 0",
                pointerEvents: "none",
              }}
            />

            {/* Esquina superior derecha */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 20,
                height: 20,
                borderTop: `2px solid ${alpha(gold, 0.35)}`,
                borderRight: `2px solid ${alpha(gold, 0.35)}`,
                borderRadius: "0 4px 0 0",
                pointerEvents: "none",
              }}
            />

            {/* Esquina inferior izquierda */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                width: 20,
                height: 20,
                borderBottom: `2px solid ${alpha(gold, 0.35)}`,
                borderLeft: `2px solid ${alpha(gold, 0.35)}`,
                borderRadius: "0 0 0 4px",
                pointerEvents: "none",
              }}
            />

            {/* Esquina inferior derecha */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 20,
                height: 20,
                borderBottom: `2px solid ${alpha(gold, 0.35)}`,
                borderRight: `2px solid ${alpha(gold, 0.35)}`,
                borderRadius: "0 0 4px 0",
                pointerEvents: "none",
              }}
            />
          </Paper>

          <Typography
            sx={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: { xs: "3.2rem", sm: "4.2rem" },
              color: rose,
              lineHeight: 1,
              mb: 0.5,
              animation: "wi-float 5s ease-in-out infinite",
              display: "block",
            }}
          >
            {novio.split(" ")[0]}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "80%",
              mx: "auto",
              my: 1.5,
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${alpha(gold, 0.7)})`,
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: goldDark,
                mx: 2,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              &amp;
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: "1px",
                background: `linear-gradient(90deg, ${alpha(gold, 0.7)}, transparent)`,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: { xs: "3.2rem", sm: "4.2rem" },
              color: rose,
              lineHeight: 1,
              mb: 2,
              animation: "wi-float 5.5s ease-in-out infinite 0.5s",
              display: "block",
            }}
          >
            {novia.split(" ")[1]}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 400,
              color: alpha(ink, 0.75),
              letterSpacing: "0.06em",
              mb: 0.5,
            }}
          >
            {novio}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 400,
              color: alpha(ink, 0.75),
              letterSpacing: "0.06em",
              mb: 3,
            }}
          >
            {novia}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "1.05rem", sm: "1.15rem" },
              fontStyle: "italic",
              fontWeight: 500,
              color: roseDeep,
              mb: 3,
            }}
          >
            "{frasePersonal}"
          </Typography>

          <SectionDivider />
        </Box>

        <CountdownTimer rose={rose} rosePale={rosePale} ink={ink} />

        <Fade in timeout={1200}>
          <Box sx={{ textAlign: "center", mb: 4, px: 1 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: roseDeep,
                fontWeight: 600,
                mb: 2.5,
              }}
            >
              Con la bendición de nuestros padres
            </Typography>
            {[
              "Sra. Laura Karina Salcedo Hernández",
              "Sr. J. Jesús Carrillo Ibarra",
            ].map((name) => (
              <Typography
                key={name}
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                  fontWeight: 400,
                  color: ink,
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                {name}
              </Typography>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                my: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: "1px",
                  background: alpha(gold, 0.6),
                }}
              />
              <Typography
                sx={{
                  color: gold,
                  fontSize: "1rem",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                ❧
              </Typography>
              <Box
                sx={{
                  width: 32,
                  height: "1px",
                  background: alpha(gold, 0.6),
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1rem", sm: "1.05rem" },
                fontWeight: 400,
                color: ink,
                fontStyle: "italic",
              }}
            >
              Sra. María Eulalia Aguilar Sánchez
            </Typography>
          </Box>
        </Fade>

        <SingleImageCarousel
          image="/boda22.jpeg"
          rose={rose}
          gold={gold}
          cream={cream}
        />

        <SectionDivider label="El gran día" />

        <Fade in timeout={1400}>
          <Box sx={{ textAlign: "center", px: { xs: 1, sm: 3 }, mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.05rem", sm: "1.15rem" },
                fontWeight: 400,
                fontStyle: "italic",
                color: alpha(ink, 0.85),
                lineHeight: 1.9,
              }}
            >
              "{mensaje}"
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailCard
              icon={CalendarIcon}
              title="Fecha"
              value={fecha}
              sub="Sábado"
              delay={0}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailCard
              icon={TimeIcon}
              title="Ceremonia"
              value={lugarCeremonia}
              sub={hora}
              delay={150}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailCard
              icon={ChurchIcon}
              title="Lugar"
              value={lugar}
              sub={horaFiesta}
              delay={300}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailCard
              onClick={() => setOpenColorPalette(true)}
              icon={DryCleaningIcon}
              title="Vestimenta"
              value={codigoVestimenta}
              sub={codigoDresscode}
              delay={450}
            />
          </Grid>
        </Grid>

        <RomanticCarousel
          images={["/boda30.jpeg"]}
          rose={rose}
          gold={gold}
          cream={cream}
        />

        <NoteCard
          icon={SparkleIcon}
          title="Un día muy especial"
          text={notasAdicionales}
          delay={0}
        />

        <NoteCard
          icon={GiftIcon}
          title="Sobre los regalos"
          text="Lo más valioso para nosotros es su compañía en nuestro gran día. Si desean tener un detalle especial con nosotros, preferiríamos recibir su apoyo en efectivo, el cual destinaremos a construir nuestro futuro juntos. Durante la recepción contaremos con una lluvia de sobres y un código QR para transferencias. ¡Gracias por ayudarnos a empezar nuestra historia!"
          delay={150}
        />

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 3, gap: 1, mt: 4 }}
        >
          {[
            {
              icon: LocationIcon,
              label: "Ubicación",
              section: "details" as const,
            },
            {
              icon: HistoryIcon,
              label: "Historia",
              section: "history" as const,
            },
            { icon: PhotoIcon, label: "Galería", section: "gallery" as const },
          ].map(({ icon: Icon, label, section }) => (
            <Button
              key={label}
              size="small"
              onClick={() => setActiveSection(section)}
              startIcon={<Icon sx={{ fontSize: "16px !important" }} />}
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.88rem",
                letterSpacing: "0.06em",
                textTransform: "none",
                fontWeight: 600,
                color: "#fff",
                border: `1px solid ${alpha(rose, 0.5)}`,
                background: `linear-gradient(135deg, ${rose}, ${roseL})`,
                borderRadius: "100px",
                px: 2.5,
                py: 0.8,
                boxShadow: `0 4px 14px ${alpha(rose, 0.3)}`,

                "&:hover": {
                  background: `linear-gradient(135deg, ${roseDeep}, ${rose})`,
                  borderColor: rose,
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            endIcon={
              <ConfirmationNumberIcon sx={{ fontSize: "16px !important" }} />
            }
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              letterSpacing: "0.12em",
              textTransform: "none",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${gold} 0%, ${goldDark} 100%)`,
              boxShadow: `0 8px 28px ${alpha(goldDark, 0.45)}`,
              color: "#fff",
              borderRadius: "100px",
              px: 4,
              py: 1.4,
              "&:hover": {
                background: `linear-gradient(135deg, ${alpha(gold, 0.95)} 0%, ${goldDark} 100%)`,
                boxShadow: `0 12px 36px ${alpha(goldDark, 0.55)}`,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Confirmar asistencia
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <GoldFrameLine />
        </Box>
      </Box>
    </Grow>
  );

  const LocationSection = () => (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Box className="wi-section-appear">
        <Typography
          sx={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "3rem",
            color: rose,
            textAlign: "center",
            mb: 1,
          }}
        >
          Cómo llegar
        </Typography>
        <SectionDivider />
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            background: alpha(cream, 0.85),
            backdropFilter: "blur(2px)",
            border: `1px solid ${alpha(rose, 0.3)}`,
            borderRadius: "20px",
            boxShadow: `0 4px 24px ${alpha(rose, 0.12)}`,
          }}
        >
          <LocationIcon sx={{ fontSize: 48, color: rose, mb: 2 }} />
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: ink,
              mb: 0.5,
            }}
          >
            Parroquia Santa Mónica
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              fontStyle: "italic",
              color: alpha(ink, 0.7),
              mb: 3,
            }}
          >
            Francisco I. Madero 12, Centro, 47910 La Barca, Jal.
          </Typography>
          <Button
            variant="contained"
            startIcon={<LocationIcon />}
            onClick={openMapsIglesia}
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              textTransform: "none",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${gold} 0%, ${goldDark} 100%)`,
              boxShadow: `0 8px 28px ${alpha(goldDark, 0.4)}`,
              color: "#fff",
              borderRadius: "100px",
              px: 4,
              py: 1.2,

              "&:hover": { transform: "translateY(-2px)" },
              transition: "transform 0.3s",
            }}
          >
            Ver en Google Maps
          </Button>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 8,
            textAlign: "center",
            background: alpha(cream, 0.85),
            backdropFilter: "blur(2px)",
            border: `1px solid ${alpha(rose, 0.3)}`,
            borderRadius: "20px",
            boxShadow: `0 4px 24px ${alpha(rose, 0.12)}`,
          }}
        >
          <LocationIcon sx={{ fontSize: 48, color: rose, mb: 2 }} />
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: ink,
              mb: 0.5,
            }}
          >
            {lugar}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              fontStyle: "italic",
              color: alpha(ink, 0.7),
              mb: 3,
            }}
          >
            {direccion}
          </Typography>
          <Button
            variant="contained"
            startIcon={<LocationIcon />}
            onClick={openMaps}
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem",
              textTransform: "none",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${gold} 0%, ${goldDark} 100%)`,
              boxShadow: `0 8px 28px ${alpha(goldDark, 0.4)}`,
              color: "#fff",
              borderRadius: "100px",
              px: 4,
              py: 1.2,

              "&:hover": { transform: "translateY(-2px)" },
              transition: "transform 0.3s",
            }}
          >
            Ver en Google Maps
          </Button>
        </Paper>
      </Box>
    </Slide>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "history":
        return (
          <HistorySection novio={novio} novia={novia} historia={historia} />
        );
      case "gallery":
        return <Gallery fotos={fotos} />;
      case "details":
        return <LocationSection />;
      default:
        return <InvitationSection />;
    }
  };

  return (
    <>
      <style>{ROMANTIC_STYLES}</style>

      <ColorPaletteModal
        imageUrl="/pcolores.jpeg"
        open={openColorPalette}
        onOpen={() => setOpenColorPalette(true)}
        onClose={() => setOpenColorPalette(false)}
      />

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          overflowX: "hidden",
          background: `
            radial-gradient(ellipse at 20% 20%, ${alpha(rose, 0.12)} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${alpha(gold, 0.1)} 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${alpha(roseL, 0.08)} 0%, transparent 70%),
            #fdf8f5
          `,
        }}
      />

      <Container maxWidth="sm" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <MusicPlayer />

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backdropFilter: "blur(8px)", background: alpha(ink, 0.5) },
          }}
        >
          <Fade in={openModal}>
            <Box
              ref={modalRef}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "95%", sm: 480 },
                maxHeight: "90vh",
                overflow: "hidden",
                background: cream,
                borderRadius: "24px",
                boxShadow: `0 32px 80px ${alpha(ink, 0.25)}`,
                outline: "none",
                border: `1px solid ${alpha(rose, 0.4)}`,
              }}
            >
              <GoldCorner position="tl" />
              <GoldCorner position="tr" />
              <GoldCorner position="bl" />
              <GoldCorner position="br" />

              <BougainvilleaScatter
                cardHeight={modalHeight}
                flowerSpacing={20}
                minPosition={100}
                maxPosition={120}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  maxHeight: "90vh",
                  overflowY: "auto",
                  p: 4,
                }}
              >
                <IconButton
                  onClick={() => setOpenModal(false)}
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: 12,
                    color: alpha(rose, 0.7),
                    "&:hover": { color: rose, transform: "rotate(90deg)" },
                    transition: "all 0.3s",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Box textAlign="center" mb={3}>
                  <HeartIcon
                    sx={{
                      fontSize: 44,
                      color: rose,
                      mb: 1,
                      animation: "wi-pulse-heart 2s ease-in-out infinite",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "'Pinyon Script', cursive",
                      fontSize: "2.8rem",
                      color: rose,
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    Confirma tu asistencia
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                      color: alpha(ink, 0.7),
                      mb: 2,
                    }}
                  >
                    ¡Nos encantaría que nos acompañes en este día tan especial!
                  </Typography>
                  <Chip
                    label={`${novio.split(" ")[0]} & ${novia.split(" ")[1]}`}
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      background: rosePale,
                      color: roseDeep,
                      border: `1px solid ${alpha(rose, 0.45)}`,
                    }}
                  />
                </Box>

                <AttendanceForm
                  novio={novio}
                  novia={novia}
                  onClose={() => setOpenModal(false)}
                />
              </Box>
            </Box>
          </Fade>
        </Modal>

        {activeSection !== "invitation" && (
          <Zoom in>
            <IconButton
              onClick={() => setActiveSection("invitation")}
              sx={{
                position: "fixed",
                top: 20,
                left: 20,
                zIndex: 1000,
                width: 44,
                height: 44,
                background: rose,
                color: "#fff",
                "&:hover": { background: roseDeep, transform: "scale(1.1)" },
                transition: "all 0.3s",
                boxShadow: `0 4px 16px ${alpha(rose, 0.5)}`,
              }}
            >
              <LeftIcon />
            </IconButton>
          </Zoom>
        )}

        <Card
          ref={cardRef}
          elevation={0}
          sx={{
            borderRadius: "28px",
            overflow: "hidden",
            position: "relative",
            border: `1px solid ${alpha(rose, 0.3)}`,
            boxShadow: `0 2px 8px ${alpha(rose, 0.08)}, 0 16px 48px ${alpha(rose, 0.18)}, 0 40px 80px ${alpha(ink, 0.1)}`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="/fondo.jpeg"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: 1,
                filter: "none",
              }}
            />

            <Box
              component="img"
              src="/fondo.jpeg"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: 1,
              }}
            />

            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                backgroundImage: "url('/fondo2.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,248,240,0.1)",
                backdropFilter: "blur(1px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: `linear-gradient(160deg, ${alpha(cream, 0.6)} 0%, ${alpha("#fff", 0.5)} 60%, ${alpha(rosePale, 0.4)} 100%)`,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <GoldCorner position="tl" />
            <GoldCorner position="tr" />
            <GoldCorner position="bl" />
            <GoldCorner position="br" />

            <BougainvilleaScatter
              cardHeight={cardHeight}
              flowerSpacing={20}
              minPosition={100}
              maxPosition={120}
            />

            <CardContent
              sx={{
                p: { xs: 3, sm: 4 },
                backgroundColor: "transparent",
                "&:last-child": { pb: { xs: 3, sm: 4 } },
              }}
            >
              {renderSection()}
            </CardContent>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default WeddingInvitation;
