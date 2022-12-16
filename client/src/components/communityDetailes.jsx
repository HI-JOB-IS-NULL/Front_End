import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ServerIP } from "../IP";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import "../css/RecipeDetailes.css";
import Comment from "./Comment";
import { Carousel } from "react-responsive-carousel";
import "antd/dist/antd.css";
import { Button, Input, Modal } from "antd";
import noimg from "../../public/assets/noimage.png";
import { RingLoader } from "react-spinners";

const { TextArea } = Input;

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function communityDetailes() {
  const accesstoken = sessionStorage.getItem("ACCESS_TOKEN");
  const [comment, setComment] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const { csRecipeId } = useParams();
  const [info, setInfo] = useState([]);
  const [imageData, setImageData] = useState([]);
  const noimage = "../../public/assets/noimage.png";
  const [isModal, setIsModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const handleOk = () => {
    setIsModal(false);
  };
  const handleCancel = () => {
    setIsModal(false);
  };

  const Correction = () => {
    axios({
      method: "POST",
      url: `${ServerIP}/CustomRecipe/modify`,
      csRecipeId: csRecipeId,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }).then((res) => {
      alert("modify", res);
      console.log(res);
    });
    window.location.href = `../../modifyWrite/${csRecipeId}`;
  };

  const Delete = () => {
    axios
      .delete(`${ServerIP}/CustomRecipe/remove?csRecipeId=${csRecipeId}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })

      .then((res) => {
        alert("delete", res);
        window.location.href = "../../community";
      });
  };

  let renderSlides = imageData.map((image) => (
    <div style={{ width: "30%", objectFit: "cover", marginLeft: "12%" }}>
      <img style={{ objectFit: "cover" }} src={image} />
    </div>
  ));

  useEffect(() => {
    axios
      .get(`${ServerIP}/CustomRecipe/nser/get?csRecipeId=${csRecipeId}`)
      .then((response) => {
        console.log(response.data.uploadImgResult);
        setInfo(response.data);
        const temp = response.data.uploadImgResult;

        const tem = response.data.recipe_content;

        setContent(tem.split(","));

        if (temp.length == 0) {
          imageData.push(noimg);
        } else {
          for (let i = 0; i < temp.length; i++) {
            imageData.push(temp[i].realImageUrl);
          }
        }
      });
  }, []);

  useEffect(() => {
    //임시방편
    //const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNreXBhcmsxMjNAbmF2ZXIuY29tIiwiaWF0IjoxNjY5NjMyNjg2LCJleHAiOjE2Njk3MTkwODZ9.VWqHcIrak7JnKJdSNXFFdA_m2rGWH2-IItu9dFHUeJv8o6o30dcIFMf6btsNW2OyCQCOUi1Hcxd-yHBRG8X8Aw";
    console.log("accessToken", accesstoken);
    let config = null;
    if (accesstoken && accesstoken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios
        .post(
          `${ServerIP}/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        )
        .then(function (res) {
          console.log("sd");
          if (res.status === 200) {
            console.log(res.data.userEmail);
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

  console.log(userInfo); // 프로필 정보
  console.log(info); // 상품정보
  return (
    <Container>
      <div
        className="recipe-summary-wrapper"
        style={{ gap: "5%", width: "auto", marginLeft: "14%", display: "flex" }}
      >
        <div className="recipe--detailes">
          <div className="recipe--title bold">
            <h1>{info.recipeT_title}</h1>
          </div>
          <div className="summary-item-wrapper">
            <div className="recipe-summary-item h2-text">
              <span className=" font-light h2-text">5</span>
              <span className=" font-normal p-text">Ingredients</span>
            </div>
            <div className="recipe-summary-item unit h2-text">
              <span className=" font-light h2-text">35</span>
              <span className=" font-normal p-text">Minutes</span>
            </div>
            <div className="recipe-summary-item h2-text">
              <span className=" font-light h2-text">340</span>
              <span className=" font-normal p-text">Calories</span>
            </div>
          </div>
          <div className="recipe--detailes-mealPlan"></div>
          <div
            className="recipe--detailes-bookmark"
            onClick={() => setIsBooked(!isBooked)}
          >
            {isBooked ? (
              <BookmarkOutlinedIcon fontSize="large" />
            ) : (
              <TurnedInNotOutlinedIcon fontSize="large" />
            )}
          </div>
          {/*글쓴이 전용*/}
          {!accesstoken ? (
            " "
          ) : userInfo.userEmail === info.user_email ? (
            <div style={{ marginTop: "5vw" }}>
              <Button onClick={Correction}>Correction</Button>{" "}
              <Button
                onClick={Delete}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  marginLeft: "2vw",
                }}
              >
                Delete
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <Modal open={isModal} onOk={handleOk} onCancel={handleCancel}>
          <h4>Are you sure delete it?</h4>
        </Modal>
        <div className="recipe-details-image">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            style={{ width: "50%" }}
            className="carousel-container"
          >
            {imageData && renderSlides}
          </Carousel>
        </div>
      </div>

      <hr />

      <div>
        <center>
          <h2>Recipe</h2>
          {/* {info.recipe_content} */}
          <div>
            {content.map((item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 40,
                    textAlign: "left",
                  }}
                >
                  <h3>STEP {i + 1} </h3>
                  <h5>{item}</h5>
                </div>
              );
              console.log(i);
            })}
          </div>
          <hr />
          <br />
          <div>
            <Comment comment={comment} recipe_id={csRecipeId} />
          </div>
        </center>
      </div>
    </Container>
  );
}

export default communityDetailes;

const Container = styled.div`
  .recipe-summary-wrapper {
    display: flex;
    flex-direction: row;
    gap: 300px;
    justify-content: center;

    .recipe--detailes {
      margin-top: 13%;

      .summary-item-wrapper {
        display: flex;
        flex-direction: row;
        gap: 30px;
        .recipe-summary-item {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      }
      .recipe--detailes-mealPlan {
        margin-top: 40px;
      }

      .recipe--detailes-bookmark {
        margin-top: 50px;
        cursor: pointer;
      }
      .recipe--detailes-bookmark:hover {
        color: #a8bca1;
      }
    }
    .recipe-details-image {
      margin-top: 150px;
    }
    .recipe-details-image > img {
      width: 400px;
      height: 400px;
      border-radius: 20px;
    }
  }
  hr {
    border-style: inset;
    margin: 50px 100px 0 100px;
  }
`;
