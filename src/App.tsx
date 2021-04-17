import "./App.css";
import { Button, ThemeProvider, Typography } from "@material-ui/core";
import theme from "./utils/theme";
import Quizlet from "./components/quizlet/quizlet";
import Background from "./components/background";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Background />
      <Quizlet />
    </ThemeProvider>
  );
}

export default App;
