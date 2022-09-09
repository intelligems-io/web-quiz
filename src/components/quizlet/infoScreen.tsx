import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "./helpers/inputRow";
import { IFormState } from "./quizlet";
import { Widget } from "@typeform/embed-react";

export interface InfoScreenProps {
  handleNextScreen: Function;
  formState: IFormState;
  handleChange: Function;
  handleFormSubmit: Function;
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "80%",
    marginTop: "40px",
    margin: "auto",
  },
  bottomContainer: {
    margin: "40px 0px 20px",
  },
  bottomButton: {
    margin: "5px",
    //background: 'rgba(255,255,255,0.3)',
    transition: "0.3s all",
  },
}));

const InfoScreen: React.FC<InfoScreenProps> = (props) => {
  const classes = useStyles();

  const { handleFormSubmit, handleChange, handleNextScreen } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;
  useEnterKeyPress(() => handleFormSubmit());

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
