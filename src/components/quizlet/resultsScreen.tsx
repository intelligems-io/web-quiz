import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { FC } from "react";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { IFormState } from "./quizlet";
import { BarGraph } from "./BarGraph";
import { GraphConfig } from "../../utils/types";
import { calculateSummaryMetrics, generateData } from "./helpers/graphHelpers";

export interface ResultsScreenProps {
  onboardingFormState: IFormState;
  handleNextScreen: Function;
  handlePreviousScreen: Function;
  customerName: string;
}

const useStyles = makeStyles((theme) => ({
  summaryTable: {
    width: "75%",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "5px",
  },
  summaryRow: { verticalAlign: "top" },
  summaryField: { paddingTop: "25px" },
  kpiLabel: {
    fontWeight: 700,
  },
  bottomContainer: {
    marginTop: "20px",
  },
  bottomButton: {
    margin: "5px",
  },
}));

const resultsGraphConfigs: GraphConfig[] = [
  {
    title: "Conversion Rate",
    metrics: ["CVR"],
    dataType: "percent",
    datasetId: "revenue",
  },
  {
    title: "Revenue per Site Visitor",
    metrics: ["REV_PER_VISITOR"],
    dataType: "currency",
    datasetId: "revenue",
  },
  {
    title: "Profit per Site Visitor",
    metrics: ["PROFIT_PER_VISITOR"],
    dataType: "currency",
    datasetId: "profit",
  },
];

const ResultsScreen: FC<ResultsScreenProps> = ({
  handleNextScreen,
  handlePreviousScreen,
  onboardingFormState,
  customerName,
}) => {
  const classes = useStyles();
  const metrics = calculateSummaryMetrics(onboardingFormState.data);
  // const results = calculateResultsMetrics(
  //   onboardingFormState.data,
  //   pricingFormState.data
  // );

  useEnterKeyPress(() => handleNextScreen());

  return (
    <div>
      {customerName.valueOf() !== "" && <h1>Thank you {customerName}!</h1>}
      <Typography variant="h5" style={{ fontWeight: 600 }}>
        Effect of a price test
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {resultsGraphConfigs.map((config: GraphConfig) => (
          <div style={{ width: "300px" }} key={config.title}>
            <Typography style={{ marginBottom: "5px" }}>
              {config.title}
            </Typography>
            <BarGraph
              key={config.title}
              groupMetricData={generateData(config, metrics)}
              config={config}
            />
          </div>
        ))}
      </div>

      {/*<table className={classes.summaryTable}>*/}
      {/*  <tbody>*/}
      {/*    <tr className={classes.summaryRow}>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          Revenue*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.revenue}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          {metrics.orders}*/}
      {/*          {" orders * "}*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.aov}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" AOV"}*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.revenue}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          {results.orders}*/}
      {/*          {" orders * "}*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.aov}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" AOV"}*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*    <tr className={classes.summaryRow}>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          Costs*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.totalCost}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.totalCogs}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" Gross + Shipping"}*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.totalAcq}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" Acquistion"}*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.totalCost}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.totalCogs}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" Gross + Shipping"}*/}
      {/*        </Typography>*/}
      {/*        <Typography variant="body1">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.totalAcq}*/}
      {/*            displayType={"text"}*/}
      {/*          />*/}
      {/*          {" Acquistion"}*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*    <tr className={classes.summaryRow}>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          Profit*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={metrics.totalProfit}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*      <td className={classes.summaryField}>*/}
      {/*        <Typography className={classes.kpiLabel} variant="h5">*/}
      {/*          <NumberFormat*/}
      {/*            prefix="$"*/}
      {/*            thousandSeparator*/}
      {/*            value={results.totalProfit}*/}
      {/*            displayType={"text"}*/}
      {/*            decimalScale={2}*/}
      {/*            fixedDecimalScale={true}*/}
      {/*          />*/}
      {/*        </Typography>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*  </tbody>*/}
      {/*</table>*/}
      <div className={classes.bottomContainer}>
        <Typography variant="h6" style={{ marginBottom: "5px" }}>
          Looking good?
        </Typography>
        {customerName.valueOf() !== "" ? (
          <Button
            disableElevation={true}
            className={classes.bottomButton}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => handleNextScreen()}
          >
            Back to Home
          </Button>
        ) : (
          <Button
            disableElevation={true}
            className={classes.bottomButton}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => handleNextScreen()}
          >
            I want to learn more
          </Button>
        )}
        or press <strong>ENTER</strong>
      </div>
      <div className={classes.bottomContainer}>
        <Typography style={{ marginBottom: "5px" }} variant="h6">
          Need to make a change?
        </Typography>
        <Button
          disableElevation={true}
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
  );
};

export default ResultsScreen;
