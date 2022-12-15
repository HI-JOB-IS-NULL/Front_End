import axios from "axios";

import { ServerIP } from "./IP";

export async function getRecipeInfoById(recipeId) {
  const { data } = await axios.get(
    `${ServerIP}/RecipeDB/nser/detail_recipe?recipeId=${recipeId} `
  );
  return data;
}
