import React, { useState } from "react";
import styled from "styled-components";
import InputTags from "../components/InputTags";
import AddToPlan from "../components/AddToPlan";
import axios from "axios";
import { ServeIP } from "../IP";
import Card from "../components/Card";
export default function mealPlanner() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [tags, setTags] = useState([]);
  const [data, setData] = useState();

  const plans = data?.data.map((days, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <span className="light-gray-font">
          Calories: {days.nutrients.calories}&nbsp;&nbsp; Carbohydrates:
          {days.nutrients.carbohydrates}&nbsp;&nbsp; Fat: {days.nutrients.fat}
          &nbsp;&nbsp; Protein: {days.nutrients.protein}
        </span>
        <div style={{ display: "flex", gap: "40px" }}>
          {days.meals.map((day, index) => {
            return (
              <Card
                key={index}
                {...day}
                image={`https://spoonacular.com/recipeImages/${day.id}-480x360.${day.imageType}`}
              />
            );
          })}
        </div>
      </div>
    );
  });

  const [formData, setFormData] = useState({
    calories: "",
    diet: "",
    duration: "Day",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(tags);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterData = new FormData();
    filterData.append("targetCaloreis", formData.calories);
    filterData.append("diet", formData.diet);
    filterData.append("timeFrame", formData.duration);
    filterData.append("exclude", tags);
    axios({
      method: "post",
      url: `${ServeIP}/MealPlan/generateMealPlan`,
      data: filterData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(function (res) {
      console.log(res);
      setData(res);
    });
  };

  const addToMealPlan = () => {
    axios({
      method: "post",
      url: `${ServeIP}/MealPlan/addMealPlan`,
      data: data.data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Container>
      <div className="meal-planner-page">
        <div className="meal-planner-header">
          <div className="meal-planner-contant">
            <h1 className="meal-planner-title bold">
              Personalise Your Meal Plan
            </h1>
            <p className="meal-planner-description">
              You can easily personalise your meal plan here! First step is,
              choose the calorie intaken during your diet plan. Then customize
              it by choosing the duration and your dietry constraints.
            </p>
          </div>

          <form className="form">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>
                <h1 className="label">Exclude Ingredients:</h1>
                <InputTags selected={setTags} className="input-tags" />
              </div>
              <div>
                <h1 className="label">set Calories:</h1>
                <input
                  type="text"
                  placeholder="Calories"
                  name="calories"
                  value={formData.calories}
                  className="filter-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>
                <h1 className="label">choose your Diet:</h1>
                <select
                  className="filter-select"
                  name="diet"
                  onChange={handleChange}
                  value={formData.diet}
                >
                  <option>none</option>
                  <option>Gluten Free</option>
                  <option>Ketogenic</option>
                  <option>Vegetarian</option>
                  <option>Lacto-Vegetarian</option>
                  <option>Ovo-Vegetarian</option>
                  <option>Vegan</option>
                  <option>Pescetarian</option>
                  <option>Paleo</option>
                  <option>Primal</option>
                  <option>Low FODMAP</option>
                  <option>Whole30</option>
                </select>
              </div>
              <div>
                <h1 className="label">set Duration:</h1>
                <select
                  className="filter-select"
                  onChange={handleChange}
                  value={formData.duration}
                  name="duration"
                >
                  <option>Day</option>
                  <option>Week</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "1000px",
              }}
            >
              <button
                type="button"
                className="green-button "
                style={{
                  width: "480px",
                  marginTop: "10px",
                }}
                onClick={handleSubmit}
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
        <div className="meal-plan-result">
          <div
            className="result-header"
            style={{ justifyContent: "right" }}
            onClick={addToMealPlan}
          >
            <AddToPlan />
          </div>
          {plans}
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
    .meal-planner-header {
      border-bottom: 2px solid #f5f5f5;
      .meal-planner-contant {
        max-width: 75%;
        .meal-planner-title {
          margin-bottom: 32px;
        }
        .meal-planner-description {
          margin-bottom: 32px;
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
        margin-bottom: 40px;

        .filter-input {
          min-height: 48px;
          width: 480px;
          padding: 0 8px;
          border: 1px solid rgb(214, 216, 218);
          border-radius: 6px;
          &:focus-within {
            outline: 1px solid green;
          }
        }
        .filter-select {
          min-height: 48px;
          width: 480px;
          padding: 0 8px;
          border: 1px solid rgb(214, 216, 218);
          border-radius: 6px;
          &:focus-within {
            border: 1px solid green;
          }
        }
      }
    }
    .meal-plan-result {
      display: flex;
      flex-direction: column;
      .result-header {
        display: flex;

        padding: 20px 0;

        .spans {
          margin-right: auto;
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  .label {
    color: #bababa;
    font-size: 1rem;
  }
`;
