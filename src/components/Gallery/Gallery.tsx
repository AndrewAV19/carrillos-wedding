import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  alpha,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Grow,
} from "@mui/material";
import {
  Close as CloseIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";

interface GalleryProps {
  fotos?: string[];
}

const Gallery: React.FC<GalleryProps> = ({ fotos }) => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const localImages = [
    "/boda1.jpeg",
    "/boda2.jpeg",
    "/boda3.jpeg",
    "/boda4.jpeg",
    "/boda5.jpeg",
    "/boda6.jpeg",
  ];

  const images = fotos && fotos.length > 0 ? fotos : localImages;

  const handleOpen = (index: number) => {
    setSelectedImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Grow in={true} timeout={1000}>
      <div>
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.95)} 0%, ${alpha(theme.palette.grey[50], 0.98)} 100%)`,
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              height: 8,
              background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${theme.palette.primary.main} 100%)`,
            }}
          />

          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 300,
                fontFamily: "Georgia, serif",
                mb: 3,
                color: theme.palette.primary.dark,
              }}
            >
              Nuestra Galería
            </Typography>

            <ImageList variant="masonry" cols={2} gap={8}>
              {images.map((img, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => handleOpen(index)}
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: 2,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <img
                    src={img}
                    alt={`Foto ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </CardContent>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
                bgcolor: alpha(theme.palette.common.black, 0.5),
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.black, 0.7),
                },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: alpha(theme.palette.common.black, 0.5),
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.black, 0.7),
                },
                zIndex: 1,
              }}
            >
              <PrevIcon />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: alpha(theme.palette.common.black, 0.5),
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.black, 0.7),
                },
                zIndex: 1,
              }}
            >
              <NextIcon />
            </IconButton>

            <img
              src={images[selectedImage]}
              alt={`Foto ${selectedImage + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </Box>
        </Modal>
      </div>
    </Grow>
  );
};

export default Gallery;
