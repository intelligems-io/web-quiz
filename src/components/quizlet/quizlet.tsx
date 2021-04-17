import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import { findByLabelText } from "@testing-library/dom";
import * as React from "react";
import { useState } from "react";
import OnboardingScreen from "./onboardingScreen";
import WelcomeScreen from "./welcomeScreen";

export interface QuizletProps {}

const SCREENS = {
  WelcomeScreen: "WelcomeScreen",
  OnboardingScreen: "OnboardingScreen",
};

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    width: "920px",
    margin: "auto",
    padding: "30px",
    top: 200,
    // height: 200,
    textAlign: "center",
  },
}));

const Quizlet: React.FC<QuizletProps> = () => {
  const classes = useStyles();

  const [currentScreen, setCurrentScreen] = useState(SCREENS.WelcomeScreen);

  const handleNextScreen = function () {
    if (currentScreen == SCREENS.WelcomeScreen) {
      setCurrentScreen(SCREENS.OnboardingScreen);
    }
  };

  const screenSelector = () => {
    switch (currentScreen) {
      case SCREENS.WelcomeScreen: {
        return <WelcomeScreen handleNextScreen={handleNextScreen} />;
      }
      case SCREENS.OnboardingScreen: {
        return (
          <OnboardingScreen
            handleNextScreen={handleNextScreen}
          ></OnboardingScreen>
        );
      }
      default: {
        return <WelcomeScreen handleNextScreen={handleNextScreen} />;
      }
    }
  };

  return (
    <Paper variant="elevation" className={classes.quizContainer}>
      {screenSelector()}
    </Paper>
  );
};

export default Quizlet;
