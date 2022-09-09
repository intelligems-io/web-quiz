import theme, { ExtendedPrimary } from "../../../utils/theme";
import { GraphConfig } from "../../../utils/types";

export const currencyFormatter = (value: number, tick: boolean) => {
  return new Intl.NumberFormat(`en-US`, {
    style: "currency",
    currency: `USD`,
    notation: tick ? "compact" : undefined,
    compactDisplay: tick ? "short" : undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\D00(?=\D*$)/, "");
};

export const percentFormatter = (value: number, tick: boolean) => {
  return `${new Intl.NumberFormat(`en-US`, {
    style: "decimal",
    notation: tick ? "compact" : undefined,
    maximumSignificantDigits: tick ? 2 : undefined,
    minimumSignificantDigits: tick ? 1 : undefined,
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value * 100)}%`;
};

export const numberFormatters = (value: number, tick: boolean) => {
  return new Intl.NumberFormat(`en-US`, {
    style: "decimal",
    notation: tick ? "compact" : undefined,
    compactDisplay: tick ? "short" : undefined,
    maximumSignificantDigits: tick ? 2 : 3,
    minimumSignificantDigits: tick ? 1 : 3,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const graphValueFormatter = (
  isAxisTick: boolean,
  value: number,
  config: GraphConfig
) => {
  if (config.dataType === "currency") {
    return currencyFormatter(value, isAxisTick);
  } else if (config.dataType === "percent") {
    return percentFormatter(value, isAxisTick);
  } else {
    return numberFormatters(value, isAxisTick);
  }
};

export const graphLabelFormatter = (isCurrency: boolean, value: number) => {
  if (isCurrency) {
    return currencyFormatter(value, false);
  } else {
    return numberFormatters(value, false);
  }
};

export const groupColors = [
  "#B8D3FF",
  ExtendedPrimary.light3,
  ExtendedPrimary.light2,
  theme.palette.primary.light,
  theme.palette.primary.main,
  "#0d47a1",
];

// AOV, CVR, COGS

// PPV -> PPO -> AOV * COGS
// RPV -> AOV * CVR
// CVR

export const generateData = (config: GraphConfig, data: any) => {
  console.log(data);
  const cvr = data.cvr / 100;
  const aovChange = data.aov * 0.1;
  const cvrChange = cvr * 0.1;
  if (config.metrics[0] === "CVR") {
    console.log("cvr", [
      {
        name: "10% Decrease",
        value: cvr + cvrChange,
      },
      { name: "Control Group", value: cvr },
      {
        name: "10% Increase",
        value: cvr - cvrChange,
      },
    ]);
    return [
      {
        name: "10% Decrease",
        value: cvr + cvrChange,
      },
      { name: "Control Group", value: cvr },
      {
        name: "10% Increase",
        value: cvr - cvrChange,
      },
    ];
  } else if (config.metrics[0] === "REV_PER_VISITOR") {
    console.log("rev", [
      {
        name: "10% Decrease",
        value: (data.aov - aovChange) * (cvr + cvrChange),
      },
      {
        name: "Control Group",
        value: data.aov * cvr,
      },
      {
        name: "10% Increase",
        value: (data.aov + aovChange) * (cvr - cvrChange),
      },
    ]);
    return [
      {
        name: "10% Decrease",
        value: (data.aov - aovChange) * (cvr + cvrChange),
      },
      {
        name: "Control Group",
        value: data.aov * cvr,
      },
      {
        name: "10% Increase",
        value: (data.aov + aovChange) * (cvr - cvrChange),
      },
    ];
  } else {
    console.log("prof", [
      {
        name: "10% Decrease",
        value: (data.aov - aovChange) * data.cogs * (cvr + cvrChange),
      },
      {
        name: "Control Group",
        value: data.aov * data.cogs * cvr,
      },
      {
        name: "10% Increase",
        value: (data.aov + aovChange) * data.cogs * (cvr - cvrChange),
      },
    ]);
    return [
      {
        name: "10% Decrease",
        value: (data.aov - aovChange) * data.cogs * (cvr + cvrChange),
      },
      {
        name: "Control Group",
        value: data.aov * data.cogs * cvr,
      },
      {
        name: "10% Increase",
        value: (data.aov + aovChange) * data.cogs * (cvr - cvrChange),
      },
    ];
  }
};

export const calculateSummaryMetrics = (data: any) => ({
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

export const calculateResultsMetrics = (data: any, pricing: any) => {
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
