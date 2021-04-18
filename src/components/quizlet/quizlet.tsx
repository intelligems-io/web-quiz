import { makeStyles, Paper, Slide } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import OnboardingScreen from "./onboardingScreen";
import PriceTestScreen from "./priceTestScreen";
import SummaryScreen from "./summaryScreen";
import WelcomeScreen from "./welcomeScreen";

export interface QuizletProps {}

const SCREENS = {
  WelcomeScreen: "WelcomeScreen",
  OnboardingScreen: "OnboardingScreen",
  SummaryScreen: "SummaryScreen",
  PriceTestScreen: "PriceTestScreen",
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

const initialOnboardingForm = {
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

const initialPriceTestForm = {
  data: {
    priceChange: "",
    cvrChange: "",
  },
  display: {
    priceChange: true,
    cvrChange: false,
  },
  focus: "priceChange",
};

const Quizlet: React.FC<QuizletProps> = () => {
  const classes = useStyles();
  const slideTransitionTimeout = 500;

  const [currentScreen, setCurrentScreen] = useState(SCREENS.WelcomeScreen);
  const [onboardingFormState, setOnboardingFormState] = useState<IFormState>(
    initialOnboardingForm
  );
  const [pricingFormState, setPricingFormState] = useState<IFormState>(
    initialPriceTestForm
  );

  const moveToScreen = (screen: string) => () => {
    setCurrentScreen(screen);
  };

  const handleOnboardingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnboardingFormState({
      ...onboardingFormState,
      data: {
        ...onboardingFormState.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleOnboardingFormSubmit = (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) event.preventDefault();
    var lastDisplayed = "";
    var firstHidden = "";
    for (const [key, value] of Object.entries(onboardingFormState.display)) {
      if (value) {
        lastDisplayed = key;
      } else {
        firstHidden = key;
        break;
      }
    }
    if (!firstHidden && onboardingFormState.data[lastDisplayed]) {
      moveToScreen(SCREENS.SummaryScreen)();
    }
    if (onboardingFormState.data[lastDisplayed] && firstHidden) {
      setOnboardingFormState({
        ...onboardingFormState,
        display: {
          ...onboardingFormState.display,
          [firstHidden]: true,
        },
        focus: firstHidden,
      });
    }
  };

  const handlePricingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricingFormState({
      ...pricingFormState,
      data: {
        ...pricingFormState.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handlePricingFormSubmit = (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) event.preventDefault();
    var lastDisplayed = "";
    var firstHidden = "";
    for (const [key, value] of Object.entries(pricingFormState.display)) {
      if (value) {
        lastDisplayed = key;
      } else {
        firstHidden = key;
        break;
      }
    }
    if (!firstHidden && pricingFormState.data[lastDisplayed]) {
      moveToScreen(SCREENS.WelcomeScreen)();
    }
    if (pricingFormState.data[lastDisplayed] && firstHidden) {
      setPricingFormState({
        ...pricingFormState,
        display: {
          ...pricingFormState.display,
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
            formState={onboardingFormState}
            handleChange={handleOnboardingChange}
            handleFormSubmit={handleOnboardingFormSubmit}
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
            handleNextScreen={moveToScreen(SCREENS.PriceTestScreen)}
            handlePreviousScreen={moveToScreen(SCREENS.OnboardingScreen)}
            formState={onboardingFormState}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      />
      <CarouselItem
        display={currentScreen === SCREENS.PriceTestScreen}
        active={currentScreen === SCREENS.PriceTestScreen}
        child={
          <PriceTestScreen
            handleNextScreen={moveToScreen(SCREENS.WelcomeScreen)}
            handlePreviousScreen={moveToScreen(SCREENS.SummaryScreen)}
            formState={pricingFormState}
            handleChange={handlePricingChange}
            handleFormSubmit={handlePricingFormSubmit}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      />
    </Paper>
  );
};

export default Quizlet;
