import React, { useState, useEffect } from "react";
import axios from "axios";
import { kServerIP } from "../IP";
import Card from "./Card";
export default function DoneRecipes() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [doneRecipe, setDoneRecipe] = useState([]);
  useEffect(() => {
    if (accessToken && doneRecipe.length === 0) {
      axios({
        method: "post",
        url: `${kServerIP}/auth/ChangeRecipeDone`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res);
        setDoneRecipe(res.data.BookMarkList);
      });
    }
  }, []);

  const cards = doneRecipe.map((item, index) => {
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
