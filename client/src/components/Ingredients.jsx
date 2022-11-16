import React, { useState } from "react";
import styled from "styled-components";
import IngredientInfo from "./IngredientInfo";

export default function Ingredients() {
  const [isImperial, setIsImperial] = useState(true);
  return (
    <Container>
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
            <span>9 SERVINGS</span>
          </div>
        </div>
        <IngredientInfo />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .ingredients-wrapper {
    padding: 70px 300px 0 300px;
    .ingredients--header {
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
