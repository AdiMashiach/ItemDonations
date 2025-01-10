import { createTheme } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Heebo",
    fontWeightRegular: 500,
  },
  palette: {
    primary: {
      main: "#091057",
    },
    secondary: {
      main: "#024CAA",
    },
    background: {
      default: "#DBD3D3",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3e3d3d",
          color: "#fff",
          fontSize: "1.5rem",
          padding: "0.75rem 2rem",
          borderRadius: "2rem",
          cursor: "pointer",
          border: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          direction: "rtl",
          fontSize: "1rem",
          color: "#ECF1F5",
          borderRadius: "4rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
  },
});

export default theme;
