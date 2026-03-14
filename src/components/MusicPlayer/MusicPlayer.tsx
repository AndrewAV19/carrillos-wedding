// components/MusicPlayer.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Slider,
  Box,
  Paper,
  Typography,
  useTheme,
  alpha,
  Zoom,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  MusicNote as MusicIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
} from "@mui/icons-material";

const MusicPlayer: React.FC = () => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Usar el archivo de música local
  const songUrl = "/musicaboda.mp3";

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    // Manejar eventos del audio
    const handleCanPlay = () => {
      setIsAudioReady(true);
    };

    const handleError = (error: any) => {
      console.error("Error cargando el audio:", error);
      setIsAudioReady(false);
    };

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, [songUrl]);

  // Actualizar volumen cuando cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Manejar reproducción automática (intentarlo una vez al cargar)
  useEffect(() => {
    // Intentar reproducir automáticamente (puede ser bloqueado por el navegador)
    const autoplay = async () => {
      if (audioRef.current && isAudioReady) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    autoplay();
  }, [isAudioReady]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error reproduciendo audio:", error);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (volume > 0) {
        setVolume(0);
        audioRef.current.volume = 0;
      } else {
        setVolume(50);
        audioRef.current.volume = 0.5;
      }
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Zoom in={true} timeout={800}>
        <Paper
          elevation={8}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          sx={{
            borderRadius: showControls ? 3 : "50%",
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
            color: "white",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            width: showControls ? 280 : 56,
            height: showControls ? 140 : 56,
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          <Box sx={{ p: showControls ? 2 : 1 }}>
            {!showControls ? (
              <IconButton 
                onClick={togglePlay} 
                sx={{ 
                  color: "white",
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
            ) : (
              <Box>
                <Box
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1, 
                    mb: 2,
                    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                    pb: 1,
                  }}
                >
                  <MusicIcon sx={{ fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      flex: 1,
                      fontWeight: 500,
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                    }}
                  >
                    {isPlaying ? '💝 Nuestra canción' : '🎵 Música de boda'}
                  </Typography>
                  <IconButton
                    onClick={togglePlay}
                    size="small"
                    sx={{ 
                      color: "white",
                      bgcolor: alpha(theme.palette.common.white, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.common.white, 0.2),
                      },
                    }}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={toggleMute}
                    size="small"
                    sx={{ 
                      color: "white",
                      '&:hover': {
                        bgcolor: alpha(theme.palette.common.white, 0.1),
                      },
                    }}
                  >
                    {volume === 0 ? <VolumeOffIcon /> : <VolumeIcon />}
                  </IconButton>
                  <Slider
                    value={volume}
                    onChange={(_, val) => setVolume(val as number)}
                    min={0}
                    max={100}
                    sx={{
                      color: "white",
                      '& .MuiSlider-rail': {
                        opacity: 0.3,
                        bgcolor: alpha(theme.palette.common.white, 0.3),
                      },
                      '& .MuiSlider-track': {
                        bgcolor: 'white',
                      },
                      "& .MuiSlider-thumb": {
                        width: 14,
                        height: 14,
                        bgcolor: 'white',
                        '&:hover': {
                          boxShadow: `0 0 0 8px ${alpha(theme.palette.common.white, 0.2)}`,
                        },
                      },
                    }}
                  />
                </Box>

                {/* Indicador de reproducción */}
                {isPlaying && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 0.5,
                      mt: 1,
                    }}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          animation: `pulse 1s ease-in-out ${i * 0.15}s infinite`,
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 0.3 },
                            '50%': { opacity: 1 },
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Zoom>
    </Box>
  );
};

export default MusicPlayer;