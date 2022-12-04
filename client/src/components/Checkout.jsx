import React, {useState, useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
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

    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    const {product_id} = useParams();
    const [products, setProducts] = useState([]);
    const [userInfo ,setUserInfo] = useState([]);
    useEffect(()=> {
      axios
      .get(
          `${ServeIP}/shop/productFindByPId?productId=${product_id}`
      )
      .then((res) => {
          setProducts(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios.post(`${ServeIP}/profile`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(function (res) {
        console.log("sd");
        if (res.status === 200) {
          console.log(res.data);
          setUserInfo(res.data);
          // return response.json();
        } else if (res.status === 403) {
          //window.location.href = "/login"; // redirect
        } else {
          new Error(res);
        }

      });
    }
  }, []);
  console.log(userInfo)
  console.log(products)
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        case 2:
            return <Payment info ={userInfo} product = {products}/>;
        default:
            throw new Error('Unknown step');
        }
  }
  
  const theme = createTheme();
  
  export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
    
    const GoBack = () => {
      window.location.href = "/"
    }
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
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, padding:"inherit",  }}>
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
                <Button onClick={GoBack} style={{marginLeft:'10vw'}}>Back Home</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
  
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        
        </Container>
      </ThemeProvider>
    );
  }