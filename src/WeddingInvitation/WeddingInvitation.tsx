import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  useRef,
} from "react";
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

/* ============================================================================
 * PERFORMANCE NOTES (read me!)
 * ----------------------------------------------------------------------------
 * The original file was slow / "se traba" mainly for these reasons, all fixed
 * below:
 *
 * 1. InvitationSection, LocationSection, DetailCard, NoteCard, Ornament,
 *    SectionDivider and GoldFrameLine were declared *inside* the main
 *    component function. That means React saw a brand-new component type on
 *    every single render (every state change: modal open/close, resize,
 *    countdown tick propagation, etc.) and had to unmount + remount the
 *    entire subtree instead of just updating it. That's the #1 cause of
 *    jank/freezes in this file. They're now declared once, outside the
 *    component, so React can diff and reuse them normally.
 *
 * 2. `backdropFilter: blur(...)` was applied to elements with a fully OPAQUE
 *    background (DetailCard). Blur-behind only has a visual effect on
 *    semi-transparent backgrounds, so on an opaque card it was pure wasted
 *    GPU work on every paint. Removed where it had no visible effect.
 *
 * 3. The hero background rendered the same /fondo.jpeg image twice (split
 *    into a "top half" and "bottom half" box) plus a third fixed /fondo2.jpeg
 *    layer. That's redundant image decode/paint work — collapsed into one
 *    layer per distinct image.
 *
 * 4. BougainvilleaScatter recomputed random flower positions with
 *    Math.random() inside a useEffect, causing an extra render pass (a
 *    "flash" of no flowers) and non-deterministic layout on every resize.
 *    It's now computed with useMemo using a deterministic pseudo-random
 *    function, so it's stable and doesn't cost an extra render.
 *
 * 5. Card height was tracked with `window` resize + `setTimeout` polling,
 *    which misses content-driven height changes (images loading, fonts
 *    swapping, Fade/Grow reveals) and re-measures on every resize event
 *    even when nothing changed. Replaced with a debounced ResizeObserver on
 *    the element itself.
 *
 * 6. The ~30 decorative flowers animate `transform` via CSS while also
 *    carrying a `filter: drop-shadow(...)`. Added `will-change: transform`
 *    so the browser promotes each flower to its own compositor layer and
 *    animates it on the GPU instead of repainting the filter every frame.
 * ==========================================================================*/

const COLORS = {
  rose: "#C2255C",
  roseL: "#E8618F",
  roseDeep: "#8E1743",
  rosePale: "#FBE1EA",
  gold: "#E8A33D",
  goldDark: "#C97B1F",
  cream: "#FFFBF6",
  ink: "#5C3A21",
} as const;

/* ---------------------------------------------------------------------- */
/* Small presentational helpers (module scope = stable identity)          */
/* ---------------------------------------------------------------------- */

const ColorPaletteModal = memo(
  ({
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
                loading="lazy"
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
  },
);
ColorPaletteModal.displayName = "ColorPaletteModal";

const Bougainvillea = memo(
  ({
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
      loading="lazy"
      decoding="async"
      style={{
        width: size,
        height: "auto",
        transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
        filter: "drop-shadow(0 6px 14px rgba(61,31,45,0.22))",
        userSelect: "none",
        ...style,
      }}
    />
  ),
);
Bougainvillea.displayName = "Bougainvillea";

const CORNER_FLIPS: Record<string, string> = {
  tl: "scaleX(1) scaleY(1)",
  tr: "scaleX(-1) scaleY(1)",
  bl: "scaleX(1) scaleY(-1)",
  br: "scaleX(-1) scaleY(-1)",
};
const CORNER_POS: Record<string, React.CSSProperties> = {
  tl: { top: -2, left: -2 },
  tr: { top: -2, right: -2 },
  bl: { bottom: -2, left: -2 },
  br: { bottom: -2, right: -2 },
};

const GoldCorner = memo(
  ({ position, size = 74 }: { position: "tl" | "tr" | "bl" | "br"; size?: number }) => (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        zIndex: 2,
        pointerEvents: "none",
        ...CORNER_POS[position],
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ transform: CORNER_FLIPS[position] }}
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
  ),
);
GoldCorner.displayName = "GoldCorner";

