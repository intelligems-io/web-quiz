import React, { useEffect, useState} from "react";
import { Typography, Button, makeStyles} from "@material-ui/core";
import useEnterKeyPress from "../../utils/useEnterKeyPress";
import { InputRow } from "../quizlet/helpers/inputRow";
import { IFormState } from "../quizlet/quizlet";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../form/style.css";

export interface HowdyScreenProps {
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

const HowdyScreen: React.FC<HowdyScreenProps> = (props) => {
  const classes = useStyles();
  
  // initial state for snackbar
  const [open, setOpen] = React.useState(false);

  // initial form values
  const [values, setValues] = useState({ 
    name1: '', 
    name2: '', 
    email: '', 
    cname: ''
  });

  const {
    handleNextScreen,
  } = props;

  const { handleFormSubmit, handleChange } = props;
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
  const saveFormData = async () => {
    const response = await fetch('https://dev.intelligems.io/track', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`); 
    } else{
      console.log(response.status);
    }
  }
  // data save
  const onSubmit = async (event:any) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      console.log('Your registration was successfully submitted!');
      console.log(formData)
      setValues({
        name1: '', 
        name2: '', 
        email: '', 
        cname: ''
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  // another attempt at API connection, it might work unsure 
  // fetch('https://dev.intelligems.io/track', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // }).then(r=>r.json().then(res=>{
  //   if(res){
  //     console.log(formData);
  //   }
  // }));

  return (
    <div>
      <Typography variant="h4">Let Us Get to Know You!</Typography>
      <form
        onSubmit={onSubmit}
        className={classes.inputContainer}
      >
        <InputRow
          question="1. What is your first name?"
          label="First Name"
          name="orders"
          value={values.name1}
          onChange={handleChange}
          show={formDisplay.orders}
          focus={focus}
          
        />
        <InputRow
          question="2. What is your last name?"
          label="Last Name"
          name="aov"
          value={values.name2}
          onChange={handleChange}
          show={formDisplay.aov}
          focus={focus}
        />
        <InputRow
          question="3. What is your email address?"
          label="Email"
          name="cvr"
          value={values.email}
          onChange={handleChange}
          show={formDisplay.cvr}
          focus={focus}
        />
        <InputRow
          question="4. What is your company name?"
          label="Company Name"
          name="cogs"
          value={values.cname}
          onChange={handleChange}
          show={formDisplay.cogs}
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

export default HowdyScreen;
