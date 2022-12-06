import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { ServeIP } from "../IP";
import "../css/ProductDetail.css";
import { Button } from "antd";
import { RingLoader } from "react-spinners";

import LoginModal from "../components/LoginModal";

export default function ProductDetail() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const { product_id } = useParams();
  const [currentIndex, setCurrentIndex] = useState();
  const [imageData, setImageData] = useState([]);
  const [iteminfo, setIteminfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(false);
  const [cartId, setCartId] = useState();
  const [loginModal, setLoginModal] = useState(false);

  const Buy = () => {
    window.location.href = `../../checkout/${product_id}`;
  };

  const Basket = () => {
    if (accessToken != null) {
      setCart(true);
      axios({
        method: "POST",
        url: `${ServeIP}/cart`,
        data: { productId: product_id, count: 1 },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).then((res) => setCartId(res.data));
      alert(iteminfo.productName, "Get Item");
    } else {
      setLoginModal(true);
    }
  };

  const Delete = () => {
    console.log(cartId);
    setCart(false);
    axios({
      method: "DELETE",
      url: `${ServeIP}/cart/deleteCartItem`,
      data: { cartItemId: cartId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${ServeIP}/cart`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  });

  let renderSlides = imageData.map((image) => (
    <div style={{ width: 470, objectFit: "cover" }}>
      <img style={{ objectFit: "cover" }} src={image} />
    </div>
  ));

  useEffect(() => {
    axios
      .get(`${ServeIP}/shop/productFindByPId?productId=${product_id}`)
      .then((res) => {
        console.log(res.data);
        let temp = [];
        temp.push(res.data.imageFirst);
        if (res.data.imageSecond != null) {
          temp.push(res.data.imageSecond);
        }
        if (res.data.imageThird != null) {
          temp.push(res.data.imageThird);
        }
        setIteminfo(res.data);
        setImageData(temp);
        console.log(iteminfo.productName);
        setLoading(true);
      });
  }, []);
  //console.log(imageData);
  // useEffect(()=>{

  // },[imageData])

  let content = (
    <div style={{ position: "absolute", marginLeft: "45vw", marginTop: 200 }}>
      <RingLoader
        color="hsla(168, 67%, 53%, 1)"
        size={200}
        speedMultiplier={1}
      />
    </div>
  );

  let fi = (
    <center>
      {console.log(accessToken)}
      {!accessToken && loginModal && (
        <LoginModal setLoginModal={setLoginModal} />
      )}
      {console.log(accessToken)}
      <Top>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          style={{ width: "50%" }}
          className="carousel-container"
        >
          {imageData && renderSlides}
        </Carousel>
        <Pro_info>
          {console.log(iteminfo)}
          <label>Product Name</label>
          <h4>{iteminfo.productName}</h4>

          <h6>
            {iteminfo.productClassification} - {iteminfo.productCategory}
          </h6>
          <hr />
          <br />
          <br />
          <br />
          <label>Price</label>
          <h5>{iteminfo.price} ₩ </h5>
          <hr />
          <br />
          <br />
          <br />

          <Button onClick={Buy} type="primary" style={{ marginRight: 20 }}>
            Buy it
          </Button>
          {cart == false ? (
            <Button onClick={Basket}>Basket</Button>
          ) : (
            <Button onClick={Delete}>Delete</Button>
          )}
        </Pro_info>
      </Top>
      <Bottom>
        <img style={{ alignItem: "center" }} src={iteminfo.description} />
      </Bottom>
    </center>
  );

  if (loading) {
    content = fi;
  }

  return <Container>{content}</Container>;
}

const Container = styled.div`
  display: block;
  align-items: center;
  margin-top: 5%;

  width: auto;
`;
const Top = styled.div`
  display: flex;
  margin-left: 20%;
`;
const Bottom = styled.div`
  justify-content: center;
  margin-top: 7%;
`;
const Pro_info = styled.div`
  width: 500px;
  margin-top: 5%;
  text-align: left;
`;
