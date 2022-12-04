import React, { useState } from "react";
import styled from "styled-components";
import InputTags from "../components/InputTags";
import AddToPlan from "../components/AddToPlan";
export default function mealPlanner() {
  const [tags, setTags] = useState([]);

  const selected = (tags) => {
    setTags(tags);
  };
  console.log(tags);
  const [formData, setFormData] = useState({
    calories: "",
    diet: "none",
    duration: "Day",
    tags: tags,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    filterData.append("calories", formData.calories);
    filterData.append("diet", formData.diet);
    filterData.append("duration", formData.duration);
    filterData.append("tags", formData.tags);
    // axios({
    //   method: 'POST',
    //   url: `${ServeIP}`,
    //   data: filterData,

    // })
    console.log(formData);
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
            <InputTags selected={selected} className="input-tags" />
            <input
              type="text"
              placeholder="Calories"
              name="calories"
              value={formData.calories}
              className="filter-input"
              onChange={handleChange}
            />
            {"   "}
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
            <select
              className="filter-select"
              onChange={handleChange}
              value={formData.duration}
              name="duration"
            >
              <option>Day</option>
              <option>Week</option>
            </select>

            <button
              type="button"
              className="green-button"
              onClick={handleSubmit}
            >
              Get Started
            </button>
          </form>
        </div>
        <div className="meal-plan-result">
          <div className="result-header">
            <div className="spans">
              <span className="light-gray-font">Protein:</span>
              <span className="light-gray-font">Calorie:</span>
              <span className="light-gray-font">Carbohydrate:</span>
            </div>
            <AddToPlan />
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
          padding: 0 8px;
          border: 1px solid rgb(214, 216, 218);
          border-radius: 6px;
          &:focus-within {
            outline: 1px solid green;
          }
        }
        .filter-select {
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
`;
