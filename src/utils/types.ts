export type GraphConfig = {
  title: string;
  metrics: string[];
  dataType: string;
  datasetId: string | string[];
};

export type BarMetricData = {
  name: string;
  value: any;
};
