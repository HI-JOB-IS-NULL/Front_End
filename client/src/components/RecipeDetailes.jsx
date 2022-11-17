import React, { useState } from "react";
import "../css/RecipeDetailes.css";
import styled from "styled-components";
import AddToPlan from "./AddToPlan";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

export default function RecipeDetails() {
  const [isBooked, setIsBooked] = useState(false);
  return (
    <Container>
      <div className="recipe-summary-wrapper">
        <div className="recipe--detailes">
          <div className="recipe--title bold">
            <h1>Recipe name here</h1>
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
          <div className="recipe--detailes-mealPlan">
            <AddToPlan />
          </div>
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
        </div>

        <div className="recipe-details-image">
          <img
            src="/src/assets/profile.png"
            alt="Recipe Image"
            className="recipe--image"
          />
        </div>
      </div>
      <hr />
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
