// components/HistorySection.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Paper,
  Fade,
  Zoom,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import {
  Favorite as HeartIcon,
  Stars as StarsIcon,
  AcUnit as AcUnitIcon,
  FlightTakeoff as FlightIcon,
  PlayCircleOutline as PlayIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface HistorySectionProps {
  novio: string;
  novia: string;
  historia?: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  novio = "Chui",
  novia = "Gabi",
  historia,
}) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const historiaEjemplo = `Todo comenzó en una tarde lluviosa de primavera, cuando nuestros caminos se cruzaron en aquella pequeña cafetería del centro. ${novio} pidió un café americano, ${novia} un capuchino con canela, y sin saberlo, estaban a punto de crear la bebida perfecta: el amor. Desde ese momento, cada día ha sido una nueva página en nuestro cuento de hadas, escribiendo juntos una historia que hoy queremos compartir con ustedes.`;

  const historiaFinal = historia || historiaEjemplo;

  const timeline = [
    {
      year: "2025",
      title: "Nuestra primera cita",
      event: "septiembre, 2025",
      description:
        "El día que el destino nos regaló nuestra primera cita y comenzó nuestra historia.",
      icon: <StarsIcon />,
      color: "#FFB6C1",
      images: ["/lt1.jpeg", "/lt2.jpeg"],
    },
    {
      year: "2025",
      title: "Nuestra primera boda de amigos",
      event: "Octubre, 2025",
      description:
        "Bailamos bajo las estrellas y supimos que queríamos esto para siempre.",
      icon: <HeartIcon />,
      color: "#FFD700",
      images: ["/lt3.jpeg", "/lt4.jpeg"],
    },
    {
      year: "2025",
      title: "Primera navidad juntos",
      event: "Diciembre, 2025",
      description: "Nuestro primer árbol de navidad, el primero de muchos.",
      icon: <AcUnitIcon />,
      color: "#FF69B4",
      images: ["/lt5.jpeg"],
    },
    {
      year: "2026",
      title: "Nuestro primer viaje juntos",
      event: "Enero, 2026",
      description: "Descubriendo el mundo juntos, un destino a la vez.",
      icon: <FlightIcon />,
      color: "#9370DB",
      images: ["/lt6.jpeg", "/lt7.jpeg", "/lt8.jpeg"],
    },
  ];

  const handleImageClick = (images: string[], index: number) => {
    setCurrentEventImages(images);
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % currentEventImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentEventImages[newIndex]);
  };

  const handlePrevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + currentEventImages.length) %
      currentEventImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentEventImages[newIndex]);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos de fondo mejorados */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: `
            radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L50 20 L40 30 L45 45 L30 35 L15 45 L20 30 L10 20 L25 20 Z' fill='%23f8b4d9' fill-opacity='0.1' /%3E%3C/svg%3E")
          `,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={6}>
            <Zoom in={true} timeout={1500}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              >
                <HeartIcon sx={{ fontSize: 50, color: "white" }} />
              </Box>
            </Zoom>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 300,
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: { xs: "2.5rem", md: "4rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                letterSpacing: "0.02em",
              }}
            >
              Nuestra Historia de Amor
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: "italic",
                color: theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {novio}
              <HeartIcon
                sx={{
                  fontSize: 24,
                  color: theme.palette.secondary.main,
                  animation: "pulse 1.5s infinite",
                }}
              />
              {novia}
            </Typography>
          </Box>
        </Fade>

        {/* Video player con YouTube */}
        <Fade in={true} timeout={1500}>
          <Paper
            elevation={0}
            sx={{
              mb: 8,
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              background: alpha(theme.palette.common.black, 0.02),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: alpha(theme.palette.primary.main, 0.4),
                boxShadow: `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            }}
          >
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/M6mwt7pfpJo?si=IwpfgMimioXkp6MH&autoplay=0&rel=0"
                title="Video de la boda"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                }}
              />
            </Box>

            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  color: theme.palette.primary.main,
                  fontSize: "1.3rem",
                  letterSpacing: "0.05em",
                }}
              >
                ✦ Un adelanto de nuestro amor en movimiento ✦
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 1,
                }}
              >
                Los momentos más especiales capturados para siempre
              </Typography>
            </Box>
          </Paper>
        </Fade>

        {/* Tarjeta de historia principal con diseño mejorado */}
        <Fade in={true} timeout={2000}>
          <Paper
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
              variant="body1"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                lineHeight: 1.9,
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                textAlign: "center",
                color: theme.palette.text.primary,
                whiteSpace: "pre-line",
                position: "relative",
                px: { xs: 2, md: 4 },
                "&::before, &::after": {
                  content: '"❝"',
                  position: "absolute",
                  fontSize: "5rem",
                  color: alpha(theme.palette.primary.main, 0.1),
                  fontFamily: "Georgia, serif",
                },
                "&::before": {
                  top: -30,
                  left: 0,
                },
                "&::after": {
                  content: '"❞"',
                  bottom: -50,
                  right: 0,
                },
              }}
            >
              {historiaFinal}
            </Typography>
          </Paper>
        </Fade>

        {/* Línea de tiempo romántica con imágenes mejorada */}
        <Box sx={{ position: "relative", mb: 4 }}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              mb: 6,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: theme.palette.primary.dark,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Nuestros Momentos Mágicos
          </Typography>

          {timeline.map((item, index) => (
            <Fade in={true} timeout={1000 + index * 300} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(item.color, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                  border: `1px solid ${alpha(item.color, 0.2)}`,
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 20px 40px -12px ${alpha(item.color, 0.4)}`,
                    borderColor: alpha(item.color, 0.4),
                    "& .timeline-icon": {
                      transform: "rotate(360deg) scale(1.1)",
                    },
                  },
                }}
              >
                {/* Decoración de fondo */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: alpha(item.color, 0.05),
                    zIndex: 0,
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      mb: 3,
                    }}
                  >
                    <Box
                      className="timeline-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${item.color}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        transition: "all 0.6s ease",
                        boxShadow: `0 8px 20px ${alpha(item.color, 0.4)}`,
                        flexShrink: 0,
                      }}
                    >
                      {React.cloneElement(item.icon, { sx: { fontSize: 40 } })}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: "bold",
                            color: item.color,
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            textShadow: `2px 2px 4px ${alpha(item.color, 0.2)}`,
                          }}
                        >
                          {item.year}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            color: theme.palette.text.primary,
                            fontSize: { xs: "1.5rem", md: "2rem" },
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: theme.palette.primary.main,
                          mb: 1,
                          fontSize: { xs: "1rem", md: "1.2rem" },
                        }}
                      >
                        {item.event}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontStyle: "italic",
                          fontSize: { xs: "1rem", md: "1.1rem" },
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Galería de imágenes mejorada */}
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {item.images.map((image, imgIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={imgIndex}>
                        <Box
                          onClick={() =>
                            handleImageClick(item.images, imgIndex)
                          }
                          sx={{
                            position: "relative",
                            cursor: "pointer",
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                            transition: "all 0.4s ease",
                            "&:hover": {
                              transform: "scale(1.03)",
                              boxShadow: `0 15px 30px -8px ${alpha(item.color, 0.5)}`,
                              "& .image-overlay": {
                                opacity: 1,
                              },
                              "& img": {
                                transform: "scale(1.1)",
                              },
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={image}
                            alt={`${item.title} - momento ${imgIndex + 1}`}
                            sx={{
                              width: "100%",
                              height: 220,
                              objectFit: "cover",
                              transition: "transform 0.6s ease",
                            }}
                          />

                          {/* Overlay romántico */}
                          <Box
                            className="image-overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(to top, ${alpha(item.color, 0.7)} 0%, transparent 50%)`,
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "center",
                              padding: 2,
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                            }}
                          >
                            <HeartIcon
                              sx={{
                                color: "white",
                                fontSize: 30,
                                animation: "pulse 1.5s infinite",
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </Fade>
          ))}
        </Box>
      </Container>

      {/* Modal para ver imágenes en grande */}
      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
            }}
          >
            {selectedImage && (
              <>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    color: "white",
                    bgcolor: alpha(theme.palette.common.black, 0.5),
                    "&:hover": {
                      bgcolor: alpha(theme.palette.common.black, 0.7),
                    },
                    zIndex: 2,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {currentEventImages.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        position: "absolute",
                        left: -40,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        bgcolor: alpha(theme.palette.common.black, 0.5),
                        "&:hover": {
                          bgcolor: alpha(theme.palette.common.black, 0.7),
                        },
                        zIndex: 2,
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>

                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: -40,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        bgcolor: alpha(theme.palette.common.black, 0.5),
                        "&:hover": {
                          bgcolor: alpha(theme.palette.common.black, 0.7),
                        },
                        zIndex: 2,
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </>
                )}

                <Box
                  component="img"
                  src={selectedImage}
                  alt="Momento especial"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.4)}`,
                  }}
                />

                {/* Indicador de imágenes */}
                {currentEventImages.length > 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -40,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 1,
                      bgcolor: alpha(theme.palette.common.black, 0.5),
                      padding: "8px 16px",
                      borderRadius: 20,
                    }}
                  >
                    {currentEventImages.map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor:
                            idx === currentImageIndex
                              ? "white"
                              : alpha(theme.palette.common.white, 0.5),
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default HistorySection;
