import { makeStyles } from "@material-ui/core";
import React from "react";

export interface BackgroundProps {}

const useStyles = makeStyles((theme) => ({
  background: {
    //background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, #8CA0F0 100%);`,

    // color picked your website to get gradient values
    background: 'linear-gradient(#0500b0, #2f88c9)',
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: -1,
  },
  logo: {
    position: "absolute",
    left: 20,
    top: 20,
    width: "160px",
  },
}));

const Background: React.FC<BackgroundProps> = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.background}></div>
      
      <img
        alt="intelligems-logo"
        className={classes.logo}
        src="/full_logo_mono_white.png"
      />
    </React.Fragment>
  );
};

export default Background;
