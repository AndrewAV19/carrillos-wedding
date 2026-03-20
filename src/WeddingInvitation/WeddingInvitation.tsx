// components/WeddingInvitation.tsx
import React, { useState, useEffect, useRef, memo } from "react";
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
} from "@mui/icons-material";
import HistorySection from "../components/HistorySection/HistorySection";
import Gallery from "../components/Gallery/Gallery";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import AttendanceForm from "../components/AttendanceForm/AttendanceForm";

// ─────────────────────────────────────────────────────────────
// CountdownTimer — aislado con memo para que su setInterval
// no provoque re-renders en el componente padre cada segundo.
// ─────────────────────────────────────────────────────────────
const CountdownTimer = memo(({ rose, rosePale }: {
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
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff / 3600000) % 24),
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
    <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 1.5, sm: 3 }, mb: 4 }}>
      {[
        { v: cd.days,    l: "Días" },
        { v: cd.hours,   l: "Horas" },
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
              border: `0.5px solid ${alpha(rose, 0.2)}`,
              mb: 0.75,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { xs: "1.5rem", sm: "1.8rem" },
                fontWeight: 500,
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
              color: alpha(rose, 0.6),
            }}
          >
            {l}
          </Typography>
        </Box>
      ))}
    </Box>
  );
});

// ─────────────────────────────────────────────────────────────

