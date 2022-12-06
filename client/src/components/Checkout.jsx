import React, {useState, useEffect, startTransition} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Button}from 'antd';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Review from "./Review";
import AddressForm from "./AddressForm"
import Payment from "./RequestPay";
import axios from "axios";  
import { ServeIP } from "../IP";
import { useParams } from "react-router-dom";




const steps = ['Shipping address', 'Review your order', 'Payment'];
  

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review/>;
        case 2:
            return <Payment style={{marginLeft:100}}/>;
        default:
            throw new Error('Unknown step');
        }
  }
  
  const theme = createTheme();
  
  export default function Checkout() {
    const goMypage = () =>{
      window.location.href = '../../mypage';
    }
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {       
      if(sessionStorage.getItem("address") !== null){
        setActiveStep(activeStep + 1);
      } 
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
    
    const GoBack = () => {
      window.location.href = "/"
    }

    console.log(sessionStorage.getItem("payse"))
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <div style={{width:'auto',display:'flex' ,justifyContent:'center'}}>
              <Button onClick={goMypage}>BACK MYPAGE</Button>
              </div>
            </React.Fragment>
            ) 
            : 
            (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:2 }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
 
                <Button
                  type="primary"
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {
                  activeStep === steps.length - 1 ?
                   (sessionStorage.getItem("payse") ? 'Place order': "" )
                   : 
                   ('Next')
                  }
                  {console.log()}
                </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        
        </Container>
      </ThemeProvider>
    );
  }