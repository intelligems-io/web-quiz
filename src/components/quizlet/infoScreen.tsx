import React, { useEffect, useState} from "react";
import { Typography, Button, makeStyles} from "@material-ui/core";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "./helpers/inputRow";
import { IFormState } from "./quizlet";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import "../form/style.css";

export interface InfoScreenProps {
  handleNextScreen: Function;
  formState: IFormState;
  handleChange: Function;
  handleFormSubmit: Function;
}

// alert for snackbar
function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    transition: '0.3s all',
  },
}));

const InfoScreen: React.FC<InfoScreenProps> = (props) => {
  const classes = useStyles();
  
  // initial state for snackbar
  const [open, setOpen] = React.useState(false);

  // initial form values => NOT USED ANYMORE
  // const [values, setValues] = useState({ 
  //   name1: '', 
  //   name2: '', 
  //   email: '', 
  //   cname: ''
  // });

  const { handleFormSubmit, handleChange, handleNextScreen } = props;
  const { data: formData, display: formDisplay, focus } = props.formState;
  useEnterKeyPress(() => handleFormSubmit());

  // snackbar link 
  // https://material-ui.com/components/snackbars/
   // snackbar onClick
  const handleClick = () => {
    setOpen(true);
  };

  // snackbar close
  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // API connection
  // const saveFormData = async () => {
  //   const response = await fetch('https://dev.intelligems.io/track', {
  //     method: 'POST',
  //     body: JSON.stringify(formData)
  //   });
  //   if (response.status !== 200) {
  //     throw new Error(`Request failed: ${response.status}`); 
  //   } else{
  //     console.log(response.status);
  //   }
  // }
  // // data save
  // const onSubmit = async (event:any) => {
  //   event.preventDefault(); // Prevent default submission
  //   try {
  //     await saveFormData();
  //     console.log('Your registration was successfully submitted!');
  //     console.log(formData)
  //     setValues(formData);
  //   } catch (e) {
  //     alert(`Registration failed! ${e.message}`);
  //   }
  // }

// one of my previous fetch versions, unsure how efficient this is since it is not in an await or using async
  // fetch('https://dev.intelligems.io/track', {
  //   method: 'POST',
  //   body: JSON.stringify(formData),
  //   headers: {
  //       'Content-Type': 'application/json'
  //   }
  // }).then(response => {
  //   if (response.status !== 200) {
  //     console.log('Somthing happened wrong');
  //     } else {
  //       // console.log(response);
  //       // console.log(response.status);
  //       // console.log(formData)
  //      return response;
  //     }
  // }).catch(err => err);


  return (
    <div>
      <Typography variant="h4">Let Us Get to Know You!</Typography>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. What is your first name?"
          label="First Name"
          name="name1"
          value={formData}
          onChange={handleChange}
          show={formDisplay.name1}
          focus={focus}
          
        />
        <InputRow
          question="2. What is your last name?"
          label="Last Name"
          name="name2"
          value={formData}
          onChange={handleChange}
          show={formDisplay.name2}
          focus={focus}
        />
        <InputRow
          question="3. What is your email address?"
          label="Email"
          name="email"
          value={formData}
          onChange={handleChange}
          show={formDisplay.email}
          focus={focus}
        />
        <InputRow
          question="4. What is your company name?"
          label="Company Name"
          name="cname"
          value={formData}
          onChange={handleChange}
          show={formDisplay.cname}
          focus={focus}
        />
        <div className={classes.bottomContainer}>
          <Button
            className={classes.bottomButton}
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
            onClick = {()=>{ handleClick()}}
            // add inside onclick to loop back around to welcome screen
            // handleNextScreen()
          >
            Continue
          </Button>
          or press <strong>ENTER</strong>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            Thanks! Your information has been saved!
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
      
  );
};

export default InfoScreen;
