import React, { FC } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

export const PriceLoading: FC = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Typography
        variant={"h6"}
        style={{ marginBottom: "20px", fontWeight: 600 }}
      >
        Calculating Prices ...
      </Typography>
      <CircularProgress />
    </div>
  );
};
