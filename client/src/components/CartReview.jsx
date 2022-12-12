import React, {useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import axios from "axios";
import { ServeIP } from "../IP";
import {
    MDBCardBody,
    MDBCol,
    MDBInput,
    MDBRipple,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBTypography,
    MDBListGroup,
    MDBListGroupItem
  } from "mdb-react-ui-kit";
  
  const addresses = sessionStorage.getItem("address");

  export default function CartReview() {
    console.log('first',sessionStorage.getItem("cart"))
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    const [userInfo ,setUserInfo] = useState([]);
    const [cartItem, setCartItem] = useState([]);

    useEffect(()=>{
        setCartItem(JSON.parse(sessionStorage.getItem("cart")))
    },[sessionStorage.getItem("cart")])
    console.log('second',cartItem)

  useEffect(() => {
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
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

  function totalPrice(datas) {
    let total = 0;
    datas.map((items) => {
      total += (items.price * items.count);
    });
    sessionStorage.setItem("total", total)
    return total;
  }
    return (
        <React.Fragment>
        <MDBCardBody>
            {cartItem.map((items) => (
            <div>
                <MDBRow>
                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                    <MDBRipple rippleTag="div" rippleColor="light"
                    className="bg-image rounded hover-zoom hover-overlay">
                    <img
                        src={items.imgUrl}
                        className="w-100" />
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                        </div>
                    </a>
                    </MDBRipple>
                </MDBCol>
                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                    <p>
                    <strong>{items.productNm}</strong>
                    </p>
                    
                </MDBCol>
                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                    <MDBInput onChange={(e) => cntUp(items, e)} defaultValue={items.count} min={1} type="number" label="Quantity" />
                    </div>

                    <p className="text-start text-md-center">
                    <strong>₩{items.price * items.count}</strong>
                    </p>
                </MDBCol>
                </MDBRow>
                <hr className="my-4" />
            </div>
            ))
            }
        </MDBCardBody>
        <MDBCard className="mb-4" style={{ width: "auto" }}>
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                Summary
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products:
                  <span>₩{totalPrice(cartItem)}</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                  <LocalShippingTwoToneIcon />Shipping
                  <span>Fee ₩3000</span>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>₩{totalPrice(cartItem) + 3000}</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
              
                
           
              
            </MDBCardBody>
          </MDBCard>
            <hr/>
        <Grid container spacing={15}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>{userInfo.userEmail}</Typography>
            <Typography gutterBottom>{addresses}</Typography>
          </Grid>
          
        </Grid>
      </React.Fragment>
    );
  }