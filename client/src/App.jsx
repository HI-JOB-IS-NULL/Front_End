import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopIngredients from "./pages/ShopIngredients";
import Community from "./pages/Community";
import PantryReadyRecipes from "./pages/PantryReadyRecipes";
import MealPlanner from "./pages/MealPlanner";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import RecipeDetail from "./pages/RecipeDetail";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/readyToCook" element={<PantryReadyRecipes />} />
        <Route exact path="/mealPlanner" element={<MealPlanner />} />
        <Route exact path="/shop" element={<ShopIngredients />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/RecipeDetail" element={<RecipeDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
