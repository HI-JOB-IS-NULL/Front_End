import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { ServerIP } from "../IP";

const addresses = sessionStorage.getItem("address");

export default function Review() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const { product_id } = useParams();
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios
      .get(`${ServerIP}/shop/productFindByPId?productId=${product_id}`)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      axios
        .post(
          `${ServerIP}/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (res) {
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
  console.log(userInfo);
  console.log(products);
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <div>
          <Typography variant="h5" gutterBottom>
            Order summary
          </Typography>
          <h8>Product:</h8> <h8> {products.productName}</h8>
          <br />
          <h8>Price: {products.price}₩</h8>
        </div>
        <Grid item container direction="column" md={3} sx={{ marginLeft: 15 }}>
          <img src={products.imageFirst} />
        </Grid>
      </div>
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
