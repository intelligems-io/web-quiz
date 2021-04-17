import classes from "*.module.css";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";

export interface OnboardingScreenProps {
  handleNextScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "60px 0px 40px",
  },
}));

const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h3">Onboarding Questions</Typography>
      <Button
        className={classes.button}
        variant="contained"
        size="large"
        color="secondary"
        type="submit"
        onClick={() => {
          props.handleNextScreen();
        }}
      >
        Continue
      </Button>
    </React.Fragment>
  );
};

export default OnboardingScreen;
