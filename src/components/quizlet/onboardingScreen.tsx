import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "./helpers/inputRow";
import { IFormState } from "./quizlet";

export interface OnboardingScreenProps {
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
  },
  flexSpace: {
    justifyContent: "space-between"
  }
}));

const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
  const classes = useStyles();

  const { handleFormSubmit, handleChange } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;
  useEnterKeyPress(() => handleFormSubmit());

  return (
    <div>
      <Typography variant="h4">Onboarding Questions</Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. How many orders in Shopify per month?"
          label="# Orders"
          name="orders"
          noSymbol
          value={formData}
          onChange={handleChange}
          show={formDisplay.orders}
          focus={focus}
        />
        <InputRow
          question="2. What's your Average Order Value?"
          label="AOV"
          name="aov"
          currency
          value={formData}
          onChange={handleChange}
          show={formDisplay.aov}
          focus={focus}
        />   
        <InputRow
          question="3. What's your Conversion Rate?"
          label="CVR"
          name="cvr"
          percentage
          value={formData}
          onChange={handleChange}
          show={formDisplay.cvr}
          focus={focus}
        />
        <InputRow
          question="4. What are your Gross Costs, including Shipping?"
          label="COGS"
          name="cogs"
          currency
          value={formData}
          onChange={handleChange}
          show={formDisplay.cogs}
          focus={focus}
        />
        <InputRow
          question="5. What's your blended average Cost of Acquisition?"
          label="CAC"
          name="cac"
          currency
          value={formData}
          onChange={handleChange}
          show={formDisplay.cac}
          focus={focus}
        />
        <div className={classes.bottomContainer}>
          <Button
            className={classes.bottomButton}
            variant="contained"
            size="large"
            color="primary"
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

export default OnboardingScreen;
