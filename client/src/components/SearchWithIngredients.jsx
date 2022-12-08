import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SuggestionsInput from "./SuggestionsInput";
export default function SearchWithIngredients() {
  return (
    <Container>
      <div className="filter-wrapper">
        <div className="with-ingredients-wrapper">
          <div className="suggestion-wrapper">
            <div className="input-wrapper">
              {/* <input
                type="text"
                placeholder="With Ingredients"
                className="suggestion-input"
              />
              <SearchOutlinedIcon className="search-icon" fontSize="large" /> */}
              <SuggestionsInput placeholder="With Ingredients" width="500" />
              <SearchOutlinedIcon className="search-icon" fontSize="large" />
            </div>

            <div className="suggestion-container"></div>
          </div>
        </div>
        <div className="without-ingredients-wrapper">
          <div className="suggestion-wrapper">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Without Ingredients"
                className="suggestion-input"
              />
              <SearchOutlinedIcon className="search-icon" fontSize="large" />
            </div>

            <div className="suggestion-container"></div>
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
`;
