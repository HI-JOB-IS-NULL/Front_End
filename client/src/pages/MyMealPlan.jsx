import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { kServerIP } from "../IP";
export default function MyMealPlan() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [mealPlanData, setMealPlanData] = useState();
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (mealPlanData === undefined || sendRequest) {
      console.log("get meal plan");
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
      setSendRequest(false);
    }
  }, [sendRequest]);

  async function deletePlan(planId) {
    console.log("delete plan");
    try {
      await axios({
        method: "get",
        url: `${kServerIP}/MealPlan/removeMealPlan?planId=${planId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSendRequest(true);
      console.log("set request true");
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  const mealPlans = mealPlanData?.map((dayOfWeek, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="light-gray-font" style={{ marginRight: "auto" }}>
            Calories: {dayOfWeek.nutrients.calories}&nbsp;&nbsp; Carbohydrates:
            {dayOfWeek.nutrients.carbohydrates}&nbsp;&nbsp; Fat:
            {dayOfWeek.nutrients.fat}
            &nbsp;&nbsp; Protein: {dayOfWeek.nutrients.protein}
          </span>
          <button
            onClick={() => deletePlan(dayOfWeek.plan_id)}
            className="simple-button"
            style={{ width: "125px", height: "40px" }}
          >
            Delete today Plan
          </button>
        </div>

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

  return (
    <div style={{ padding: "10px 10px" }}>
      {mealPlanData != undefined && !sendRequest && <div>{mealPlans}</div>}
    </div>
  );
}
