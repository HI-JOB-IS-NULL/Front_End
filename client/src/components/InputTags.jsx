import React, { useState } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function InputTags(props) {
  const [tags, setTags] = useState([]);

  const addTags = (event) => {
    if (event.target.value != "") {
      setTags([...tags, event.target.value]);
      props.selected([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index != indexToRemove)]);
  };
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
        <input
          type="text"
          placeholder="Exclude Ingredients"
          className="tags-input"
          onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .tags-input-wrapper {
    display: flex;
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
      margin: 8px 0 0 0;
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
      flex: 1;
      border: none;
      height: 46px;
      font-size: 14px;
      padding: 4px 0 0 0;
      &:focus {
        outline: transparent;
      }
    }
  }
`;
