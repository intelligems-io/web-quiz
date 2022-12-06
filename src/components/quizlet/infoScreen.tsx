import React from "react";
import { Typography } from "@material-ui/core";
import { Widget } from "@typeform/embed-react";

export interface InfoScreenProps {}

const InfoScreen: React.FC<InfoScreenProps> = () => {
  return (
    <div>
      <Typography style={{ marginBottom: "20px" }} variant={"h4"}>
        Let Us Get to Know You!
      </Typography>
      <div
        style={{
          marginLeft: "250px",
          zIndex: 2,
          position: "relative",
          overflowY: "hidden",
          height: 400,
        }}
      >
        <Widget
          hideHeaders
          hideFooter
          height={500}
          width={400}
          id={"PyID97FM"}
          className="my-form"
        />
      </div>
    </div>
  );
};

export default InfoScreen;
