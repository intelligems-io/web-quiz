import { makeStyles, Paper, Slide } from "@material-ui/core";
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
    top: 100,
    maxHeight: "500px",
    height: "auto",
    textAlign: "center",
    transition: "max-height 2s ease-out",
  },
}));

const CarouselItem: React.FC<any> = (props) => {
  return props.display ? (
    <div className="CarouselItem">
      {
        <Slide
          direction={
            props.active
              ? props.isNext
                ? "left"
                : "right"
              : props.isNext
              ? "right"
              : "left"
          }
          in={props.active}
          timeout={props.timeout}
        >
          <div>{props.child}</div>
        </Slide>
      }
    </div>
  ) : null;
};

const Quizlet: React.FC<QuizletProps> = () => {
  const classes = useStyles();
  const slideTransitionTimeout = 500;

  const [currentScreen, setCurrentScreen] = useState(SCREENS.WelcomeScreen);

  const handleNextScreen = function () {
    if (currentScreen === SCREENS.WelcomeScreen) {
      setCurrentScreen(SCREENS.OnboardingScreen);
    }
    if (currentScreen === SCREENS.OnboardingScreen) {
      setCurrentScreen(SCREENS.WelcomeScreen);
    }
  };

  return (
    <Paper variant="elevation" className={classes.quizContainer}>
      <CarouselItem
        display={currentScreen === SCREENS.WelcomeScreen}
        active={currentScreen === SCREENS.WelcomeScreen}
        child={<WelcomeScreen handleNextScreen={handleNextScreen} />}
        timeout={{ enter: 0, exit: slideTransitionTimeout }}
        isNext
      />
      <CarouselItem
        display={currentScreen === SCREENS.OnboardingScreen}
        active={currentScreen === SCREENS.OnboardingScreen}
        child={<OnboardingScreen handleNextScreen={handleNextScreen} />}
        timeout={slideTransitionTimeout}
        isNext
      />
    </Paper>
  );
};

export default Quizlet;
