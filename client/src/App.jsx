import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopIngredients from "./pages/ShopIngredients";
import Community from "./pages/Community";
import PantryReadyRecipes from "./pages/PantryReadyRecipes";
import MealPlanner from "./pages/MealPlanner";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Recipe from "./pages/Recipe";
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
        <Route exact path="/readyToCook" element={<PantryReadyRecipes />} />
        <Route exact path="/mealPlanner" element={<MealPlanner />} />
        <Route exact path="/shop" element={<ShopIngredients />} />
        <Route exact path="/community" element={<Community />} />
        <Route exact path="/recipe" element={<Recipe />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