/* ---------------------------------------------------------------------- */
/* Decorative flower scatter                                              */
/* ---------------------------------------------------------------------- */

// Deterministic pseudo-random helper so flower layout is stable across
// renders/resizes instead of reshuffling every time (Math.random() would).
function seededJitter(seed: number, spread: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const frac = x - Math.floor(x);
  return Math.floor(frac * spread - spread / 2);
}

// Large, individually-placed flowers framing the card. Data-driven instead
// of 14 near-identical JSX blocks — same visual result, far less code.
const LARGE_FLOWERS: Array<{
  pos: Partial<Record<"top" | "bottom" | "left" | "right", number>>;
  size: number;
  rotate: number;
  flip?: boolean;
}> = [
  { pos: { top: -8, left: -26 }, size: 110, rotate: 16 },
  { pos: { top: -60, left: 76 }, size: 110, rotate: 600 },
  { pos: { top: -60, left: 146 }, size: 110, rotate: 600 },
  { pos: { top: -60, left: 236 }, size: 110, rotate: 600 },
  { pos: { top: -60, left: 326 }, size: 110, rotate: 600 },
  { pos: { top: -60, left: 416 }, size: 110, rotate: 600 },
  { pos: { top: -8, right: -26 }, size: 110, rotate: -256 },
  { pos: { bottom: -26, right: -14 }, size: 110, rotate: 256, flip: true },
  { pos: { bottom: -56, right: 54 }, size: 110, rotate: 136, flip: true },
  { pos: { bottom: -56, right: 124 }, size: 110, rotate: 136, flip: true },
  { pos: { bottom: -56, right: 194 }, size: 110, rotate: 136, flip: true },
  { pos: { bottom: -56, right: 274 }, size: 110, rotate: 136, flip: true },
  { pos: { bottom: -56, right: 384 }, size: 110, rotate: 136, flip: true },
  { pos: { bottom: -10, left: -24 }, size: 100, rotate: -356, flip: true },
];

export interface BougainvilleaScatterProps {
  cardHeight?: number;
  flowerSpacing?: number;
  minPosition?: number;
  maxPosition?: number;
}

export const BougainvilleaScatter = memo(
  ({
    cardHeight = 1000,
    flowerSpacing = 5,
    minPosition = 150,
    maxPosition = 200,
  }: BougainvilleaScatterProps = {}) => {
    // useMemo instead of useEffect+state: computed synchronously during
    // render (no extra "flash of empty" render pass) and deterministic.
    const flowerPositions = useMemo(() => {
      const startPosition = minPosition;
      const endPosition = cardHeight - maxPosition;
      const span = endPosition - startPosition;
      if (span <= 0) return [];

      const numberOfFlowers = Math.max(0, Math.floor(span / flowerSpacing));
      if (numberOfFlowers === 0) return [];

      const positions: number[] = [];
      for (let i = 0; i < numberOfFlowers; i++) {
        const basePos =
          startPosition + (i * span) / (numberOfFlowers - 1 || 1);
        const variation = seededJitter(i, 30);
        positions.push(
          Math.max(startPosition, Math.min(endPosition, basePos + variation)),
        );
      }
      return positions;
    }, [cardHeight, flowerSpacing, minPosition, maxPosition]);

    if (flowerPositions.length === 0 && cardHeight <= minPosition) return null;

    return (
      <>
        {LARGE_FLOWERS.map((f, i) => (
          <Box
            key={`large-${i}`}
            className="wi-bougan"
            sx={
              {
                position: "absolute",
                zIndex: 2,
                "--r": "-12deg",
                ...f.pos,
              } as any
            }
          >
            <Bougainvillea
              size={f.size}
              rotate={f.rotate}
              src="/flowers/bougan-1.png"
              flip={f.flip}
            />
          </Box>
        ))}

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
  },
);
BougainvilleaScatter.displayName = "BougainvilleaScatter";

/* ---------------------------------------------------------------------- */
/* Countdown / carousels                                                  */
/* ---------------------------------------------------------------------- */

const WEDDING_TARGET = new Date("2026-09-26T17:00:00").getTime();

const CountdownTimer = memo(({ rose, rosePale }: { rose: string; rosePale: string }) => {
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_TARGET - Date.now();
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
});
CountdownTimer.displayName = "CountdownTimer";

const RomanticCarousel = memo(
  ({ images, rose, gold, cream }: { images: string[]; rose: string; gold: string; cream: string }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      if (isPaused || images.length <= 1) return;
      const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 4500);
      return () => clearInterval(id);
    }, [isPaused, images.length]);

    const goTo = useCallback(
      (i: number) => setIndex(((i % images.length) + images.length) % images.length),
      [images.length],
    );

    if (images.length === 0) return null;

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
        </Box>

        {images.length > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1.5 }}>
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
RomanticCarousel.displayName = "RomanticCarousel";

