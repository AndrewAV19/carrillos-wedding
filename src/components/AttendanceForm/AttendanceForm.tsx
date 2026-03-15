import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  useTheme,
  alpha,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Alert,
  Slide,
  InputAdornment,
  Typography,
  Divider,
  Chip,
  Avatar,
  Grow,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Send as SendIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Celebration as CelebrationIcon,
  Spa as SpaIcon,
  Diamond as DiamondIcon,
} from "@mui/icons-material";

interface AttendanceFormProps {
  novio: string;
  novia: string;
  fechaBoda?: string;
  lugarBoda?: string;
  numeroNovio?: string;
  onClose?: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  numeroNovio = "3931023952",
  onClose,
}) => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    acompanantes: "0",
    confirmacion: "si",
    mensaje: "",
    autorizacion: false,
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [hoverSi, setHoverSi] = useState(false);
  const [hoverNo, setHoverNo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validarTelefono = (telefono: string): boolean => {
    const regexTelefono =
      /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return regexTelefono.test(telefono);
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const telefono = e.target.value;
    setFormData((prev) => ({ ...prev, telefono }));
    setTelefonoValido(validarTelefono(telefono) || telefono === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setError("Por favor, dinos tu nombre completo 💫");
      return;
    }

    if (!formData.telefono.trim()) {
      setError("Queremos mantenerte informado, ingresa tu teléfono 📱");
      return;
    }

    if (!telefonoValido) {
      setError("El número no es válido, ¿podrías verificarlo? 💕");
      return;
    }

    if (!formData.autorizacion) {
      setError("Por favor, confirma que deseas enviar tu mensaje ✨");
      return;
    }

    // Mensaje personalizado según la confirmación
    let mensajeWhatsApp = "";

    if (formData.confirmacion === "si") {
      mensajeWhatsApp = encodeURIComponent(
        `🎉 *¡CONFIRMO ASISTENCIA!* 🎉\n` +
          `═══════════════════════════\n\n` +
          `Queridos Jesús Carrillo Salcedo y Ana Gabriela López Aguilar, ¡qué emoción! 💖\n\n` +
          `📌 *Mi confirmación:*\n` +
          `━━━━━━━━━━━━━━━━\n` +
          `✅ *Asistiré:* ¡SÍ, con mucho gusto! ✨\n` +
          `👥 *Acompañantes:* ${formData.acompanantes}\n` +
          `━━━━━━━━━━━━━━━━\n\n` +
          `${formData.mensaje ? `💌 *Un mensaje para ti:*\n"${formData.mensaje}"\n\n` : ""}` +
          `¡Nos vemos en la boda! Que sea un día inolvidable 🎊\n\n` +
          `Con cariño,\n` +
          `${formData.nombre} 💫`,
      );
    } else {
      mensajeWhatsApp = encodeURIComponent(
        `💔 *NO PODRÉ ASISTIR* 💔\n` +
          `═══════════════════════════\n\n` +
          `Queridos Ana Gabriela López Aguilar y Jesús Carrillo Salcedo ,\n\n` +
          `📌 *Mi confirmación:*\n` +
          `━━━━━━━━━━━━━━━━\n` +
          `❌ *Asistiré:* Lamentablemente NO podré acompañarlos\n` +
          `━━━━━━━━━━━━━━━━\n\n` +
          `${formData.mensaje ? `💌 *Un mensaje para ti:*\n"${formData.mensaje}"\n\n` : ""}` +
          `Aunque no pueda estar presente, estaré celebrando desde donde esté. ` +
          `¡Que tengan el día más hermoso del mundo! 🌟\n\n` +
          `Con cariño,\n` +
          `${formData.nombre} 💕`,
      );
    }

    await fetch(
      "https://script.google.com/macros/s/AKfycbxPyvVCB710e4eYZfrc5vLty3baPFxVsCt-vgcTXZKOUvyIUDnBuG_-qlJ8A89fEZexBA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          acompanantes: formData.acompanantes,
          confirmacion: formData.confirmacion,
          mensaje: formData.mensaje,
        }),
        mode: "no-cors",
      },
    );
    window.open(
      `https://wa.me/${numeroNovio}?text=${mensajeWhatsApp}`,
      "_blank",
    );

    setEnviado(true);
    setError("");

    setTimeout(() => {
      setEnviado(false);
      setFormData({
        nombre: "",
        telefono: "",
        acompanantes: "0",
        confirmacion: "si",
        mensaje: "",
        autorizacion: false,
      });
      setTelefonoValido(true);
      if (onClose) onClose();
    }, 4000);
  };

  // Estilos románticos compartidos
  const romanticTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: "blur(5px)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      "&.Mui-focused": {
        transform: "translateY(-2px)",
        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
      "& fieldset": {
        borderWidth: "2px",
        borderColor: alpha(theme.palette.primary.main, 0.3),
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
      "&.Mui-focused": {
        color: theme.palette.primary.main,
      },
    },
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={800}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            color: alpha(theme.palette.primary.main, 0.3),
            fontSize: "3rem",
            zIndex: 0,
          }}
        ></Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    mb: 1,
                  }}
                >
                  Confirma tu presencia
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontStyle: "italic",
                    maxWidth: "80%",
                    mx: "auto",
                  }}
                >
                  Tu respuesta llegará directamente a los novios 💌
                </Typography>
              </Box>
            </Fade>

            {enviado && (
              <Zoom in={true}>
                <Alert
                  severity="success"
                  icon={<CelebrationIcon fontSize="inherit" />}
                  sx={{
                    mb: 2,
                    animation: "pulse 2s infinite",
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    sx={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    ¡Gracias por confirmar! 💖
                  </Typography>
                  <Typography variant="caption">
                    Tu mensaje ha sido enviado a los novios
                  </Typography>
                </Alert>
              </Zoom>
            )}

            {error && (
              <Slide direction="right" in={true}>
                <Alert
                  severity="error"
                  icon={<HeartBorderIcon fontSize="inherit" />}
                  onClose={() => setError("")}
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                  }}
                >
                  {error}
                </Alert>
              </Slide>
            )}

            {/* Campo de nombre con diseño romántico */}
            <TextField
              fullWidth
              label="Tu nombre completo"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              variant="outlined"
              placeholder="¿Cómo te llamas? Queremos saberlo 💫"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    >
                      <PersonIcon
                        sx={{ fontSize: 18, color: theme.palette.primary.main }}
                      />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
              sx={romanticTextField}
            />

            {/* Campo de teléfono mejorado */}
            <TextField
              fullWidth
              label="Tu número de WhatsApp"
              name="telefono"
              value={formData.telefono}
              onChange={handleTelefonoChange}
              required
              variant="outlined"
              placeholder="Ej: +52 123 456 7890"
              error={!telefonoValido && formData.telefono !== ""}
              helperText={
                !telefonoValido && formData.telefono !== ""
                  ? "Este número no es válido, ¿lo revisamos? 💕"
                  : "Incluye código de país (ej: +52) 📱"
              }
              FormHelperTextProps={{
                sx: {
                  fontStyle: "italic",
                  color:
                    !telefonoValido && formData.telefono !== ""
                      ? theme.palette.error.main
                      : theme.palette.text.secondary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        border: `2px solid ${alpha(theme.palette.success.main, 0.3)}`,
                      }}
                    >
                      <PhoneIcon
                        sx={{ fontSize: 18, color: theme.palette.success.main }}
                      />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
              sx={romanticTextField}
            />

            <Divider sx={{ my: 1 }}>
              <Chip
                label="Tu respuesta"
                size="medium"
                icon={<HeartIcon />}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 20,
                  px: 2,
                  "& .MuiChip-label": {
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 500,
                  },
                }}
              />
            </Divider>

            {/* Opciones de asistencia con diseño romántico */}
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  mb: 2,
                  fontFamily: '"Playfair Display", serif',
                  textAlign: "center",
                  width: "100%",
                }}
              >
                ¿Acompañarás a los novios en su gran día?
              </FormLabel>
              <RadioGroup
                row
                name="confirmacion"
                value={formData.confirmacion}
                onChange={handleChange}
                sx={{ justifyContent: "center", gap: 3 }}
              >
                <Grow in={true} timeout={800}>
                  <Paper
                    elevation={formData.confirmacion === "si" ? 4 : 1}
                    onMouseEnter={() => setHoverSi(true)}
                    onMouseLeave={() => setHoverSi(false)}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, confirmacion: "si" }))
                    }
                    sx={{
                      p: 2,
                      border: `2px solid ${
                        formData.confirmacion === "si"
                          ? theme.palette.success.main
                          : hoverSi
                            ? alpha(theme.palette.success.main, 0.5)
                            : alpha(theme.palette.grey[400], 0.3)
                      }`,
                      borderRadius: 4,
                      bgcolor:
                        formData.confirmacion === "si"
                          ? alpha(theme.palette.success.main, 0.08)
                          : "transparent",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hoverSi ? "scale(1.05)" : "scale(1)",
                      cursor: "pointer",
                      minWidth: 140,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: "2.5rem",
                          animation: hoverSi
                            ? "heartBeat 1.3s infinite"
                            : "none",
                        }}
                      >
                        💖
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.success.main,
                          fontFamily: '"Playfair Display", serif',
                        }}
                      >
                        ¡Sí, confirmo!
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Estaré allí 🎊
                      </Typography>
                    </Box>
                  </Paper>
                </Grow>

                <Grow in={true} timeout={1000}>
                  <Paper
                    elevation={formData.confirmacion === "no" ? 4 : 1}
                    onMouseEnter={() => setHoverNo(true)}
                    onMouseLeave={() => setHoverNo(false)}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, confirmacion: "no" }))
                    }
                    sx={{
                      p: 2,
                      border: `2px solid ${
                        formData.confirmacion === "no"
                          ? theme.palette.error.main
                          : hoverNo
                            ? alpha(theme.palette.error.main, 0.5)
                            : alpha(theme.palette.grey[400], 0.3)
                      }`,
                      borderRadius: 4,
                      bgcolor:
                        formData.confirmacion === "no"
                          ? alpha(theme.palette.error.main, 0.05)
                          : "transparent",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hoverNo ? "scale(1.05)" : "scale(1)",
                      cursor: "pointer",
                      minWidth: 140,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box sx={{ fontSize: "2.5rem" }}>💔</Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.error.main,
                          fontFamily: '"Playfair Display", serif',
                        }}
                      >
                        No podré ir
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Lo siento mucho 😔
                      </Typography>
                    </Box>
                  </Paper>
                </Grow>
              </RadioGroup>
            </FormControl>

            {/* Campo de acompañantes mejorado */}
            {formData.confirmacion === "si" && (
              <Zoom in={true}>
                <TextField
                  fullWidth
                  label="¿Cuántos te acompañarán?"
                  name="acompanantes"
                  type="number"
                  value={formData.acompanantes}
                  onChange={handleChange}
                  inputProps={{ min: 0, max: 10 }}
                  helperText="Máximo 10 personas (compartiremos la alegría juntos) ✨"
                  FormHelperTextProps={{
                    sx: {
                      fontStyle: "italic",
                      color: theme.palette.text.secondary,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            border: `2px solid ${alpha(theme.palette.info.main, 0.3)}`,
                          }}
                        >
                          <GroupIcon
                            sx={{
                              fontSize: 18,
                              color: theme.palette.info.main,
                            }}
                          />
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                  sx={romanticTextField}
                />
              </Zoom>
            )}

            {/* Mensaje personal mejorado */}
            <TextField
              fullWidth
              label="Mensaje para los novios"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              placeholder={
                formData.confirmacion === "si"
                  ? "Escribe algo especial para los novios... Una felicitación, un recuerdo, lo que quieras decirle 💌"
                  : "Aunque no puedas ir, puedes dejarle un mensaje a los novios... 💕"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 2 }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        border: `2px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                      }}
                    >
                      <MessageIcon
                        sx={{ fontSize: 18, color: theme.palette.warning.main }}
                      />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
              sx={romanticTextField}
            />

            <Divider sx={{ my: 1 }}>
              <SpaIcon
                sx={{
                  color: alpha(theme.palette.primary.main, 0.5),
                  fontSize: 20,
                }}
              />
            </Divider>

            {/* Checkbox de autorización mejorado */}
            <Fade in={true} timeout={1500}>
              <Paper
                elevation={formData.autorizacion ? 3 : 0}
                sx={{
                  p: 2.5,
                  bgcolor: formData.autorizacion
                    ? alpha(theme.palette.primary.main, 0.04)
                    : "transparent",
                  borderRadius: 3,
                  border: `2px solid ${
                    formData.autorizacion
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.main, 0.2)
                  }`,
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                  },
                }}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    autorizacion: !prev.autorizacion,
                  }))
                }
              >
                <FormControlLabel
                  control={
                    <Radio
                      name="autorizacion"
                      checked={formData.autorizacion}
                      onChange={handleChange}
                      color="primary"
                      value={true}
                      icon={<HeartBorderIcon />}
                      checkedIcon={<HeartIcon />}
                    />
                  }
                  label={
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          color: formData.autorizacion
                            ? theme.palette.primary.main
                            : "inherit",
                        }}
                      >
                        Confirmo que quiero enviar este mensaje a los novios
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        Se abrirá WhatsApp para compartir tu confirmación
                        directamente con los novios 💕
                      </Typography>
                    </Box>
                  }
                  sx={{ m: 0, width: "100%" }}
                />
              </Paper>
            </Fade>

            {/* Botón de envío mejorado */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              endIcon={<SendIcon />}
              startIcon={<DiamondIcon />}
              disabled={!formData.autorizacion}
              sx={{
                borderRadius: 40,
                py: 2,
                textTransform: "none",
                fontSize: "1.2rem",
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                letterSpacing: "1px",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary?.main || theme.palette.primary.dark} 100%)`,
                "&:hover": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary?.dark || theme.palette.primary.main} 100%)`,
                },
                "&:disabled": {
                  background: alpha(theme.palette.grey[400], 0.5),
                },
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                mt: 3,
                border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
                backdropFilter: "blur(5px)",
              }}
            >
              Enviar Confirmación a los novios
            </Button>

            <Fade in={true} timeout={2000}>
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{
                  mt: 1,
                  fontStyle: "italic",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <HeartIcon
                  sx={{
                    fontSize: 14,
                    color: alpha(theme.palette.primary.main, 0.5),
                  }}
                />
                Tu mensaje llegará directo a los novios
                <HeartIcon
                  sx={{
                    fontSize: 14,
                    color: alpha(theme.palette.primary.main, 0.5),
                  }}
                />
              </Typography>
            </Fade>

            {/* Efecto de flores decorativas */}
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -20,
                fontSize: "4rem",
                opacity: 0.2,
                transform: "rotate(-15deg)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              🌸
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                fontSize: "4rem",
                opacity: 0.2,
                transform: "rotate(25deg)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              🌺
            </Box>
          </Box>
        </form>

        <style>
          {`
            @keyframes heartBeat {
              0% { transform: scale(1); }
              14% { transform: scale(1.3); }
              28% { transform: scale(1); }
              42% { transform: scale(1.3); }
              70% { transform: scale(1); }
            }
          `}
        </style>
      </Box>
    </Slide>
  );
};

export default AttendanceForm;
