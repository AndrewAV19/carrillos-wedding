import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import WeddingInvitation from './WeddingInvitation/WeddingInvitation';


// Tema personalizado para la boda
const weddingTheme = createTheme({
  palette: {
    primary: {
      main: '#d4b59e', // Beige elegante
      light: '#e8d5c4',
      dark: '#b38b6e',
    },
    secondary: {
      main: '#b76e79', // Rosa vintage
      light: '#dba1aa',
      dark: '#8e4d55',
    },
    info: {
      main: '#9cb3b8', // Azul grisáceo suave
    },
    background: {
      default: '#faf7f2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      <WeddingInvitation
        novio="Chuy"
        novia="Gabi"
        fecha="Sábado, 26 de Septiembre 2026"
        hora="5:00 PM"
        lugar="Grand Jardín"
        direccion="Zalamea 353, 47912 La Barca, Jal."
        mensaje="Hoy nos convertimos en el sueño que soñamos juntos, y queremos que seas parte de este momento tan especial."
      />
    </ThemeProvider>
  );
}

export default App;