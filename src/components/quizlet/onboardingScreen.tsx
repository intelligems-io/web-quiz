import { Typography, Button, makeStyles } from "@material-ui/core";
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
    <div>
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
    </div>
  );
};

export default OnboardingScreen;
