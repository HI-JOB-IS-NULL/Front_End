import React, { useState } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IngredientsData from "../IngredientsData";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
export default function InputTags(props) {
  const [tags, setTags] = useState([]);
  const suggestions = IngredientsData.map((item) => item.name);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const addTags = (event) => {
    if (event.target.value != "") {
      setTags([...tags, event.target.value]);
      props.selected([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index != indexToRemove)]);
    props.selected([...tags]);
  };

  function addTagsFromSuggestion(suggestion) {
    setTags([...tags, suggestion]);
    props.selected([...tags, suggestion]);
  }
  return (
    <Container>
      <div className="tags-input-wrapper">
        <ul className="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <CloseOutlinedIcon
                className="gray--font"
                style={{ cursor: "pointer" }}
                fontSize="small"
                onClick={() => removeTags(index)}
              />
            </li>
          ))}
        </ul>

        <div className="tags-input">
          <div>
            <input
              type="text"
              placeholder="Exclude Ingredients"
              className="suggestion-input"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                if (!isHovered) {
                  setIsFocused(false);
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
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
                        onClick={() => addTagsFromSuggestion(suggestion)}
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
      </div>
    </Container>
  );
}

const Container = styled.div`
  .tags-input-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    min-height: 48px;
    width: 480px;
    padding: 0 8px;
    border: 1px solid rgb(214, 216, 218);
    border-radius: 6px;
    &:focus-within {
      border: 1px solid green;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      /* margin: 8px 0 0 0; */
      margin: 0;
      gap: 5px;
      .tag {
        width: auto;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        padding: 0 8px;
        font-size: 14px;
        list-style: none;
        border-radius: 6px;
        background: #d4efdf;
      }
    }

    .tags-input {
      display: flex;
      flex-direction: column;
      position: relative;
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
        width: 480px;
        background: white;
        position: absolute;
        top: 50px;
        left: -10px;

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
  }
`;
