import theme from "../../../utils/theme";
import { Text } from "recharts";
import { GraphConfig } from "../../../utils/types";

export const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props.props;

  return (
    <Text
      fill={"#666666"}
      maxLines={2}
      fontSize={12}
      fontFamily={theme.typography.fontFamily}
      x={x}
      angle={0}
      y={y}
      width={75}
      textAnchor="middle"
      verticalAnchor={"start"}
    >
      {payload.value}
    </Text>
  );
};

// Label on bar
export const CustomLabel = (
  props: any,
  graphValueFormatter: (
    isAxisTick: boolean,
    value: number,
    config: GraphConfig
  ) => string | undefined,
  config: GraphConfig
) => {
  const { x, y, width, value } = props.props;

  return (
    <text
      x={x + width / 2}
      y={y}
      dy={value > -1 ? 30 : -30}
      style={{
        fill: "white",
        fontFamily: theme.typography.fontFamily,
        fontSize: 16,
      }}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {props.graphValueFormatter(false, value, props.config)}
    </text>
  );
};
