import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import styled from "styled-components";
export default function IngredientInfo() {
  const [isAdded, setIsAdded] = useState(false);
  return (
    <Container>
      <div className="ingredientInfo--wrapper">
        <div
          className="ingredientInfo--icon"
          onClick={() => setIsAdded((prevState) => !prevState)}
        >
          {isAdded ? (
            <RemoveCircleOutlineOutlinedIcon />
          ) : (
            <AddCircleOutlineOutlinedIcon />
          )}
        </div>
        <span>Ingredient info goes here</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .ingredientInfo--wrapper {
    margin-left: 30px;
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 5px;
    .ingredientInfo--icon {
      cursor: pointer;
      color: green;
      /* transform: rotate(10deg); */
    }
  }
`;
