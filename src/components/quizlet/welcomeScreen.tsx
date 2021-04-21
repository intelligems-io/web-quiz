import { Typography, Button, makeStyles } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import PressEnterText from "./helpers/PressEnterText";

export interface WelcomeScreenProps {
  handleNextScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  subHeader: {
    marginTop: "20px",
  },
  bottomContainer: {
    margin: "60px 0px 40px",
  },
  bottomButton: {
    margin: "5px",
  },
}));

const WelcomeScreen: React.FC<WelcomeScreenProps> = (props) => {
  const classes = useStyles();
  useEnterKeyPress(() => props.handleNextScreen());

  return (
    <form
      onSubmit={() => {
        props.handleNextScreen();
      }}
    >
      <Typography variant="h3">Welcome!</Typography>
      <Typography className={classes.subHeader} variant="h5">
        In 5 minutes, we’ll see if we can improve your store’s margins.
      </Typography>
      <div className={classes.bottomContainer}>
        <Button
          className={classes.bottomButton}
          variant="contained"
          size="large"
          color="secondary"
          type="submit"
          endIcon={<ArrowForward />}
        >
          Let's get started
        </Button>
        <PressEnterText />
      </div>
    </form>
  );
};

export default WelcomeScreen;
