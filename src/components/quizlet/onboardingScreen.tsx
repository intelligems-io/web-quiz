import {
  Typography,
  Button,
  makeStyles,
  TextField,
  Fade,
} from "@material-ui/core";

import React, { useState } from "react";
import NumberFormat from "react-number-format";
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
  inputRow: {
    height: "40px",
    margin: "6px",
    width: "100%",
    position: "relative",
    display: "inline-flex",
  },
  inputLabel: {
    lineHeight: "40px",
    textAlign: "left",
    width: "60%",
    position: "relative",
    left: "80px",
  },
  inputField: {
    width: "100px",
    position: "absolute",
    right: "80px",
  },
  bottomContainer: {
    margin: "40px 0px 20px",
  },
  bottomButton: {
    margin: "5px",
  },
}));

interface CustomFormatProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function CurrencyFormat(props: CustomFormatProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

function PercentageFormat(props: CustomFormatProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" %"
    />
  );
}

const InputRow = function (props: any) {
  const classes = useStyles();
  var inputProps = {};
  if (props.currency) {
    inputProps = { ...inputProps, inputComponent: CurrencyFormat };
  }
  if (props.percentage) {
    inputProps = { ...inputProps, inputComponent: PercentageFormat };
  }
  const shouldFocus = props.focus === props.name;
  return (
    <Fade in={props.show} timeout={250}>
      <div
        className={classes.inputRow}
        style={props.show ? {} : { display: "none" }}
      >
        <Typography variant="body1" className={classes.inputLabel}>
          {props.question}
        </Typography>
        <TextField
          className={classes.inputField}
          size="small"
          value={props.value[props.name]}
          name={props.name}
          onChange={props.onChange}
          variant="outlined"
          label={props.label}
          InputProps={inputProps}
          inputRef={(input) => input && shouldFocus && input.focus()}
        ></TextField>
      </div>
    </Fade>
  );
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
  const classes = useStyles();

  const { handleFormSubmit, handleChange } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;

  return (
    <div>
      <Typography variant="h5">Onboarding Questions</Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. How many orders in Shopify per month?"
          label="# Orders"
          name="orders"
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

export default OnboardingScreen;
