import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { IFormState } from "./quizlet";

export interface ResultsScreenProps {
  onboardingFormState: IFormState;
  pricingFormState: IFormState;
  handleNextScreen: Function;
  handlePreviousScreen: Function;
}

const useStyles = makeStyles((theme) => ({
  summaryTable: {
    width: "60%",
    textAlign: "center",
    margin: "auto",
    marginTop: "5px",
  },
  summaryRow: { verticalAlign: "top" },
  summaryField: { paddingTop: "25px" },
  kpiLabel: {
    fontWeight: 700,
  },
  bottomContainer: {
    marginTop: "40px",
  },
  bottomButton: {
    margin: "5px",
  },
}));

const calculateSummaryMetrics = (data: any) => ({
  orders: Number(data.orders),
  aov: Number(data.aov),
  cvr: Number(data.cvr),
  cogs: Number(data.cogs),
  cac: Number(data.cac),
  revenue: Number(data.aov) * Number(data.orders),
  totalCogs: Number(data.cogs) * Number(data.orders),
  totalAcq: Number(data.cac) * Number(data.orders),
  totalCost: (Number(data.cac) + Number(data.cogs)) * Number(data.orders),
  totalProfit:
    (Number(data.aov) - Number(data.cac) - Number(data.cogs)) *
    Number(data.orders),
});

const calculateResultsMetrics = (data: any, pricing: any) => {
  const cvrChange = Number(pricing.cvrChange) / 100;
  const cvr = Number(data.cvr) * (1 - cvrChange);
  const priceChange = Number(pricing.priceChange) / 100;
  const orders = +(Number(data.orders) * (1 - cvrChange)).toFixed(1);
  const aov = +(Number(data.aov) * (1 + priceChange)).toFixed(2);
  const cac = Number(data.cac) * (Number(data.cvr) / cvr);
  return {
    orders,
    aov,
    cvr,
    cogs: Number(data.cogs),
    cac,
    revenue: +(aov * orders).toFixed(2),
    totalCogs: Number(data.cogs) * orders,
    totalAcq: +(cac * orders).toFixed(2),
    totalCost: (cac + Number(data.cogs)) * orders,
    totalProfit: +((aov - cac - Number(data.cogs)) * orders).toFixed(2),
  };
};

const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  const classes = useStyles();
  const {
    handlePreviousScreen,
    handleNextScreen,
    onboardingFormState,
    pricingFormState,
  } = props;
  const metrics = calculateSummaryMetrics(onboardingFormState.data);
  const results = calculateResultsMetrics(
    onboardingFormState.data,
    pricingFormState.data
  );
  // useEnterKeyPress(() => handleNextScreen());
  return (
    <div>
      <Typography variant="h5">Effect of a price test</Typography>
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
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.revenue}
                  displayType={"text"}
                />
              </Typography>
              <Typography variant="body1">
                {results.orders}
                {" orders * "}
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.aov}
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
                {" Acquistion"}
              </Typography>
            </td>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.totalCost}
                  displayType={"text"}
                />
              </Typography>
              <Typography variant="body1">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.totalCogs}
                  displayType={"text"}
                />
                {" Gross + Shipping"}
              </Typography>
              <Typography variant="body1">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.totalAcq}
                  displayType={"text"}
                />
                {" Acquistion"}
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
                />
              </Typography>
            </td>
            <td className={classes.summaryField}>
              <Typography className={classes.kpiLabel} variant="h5">
                <NumberFormat
                  prefix="$"
                  thousandSeparator
                  value={results.totalProfit}
                  displayType={"text"}
                />
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.bottomContainer}>
        {/* <Typography variant="h6">Looking good?</Typography> */}
        <Button
          className={classes.bottomButton}
          variant="contained"
          size="large"
          color="primary"
          onClick={() => handleNextScreen()}
        >
          I want to learn more
        </Button>
        {/* or press <strong>ENTER</strong> */}
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
    </div>
  );
};

export default ResultsScreen;
