import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import PressEnterText from "./helpers/PressEnterText";
import { IFormState } from "./quizlet";

export interface SummaryScreenProps {
  formState: IFormState;
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

const SummaryScreen: React.FC<SummaryScreenProps> = (props) => {
  const classes = useStyles();
  const { handlePreviousScreen, handleNextScreen, formState } = props;
  const metrics = calculateSummaryMetrics(formState.data);
  useEnterKeyPress(() => handleNextScreen());
  return (
    <div>
      <Typography variant="h5">Store Monthly Summary</Typography>
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
          </tr>
        </tbody>
      </table>
      <div className={classes.bottomContainer}>
        <Typography variant="h6">Looking good?</Typography>
        <Button
          className={classes.bottomButton}
          variant="contained"
          size="large"
          color="primary"
          onClick={() => handleNextScreen()}
        >
          Simulate a price test
        </Button>
        <PressEnterText />
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

export default SummaryScreen;
