import { Typography, Button, makeStyles } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";

export interface WelcomeScreenProps {
  handleNextScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  subHeader: {
    marginTop: "20px",
  },
  button: {
    margin: "60px 0px 40px",
  },
}));

const WelcomeScreen: React.FC<WelcomeScreenProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3">Welcome!</Typography>
      <Typography className={classes.subHeader} variant="h5">
        In 5 minutes, we’ll see if we can improve your store’s margins.
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        size="large"
        color="secondary"
        type="submit"
        endIcon={<ArrowForward />}
        onClick={() => {
          props.handleNextScreen();
        }}
        onSubmit={() => {
          props.handleNextScreen();
        }}
      >
        Let's get started
      </Button>
    </div>
  );
};

export default WelcomeScreen;
