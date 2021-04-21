import { Fade, makeStyles, TextField, Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { CurrencyFormat, PercentageFormat } from "../../../utils/numberFormats";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    height: "40px",
    margin: "6px",
    width: "100%",
    position: "relative",
    display: "inline-flex",
    ['@media (max-width:780px)']: {
      height: '150px'
    }
  },
  inputLabel: {
    lineHeight: "40px",
    textAlign: "left",
    width: "60%",
    position: "relative",
    left: "80px",
    ['@media (max-width:780px)']: {
      left: '-13vw',
      width: '80%'
    }
  },
  inputField: {
    width: "100px",
    position: "absolute",
    right: "80px",
    ['@media (max-width:780px)']: {
      left: '150px',
      top: '25px'
    }
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