const SingleImageCarousel = memo(
  ({ image, rose, gold, cream }: { image: string; rose: string; gold: string; cream: string }) => (
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
          loading="lazy"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 6s ease",
            "&:hover": { transform: "scale(1.05)" },
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
  ),
);
SingleImageCarousel.displayName = "SingleImageCarousel";

/* ---------------------------------------------------------------------- */
/* Typographic ornaments (module scope, no props needed from parent)      */
/* ---------------------------------------------------------------------- */

const Ornament = memo(() => (
  <Typography
    component="span"
    sx={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "1.1rem",
      color: COLORS.gold,
      opacity: 0.9,
      mx: 1,
    }}
  >
    ✦
  </Typography>
));
Ornament.displayName = "Ornament";

const SectionDivider = memo(({ label }: { label?: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "12px", width: "80%", mx: "auto", my: 3 }}>
    <Box
      sx={{
        flex: 1,
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${alpha(COLORS.rose, 0.65)})`,
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
          color: COLORS.roseDeep,
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
        background: `linear-gradient(90deg, ${alpha(COLORS.rose, 0.65)}, transparent)`,
      }}
    />
  </Box>
));
SectionDivider.displayName = "SectionDivider";

const GoldFrameLine = memo(() => (
  <Box sx={{ position: "relative" }}>
    <Box
      sx={{
        width: "100%",
        height: 2,
        background: `linear-gradient(90deg, transparent, ${COLORS.gold} 30%, ${COLORS.rose} 50%, ${COLORS.gold} 70%, transparent)`,
        opacity: 0.75,
      }}
    />
    <Box
      sx={{
        width: "70%",
        height: 1,
        mx: "auto",
        mt: "3px",
        background: `linear-gradient(90deg, transparent, ${alpha(COLORS.gold, 0.6)}, transparent)`,
      }}
    />
  </Box>
));
GoldFrameLine.displayName = "GoldFrameLine";

/* ---------------------------------------------------------------------- */
/* Detail / note cards                                                    */
/* ---------------------------------------------------------------------- */

const DetailCard = memo(
  ({
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
          background: "#C05C3E",
          // NOTE: no backdropFilter here — the background above is fully
          // opaque, so blur-behind had zero visible effect and was pure
          // wasted GPU work on every frame.
          border: `1px solid ${alpha("#D4A373", 0.55)}`,
          borderRadius: "20px",
          boxShadow: `0 4px 24px ${alpha("#8B3A2A", 0.15)}`,
          "&:hover": {
            boxShadow: `0 16px 40px ${alpha("#8B3A2A", 0.3)}`,
            ...(onClick && { transform: "translateY(-6px)" }),
          },
          cursor: onClick ? "pointer" : "default",
          position: "relative",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 90% 10%, ${alpha("#D4A373", 0.15)} 0%, transparent 60%)`,
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
            color: alpha("#F8EDE3", 0.15),
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
              background: `linear-gradient(135deg, ${alpha("#F8EDE3", 0.15)}, ${alpha("#D4A373", 0.2)})`,
              border: `1px solid ${alpha("#F8EDE3", 0.25)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 20, color: "#F8EDE3" }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4A373",
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
                color: "#F8EDE3",
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
                  color: "#F8EDE3",
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
  ),
);
DetailCard.displayName = "DetailCard";

const NoteCard = memo(
  ({
    icon: Icon,
    title,
    text,
    delay = 0,
  }: {
    icon: React.ElementType;
    title: string;
    text: string;
    delay?: number;
  }) => {
    const theme = useTheme();
    return (
      <Fade in timeout={900 + delay}>
        <Paper
          className="wi-card-detail"
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            mb: 8,
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(8px)",
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
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
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
              color: alpha(COLORS.gold, 0.2),
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
              background: `linear-gradient(135deg, ${alpha(COLORS.rose, 0.18)}, ${alpha(COLORS.gold, 0.22)})`,
              border: `1px solid ${alpha(COLORS.rose, 0.35)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 20, color: COLORS.rose }} />
          </Box>

          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COLORS.roseDeep,
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
              color: alpha(COLORS.ink, 0.85),
              lineHeight: 1.85,
            }}
          >
            {text}
          </Typography>
        </Paper>
      </Fade>
    );
  },
);
NoteCard.displayName = "NoteCard";

