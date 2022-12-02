import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { ServeIP } from "../IP";

  
  const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

  export default function Review() {
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
    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Order summary
        </Typography>
          <h8>Product:</h8> <h8> {products.productName}</h8><br/>
          <h8>Price: {products.price}₩</h8>
        <Grid container spacing={15}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>{userInfo.userEmail}</Typography>
            <Typography gutterBottom>{addresses.join(', ')}</Typography>
          </Grid>
          <Grid item container direction="column" md={6} sx={{paddingTop:'0px'}}>
            <img src={products.imageFirst}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }