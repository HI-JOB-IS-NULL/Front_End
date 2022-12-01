import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopIngredients from "./pages/ShopIngredients";
import Community from "./pages/Community";
import PantryReadyRecipes from "./pages/PantryReadyRecipes";
import MealPlanner from "./pages/MealPlanner";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Recipe from "./pages/Recipe";
import WriteRecipe from "./pages/WriteRecipe";
import CommunityDetailes from "./components/communityDetailes";
import Mypage from "./pages/Mypage";
import SurveyComponent from "./components/Survey";
import SearchRecipes from "./pages/SearchRecipes";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <BrowserRouter>
      <Navbar isScrolled={isScrolled} />
      {/* <div style={{ marginTop: "100px" }}></div> */}
      <Routes>
        <Route exact path="/writeRecipe" element={<WriteRecipe />} />
        <Route exact path="/readyToCook" element={<PantryReadyRecipes />} />
        <Route exact path="/mealPlanner" element={<MealPlanner />} />
        <Route exact path="/shop" element={<ShopIngredients />} />
        <Route exact path="/community" element={<Community />} />
        <Route
          exact
          path="CommunityDetailes/:csRecipeId"
          element={<CommunityDetailes />}
        />
        <Route exact path="/recipe/:recipeId" element={<Recipe />} />
        <Route exact path="/searchRecipes" element={<SearchRecipes />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/survey" element={<SurveyComponent />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
