import { Typography, Button, makeStyles, TextField } from "@material-ui/core";

import React, { useState } from "react";
import NumberFormat from "react-number-format";

export interface OnboardingScreenProps {
  handleNextScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "80%",
    marginTop: "40px",
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
    left: "15%",
  },
  inputField: {
    position: "absolute",
    right: "0",
  },
  bottomContainer: {
    margin: "60px 0px 40px",
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
  console.log(inputProps);
  return (
    <div className={classes.inputRow}>
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
      ></TextField>
    </div>
  );
};

interface IFormData {
  orders?: string;
  aov?: string;
  cvr?: string;
  costs?: string;
  cac?: string;
}

const initialFormData = {
  orders: undefined,
  aov: undefined,
  cvr: undefined,
  costs: undefined,
  cac: undefined,
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Typography variant="h5">Onboarding Questions</Typography>
      <div className={classes.inputContainer}>
        <InputRow
          question="1. How many orders per week?"
          label="# Orders"
          name="orders"
          value={formData}
          onChange={handleChange}
        />
        <InputRow
          question="2. What's your Average Order Value?"
          label="AOV"
          name="aov"
          currency
          value={formData}
          onChange={handleChange}
        />
        <InputRow
          question="3. What's your Conversion Rate?"
          label="CVR"
          name="cvr"
          percentage
          value={formData}
          onChange={handleChange}
        />
        <InputRow
          question="4. What are your Gross Costs, including Shipping?"
          label="COGS"
          name="cogs"
          currency
          value={formData}
          onChange={handleChange}
        />
        <InputRow
          question="5. What's your blended average Cost of Acquisition?"
          label="CAC"
          name="cac"
          currency
          value={formData}
          onChange={handleChange}
        />
      </div>

      <div className={classes.bottomButton}>
        <Button
          className={classes.bottomButton}
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
        or press <strong>ENTER</strong>
      </div>
    </div>
  );
};

export default OnboardingScreen;
