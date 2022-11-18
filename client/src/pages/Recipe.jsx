import React, { useEffect, useState } from "react";
import RecipeDetails from "../components/RecipeDetailes";
import Ingredients from "../components/Ingredients";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ServeIP } from "../IP";

export default function Recipe() {
  const [searchParams] = useSearchParams();
  const [recipeInfo, setRecipeInfo] = useState({});

  // Axios.get(`${ServeIP}/RecipeDB/random_recipe`).then((response) => {
  useEffect(() => {
    axios
      .get(
        `${ServeIP}/RecipeDB/detail_recipe?recipeId=${searchParams.recipeId}`
      )
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  console.log(searchParams.recipeId);

  return (
    <Container>
      <RecipeDetails />
      <Ingredients />
    </Container>
  );
}

const Container = styled.div``;
