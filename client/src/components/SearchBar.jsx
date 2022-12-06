import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RecipeQueryData from "../RecipeQueryData";
import { useNavigate } from "react-router-dom";
export default function SearchBar({ placeholder }) {
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const suggestions = RecipeQueryData.map((item) => item.query);
  const navigate = useNavigate();
  console.log(inputValue);

  function navigateToSearchRecipe(suggestion) {
    navigate(`/searchRecipes/${suggestion}`);
  }
  return (
    <Container>
      <div className="search">
        <div className="search--inputs">
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) =>
              e.key === "Enter" ? navigateToSearchRecipe() : null
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!isHovered) {
                setIsFocused(false);
              }
            }}
            value={inputValue}
            className="search-inputs-input"
          />
          <div className="search--icon">
            <SearchOutlinedIcon style={{ cursor: "pointer" }} />
          </div>
        </div>
        {isFocused && (
          <div
            className="input-suggestion"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {suggestions.map((suggestion, index) => {
              const isMatch =
                suggestion
                  .toLocaleLowerCase()
                  .indexOf(inputValue.toLocaleLowerCase()) > -1;
              return (
                <div key={index}>
                  {isMatch && (
                    <div
                      className="suggestion"
                      onClick={() => navigateToSearchRecipe(suggestion)}
                    >
                      {suggestion}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .search--inputs {
      position: relative;
      display: flex;
      align-items: center;

      .search-inputs-input {
        display: block;
        width: 500px;
        box-shadow: 0 4px 10px rgb(0 0 0 / 12%), 0 0 1px rgb(0 0 0 / 5%) inset;
        border: none;
        border-radius: 50px;
        padding: 10px 0 10px 50px;
        font-size: 15px;
        line-height: 20px;
        outline: none;
      }

      .search--icon {
        position: absolute;
        padding-left: 15px;
      }
    }
    .input-suggestion {
      box-shadow: 0 0 14px rgb(0 0 0 / 8%);
      position: absolute;
      top: 45px;
      left: 10px;
      max-height: 150px;
      overflow-y: auto;
      width: 480px;
      background: white;
      .suggestion {
        align-items: center;
        cursor: pointer;
        padding: 2px 5px;
        &:hover {
          background-color: #f2f3f4;
        }
      }
    }
  }
`;
