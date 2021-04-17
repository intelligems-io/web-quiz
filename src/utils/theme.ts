import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#1941e1",
      dark: "#0013bc",
      light: "#1370f0",
    },
    secondary: {
      main: "#17A0AA",
      dark: "#005157",
      light: "#5FD1DD",
    },
  },
  typography: {
    fontFamily: [
      "Jost",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