/* ---------------------------------------------------------------------- */
/* Main sections — hoisted to module scope so React can reuse them across */
/* parent re-renders instead of remounting the whole subtree each time.   */
/* ---------------------------------------------------------------------- */

interface InvitationSectionProps {
  novio: string;
  novia: string;
  fecha: string;
  hora: string;
  horaFiesta: string;
  lugar: string;
  lugarCeremonia: string;
  mensaje: string;
  frasePersonal: string;
  codigoVestimenta: string;
  codigoDresscode: string;
  notasAdicionales: string;
  onOpenColorPalette: () => void;
  onOpenModal: () => void;
  onNavigate: (section: "history" | "gallery" | "details") => void;
}

const InvitationSection = memo(
  ({
    novio,
    novia,
    fecha,
    hora,
    horaFiesta,
    lugar,
    lugarCeremonia,
    mensaje,
    frasePersonal,
    codigoVestimenta,
    codigoDresscode,
    notasAdicionales,
    onOpenColorPalette,
    onOpenModal,
    onNavigate,
  }: InvitationSectionProps) => {
    const theme = useTheme();
    const { rose, roseL, roseDeep, gold, goldDark, ink, cream } = COLORS;

    return (
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

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                background: alpha(theme.palette.common.black, 0.01),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  boxShadow: `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.3)}`,
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
                eso, queremos que sean parte del día en que unimos nuestras
                vidas.
              </Typography>

              {(["tl", "tr", "bl", "br"] as const).map((corner) => (
                <Box
                  key={corner}
                  sx={{
                    position: "absolute",
                    top: corner.startsWith("t") ? 8 : undefined,
                    bottom: corner.startsWith("b") ? 8 : undefined,
                    left: corner.endsWith("l") ? 8 : undefined,
                    right: corner.endsWith("r") ? 8 : undefined,
                    width: 20,
                    height: 20,
                    borderTop: corner.startsWith("t") ? `2px solid ${alpha(gold, 0.35)}` : undefined,
                    borderBottom: corner.startsWith("b") ? `2px solid ${alpha(gold, 0.35)}` : undefined,
                    borderLeft: corner.endsWith("l") ? `2px solid ${alpha(gold, 0.35)}` : undefined,
                    borderRight: corner.endsWith("r") ? `2px solid ${alpha(gold, 0.35)}` : undefined,
                    pointerEvents: "none",
                  }}
                />
              ))}
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "80%", mx: "auto", my: 1.5 }}>
              <Box sx={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${alpha(gold, 0.7)})` }} />
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
              <Box sx={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${alpha(gold, 0.7)}, transparent)` }} />
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

          <CountdownTimer rose={rose} rosePale={COLORS.rosePale} />

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
              {["Sra. Laura Karina Salcedo Hernández", "Sr. J. Jesús Carrillo Ibarra"].map((name) => (
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
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, my: 1.5 }}>
                <Box sx={{ width: 32, height: "1px", background: alpha(gold, 0.6) }} />
                <Typography sx={{ color: gold, fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif" }}>
                  ❧
                </Typography>
                <Box sx={{ width: 32, height: "1px", background: alpha(gold, 0.6) }} />
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

          <SingleImageCarousel image="/boda22.jpeg" rose={rose} gold={gold} cream={cream} />

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
              <DetailCard icon={CalendarIcon} title="Fecha" value={fecha} sub="Sábado" delay={0} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailCard icon={TimeIcon} title="Ceremonia" value={lugarCeremonia} sub={hora} delay={150} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailCard icon={ChurchIcon} title="Lugar" value={lugar} sub={horaFiesta} delay={300} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DetailCard
                onClick={onOpenColorPalette}
                icon={DryCleaningIcon}
                title="Vestimenta"
                value={codigoVestimenta}
                sub={codigoDresscode}
                delay={450}
              />
            </Grid>
          </Grid>

          <RomanticCarousel images={["/boda30.jpeg"]} rose={rose} gold={gold} cream={cream} />

          <NoteCard icon={SparkleIcon} title="Un día muy especial" text={notasAdicionales} delay={0} />

          <NoteCard
            icon={GiftIcon}
            title="Sobre los regalos"
            text="Lo más valioso para nosotros es su compañía en nuestro gran día. Si desean tener un detalle especial con nosotros, preferiríamos recibir su apoyo en efectivo, el cual destinaremos a construir nuestro futuro juntos. Durante la recepción contaremos con una lluvia de sobres y un código QR para transferencias. ¡Gracias por ayudarnos a empezar nuestra historia!"
            delay={150}
          />

          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 3, gap: 1, mt: 4 }}>
            {[
              { icon: LocationIcon, label: "Ubicación", section: "details" as const },
              { icon: HistoryIcon, label: "Historia", section: "history" as const },
              { icon: PhotoIcon, label: "Galería", section: "gallery" as const },
            ].map(({ icon: Icon, label, section }) => (
              <Button
                key={label}
                size="small"
                onClick={() => onNavigate(section)}
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
              onClick={onOpenModal}
              endIcon={<ConfirmationNumberIcon sx={{ fontSize: "16px !important" }} />}
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
  },
);
InvitationSection.displayName = "InvitationSection";

interface LocationSectionProps {
  lugar: string;
  direccion: string;
  onOpenMapsIglesia: () => void;
  onOpenMaps: () => void;
}

const LocationSection = memo(
  ({ lugar, direccion, onOpenMapsIglesia, onOpenMaps }: LocationSectionProps) => {
    const { rose, gold, goldDark, ink, cream } = COLORS;
    return (
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
              onClick={onOpenMapsIglesia}
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
              onClick={onOpenMaps}
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
  },
);
LocationSection.displayName = "LocationSection";

/* ---------------------------------------------------------------------- */
/* Global styles (already module scope in the original — kept as is)      */
/* ---------------------------------------------------------------------- */

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
    /* Promotes each flower to its own compositor layer so the sway
       animation runs on the GPU without the drop-shadow filter being
       recomputed every frame. This is the single biggest smoothness win
       for the flower scatter. */
    will-change: transform;
  }
  @media (prefers-reduced-motion: reduce) {
    .wi-bougan { animation: none; }
  }
`;

/* ---------------------------------------------------------------------- */
/* Root component                                                         */
/* ---------------------------------------------------------------------- */

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

// Small debounce helper so ResizeObserver doesn't trigger a state update
// (and therefore a re-render) on every single intermediate frame while an
// element is resizing.
function useDebouncedCallback<T extends (...args: any[]) => void>(fn: T, delay: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => fnRef.current(...args), delay);
    },
    [delay],
  );
}

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
  const [activeSection, setActiveSection] = useState<"invitation" | "history" | "gallery" | "details">("invitation");
  const [openModal, setOpenModal] = useState(false);
  const [openColorPalette, setOpenColorPalette] = useState(false);
  const [cardHeight, setCardHeight] = useState(1200);
  const [modalHeight, setModalHeight] = useState(600);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  // ResizeObserver reacts to *actual* content/box size changes (images
  // loading, fonts swapping, Fade/Grow reveals, viewport resize) instead of
  // only window resize + a fixed 100ms guess. Debounced so a burst of
  // layout changes only triggers one state update / re-render.
  const setDebouncedCardHeight = useDebouncedCallback(setCardHeight, 80);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h && h > 0) setDebouncedCardHeight(h);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeSection, setDebouncedCardHeight]);

  const setDebouncedModalHeight = useDebouncedCallback(setModalHeight, 80);
  useEffect(() => {
    if (!openModal) return;
    const el = modalRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h && h > 0) setDebouncedModalHeight(h);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [openModal, setDebouncedModalHeight]);

  const openMaps = useCallback(() => {
    if (coordenadasGPS) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`,
        "_blank",
      );
    }
  }, [coordenadasGPS]);

  const openMapsIglesia = useCallback(() => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5188516411395!2d-102.54972!3d20.278779999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842ec2145c5f2387%3A0xd2e57aab01bade3b!2sSanta%20Monica%20parish%20of%20La%20Barca!5e0!3m2!1sen!2smx!4v1783645127070!5m2!1sen!2smx",
      "_blank",
    );
  }, []);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);
  const handleOpenColorPalette = useCallback(() => setOpenColorPalette(true), []);
  const handleCloseColorPalette = useCallback(() => setOpenColorPalette(false), []);
  const handleBackToInvitation = useCallback(() => setActiveSection("invitation"), []);
  const handleNavigate = useCallback((section: "history" | "gallery" | "details") => setActiveSection(section), []);

  const { rose, gold, ink, cream, rosePale } = COLORS;

  const renderSection = () => {
    switch (activeSection) {
      case "history":
        return <HistorySection novio={novio} novia={novia} historia={historia} />;
      case "gallery":
        return <Gallery fotos={fotos} />;
      case "details":
        return (
          <LocationSection
            lugar={lugar}
            direccion={direccion}
            onOpenMapsIglesia={openMapsIglesia}
            onOpenMaps={openMaps}
          />
        );
      default:
        return (
          <InvitationSection
            novio={novio}
            novia={novia}
            fecha={fecha}
            hora={hora}
            horaFiesta={horaFiesta}
            lugar={lugar}
            lugarCeremonia={lugarCeremonia}
            mensaje={mensaje}
            frasePersonal={frasePersonal}
            codigoVestimenta={codigoVestimenta}
            codigoDresscode={codigoDresscode}
            notasAdicionales={notasAdicionales}
            onOpenColorPalette={handleOpenColorPalette}
            onOpenModal={handleOpenModal}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <>
      <style>{ROMANTIC_STYLES}</style>

      <ColorPaletteModal
        imageUrl="/pcolores.jpeg"
        open={openColorPalette}
        onOpen={handleOpenColorPalette}
        onClose={handleCloseColorPalette}
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
            radial-gradient(ellipse at 50% 50%, ${alpha(COLORS.roseL, 0.08)} 0%, transparent 70%),
            #fdf8f5
          `,
        }}
      />

      <Container maxWidth="sm" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <MusicPlayer />

        <Modal
          open={openModal}
          onClose={handleCloseModal}
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

              <Box sx={{ position: "relative", zIndex: 1, maxHeight: "90vh", overflowY: "auto", p: 4 }}>
                <IconButton
                  onClick={handleCloseModal}
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
                      color: COLORS.roseDeep,
                      border: `1px solid ${alpha(rose, 0.45)}`,
                    }}
                  />
                </Box>

                <AttendanceForm novio={novio} novia={novia} onClose={handleCloseModal} />
              </Box>
            </Box>
          </Fade>
        </Modal>

        {activeSection !== "invitation" && (
          <Zoom in>
            <IconButton
              onClick={handleBackToInvitation}
              sx={{
                position: "fixed",
                top: 20,
                left: 20,
                zIndex: 1000,
                width: 44,
                height: 44,
                background: rose,
                color: "#fff",
                "&:hover": { background: COLORS.roseDeep, transform: "scale(1.1)" },
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
          <Box sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            {/* Single hero background layer — the original rendered the
                same /fondo.jpeg twice (top half + bottom half), doubling
                the decode/paint cost for no visual difference. */}
            <Box
              component="img"
              src="/fondo.jpeg"
              loading="eager"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
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