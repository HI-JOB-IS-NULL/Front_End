import React, { useState } from "react";
import RecipeDetails from "../components/RecipeDetailes";
import Ingredients from "../components/Ingredients";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRecipeInfoById } from "../Fetchers";
import Direction from "../components/Direction";
import styled from "styled-components";
import { RingLoader } from "react-spinners";

export default function Recipe() {
  const { recipeId, isBookMarked } = useParams();

  let stepsDetail;
  let steps;

  const { data, isLoading } = useQuery("recipeInfo", () =>
    getRecipeInfoById(recipeId)
  );
  if (isLoading) {
    return (
      <div style={{ position: "absolute", marginLeft: "45vw", marginTop: 200 }}>
        <RingLoader
          color="hsla(168, 67%, 53%, 1)"
          size={200}
          speedMultiplier={1}
        />
      </div>
    );
  }

  if (data) {
    stepsDetail = data?.Recipe_Information.analyzedInstructions;
    if (stepsDetail.length) {
      steps = stepsDetail.map((items) => {
        return items.steps.map((item, index) => {
          return (
            <div key={index}>
              <Direction stepNum={index + 1} {...item} />

              <br />
            </div>
          );
        });
      });
    }
  }

  return (
    <Container>
      <RecipeDetails recipeId={recipeId} isBookMarked={isBookMarked} />
      <Ingredients recipeId={recipeId} />
      <div className="directions--wrapper">
        <h1 className="directions-wrapper-text">Directions</h1>
        {steps ? (
          <section className="direction--section">{steps}</section>
        ) : (
          <h1>No Directions...</h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .directions--wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 300px;

    .directions-wrapper-text {
      margin: 0 0 30px;
    }
  }
`;
