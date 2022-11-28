import axios from "axios";

import { ServeIP } from "./IP";

export async function getRecipeInfoById(recipeId) {
  const { data } = await axios.get(
    `${ServeIP}/RecipeDB/detail_recipe?recipeId=${recipeId} `
    // `http://automealbackend-env.eba-ikpeu3mz.ap-northeast-2.elasticbeanstalk.com/RecipeDB/detail_recipe?recipeId=${recipeId} `
  );
  return data;
}

// export async function getRecipeByIngredients(tags) {
//   const formData = new FormData();
//   const ingredientsArr = tags.map((tag) => {
//     return tag.name;
//   });
//   const ingredients = ingredientsArr.toString();
//   formData.append("includeIngredients", ingredients);

//   const { data } = axios({
//     method: "post",
//     url: `${ServeIP}/RecipeDB/searchRecipes`,
//     data: formData,
//   }).then(function (res) {
//     console.log(res);
//     return res;
//   });
//   console.log(data);
//   return data;
// }
