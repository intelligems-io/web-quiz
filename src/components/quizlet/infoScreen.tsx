import React, { useEffect, useState} from "react";
import { Typography, Button, makeStyles} from "@material-ui/core";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "./helpers/inputRow";
import { IFormState } from "./quizlet";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import "../form/style.css";

export interface InfoScreenProps {
  handleNextScreen: Function;
  formState: IFormState;
  handleChange: Function;
  handleFormSubmit: Function;
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "80%",
    marginTop: "40px",
    margin: "auto",
  },
  bottomContainer: {
    margin: "40px 0px 20px",
  },
  bottomButton: {
    margin: "5px",
    //background: 'rgba(255,255,255,0.3)',
    transition: '0.3s all',
  },
}));

const InfoScreen: React.FC<InfoScreenProps> = (props) => {
  const classes = useStyles();

  const { handleFormSubmit, handleChange, handleNextScreen } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;
  useEnterKeyPress(() => handleFormSubmit());

  return (
    <div>
      <Typography variant="h4">Let Us Get to Know You!</Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. What is your name?"
          label="Full Name"
          name="name"
          value={formData}
          onChange={handleChange}
          show={formDisplay.name}
          focus={focus}
        />
        <InputRow
          question="2. What is your email address?"
          label="Email"
          name="email"
          value={formData}
          onChange={handleChange}
          show={formDisplay.email}
          focus={focus}
        />
        <InputRow
          question="3. What is your company name?"
          label="Company Name"
          name="cname"
          value={formData}
          onChange={handleChange}
          show={formDisplay.cname}
          focus={focus}
        />
        <div className={classes.bottomContainer}>
          <Button
            className={classes.bottomButton}
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
          >
            Continue
          </Button>
          or press <strong>ENTER</strong>
        </div>
      </form>
    </div>
      
  );
};

export default InfoScreen;
