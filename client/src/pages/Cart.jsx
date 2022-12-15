import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StorefrontIcon from "@mui/icons-material/Storefront";
import axios from "axios";
import { ServeIP } from "../IP";
import logo from "../assets/logo.png";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import { RingLoader } from "react-spinners";
import { Button } from "antd";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";
import CartCheckout from "../components/CartCheckout";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [cartData, setCartData] = useState([]);
  const [changeData, setChangeData] = useState(true);

  function getCurrentDate(separator = ".") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  }

  const shoot = () => {
    window.sessionStorage.setItem("cart", JSON.stringify(cartData));
    window.location.href = "../cartCheckout";
  };

  function addDays(separator = ".") {
    let result = new Date();
    result.setDate(result.getDate() + 7);
    let date = result.getDate();
    let month = result.getMonth() + 1;
    let year = result.getFullYear();
    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  }
  function goMall() {
    window.location.href = "/shop";
  }

  function cntUp(items, e) {
    items.count = e.target.value;
    if (accessToken && accessToken !== null) {
      axios({
        method: "PUT",
        url: `${ServeIP}/cart/updateCartItem`,
        data: items,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.status === 200) {
          if (changeData == true) {
            setChangeData(false);
          } else {
            setChangeData(true);
          }
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    }
  }

  function deleteItem(items, e) {
    console.log(items);
    if (accessToken && accessToken !== null) {
      axios({
        method: "DELETE",
        url: `${ServeIP}/cart/deleteCartItem`,
        data: items,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).then(function (res) {
        if (res.status === 200) {
          if (changeData == true) {
            setChangeData(false);
          } else {
            setChangeData(true);
          }
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    }
  }
  function totalPrice(datas) {
    let total = 0;
    datas.map((items) => {
      total += items.price * items.count;
    });
    return total;
  }

  useEffect(() => {
    console.log("accessToken", accessToken);

    if (accessToken && accessToken !== null) {
      axios({
        method: "GET",
        url: `${ServeIP}/cart`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log("sd");
        if (res.status === 200) {
          console.log(res.data);
          setCartData(res.data);
          setLoading(true);
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    }
  }, [changeData]);

  let noCart = (
    <MDBContainer className="py-8 h-100">
      <MDBRow className="justify-content-center my-4">
        <MDBCol md="8">
          <MDBCard className="mb-4" style={{ width: "auto" }}>
            <MDBCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Cart is Empty
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleTag="div"
                    rippleColor="light"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <img src={logo} alt="Logo" style={{ width: "5000px" }} />
                  </MDBRipple>
                </MDBCol>

                <MDBCol lg="8" md="3" className="justify-content-center my-4">
                  <button onClick={goMall}>
                    <StorefrontIcon fontSize="large" />
                    pick up stuff from Shop Ingredients
                  </button>
                </MDBCol>
                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0"></MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleTag="div"
                    rippleColor="light"
                    className="bg-image rounded hover-zoom hover-overlay"
                  ></MDBRipple>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  let yesCart = (
    <MDBContainer className="py-8 h-100">
      <MDBRow className="justify-content-center my-4">
        <MDBCol md="8">
          <MDBCard className="mb-4" style={{ width: "auto" }}>
            <MDBCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                <MDBRow>
                  <MDBCol>
                    <div style={{ textAlign: "left" }}>
                      Cart - {cartData.length} items
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <div style={{ textAlign: "right" }}>
                      <button onClick={goMall}>
                        <StorefrontIcon fontSize="large" />
                        shop more
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBTypography>
            </MDBCardHeader>

            <MDBCardBody>
              {console.log(cartData)}
              {cartData.map((items) => (
                <div>
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img src={items.imgUrl} className="w-100" />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>{items.productNm}</strong>
                      </p>

                      <MDBBtn
                        onClick={(e) => deleteItem(items, e)}
                        style={{ backgroundColor: "red" }}
                      >
                        <RemoveShoppingCartTwoToneIcon />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <MDBInput
                          onChange={(e) => cntUp(items, e)}
                          defaultValue={items.count}
                          min={1}
                          type="number"
                          label="Quantity"
                        />
                      </div>

                      <p className="text-start text-md-center">
                        <strong>₩{items.price * items.count}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <hr className="my-4" />
                </div>
              ))}
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="mb-4" style={{ width: "auto" }}>
            <MDBCardBody>
              <p>
                <strong>Expected shipping delivery</strong>
              </p>
              <p className="mb-0">
                {getCurrentDate()} - {addDays()}
              </p>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mb-5 mb-lg-1" style={{ width: "250px" }}>
            <MDBCardBody style={{ width: "250px" }}>
              <p>
                <strong>We accept</strong>
              </p>
              <MDBCardImage
                className="me-2"
                width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <MDBCardImage
                className="me-2"
                width="45px"
                src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
              <MDBCardImage
                className="me-2"
                width="45px"
                src="https://play-lh.googleusercontent.com/QAtwQ3pzH4VOo3mPNuIvS83w9cgtTKcpsCZj3UPgU8tKRK4dS1DzlsZl3wDFTAaOQPI=w240-h480-rw"
                alt="KB pay"
              />
              <MDBCardImage
                className="me-2"
                width="45px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Samsung_Pay_icon.svg/300px-Samsung_Pay_icon.svg.png"
                alt="Samsung pay"
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="mb-4" style={{ width: "auto" }}>
            <MDBCardHeader>
              <MDBTypography tag="h5" className="mb-0">
                Summary
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products:
                  <span>₩{totalPrice(cartData)}</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                  <LocalShippingTwoToneIcon />
                  Shipping
                  <span>Fee ₩3000</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>₩{totalPrice(cartData) + 3000}</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>

              {console.log(cartData)}
              <Button
                onClick={shoot}
                type="primary"
                style={{ borderRadius: 15, marginLeft: "5vw" }}
              >
                Go to checkout
                {/* <Link 
                to={{
                pathname: '../CartCheckout',
                state: cartData
              }}>
                </Link> */}
              </Button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  let content = (
    <div style={{ position: "absolute", marginLeft: "25vw", marginTop: 200 }}>
      <RingLoader
        color="hsla(168, 67%, 53%, 1)"
        size={200}
        speedMultiplier={1}
      />
    </div>
  );

  if (cartData.length > 0) {
    noCart = yesCart;
  }
  if (loading) {
    if (cartData.length > 0) {
      content = yesCart;
    } else {
      content = noCart;
    }
  }

  return (
    <div
      style={{
        margin: "150px auto 32px",
        maxWidth: "1340px",
        width: "100%",
        boxSizing: "border-box",
        padding: "0 80px",
      }}
    >
      <section className="h-100 gradient-custom">{content}</section>
    </div>
  );
}
