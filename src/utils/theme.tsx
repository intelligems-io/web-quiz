import { createTheme } from "@material-ui/core/styles";

const SecondaryMain = "#494C50";
export const ExtendedPrimary = {
  light2: "#448AFF",
  light3: "#82B1FF",
  light4: "#ECF0FF",
  light5: "#E0E6F5",
};
export default createTheme({
  palette: {
    primary: {
      main: "#2962FF",
      dark: "#0013BC",
      light: "#2979FF",
    },
    secondary: {
      main: SecondaryMain,
      dark: "#1E1E1E",
      light: "#BBBBBB",
    },
    error: {
      main: "#DC1E38",
      dark: "#C11A31",
      light: "#F88078",
    },
    warning: {
      main: "#FEB52B",
      dark: "#D8901A",
      light: "#FFCE71",
    },
    info: {
      main: "#BBBBBB",
      dark: "#494C50",
      light: "#F1F1F1",
    },
    success: {
      main: "#2CAF2C",
      dark: "#248C24",
      light: "#7AD17A",
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "-apple-system", "Roboto"].join(","),
  },
});
