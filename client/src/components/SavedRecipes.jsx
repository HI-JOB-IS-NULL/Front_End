import React, { useState, useEffect } from "react";
import axios from "axios";
import { kServerIP } from "../IP";
import Card from "./Card";
export default function SavedRecipes() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [savedRecipe, setSavedRecipe] = useState([]);
  console.log(savedRecipe);
  useEffect(() => {
    if (accessToken && savedRecipe.length === 0) {
      axios({
        method: "post",
        url: `${kServerIP}/auth/recipeBookMarkList`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res);
        setSavedRecipe(res.data.BookMarkList);
      });
    }
  }, []);

  const cards = savedRecipe.map((item, index) => {
    return (
      <Card
        key={index}
        id={item.recipe_id}
        title={item.recipe_title}
        bookMark={item.book_mark}
        image={item.recipe_thumbnail}
      />
    );
  });

  return <div className="cards--list">{cards}</div>;
}
