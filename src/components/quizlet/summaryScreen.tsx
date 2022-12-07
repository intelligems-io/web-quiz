import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { IFormState } from "./quizlet";
import { calculateSummaryMetrics } from "./helpers/graphHelpers";
import { PriceLoading } from "./helpers/PriceLoading";

export interface SummaryScreenProps {
  formState: IFormState;
  handleNextScreen: Function;
  handlePreviousScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  summaryTable: {
    width: "80%",
    textAlign: "center",
    margin: "auto",
    marginTop: "5px",
  },
  summaryRow: { verticalAlign: "top" },
  summaryField: { paddingTop: "25px" },
  kpiLabel: {
    fontWeight: 700,
  },
  bottomContainer1: {
    marginTop: "30px",
  },
  bottomContainer2: {
    marginTop: "20px",
  },
  bottomButton: {
    margin: "5px 10px 5px 5px",
  },
  spacing: {
    marginTop: "10px",
  },
}));

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const SummaryScreen: FC<SummaryScreenProps> = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const { handlePreviousScreen, handleNextScreen, formState } = props;
  const metrics = calculateSummaryMetrics(formState.data);
  useEnterKeyPress(() => handleNextScreen());

  const onSubmit = async () => {
    setIsLoading(true);
    await sleep(5000);
    setIsLoading(false);
    handleNextScreen();
  };

  return (
    <div>
      <Typography variant="h5" style={{ fontWeight: 600 }}>
        Store Monthly Summary
      </Typography>
      <table className={classes.summaryTable}>
        <tbody>
          <tr className={classes.summaryRow}>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                Revenue
              </Typography>
            </td>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.revenue}
                  displayType={"text"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
              <Typography variant="body1">
                {metrics.orders}
                {" orders * "}
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.aov}
                  displayType={"text"}
                />
                {" AOV"}
              </Typography>
            </td>
          </tr>
          <tr className={classes.summaryRow}>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                Costs
              </Typography>
            </td>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.totalCost}
                  displayType={"text"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
              <Typography variant="body1">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.totalCogs}
                  displayType={"text"}
                />
                {" Gross + Shipping"}
              </Typography>
              <Typography variant="body1">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.totalAcq}
                  displayType={"text"}
                />
                {" Acquisition"}
              </Typography>
            </td>
          </tr>
          <tr className={classes.summaryRow}>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                Profit
              </Typography>
            </td>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={metrics.totalProfit}
                  displayType={"text"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
      {isLoading ? (
        <PriceLoading />
      ) : (
        <div>
          <div className={classes.bottomContainer1}>
            <Typography variant="h6">Looking good?</Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <div className={classes.spacing}>
                <Button
                  disableElevation
                  className={classes.bottomButton}
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => onSubmit()}
                >
                  Simulate a price test
                </Button>
                or press <strong>ENTER</strong>
              </div>
            )}
          </div>
          <div className={classes.bottomContainer2}>
            <Typography variant="h6">Need to make a change?</Typography>
            <Button
              disableElevation
              className={classes.bottomButton}
              variant="outlined"
              size="large"
              color="primary"
              onClick={() => handlePreviousScreen()}
            >
              Go back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryScreen;
