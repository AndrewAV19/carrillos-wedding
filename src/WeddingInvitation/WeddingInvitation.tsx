// components/WeddingInvitation.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Container,
  useTheme,
  alpha,
  Paper,
  Button,
  IconButton,
  Fade,
  Grow,
  Zoom,
  Modal,
  Backdrop,
  Avatar,
  Chip,
  Grid,
  Stack,
  Badge,
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
  Diamond as DiamondIcon,
  MenuBook as MenuBookIcon,
  MusicNote as MusicIcon,
  Cake as CakeIcon,
  Restaurant as RestaurantIcon,
  Church as ChurchIcon,
  RingVolume as RingIcon,
  Timer as TimerIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  CardGiftcard as GiftIcon,
} from "@mui/icons-material";
import HistorySection from "../components/HistorySection/HistorySection";
import Gallery from "../components/Gallery/Gallery";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import AttendanceForm from "../components/AttendanceForm/AttendanceForm";

interface TimelineEvent {
  time: string;
  event: string;
  description: string;
  icon: React.ElementType;
}

interface WeddingInvitationProps {
  novio?: string;
  novia?: string;
  padresNovio?: string;
  padresNovia?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
  direccion?: string;
  mensaje?: string;
  historia?: string;
  fotos?: string[];
  codigoVestimenta?: string;
  horaRecepcion?: string;
  horarioEventos?: TimelineEvent[];
  frasePersonal?: string;
  hashtag?: string;
  confirmacionFecha?: string;
  coordenadasGPS?: { lat: number; lng: number };
  transporteDisponible?: boolean;
  hospedajeSugerido?: string;
  codigoDresscode?: string;
  opcionesMenu?: string[];
  restriccionesAlimenticias?: string;
  notasAdicionales?: string;
  regalos?: string;
  numeroWhatsApp?: string;
}

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  novio = "Chui",
  novia = "Gabi",
  padresNovio = "Laura Karina Salcedo Hernández y J. Jesús Carrillo Ibarra",
  padresNovia = "María Eulalia Aguilar Sánchez",
  fecha = "26 de Septiembre, 2026",
  hora = "5:00 PM",
  lugar = "Hacienda Los Olivos",
  direccion = "Grand Jardín",
  mensaje = "Con la bendición de Dios y nuestros padres, nos unimos en matrimonio y queremos compartir esta alegría contigo.",
  historia = `Quién diría que 13 años después terminaríamos juntos. 
Dios hizo que nos conociéramos por primera vez en la primaria y desde ahí surgiera una amistad que, años después, se convertiría en una hermosa pareja. 
Con solo una mirada bastó para saber que seríamos tú y yo para toda la eternidad. 
Sé que llegarán momentos difíciles, momentos de tristeza y momentos de felicidad, pero si Dios nos da la oportunidad de casarnos, quiero pasar todo eso contigo. 
Gracias por ser la mujer que siempre soñé. 
Quiero caminar de tu mano hasta que estemos viejitos. 
Eres y serás siempre el amor de mi vida.

De: tu prometido
Para: el amor de mi vida`,
  fotos = [],
  codigoVestimenta = "Formal",
  horarioEventos = [
    {
      time: "5:00 PM",
      event: "Ceremonia Religiosa",
      description: "En la capilla de la Hacienda",
      icon: ChurchIcon,
    },
    {
      time: "7:00 PM",
      event: "Recepción",
      description: "Salón Principal - Cena y baile",
      icon: RestaurantIcon,
    },
    {
      time: "9:00 PM",
      event: "Brindis y Pastel",
      description: "Celebración con los novios",
      icon: CakeIcon,
    },
    {
      time: "11:00 PM",
      event: "Barra Libre",
      description: "Música y baile hasta el final",
      icon: MusicIcon,
    },
  ],
  frasePersonal = "Y en un beso, supimos que era para siempre",
  confirmacionFecha = "1 de Agosto, 2026",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
  codigoDresscode = "Nos reservamos el blanco",
  notasAdicionales = "No olvides traer tu mejor sonrisa y muchas ganas de celebrar",
  regalos = "Tu presencia es el mejor regalo, pero si deseas hacernos un detalle, puedes colaborar con nuestra luna de miel",
}) => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState<
    "invitation" | "history" | "gallery" | "details"
  >("invitation");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeSection]);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"attendance" | "details" | "gift">(
    "attendance",
  );

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calcular countdown para la boda
  useEffect(() => {
    const weddingDate = new Date("2026-09-26T17:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenModal = (type: "attendance" | "details" | "gift") => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const openMaps = () => {
    if (coordenadasGPS) {
      const url = `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`;
      window.open(url, "_blank");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "history":
        return (
          <HistorySection novio={novio} novia={novia} historia={historia} />
        );
      case "gallery":
        return <Gallery fotos={fotos} />;
      case "details":
        return (
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Card
              elevation={24}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.98)} 0%, ${alpha(theme.palette.grey[50], 0.98)} 100%)`,
                position: "relative",
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Dancing Script', cursive",
                    textAlign: "center",
                    color: theme.palette.primary.main,
                    mb: 3,
                  }}
                >
                  Información Importante
                </Typography>

                <Grid container spacing={3}>
                  {/* Horario detallado */}
                  <Grid size={{ xs: 12 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.03),
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                          color: theme.palette.primary.main,
                        }}
                      >
                        <TimerIcon /> Cronograma del día
                      </Typography>
                      <Stack spacing={2}>
                        {horarioEventos.map((evento, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 2,
                              p: 1,
                              borderRadius: 1,
                              "&:hover": {
                                bgcolor: alpha(
                                  theme.palette.primary.main,
                                  0.05,
                                ),
                              },
                            }}
                          >
                            <Badge
                              badgeContent={index + 1}
                              color="primary"
                              sx={{
                                "& .MuiBadge-badge": { right: -5, top: 5 },
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1,
                                  ),
                                  color: theme.palette.primary.main,
                                }}
                              >
                                <evento.icon />
                              </Avatar>
                            </Badge>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                fontWeight="bold"
                              >
                                {evento.time}
                              </Typography>
                              <Typography variant="body2" fontWeight="600">
                                {evento.event}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {evento.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  </Grid>

                  {/* Mapa */}
                  <Grid size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<LocationIcon />}
                      onClick={openMaps}
                      sx={{
                        py: 1.5,
                        borderWidth: 2,
                        borderRadius: 2,
                        "&:hover": { borderWidth: 2 },
                      }}
                    >
                      Ver ubicación en Google Maps
                    </Button>
                  </Grid>

                  {/* Regalos */}
                  <Grid size={{ xs: 12 }}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.secondary.main, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: theme.palette.secondary.main,
                        }}
                      >
                        <GiftIcon /> Regalos
                      </Typography>
                      <Typography variant="body2">{regalos}</Typography>
                      <Button
                        size="small"
                        variant="text"
                        color="secondary"
                        sx={{ mt: 1 }}
                        onClick={() => handleOpenModal("gift")}
                      >
                        Ver datos bancarios
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Slide>
        );
      default:
        return (
          <Grow in={true} timeout={1000}>
            <Card
              elevation={24}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.98)} 0%, ${alpha(theme.palette.grey[50], 0.98)} 100%)`,
                backdropFilter: "blur(10px)",
                boxShadow: `0 25px 50px -12px ${alpha(theme.palette.common.black, 0.25)}`,
                position: "relative",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 30%),
                              radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 30%)`,
                  pointerEvents: "none",
                },
              }}
            >
              {/* Decoración superior mejorada */}
              <Box
                sx={{
                  height: 20,
                  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}20, transparent)`,
                  position: "relative",
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    width: 40,
                    height: 40,
                    top: -20,
                    background: `radial-gradient(circle, ${theme.palette.primary.main}40 1px, transparent 1px)`,
                    backgroundSize: "10px 10px",
                  },
                  "&::before": { left: 20 },
                  "&::after": { right: 20 },
                }}
              />

              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                {/* Countdown timer */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                    borderRadius: 3,
                  }}
                >
                  <Grid container spacing={1} justifyContent="center">
                    {[
                      { value: countdown.days, label: "Días" },
                      { value: countdown.hours, label: "Horas" },
                      { value: countdown.minutes, label: "Minutos" },
                      { value: countdown.seconds, label: "Segundos" },
                    ].map((item, index) => (
                      <Grid size={{ xs: 3 }} key={index}>
                        <Box textAlign="center">
                          <Typography
                            variant="h5"
                            sx={{
                              color: theme.palette.primary.main,
                              fontWeight: "bold",
                              fontSize: { xs: "1.2rem", sm: "1.5rem" },
                            }}
                          >
                            {item.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Encabezado con efecto de caligrafía mejorado */}
                <Fade in={true} timeout={2000}>
                  <Box textAlign="center" mb={4}>
                    <Box sx={{ position: "relative", mb: 3 }}>
                      <Zoom in={true} timeout={1500}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <DiamondIcon
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: { xs: 20, sm: 24 },
                              opacity: 0.6,
                              animation: "sparkle 3s infinite",
                            }}
                          />
                          <HeartIcon
                            sx={{
                              color: theme.palette.secondary.main,
                              fontSize: { xs: 40, sm: 50 },
                              animation: "pulse 2s infinite",
                              filter:
                                "drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3))",
                            }}
                          />
                          <DiamondIcon
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: { xs: 20, sm: 24 },
                              opacity: 0.6,
                              animation: "sparkle 3s infinite 1.5s",
                            }}
                          />
                        </Box>
                      </Zoom>
                    </Box>

                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: { xs: "2.5rem", sm: "4rem" },
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 50%, ${theme.palette.primary.dark} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                        textShadow: `2px 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
                      }}
                    >
                      {novio} & {novia}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "'Georgia', serif",
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    >
                      {frasePersonal}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        letterSpacing: 4,
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        fontSize: "0.7rem",
                        mb: 3,
                      }}
                    >
                      Juntos en matrimonio
                    </Typography>

                    {/* Nombres de los padres */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Hijos de
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {padresNovio} & {padresNovia}
                      </Typography>
                    </Box>

                    <Divider sx={{ width: "60%", mx: "auto", my: 3 }}>
                      <RingIcon
                        sx={{
                          fontSize: 20,
                          color: theme.palette.secondary.main,
                          mx: 1,
                        }}
                      />
                    </Divider>
                  </Box>
                </Fade>

                {/* Mensaje principal mejorado */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                    borderRadius: "30px 10px 30px 10px",
                    border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                    position: "relative",
                    transform: "rotate(-0.5deg)",
                    "&:hover": {
                      transform: "rotate(0deg)",
                      transition: "transform 0.3s",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      fontFamily: "'Georgia', serif",
                      fontStyle: "italic",
                      color: theme.palette.text.primary,
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      px: 2,
                    }}
                  >
                    "{mensaje}"
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -10,
                      right: 20,
                      color: alpha(theme.palette.primary.main, 0.2),
                      fontSize: "3rem",
                      fontFamily: "'Dancing Script', cursive",
                    }}
                  >
                    ❞
                  </Box>
                </Paper>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      fontFamily: "'Dancing Script', cursive",
                      color: theme.palette.primary.main,
                      fontSize: "2rem",
                      mb: 4,
                      fontWeight: 500,
                      textShadow: `2px 2px 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    Detalles del evento
                  </Typography>

                  <Grid container spacing={3}>
                    {[
                      {
                        icon: CalendarIcon,
                        color: "primary",
                        title: "Fecha",
                        value: fecha,
                        subvalue: "Sábado",
                      },
                      {
                        icon: TimeIcon,
                        color: "secondary",
                        title: "Ceremonia",
                        value: hora,
                      },
                      {
                        icon: ChurchIcon,
                        color: "success",
                        title: "Lugar",
                        value: lugar,
                        subvalue: direccion,
                      },
                      {
                        icon: DryCleaningIcon,
                        color: "warning",
                        title: "Vestimenta",
                        value: codigoVestimenta,
                        subvalue: codigoDresscode,
                      },
                    ].map((item, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Grow in={true} timeout={1000 + index * 200}>
                          <Paper
                            elevation={0}
                            sx={{
                              height: "100%",
                              p: 2.5,
                              bgcolor: alpha(
                                (
                                  theme.palette[
                                    item.color as keyof typeof theme.palette
                                  ] as any
                                ).light || theme.palette.primary.light,
                                0.05,
                              ),
                              borderRadius: 3,
                              border: `1px solid ${alpha(
                                (
                                  theme.palette[
                                    item.color as keyof typeof theme.palette
                                  ] as any
                                ).main || theme.palette.primary.main,
                                0.1,
                              )}`,
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: `0 12px 24px ${alpha(
                                  (
                                    theme.palette[
                                      item.color as keyof typeof theme.palette
                                    ] as any
                                  ).main || theme.palette.primary.main,
                                  0.15,
                                )}`,
                                borderColor: alpha(
                                  (
                                    theme.palette[
                                      item.color as keyof typeof theme.palette
                                    ] as any
                                  ).main || theme.palette.primary.main,
                                  0.3,
                                ),
                              },
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={2.5}
                              width="100%"
                            >
                              <Avatar
                                sx={{
                                  width: 56,
                                  height: 56,
                                  bgcolor: alpha(
                                    (
                                      theme.palette[
                                        item.color as keyof typeof theme.palette
                                      ] as any
                                    ).main || theme.palette.primary.main,
                                    0.1,
                                  ),
                                  color:
                                    (
                                      theme.palette[
                                        item.color as keyof typeof theme.palette
                                      ] as any
                                    ).main || theme.palette.primary.main,
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    bgcolor: alpha(
                                      (
                                        theme.palette[
                                          item.color as keyof typeof theme.palette
                                        ] as any
                                      ).main || theme.palette.primary.main,
                                      0.2,
                                    ),
                                    transform: "scale(1.05)",
                                  },
                                }}
                              >
                                <item.icon sx={{ fontSize: 28 }} />
                              </Avatar>

                              <Box flex={1}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.5px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {item.title}
                                </Typography>

                                <Typography
                                  variant="body1"
                                  fontWeight="600"
                                  sx={{
                                    fontSize: "1rem",
                                    lineHeight: 1.4,
                                    mb: 0.5,
                                    color: theme.palette.text.primary,
                                  }}
                                >
                                  {item.value}
                                </Typography>

                                {item.subvalue && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      fontSize: "0.875rem",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    {item.subvalue}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Paper>
                        </Grow>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Fecha límite de confirmación */}
                <Paper
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Por favor confirmar
                  </Typography>
                </Paper>

                {/* Botones de navegación mejorados */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
                >
                  <Button
                    variant={
                      (activeSection as
                        | "invitation"
                        | "history"
                        | "gallery"
                        | "details") === "history"
                        ? "contained"
                        : "outlined"
                    }
                    color="info"
                    size="small"
                    startIcon={<MenuBookIcon />}
                    onClick={() => setActiveSection("details")}
                    sx={{
                      borderRadius: 28,
                      px: 2,
                      py: 1,
                      textTransform: "none",
                    }}
                  >
                    Detalles
                  </Button>
                  <Button
                    variant={
                      (activeSection as
                        | "invitation"
                        | "history"
                        | "gallery"
                        | "details") === "history"
                        ? "contained"
                        : "outlined"
                    }
                    color="secondary"
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={() => setActiveSection("history")}
                    sx={{
                      borderRadius: 28,
                      px: 2,
                      py: 1,
                      textTransform: "none",
                    }}
                  >
                    Historia
                  </Button>
                  <Button
                    variant={
                      (activeSection as
                        | "invitation"
                        | "history"
                        | "gallery"
                        | "details") === "history"
                        ? "contained"
                        : "outlined"
                    }
                    color="success"
                    size="small"
                    startIcon={<PhotoIcon />}
                    onClick={() => setActiveSection("gallery")}
                    sx={{
                      borderRadius: 28,
                      px: 2,
                      py: 1,
                      textTransform: "none",
                    }}
                  >
                    Galería
                  </Button>
                </Stack>

                {/* Botones de acción */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  sx={{ mb: 2 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal("attendance")}
                    endIcon={<ConfirmationNumberIcon />}
                    sx={{
                      borderRadius: 28,
                      py: 1,
                      px: 3,
                      textTransform: "none",
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    }}
                  >
                    Confirmar
                  </Button>
                </Stack>

                {/* Notas adicionales */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  sx={{ display: "block", mt: 2, fontStyle: "italic" }}
                >
                  {notasAdicionales}
                </Typography>
              </CardContent>

              {/* Decoración inferior mejorada */}
              <Box
                sx={{
                  height: 20,
                  background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}20, transparent)`,
                  position: "relative",
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    width: 40,
                    height: 40,
                    bottom: -20,
                    background: `radial-gradient(circle, ${theme.palette.secondary.main}40 1px, transparent 1px)`,
                    backgroundSize: "10px 10px",
                  },
                  "&::before": { left: 20 },
                  "&::after": { right: 20 },
                }}
              />
            </Card>
          </Grow>
        );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, position: "relative" }}>
      {/* Botón de música flotante */}
      <MusicPlayer />

      {/* Modal de confirmación mejorado */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: alpha(theme.palette.common.black, 0.5),
          },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: 500 },
              maxHeight: "90vh",
              overflow: "auto",
              bgcolor: "background.paper",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              outline: "none",
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s",
              }}
            >
              <CloseIcon />
            </IconButton>

            {modalType === "attendance" && (
              <>
                <Box textAlign="center" mb={3}>
                  <HeartIcon
                    sx={{
                      fontSize: 50,
                      color: theme.palette.primary.main,
                      animation: "pulse 2s infinite",
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Dancing Script', cursive",
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    Confirma tu asistencia
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    ¡Nos encantaría que nos acompañes en este día tan especial!
                  </Typography>
                  <Chip
                    label={`${novio} & ${novia}`}
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                </Box>
                <AttendanceForm
                  novio={novio}
                  novia={novia}
                  onClose={handleCloseModal}
                />
              </>
            )}

            {modalType === "gift" && (
              <>
                <Box textAlign="center" mb={3}>
                  <GiftIcon
                    sx={{
                      fontSize: 50,
                      color: theme.palette.secondary.main,
                      mb: 1,
                    }}
                  />
                  <Typography variant="h5" gutterBottom>
                    Datos bancarios
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Para quienes deseen colaborar con nuestra luna de miel
                  </Typography>
                </Box>

                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    borderRadius: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Banco
                      </Typography>
                      <Typography variant="body1">Banco de Crédito</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Tipo de cuenta
                      </Typography>
                      <Typography variant="body1">Ahorros</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Número de cuenta
                      </Typography>
                      <Typography variant="body1">191-12345678-0-90</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        CCI
                      </Typography>
                      <Typography variant="body1">
                        00219100123456789012
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Titular
                      </Typography>
                      <Typography variant="body1">
                        {novia} {novio}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                  sx={{ mt: 3, borderRadius: 28 }}
                >
                  Cerrar
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Botón de regreso */}
      {activeSection !== "invitation" && (
        <Zoom in={true}>
          <IconButton
            onClick={() => setActiveSection("invitation")}
            sx={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 1000,
              bgcolor: alpha(theme.palette.primary.main, 0.9),
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s",
              boxShadow: 3,
            }}
          >
            <LeftIcon />
          </IconButton>
        </Zoom>
      )}

      {/* Contenido principal */}
      {renderSection()}

      {/* Efectos de fondo mejorados */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: `
            radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 40%),
            radial-gradient(circle at 90% 30%, ${alpha(theme.palette.secondary.light, 0.15)} 0%, transparent 40%),
            radial-gradient(circle at 30% 80%, ${alpha(theme.palette.info.light, 0.1)} 0%, transparent 45%),
            radial-gradient(circle at 70% 70%, ${alpha(theme.palette.warning.light, 0.08)} 0%, transparent 35%),
            repeating-linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.02)} 0px, ${alpha(theme.palette.primary.main, 0.02)} 20px, ${alpha(theme.palette.secondary.main, 0.02)} 20px, ${alpha(theme.palette.secondary.main, 0.02)} 40px)
          `,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 50% 50%, transparent 0%, transparent 98%, ${alpha(theme.palette.primary.main, 0.1)} 100%),
              url("data:image/svg+xml;utf8,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 15 L33 23 L42 23 L35 28 L38 36 L30 31 L22 36 L25 28 L18 23 L27 23 Z' fill='%23d4af37' opacity='0.03'/></svg>")
            `,
            backgroundSize: "70px 70px, 60px 60px",
            animation: "float 40s infinite linear",
          },
        }}
      />

      {/* Estilos globales mejorados */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap');

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.5)); }
            100% { transform: scale(1); }
          }
          
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          
          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0; transform: scale(0); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes shine {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </Container>
  );
};

export default WeddingInvitation;
