import { makeStyles, Paper, Slide } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import OnboardingScreen from "./onboardingScreen";
import PriceTestScreen from "./priceTestScreen";
import ResultsScreen from "./resultsScreen";
import SummaryScreen from "./summaryScreen";
import WelcomeScreen from "./welcomeScreen";
import InfoScreen from "./infoScreen";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { isNamespaceImport } from "typescript";

export interface QuizletProps {}

const SCREENS = {
  WelcomeScreen: "WelcomeScreen",
  OnboardingScreen: "OnboardingScreen",
  SummaryScreen: "SummaryScreen",
  PriceTestScreen: "PriceTestScreen",
  ResultsScreen: "ResultsScreen",
  InfoScreen: "InfoScreen"
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
    orders: "",
    aov: "",
    cvr: "",
    cogs: "",
    cac: "",
  },
  display: {
    orders: true,
    aov: false,
    cvr: false,
    cogs: false,
    cac: false,
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

const initialInfoForm = {
  data: {
    name: "",
    email: "",
    company: "",
  },
  display: {
    name: true,
    email: false,
    company: false,
  },
  focus: "name",
};

// snackbar alert
function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  const [infoFormState, setInfoFormState] = useState<IFormState>(
    initialInfoForm       
  );

  const formInfo = {
    "name": infoFormState.data.name,
    "email": infoFormState.data.email,
    "company": infoFormState.data.company,
  };

  // set state for name data 
  const [customerName , setCustomerName] = React.useState(formInfo.name);

  // initial state for snackbar
  const [open, setOpen] = React.useState(false);

  const moveToScreen = (screen: string) => () => {
    console.log("moving to ", screen);
    setCurrentScreen(screen);
  };

  const handleOnboardingChange = (
    event:  React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnboardingFormState({
      ...onboardingFormState,
      data: {
        ...onboardingFormState.data,
        [event.target.name]: event.target.value,
      }
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
      }
    });
  };

  const handlePricingFormSubmit = (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) event.preventDefault();
    var lastDisplayed = "";
    var firstHidden = "";
    for (const [label, isDisplayed] of Object.entries(pricingFormState.display)) {
      if (isDisplayed) {
        lastDisplayed = label;
      } else {
        firstHidden = label;
        break;
      }
    }
    if (!firstHidden && pricingFormState.data[lastDisplayed]) {
      moveToScreen(SCREENS.ResultsScreen)();
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

  const handleInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoFormState({
      ...infoFormState,
      data: {
        ...infoFormState.data,
        [event.target.name]: event.target.value,
      },
      focus: event.target.name,
    });
  };

  const handleInfoFormSubmit = (
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) event.preventDefault();
    var lastDisplayed = "";
    var firstHidden = "";
    for (const [key, value] of Object.entries(infoFormState.display)) {
      if (value) {
        lastDisplayed = key;
      } else {
        firstHidden = key;
        break;
      }
    }
    if (!firstHidden && infoFormState.data[lastDisplayed]) {
        fetch('https://api.intelligems.io/rfi', {
          method: 'POST',
          body: JSON.stringify(formInfo),
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(response => {
          if (response.status !== 200) {
            console.log('Somthing happened wrong');
          } else {
              console.log({...infoFormState});
              setOpen(true);
              return response;
          }
        }).catch(err => err);
        const name = formInfo.name.split(" ")[0];
      setCustomerName(name);
      moveToScreen(SCREENS.ResultsScreen)();
    }
    // set the info, move on to next input box in the form
    if (infoFormState.data[lastDisplayed] && firstHidden) {
      setInfoFormState({
        ...infoFormState,
        display: {
          ...infoFormState.display,
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
            handleNextScreen={moveToScreen(SCREENS.ResultsScreen)}
            handlePreviousScreen={moveToScreen(SCREENS.SummaryScreen)}
            formState={pricingFormState}
            handleChange={handlePricingChange}
            handleFormSubmit={handlePricingFormSubmit}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      />
      <CarouselItem
        display={currentScreen === SCREENS.ResultsScreen}
        active={currentScreen === SCREENS.ResultsScreen}
        child={
          <ResultsScreen
            handleNextScreen={(infoFormState.data.name === "" ? moveToScreen(SCREENS.InfoScreen) : moveToScreen(SCREENS.WelcomeScreen))}
            handlePreviousScreen={moveToScreen(SCREENS.PriceTestScreen)}
            onboardingFormState={onboardingFormState}
            pricingFormState={pricingFormState}
            customerName={customerName}
          />
        }
        timeout={slideTransitionTimeout}
        isNext
      /> 
      <CarouselItem
        display={currentScreen === SCREENS.InfoScreen}
        active={currentScreen === SCREENS.InfoScreen}
        child={
          <InfoScreen
            handleNextScreen={moveToScreen(SCREENS.WelcomeScreen)}
            formState={infoFormState}
            handleChange={handleInfoChange}
            handleFormSubmit={handleInfoFormSubmit}
          />
        }
        timeout={{ enter: 0, exit: slideTransitionTimeout }}
        isNext
      />
        <Snackbar  
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          open={open} 
          autoHideDuration={4000} 
          onClose={() => setOpen(false)}>
           <Alert onClose={() => setOpen(false)} severity="success">
                 Thanks! Your information has been saved!
           </Alert>
         </Snackbar>
    </Paper>
  );
};

export default Quizlet;
