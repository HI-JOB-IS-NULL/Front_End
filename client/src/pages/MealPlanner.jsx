import React from "react";
import styled from "styled-components";
import InputTags from "../components/InputTags";
export default function mealPlanner() {
  const selected = (tags) => console.log(tags);
  return (
    <Container>
      <div className="meal-planner-page">
        <div className="meal-planner-contant">
          <h1 className="meal-planner-title bold">
            Personalise Your Meal Plan
          </h1>
          <p>
            You can easily personalise your meal plan here! First step is,
            choose the calorie intaken during your diet plan. Then customize it
            by choosing the duration and your dietry constraints.
          </p>
        </div>
        <div className="plan-filter-form">
          <div className="filter-wrapper">
            <InputTags selected={selected} />
            <input type="text" placeholder="Calories" />
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .meal-planner-page {
    margin: 150px auto 32px;
    max-width: 1340px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 80px;
  }
`;
