import React from "react";
import RecipeDetails from "../components/RecipeDetailes";
import Ingredients from "../components/Ingredients";
import styled from "styled-components";

export default function Recipe() {
  return (
    <Container>
      <RecipeDetails />
      <Ingredients />
    </Container>
  );
}

const Container = styled.div``;
