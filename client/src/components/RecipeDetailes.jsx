import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import "../css/RecipeDetailes.css";
import styled from "styled-components";
import AddToPlan from "./AddToPlan";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LoginModal from "../components/LoginModal";
import { ServerIP } from "../IP";
import axios from "axios";
import { getRecipeInfoById } from "../Fetchers";

export default function RecipeDetails({ recipeId, isBookMarked }) {
  const { data, isLoading } = useQuery("recipeInfo", () =>
    getRecipeInfoById(recipeId)
  );

  const [showLogin, setShowLogin] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

  const [isBooked, setIsBooked] = useState(
    isBookMarked === "true" ? true : false
  );

  if (showLogin && accessToken) {
    setShowLogin(false);
  }

  const bookmark = () => {
    setIsBooked(!isBooked);
    const formData = new FormData();
    formData.append("recipe_id", recipeId);
    formData.append("recipe_title", data.Recipe_Information.title);
    formData.append("recipe_thumbnail", data.Recipe_Information.image);
    axios({
      method: "post",
      url: `${ServerIP}/RecipeDB/ChangeBookmark`,
      data: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <Container>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      {data ? (
        <>
          <div className="recipe-summary-wrapper">
            <div className="recipe--detailes">
              <div className="recipe--title bold">
                <h1>{data.Recipe_Information.title}</h1>
              </div>
              <div className="summary-item-wrapper">
                <div className="recipe-summary-item h2-text">
                  <span className=" font-light h2-text">
                    {data.Recipe_Information.extendedIngredients.length}
                  </span>
                  <span className=" font-normal p-text">Ingredients</span>
                </div>
                <div className="recipe-summary-item unit h2-text">
                  <span className=" font-light h2-text">
                    {data.Recipe_Information.readyInMinutes}
                  </span>
                  <span className=" font-normal p-text">Minutes</span>
                </div>
                <div className="recipe-summary-item h2-text">
                  <span className=" font-light h2-text">
                    {data.Recipe_Information.nutrition.nutrients[0].amount}
                  </span>
                  <span className=" font-normal p-text">Calories</span>
                </div>
              </div>
              <div className="recipe--detailes-mealPlan"></div>
              <div
                className="recipe--detailes-bookmark"
                onClick={() => {
                  accessToken ? bookmark() : setShowLogin(true);
                }}
              >
                {isBooked ? (
                  <BookmarkOutlinedIcon fontSize="large" />
                ) : (
                  <TurnedInNotOutlinedIcon fontSize="large" />
                )}
              </div>
            </div>

            <div className="recipe-details-image">
              <img
                src={data.Recipe_Information.image}
                alt="Recipe Image"
                className="recipe--image"
              />
            </div>
          </div>
          <hr />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  .recipe-summary-wrapper {
    display: flex;
    flex-direction: row;
    gap: 300px;
    justify-content: center;

    .recipe--detailes {
      margin-top: 13%;
      .recipe--title {
        max-width: 400px;
      }

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
      margin-top: 200px;
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
