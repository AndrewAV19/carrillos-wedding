// components/EnvelopeOpening.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, alpha, Fade, Zoom } from "@mui/material";
import {
  Favorite as HeartIcon,
  Diamond as DiamondIcon,
  ChevronRight as RightIcon,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const flapOpen = keyframes`
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(140deg); }
  100% { transform: rotateX(180deg); z-index: 1; }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
`;

const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
`;

const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const theme = useTheme();
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; left: string; top: string; delay: string }>
  >([]);

  // Generar estrellas brillantes aleatorias
  useEffect(() => {
    const newSparkles = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      });
    }
    setSparkles(newSparkles);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);

    // Después de la animación del sobre, mostrar el contenido
    setTimeout(() => {
      setShowContent(true);

      // Llamar a onOpen después de un pequeño retraso para mostrar el contenido
      setTimeout(() => {
        onOpen();
      }, 1500);
    }, 1500);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.dark, 0.1)} 0%, 
          ${alpha(theme.palette.secondary.dark, 0.1)} 50%,
          ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
        backdropFilter: "blur(5px)",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Fondo con estrellas brillantes */}
      {sparkles.map((sparkle) => (
        <Box
          key={sparkle.id}
          sx={{
            position: "absolute",
            left: sparkle.left,
            top: sparkle.top,
            color: theme.palette.primary.main,
            opacity: 0.3,
            animation: `${sparkle} 4s infinite`,
            animationDelay: sparkle.delay,
            fontSize: { xs: "10px", sm: "15px" },
            "&::before": {
              content: '"✨"',
            },
          }}
        />
      ))}

      {/* Contenedor principal */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "300px", sm: "400px", md: "500px" },
          height: { xs: "400px", sm: "500px", md: "600px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Texto romántico superior */}
        <Fade in={!isOpening} timeout={2000}>
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              animation: `${float} 3s infinite ease-in-out`,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Una invitación muy especial
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                fontStyle: "italic",
                fontFamily: "'Georgia', serif",
              }}
            >
              Toca el sobre para abrirlo
            </Typography>
          </Box>
        </Fade>

        {/* El Sobre */}
        <Box
          onClick={handleOpen}
          sx={{
            position: "relative",
            width: { xs: "250px", sm: "300px", md: "350px" },
            height: { xs: "150px", sm: "180px", md: "200px" },
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover:not(.opening)": {
              transform: "scale(1.05)",
              "& .envelope-flap": {
                borderBottomColor: alpha(theme.palette.primary.main, 0.3),
              },
            },
            ...(isOpening && {
              pointerEvents: "none",
            }),
          }}
        >
          {/* Cuerpo del sobre */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "80%",
              background: `linear-gradient(145deg, 
                ${alpha(theme.palette.primary.main, 0.2)} 0%, 
                ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
              border: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              borderRadius: "10px",
              boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.2)}`,
              backdropFilter: "blur(10px)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "10%",
                width: "80%",
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
              },
            }}
          >
            {/* Sombra interior */}
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: "80%",
                height: "60%",
                background: `linear-gradient(145deg, 
                  ${alpha(theme.palette.common.white, 0.2)} 0%, 
                  transparent 100%)`,
                borderRadius: "5px",
              }}
            />
          </Box>

          {/* Solapa del sobre (triángulo) */}
          <Box
            className="envelope-flap"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: `linear-gradient(145deg, 
                ${alpha(theme.palette.primary.light, 0.3)} 0%, 
                ${alpha(theme.palette.secondary.light, 0.3)} 100%)`,
              border: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              borderBottom: "none",
              borderRadius: "10px 10px 0 0",
              transformOrigin: "top",
              transition: "all 0.3s",
              animation: isOpening
                ? `${flapOpen} 1.5s ease-in-out forwards`
                : "none",
              zIndex: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "150px solid transparent",
                borderRight: "150px solid transparent",
                borderTop: `40px solid ${alpha(theme.palette.primary.light, 0.2)}`,
                opacity: 0.5,
              },
            }}
          />

          {/* Contenido que emerge del sobre */}
          <Fade in={showContent} timeout={1000}>
            <Box
              sx={{
                position: "absolute",
                top: "-100%",
                left: "5%",
                width: "90%",
                minHeight: "200px",
                background: `linear-gradient(145deg, 
                  ${alpha(theme.palette.common.white, 0.95)} 0%, 
                  ${alpha(theme.palette.grey[50], 0.95)} 100%)`,
                border: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                borderRadius: "15px",
                padding: "20px",
                boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.2)}`,
                backdropFilter: "blur(10px)",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                animation: `${float} 3s infinite ease-in-out`,
              }}
            >
              <Zoom in={showContent} timeout={1500}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <HeartIcon
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: 40,
                        animation: `${heartBeat} 2s infinite`,
                      }}
                    />
                    <DiamondIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: 40,
                        animation: `${sparkle} 3s infinite`,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Dancing Script', cursive",
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    ¡Ha llegado tu invitación!
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: alpha(theme.palette.text.primary, 0.8),
                      mb: 3,
                      fontStyle: "italic",
                    }}
                  >
                    Con mucho amor y alegría, te invitamos a celebrar nuestro
                    matrimonio
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <Typography variant="body2">
                      Descubre todos los detalles
                    </Typography>
                    <RightIcon sx={{ animation: `${float} 1s infinite` }} />
                  </Box>
                </Box>
              </Zoom>
            </Box>
          </Fade>

          {/* Decoración del sobre */}
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              zIndex: 1,
            }}
          >
            <HeartIcon
              sx={{
                color: alpha(theme.palette.secondary.main, 0.6),
                fontSize: { xs: 20, sm: 25 },
                animation: `${heartBeat} 3s infinite`,
              }}
            />
            <HeartIcon
              sx={{
                color: alpha(theme.palette.primary.main, 0.6),
                fontSize: { xs: 20, sm: 25 },
                animation: `${heartBeat} 3s infinite 0.5s`,
              }}
            />
            <HeartIcon
              sx={{
                color: alpha(theme.palette.secondary.main, 0.6),
                fontSize: { xs: 20, sm: 25 },
                animation: `${heartBeat} 3s infinite 1s`,
              }}
            />
          </Box>

          {/* Sello de cera decorativo */}
          <Zoom in={!isOpening}>
            <Box
              sx={{
                position: "absolute",
                bottom: "20%",
                right: "15%",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: `linear-gradient(145deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.secondary.main} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.2)}`,
                zIndex: 1,
                "&::before": {
                  content: '"❤️"',
                  fontSize: "20px",
                },
              }}
            />
          </Zoom>
        </Box>

       
      </Box>

      {/* Estilos globales para fuentes */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
        `}
      </style>
    </Box>
  );
};

export default EnvelopeOpening;
