import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { kServerIP } from "../IP";
export default function MyMealPlan() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [mealPlanData, setMealPlanData] = useState();
  useEffect(() => {
    if (mealPlanData === undefined) {
      axios({
        method: "get",
        url: `${kServerIP}/MealPlan/getMealPlan`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res);
        setMealPlanData(res.data);
      });
      const mealPlans = mealPlanData.map((dayOfWeek, index) => {
        return (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <span className="light-gray-font">
              Calories: {dayOfWeek.nutrients.calories}&nbsp;&nbsp;
              Carbohydrates:
              {dayOfWeek.nutrients.carbohydrates}&nbsp;&nbsp; Fat:{" "}
              {dayOfWeek.nutrients.fat}
              &nbsp;&nbsp; Protein: {dayOfWeek.nutrients.protein}
            </span>
            <div style={{ display: "flex", gap: "40px" }}>
              {dayOfWeek.meals.map((mealOfDay, index) => {
                return (
                  <Card
                    key={index}
                    {...mealOfDay}
                    image={`https://spoonacular.com/recipeImages/${mealOfDay.id}-480x360.${mealOfDay.imageType}`}
                  />
                );
              })}
            </div>
          </div>
        );
      });
    }
  }, []);

  return <div>{!mealPlanData && <div>hi</div>}</div>;
}
