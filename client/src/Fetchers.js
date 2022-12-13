import axios from "axios";

import { kServerIP } from "./IP";

export async function getRecipeInfoById(recipeId) {
  const { data } = await axios.get(
    `${kServerIP}/RecipeDB/nser/detail_recipe?recipeId=${recipeId} `
  );
  return data;
}
