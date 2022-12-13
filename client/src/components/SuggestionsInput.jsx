import React, { useState } from "react";
import IngredientsData from "../IngredientsData";
import styled from "styled-components";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function SuggestionsInput(props) {
  const suggestions = IngredientsData.map((item) => item.name);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <div className="suggestion-section">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={props.placeholder}
            className="suggestion-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!isHovered) {
                setIsFocused(false);
              }
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => (e.key === "Enter" ? props.addTags(e) : null)}
          />
        </div>

        {isFocused && (
          <div
            className="suggestion-wrapper"
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
                      onClick={() => {
                        setInputValue(suggestion);
                        props.setIncludeIng([...props.includeIng, suggestion]);
                        if (!props.setInputValue) {
                          setInputValue("");
                          setIsFocused(false);
                        }
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon
                        fontSize="small"
                        style={{ color: "green" }}
                      />
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
  .suggestion-section {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .suggestion-input {
      border: none;
      outline: none;
      flex: 1;
      height: 46px;
      font-size: 14px;
      padding: 4px 0 0 0;
      background: transparent;
    }
    .suggestion-wrapper {
      box-shadow: 0 0 14px rgb(0 0 0 / 8%);
      max-height: 150px;
      overflow-y: auto;
      z-index: 10;
      background: white;
      position: absolute;
      top: 50px;

      .suggestion {
        display: flex;
        align-items: center;
        gap: 3px;
        cursor: pointer;
        &:hover {
          background-color: #f2f3f4;
        }
      }
    }
  }
`;
