import { Fade, makeStyles, TextField, Typography } from "@material-ui/core";
import {
  CurrencyFormat,
  PercentageFormat,
  RegularFormat,
} from "../../../utils/numberFormats";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    height: "40px",
    margin: "20px",
    width: "100%",
    //position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  inputLabel: {
    lineHeight: "40px",
    textAlign: "left",
    width: "60%",
    //position: "relative",
    left: "80px",
  },
  inputField: {
    width: "100",
    position: "absolute",
    right: "80px",
  },
}));

export const InputRow = function (props: any) {
  const classes = useStyles();
  var inputProps = {};

  if (props.currency) {
    inputProps = { ...inputProps, inputComponent: CurrencyFormat };
  }
  if (props.percentage) {
    inputProps = { ...inputProps, inputComponent: PercentageFormat };
  }
  if (props.noSymbol) {
    inputProps = { ...inputProps, inputComponent: RegularFormat };
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
          value={props.value[props.name]}
          name={props.name}
          onChange={props.onChange}
          variant="outlined"
          label={props.label}
          InputProps={inputProps}
          inputRef={(input) => input && shouldFocus && input.focus()}
        />
      </div>
    </Fade>
  );
};
