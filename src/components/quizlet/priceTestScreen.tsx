import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";

import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "./helpers/inputRow";
import { IFormState } from "./quizlet";

export interface PriceTestScreenProps {
  handleNextScreen: Function;
  handlePreviousScreen: Function;
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
  },
}));

const PriceTestScreen: React.FC<PriceTestScreenProps> = (props) => {
  const classes = useStyles();

  const { handlePreviousScreen, handleFormSubmit, handleChange } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;
  useEnterKeyPress(() => handleFormSubmit());

  return (
    <div>
      <Typography variant="h4">Test a Pricing Change</Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. How much do you want to increase pricing by (in %)?"
          label="% Change"
          name="priceChange"
          percentage
          value={formData}
          onChange={handleChange}
          show={formDisplay.priceChange}
          focus={focus}
        />
        <InputRow
          question="2. How much do you think it will affect conversion (in %)?"
          label="% Change"
          name="cvrChange"
          percentage
          value={formData}
          onChange={handleChange}
          show={formDisplay.cvrChange}
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

        <div className={classes.bottomContainer}>
          <Typography variant="h6">Need to make a change?</Typography>
          <Button
            className={classes.bottomButton}
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() => handlePreviousScreen()}
          >
            Go back
          </Button>{" "}
        </div>
      </form>
    </div>
  );
};

export default PriceTestScreen;
