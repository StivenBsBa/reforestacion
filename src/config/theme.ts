import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#125BCE",
      dark: "#0B1929",
    },
    secondary: {
      main: "#FFCC35",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0B1929",
      secondary: "#536579",
    },
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shape: {
    borderRadius: 14,
  },
});
