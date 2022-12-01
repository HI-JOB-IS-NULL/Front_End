import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import IngredientInfo from "./IngredientInfo";
import AddToPlan from "./AddToPlan";
import { getRecipeInfoById } from "../Fetchers";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

export default function Ingredients({ recipeId }) {
  const { data, isLoading } = useQuery("recipeInfo", () =>
    getRecipeInfoById(recipeId)
  );

  const [isImperial, setIsImperial] = useState(true);
  const [isMade, setIsMade] = useState(false);
  const [isAllAdded, setIsAllAdded] = useState(false);

  return (
    <Container>
      {data ? (
        <div className="ingredients-wrapper">
          <div className="ingredients--header">
            <h1>Ingredients</h1>

            <div className="unit-serving-wrapper">
              <div
                className={` units ${
                  isImperial ? "units--imperial" : "units--metric"
                }`}
              >
                <span
                  onClick={() => setIsImperial(true)}
                  className="ingredients--unit first"
                >
                  US
                </span>
                <span onClick={() => setIsImperial(false)} className="last">
                  METRIC
                </span>
              </div>
              <span>{data.Recipe_Information.servings} SERVINGS</span>
            </div>
          </div>
          {data.Recipe_Information.extendedIngredients.map((item) => {
            return (
              <IngredientInfo
                isImperial={isImperial}
                {...item}
                isAllAdded={isAllAdded}
              />
            );
          })}

          <div className="ingredients--footer">
            <button className="simple-button btn--font">
              <ShoppingBagOutlinedIcon />
              Order Ingredients
            </button>
            <div
              className="madeIt--section"
              onClick={() => setIsMade((prevState) => !prevState)}
            >
              {isMade ? (
                <span className="hover--text">Made it</span>
              ) : (
                <span className="hover--text">Did you make this?</span>
              )}
              <CheckCircleOutlineOutlinedIcon
                fontSize="large"
                className={` ${isMade ? "color--green" : ""}`}
              />
            </div>
            <div className="bottom--section">
              <div
                className="cart--section hover--text"
                onClick={() => setIsAllAdded((prevState) => !prevState)}
              >
                <div>
                  {isAllAdded ? (
                    <RemoveShoppingCartOutlinedIcon />
                  ) : (
                    <AddShoppingCartOutlinedIcon />
                  )}
                </div>
                <div>
                  {isAllAdded ? (
                    <span>Remove All from Shopping List</span>
                  ) : (
                    <span>Add All to Shopping List</span>
                  )}
                </div>
              </div>
              <AddToPlan />
            </div>
          </div>
        </div>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  .ingredients-wrapper {
    padding: 70px 300px;
    .ingredients--header {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      .unit-serving-wrapper {
        display: flex;
        gap: 30px;
        margin-left: auto;
        .units {
          color: #bababa;
          cursor: pointer;

          .ingredients--unit {
            border-right: 1px solid #bababa;
            padding: 0 20px 0 0px;
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      }
    }
    .ingredients--footer {
      margin-left: 20px;
      margin-top: 20px;

      /* .order--button {
        cursor: pointer;
        border-radius: 6px;
        border: solid #195a00;
        width: 222px;
        height: 58px;
        border-width: 2px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      } */

      .madeIt--section {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 20px 0;
      }

      .bottom--section {
        display: flex;
        margin-top: 10px;
        padding: 20px 0;
        border-top: 1px solid #bababa;
        border-bottom: 1px solid #bababa;
        .cart--section {
          margin-right: auto;
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  .units--metric {
    .last {
      color: green;
      transition: all 200ms ease;
    }
  }

  .units--imperial {
    .first {
      color: green;
      transition: all 200ms ease;
    }
  }
`;
