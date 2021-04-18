import { makeStyles, Paper, Slide } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import OnboardingScreen from "./onboardingScreen";
import SummaryScreen from "./summaryScreen";
import WelcomeScreen from "./welcomeScreen";

export interface QuizletProps {}

const SCREENS = {
  WelcomeScreen: "WelcomeScreen",
  OnboardingScreen: "OnboardingScreen",
  SummaryScreen: "SummaryScreen",
};

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    width: "920px",
    margin: "auto",
    padding: "30px",
    top: 100,
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

export interface IFormState {
  data: { [index: string]: string };
  display: { [index: string]: boolean };
  focus: string;
}

const initialFormState = {
  data: {
    orders: "30",
    aov: "45",
    cvr: "10",
    cogs: "15",
    cac: "15",
  },
  display: {
    orders: true,
    aov: true,
    cvr: true,
    cogs: true,
    cac: true,
  },
  focus: "orders",
};

const Quizlet: React.FC<QuizletProps> = () => {
  const classes = useStyles();
  const slideTransitionTimeout = 500;

  const [currentScreen, setCurrentScreen] = useState(SCREENS.WelcomeScreen);
  const [formState, setFormState] = useState<IFormState>(initialFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      data: {
        ...formState.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  const moveToScreen = (screen: string) => () => {
    setCurrentScreen(screen);
  };

  const handleFormSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    var lastDisplayed = "";
    var firstHidden = "";
    for (const [key, value] of Object.entries(formState.display)) {
      if (value) {
        lastDisplayed = key;
      } else {
        firstHidden = key;
        break;
      }
    }
    if (!firstHidden && formState.data[lastDisplayed]) {
      moveToScreen(SCREENS.SummaryScreen)();
    }
    if (formState.data[lastDisplayed] && firstHidden) {
      setFormState({
        ...formState,
        display: {
          ...formState.display,
          [firstHidden]: true,
        },
        focus: firstHidden,
      });
    }
  };

  return (
    <Paper variant="elevation" className={classes.quizContainer}>
      <CarouselItem
        display={currentScreen === SCREENS.WelcomeScreen}
        active={currentScreen === SCREENS.WelcomeScreen}
        child={
          <WelcomeScreen
            handleNextScreen={moveToScreen(SCREENS.OnboardingScreen)}
          />
        }
        timeout={{ enter: 0, exit: slideTransitionTimeout }}
        isNext
      />
      <CarouselItem
        display={currentScreen === SCREENS.OnboardingScreen}
        active={currentScreen === SCREENS.OnboardingScreen}
        child={
          <OnboardingScreen
            handleNextScreen={moveToScreen(SCREENS.SummaryScreen)}
            formState={formState}
            handleChange={handleChange}
            handleFormSubmit={handleFormSubmit}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      />
      <CarouselItem
        display={currentScreen === SCREENS.SummaryScreen}
        active={currentScreen === SCREENS.SummaryScreen}
        child={
          <SummaryScreen
            handleNextScreen={moveToScreen(SCREENS.WelcomeScreen)}
            handlePreviousScreen={moveToScreen(SCREENS.OnboardingScreen)}
            formState={formState}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      />
    </Paper>
  );
};

export default Quizlet;
