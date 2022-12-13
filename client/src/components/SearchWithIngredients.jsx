import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SuggestionsInput from "./SuggestionsInput";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
export default function SearchWithIngredients({ setFormData }) {
  const [includeIng, setIncludeIng] = useState([]);
  console.log(includeIng);
  const [excludeIng, setExcludeIng] = useState([]);
  console.log(excludeIng);
  const removeFromInChoices = (indexToRemove) => {
    setIncludeIng(includeIng.filter((_, index) => index !== indexToRemove));
  };

  const removeFromExChoices = (indexToRemove) => {
    setExcludeIng(excludeIng.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    setFormData((prevState) => {
      return {
        ...prevState,
        withIng: includeIng,
      };
    });
  }, [includeIng]);

  useEffect(() => {
    setFormData((prevState) => {
      return {
        ...prevState,
        withoutIng: excludeIng,
      };
    });
  }, [excludeIng]);

  return (
    <Container>
      <div className="filter-wrapper">
        <div className="with-ingredients-wrapper">
          <div className="suggestion-wrapper">
            <div className="input-wrapper">
              <SuggestionsInput
                placeholder="With Ingredients"
                width="500"
                setIncludeIng={setIncludeIng}
                includeIng={includeIng}
                setInputValue={false}
              />
              <SearchOutlinedIcon className="search-icon" fontSize="large" />
            </div>
            <div className="ingredient-choice-column">
              <ul className="ingredient-choice-list">
                {includeIng.map((ing, index) => {
                  return (
                    <li key={index} className="ingredient-choice">
                      <span style={{ marginRight: "auto" }}>{ing}</span>
                      <CloseOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromInChoices(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="without-ingredients-wrapper">
          <div className="suggestion-wrapper">
            <div className="input-wrapper">
              <SuggestionsInput
                placeholder="Without Ingredients"
                width="500"
                setIncludeIng={setExcludeIng}
                includeIng={excludeIng}
                setInputValue={false}
              />
              <SearchOutlinedIcon className="search-icon" fontSize="large" />
            </div>
            <div className="ingredient-choice-column">
              <ul className="ingredient-choice-list">
                {excludeIng.map((ing, index) => {
                  return (
                    <li key={index} className="ingredient-choice">
                      <span style={{ marginRight: "auto" }}>{ing}</span>
                      <CloseOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromExChoices(index)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .filter-wrapper {
    padding: 30px 30px;
    display: flex;
    gap: 100px;
    justify-content: center;
  }
  .with-ingredients-wrapper {
  }
  .suggestion-wrapper {
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      .suggestion-input {
        padding: 3%;
        text-align: center;
        border-radius: 28px;
        width: 300px;
        background: #f5f5f5;
        box-shadow: 0 0.125em 0.25em rgb(0 0 0 / 5%) inset;
        border: none;
        font-size: 18px;
        outline: none;
      }
      .search-icon {
        position: absolute;
        margin-left: 30px;
      }
    }
  }
  .ingredient-choice-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    margin: 0;
  }
  .ingredient-choice {
    display: flex;
    width: 100%;
  }
`;
