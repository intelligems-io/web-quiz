import React, { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import theme from "../../utils/theme";
import { graphValueFormatter, groupColors } from "./helpers/graphHelpers";
import { CustomizedAxisTick, CustomLabel } from "./helpers/graphStyleCustoms";
import { BarMetricData, GraphConfig } from "../../utils/types";

interface BarGraphProps {
  groupMetricData: BarMetricData[];
  config: GraphConfig;
}

export const BarGraph: FC<BarGraphProps> = ({ groupMetricData, config }) => {
  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart
        style={{ marginLeft: -14 }}
        margin={{
          top: 5,
          bottom: 5,
        }}
        data={groupMetricData}
      >
        <CartesianGrid style={{ stroke: "#E1E1E1" }} vertical={false} />
        <XAxis
          interval={0}
          tick={(props: any) => {
            return <CustomizedAxisTick props={props} />;
          }}
          axisLine={{ stroke: "#E1E1E1" }}
          tickLine={false}
          dataKey="name"
        />
        <YAxis
          style={{ fontFamily: theme.typography.fontFamily, fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: any) =>
            graphValueFormatter(true, value, config)!
          }
        />
        <Tooltip
          contentStyle={{
            fontFamily: theme.typography.fontFamily,
            borderRadius: 15,
            fontSize: 14,
          }}
          cursor={{ fill: "transparent" }}
          formatter={(value: any) => graphValueFormatter(false, value, config)!}
        />
        <Bar
          isAnimationActive={false}
          dataKey="value"
          name={config.title}
          radius={[10, 10, 0, 0]}
          barSize={72}
        >
          <LabelList
            content={(props: any) => {
              return (
                <CustomLabel
                  props={props}
                  graphValueFormatter={graphValueFormatter}
                  config={config}
                />
              );
            }}
          />
          {groupMetricData?.map((group: any, index: number) => (
            <Cell key={`cell-${index}`} fill={groupColors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