interface WeddingInvitationProps {
  novio?: string;
  novia?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
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
`;

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  novio = "Jesús Carrillo Salcedo",
  novia = "Ana Gabriela López Aguilar",
  fecha = "26 de Septiembre, 2026",
  hora = "5:00 PM",
  lugar = "Grand Jardín",
  direccion = "La Barca, Jalisco",
  mensaje = "Con la bendición de Dios y nuestros padres, nos unimos en matrimonio y queremos compartir esta alegría contigo.",
  historia = `Quién diría que 13 años después terminaríamos juntos...`,
  fotos = [],
  codigoVestimenta = "Formal",
  frasePersonal = "Y en un beso, supimos que era para siempre",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
  codigoDresscode = "Nos reservamos el blanco",
  notasAdicionales = "No olvides traer tu mejor sonrisa y muchas ganas de celebrar",
}) => {

  const [activeSection, setActiveSection] = useState<
    "invitation" | "history" | "gallery" | "details"
  >("invitation");
  const [openModal, setOpenModal] = useState(false);

  // Partículas en refs: se inicializan una sola vez y nunca
  // provocan re-renders al actualizarse.
  const petals = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 14,
      size: 12 + Math.random() * 8,
      emoji: ["🌸", "🌺", "✿", "❀"][Math.floor(Math.random() * 4)],
    }))
  );
  const stars = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 3,
    }))
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const openMaps = () => {
    if (coordenadasGPS) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`,
        "_blank"
      );
    }
  };

  // ── Palette ──────────────────────────────────────────
  const rose     = "#8B4C6B";
  const roseL    = "#C17B97";
  const rosePale = "#F7EBF0";
  const gold     = "#C9A96E";
  const cream    = "#FFFBF6";
  const ink      = "#3D1F2D";

  // ── Shared micro-components ───────────────────────────

  const Ornament = () => (
    <Typography component="span" sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: gold, opacity: 0.7, mx: 1 }}>
      ✦
    </Typography>
  );

  const SectionDivider = ({ label }: { label?: string }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px", width: "80%", mx: "auto", my: 3 }}>
      <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${alpha(rose, 0.4)})` }} />
      <Ornament />
      {label && (
        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.28em", textTransform: "uppercase", color: roseL }}>
          {label}
        </Typography>
      )}
      <Ornament />
      <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${alpha(rose, 0.4)}, transparent)` }} />
    </Box>
  );

  const DetailCard = ({ icon: Icon, title, value, sub, delay = 0 }: {
    icon: React.ElementType; title: string; value: string; sub?: string; delay?: number;
  }) => (
    <Fade in timeout={800 + delay}>
      <Paper
        className="wi-card-detail"
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 }, height: "100%",
          background: cream,
          border: `0.5px solid ${alpha(rose, 0.15)}`,
          borderRadius: "20px",
          boxShadow: `0 4px 24px ${alpha(rose, 0.07)}`,
          "&:hover": { boxShadow: `0 16px 40px ${alpha(rose, 0.16)}` },
          position: "relative", overflow: "hidden",
          "&::after": {
            content: '""', position: "absolute", inset: 0,
            background: `radial-gradient(circle at 90% 10%, ${alpha(gold, 0.06)} 0%, transparent 60%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Typography sx={{ position: "absolute", top: 8, right: 12, fontSize: "1.8rem", color: alpha(gold, 0.12), fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>
          ❧
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box sx={{
            width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
            background: `linear-gradient(135deg, ${alpha(rose, 0.1)}, ${alpha(gold, 0.12)})`,
            border: `0.5px solid ${alpha(rose, 0.2)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon sx={{ fontSize: 20, color: rose }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: alpha(rose, 0.55), mb: 0.3 }}>
              {title}
            </Typography>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "1.05rem", sm: "1.15rem" }, fontWeight: 500, color: ink, lineHeight: 1.3 }}>
              {value}
            </Typography>
            {sub && (
              <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", color: alpha(ink, 0.5), fontStyle: "italic", mt: 0.3 }}>
                {sub}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Fade>
  );

  // ── Invitation section ────────────────────────────────
  const InvitationSection = () => (
    <Grow in timeout={900}>
      <Box>
        {/* Top border */}
        <Box sx={{ width: "100%", height: 2, background: `linear-gradient(90deg, transparent, ${gold} 30%, ${roseL} 50%, ${gold} 70%, transparent)`, mb: 4, opacity: 0.5 }} />

        {/* Hero */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography sx={{ fontSize: "2rem", color: alpha(gold, 0.35), lineHeight: 1, mb: 1, animation: "wi-float 6s ease-in-out infinite", display: "block" }}>
            ♛
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.68rem", letterSpacing: "0.4em", textTransform: "uppercase", color: alpha(rose, 0.55), mb: 2 }}>
            Invitación de nuestra boda
          </Typography>

          <Typography sx={{ fontFamily: "'Pinyon Script', cursive", fontSize: { xs: "3.2rem", sm: "4.2rem" }, color: rose, lineHeight: 1, mb: 0.5, animation: "wi-float 5s ease-in-out infinite", display: "block" }}>
            {novio.split(" ")[0]}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "80%", mx: "auto", my: 1.5 }}>
            <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${alpha(gold, 0.5)})` }} />
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: gold, mx: 2, fontStyle: "italic" }}>&amp;</Typography>
            <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${alpha(gold, 0.5)}, transparent)` }} />
          </Box>

          <Typography sx={{ fontFamily: "'Pinyon Script', cursive", fontSize: { xs: "3.2rem", sm: "4.2rem" }, color: rose, lineHeight: 1, mb: 2, animation: "wi-float 5.5s ease-in-out infinite 0.5s", display: "block" }}>
            {novia.split(" ")[0]}
          </Typography>

          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: 300, color: alpha(ink, 0.6), letterSpacing: "0.06em", mb: 0.5 }}>
            {novio}
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "0.9rem", sm: "1rem" }, fontWeight: 300, color: alpha(ink, 0.6), letterSpacing: "0.06em", mb: 3 }}>
            {novia}
          </Typography>

          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "1.05rem", sm: "1.15rem" }, fontStyle: "italic", fontWeight: 300, color: roseL, mb: 3 }}>
            "{frasePersonal}"
          </Typography>

          <SectionDivider />
        </Box>

        {/* Countdown — componente separado, su estado no sube al padre */}
        <CountdownTimer rose={rose} rosePale={rosePale} ink={ink} />

        {/* Parents */}
        <Fade in timeout={1200}>
          <Box sx={{ textAlign: "center", mb: 4, px: 1 }}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: alpha(rose, 0.5), mb: 2.5 }}>
              Con la bendición de nuestros padres
            </Typography>
            {["Sra. Laura Karina Salcedo Hernández", "Sr. J. Jesús Carrillo Ibarra"].map((name) => (
              <Typography key={name} sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "1rem", sm: "1.05rem" }, fontWeight: 400, color: ink, lineHeight: 1.8, fontStyle: "italic" }}>
                {name}
              </Typography>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, my: 1.5 }}>
              <Box sx={{ width: 32, height: "0.5px", background: alpha(gold, 0.4) }} />
              <Typography sx={{ color: gold, fontSize: "1rem", fontFamily: "'Cormorant Garamond', serif" }}>❧</Typography>
              <Box sx={{ width: 32, height: "0.5px", background: alpha(gold, 0.4) }} />
            </Box>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "1rem", sm: "1.05rem" }, fontWeight: 400, color: ink, fontStyle: "italic" }}>
              Sra. María Eulalia Aguilar Sánchez
            </Typography>
          </Box>
        </Fade>

        <SectionDivider label="El gran día" />

        {/* Message */}
        <Fade in timeout={1400}>
          <Box sx={{ textAlign: "center", px: { xs: 1, sm: 3 }, mb: 4 }}>
            <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: { xs: "1.05rem", sm: "1.15rem" }, fontWeight: 300, fontStyle: "italic", color: alpha(ink, 0.75), lineHeight: 1.9 }}>
              "{mensaje}"
            </Typography>
          </Box>
        </Fade>

        {/* Detail cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6 }}><DetailCard icon={CalendarIcon} title="Fecha"      value={fecha}             sub="Sábado"        delay={0}   /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><DetailCard icon={TimeIcon}     title="Ceremonia"  value={hora}                                  delay={150} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><DetailCard icon={ChurchIcon}   title="Lugar"      value={lugar}             sub={direccion}     delay={300} /></Grid>
          <Grid size={{ xs: 12, sm: 6 }}><DetailCard icon={DryCleaningIcon} title="Vestimenta" value={codigoVestimenta} sub={codigoDresscode} delay={450} /></Grid>
        </Grid>

        {/* Nav buttons */}
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 3, gap: 1 }}>
          {[
            { icon: LocationIcon, label: "Ubicación", section: "details"  as const },
            { icon: HistoryIcon,  label: "Historia",  section: "history"  as const },
            { icon: PhotoIcon,    label: "Galería",   section: "gallery"  as const },
          ].map(({ icon: Icon, label, section }) => (
            <Button
              key={label}
              size="small"
              onClick={() => setActiveSection(section)}
              startIcon={<Icon sx={{ fontSize: "16px !important" }} />}
              sx={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem",
                letterSpacing: "0.06em", textTransform: "none", color: roseL,
                border: `0.5px solid ${alpha(rose, 0.25)}`, borderRadius: "100px",
                px: 2.5, py: 0.8, background: cream,
                "&:hover": { background: rosePale, borderColor: alpha(rose, 0.5) },
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            endIcon={<ConfirmationNumberIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
              letterSpacing: "0.12em", textTransform: "none", fontWeight: 500,
              background: `linear-gradient(135deg, ${rose} 0%, ${roseL} 100%)`,
              color: "#fff", borderRadius: "100px", px: 4, py: 1.4,
              boxShadow: `0 8px 28px ${alpha(rose, 0.35)}`,
              "&:hover": { background: `linear-gradient(135deg, ${alpha(rose, 0.9)} 0%, ${roseL} 100%)`, boxShadow: `0 12px 36px ${alpha(rose, 0.45)}`, transform: "translateY(-2px)" },
              transition: "all 0.3s ease",
            }}
          >
            Confirmar asistencia
          </Button>
        </Box>

        <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontStyle: "italic", color: alpha(rose, 0.5), textAlign: "center", mt: 1 }}>
          {notasAdicionales}
        </Typography>

        {/* Bottom border */}
        <Box sx={{ width: "100%", height: 2, mt: 4, background: `linear-gradient(90deg, transparent, ${gold} 30%, ${roseL} 50%, ${gold} 70%, transparent)`, opacity: 0.4 }} />
      </Box>
    </Grow>
  );

  // ── Location section ──────────────────────────────────
  const LocationSection = () => (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Box className="wi-section-appear">
        <Typography sx={{ fontFamily: "'Pinyon Script', cursive", fontSize: "3rem", color: rose, textAlign: "center", mb: 1 }}>
          Cómo llegar
        </Typography>
        <SectionDivider />
        <Paper elevation={0} sx={{ p: 4, textAlign: "center", background: cream, border: `0.5px solid ${alpha(rose, 0.15)}`, borderRadius: "20px", boxShadow: `0 4px 24px ${alpha(rose, 0.07)}` }}>
          <LocationIcon sx={{ fontSize: 48, color: roseL, mb: 2 }} />
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 500, color: ink, mb: 0.5 }}>
            {lugar}
          </Typography>
          <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: alpha(ink, 0.55), mb: 3 }}>
            {direccion}
          </Typography>
          <Button
            variant="contained"
            startIcon={<LocationIcon />}
            onClick={openMaps}
            sx={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", textTransform: "none",
              background: `linear-gradient(135deg, ${rose} 0%, ${roseL} 100%)`,
              color: "#fff", borderRadius: "100px", px: 4, py: 1.2,
              boxShadow: `0 8px 28px ${alpha(rose, 0.3)}`,
              "&:hover": { transform: "translateY(-2px)" }, transition: "transform 0.3s",
            }}
          >
            Ver en Google Maps
          </Button>
        </Paper>
      </Box>
    </Slide>
  );

  // ── Render ────────────────────────────────────────────
  const renderSection = () => {
    switch (activeSection) {
      case "history": return <HistorySection novio={novio} novia={novia} historia={historia} />;
      case "gallery": return <Gallery fotos={fotos} />;
      case "details": return <LocationSection />;
      default:        return <InvitationSection />;
    }
  };

  return (
    <>
      <style>{ROMANTIC_STYLES}</style>

      {/* Partículas — leídas de refs, se montan una sola vez */}
      {stars.current.map((s) => (
        <div key={s.id} className="wi-star" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
      ))}
      {petals.current.map((p) => (
        <div key={p.id} className="wi-petal" style={{ left: `${p.left}%`, fontSize: `${p.size}px`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}>
          {p.emoji}
        </div>
      ))}

      {/* Fondo */}
      <Box sx={{
        position: "fixed", inset: 0, zIndex: -1,
        background: `
          radial-gradient(ellipse at 20% 20%, ${alpha(rose, 0.07)} 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${alpha(gold, 0.06)} 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, ${alpha(roseL, 0.04)} 0%, transparent 70%),
          #fdf8f5
        `,
      }} />

      <Container maxWidth="sm" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <MusicPlayer />

        {/* Modal de asistencia */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500, sx: { backdropFilter: "blur(8px)", background: alpha(ink, 0.5) } }}
        >
          <Fade in={openModal}>
            <Box sx={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: 480 }, maxHeight: "90vh", overflow: "auto",
              background: cream, borderRadius: "24px",
              boxShadow: `0 32px 80px ${alpha(ink, 0.25)}`,
              p: 4, outline: "none", border: `0.5px solid ${alpha(rose, 0.25)}`,
            }}>
              <IconButton
                onClick={() => setOpenModal(false)}
                sx={{ position: "absolute", right: 12, top: 12, color: alpha(rose, 0.5), "&:hover": { color: rose, transform: "rotate(90deg)" }, transition: "all 0.3s" }}
              >
                <CloseIcon />
              </IconButton>
              <Box textAlign="center" mb={3}>
                <HeartIcon sx={{ fontSize: 44, color: rose, mb: 1, animation: "wi-pulse-heart 2s ease-in-out infinite" }} />
                <Typography sx={{ fontFamily: "'Pinyon Script', cursive", fontSize: "2.8rem", color: rose, lineHeight: 1, mb: 0.5 }}>
                  Confirma tu asistencia
                </Typography>
                <Typography sx={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: alpha(ink, 0.55), mb: 2 }}>
                  ¡Nos encantaría que nos acompañes en este día tan especial!
                </Typography>
                <Chip
                  label={`${novio.split(" ")[0]} & ${novia.split(" ")[0]}`}
                  sx={{ fontFamily: "'Cormorant Garamond', serif", background: rosePale, color: rose, border: `0.5px solid ${alpha(rose, 0.3)}` }}
                />
              </Box>
              <AttendanceForm novio={novio} novia={novia} onClose={() => setOpenModal(false)} />
            </Box>
          </Fade>
        </Modal>

        {/* Botón regresar */}
        {activeSection !== "invitation" && (
          <Zoom in>
            <IconButton
              onClick={() => setActiveSection("invitation")}
              sx={{
                position: "fixed", top: 20, left: 20, zIndex: 1000,
                width: 44, height: 44, background: rose, color: "#fff",
                "&:hover": { background: roseL, transform: "scale(1.1)" },
                transition: "all 0.3s", boxShadow: `0 4px 16px ${alpha(rose, 0.4)}`,
              }}
            >
              <LeftIcon />
            </IconButton>
          </Zoom>
        )}

        {/* Tarjeta principal */}
        <Card
          elevation={0}
          sx={{
            borderRadius: "28px",
            background: `linear-gradient(160deg, ${cream} 0%, #fff 60%, ${alpha(rosePale, 0.4)} 100%)`,
            border: `0.5px solid ${alpha(rose, 0.15)}`,
            boxShadow: `0 2px 8px ${alpha(rose, 0.05)}, 0 16px 48px ${alpha(rose, 0.1)}, 0 40px 80px ${alpha(ink, 0.06)}`,
            overflow: "visible",
            position: "relative",
            "&::before": {
              content: '""', position: "absolute", inset: -1, borderRadius: "28px",
              background: `linear-gradient(135deg, ${alpha(gold, 0.2)}, transparent 40%, ${alpha(roseL, 0.15)} 100%)`,
              zIndex: -1,
            },
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {renderSection()}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default WeddingInvitation;