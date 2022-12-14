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
import SocialLogin from "./pages/SocialLogin";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import CartCheckout from "./components/CartCheckout";
import ModifyWrite from "./pages/ModifyWrite";
import RecipeNutrition from "./pages/RecipeNutrition";
import Cart from "./pages/Cart";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <BrowserRouter>
      <Navbar isScrolled={isScrolled} />
      <Routes>
        <Route exact path="/writeRecipe" element={<WriteRecipe />} />
        <Route exact path="/readyToCook" element={<PantryReadyRecipes />} />
        <Route exact path="/mealPlanner" element={<MealPlanner />} />
        <Route exact path="/shop" element={<ShopIngredients />} />
        <Route exact path="/community" element={<Community />} />
        <Route
          exact
          path="/modifyWrite/:csRecipeId"
          element={<ModifyWrite />}
        />
        <Route exact path="/RecipeNutrition" element={<RecipeNutrition />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="CommunityDetailes/:csRecipeId"
          element={<CommunityDetailes />}
        />
        <Route
          exact
          path="/ProductDetailes/:product_id"
          element={<ProductDetail />}
        />
        <Route
          exact
          path="/recipe/:recipeId/:isBookMarked"
          element={<Recipe />}
        />
        <Route exact path="/checkout/:product_id" element={<Checkout />} />
        <Route
          exact
          path="/searchRecipes/:recipeQuery"
          element={<SearchRecipes />}
        />
        <Route exact path="/mypage/:tabValue" element={<Mypage />} />
        <Route exact path="/survey" element={<SurveyComponent />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="sociallogin" element={<SocialLogin />} />
        <Route exact path="sociallogin" element={<SocialLogin />} />
        <Route exact path="/cartCheckout" element={<CartCheckout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
