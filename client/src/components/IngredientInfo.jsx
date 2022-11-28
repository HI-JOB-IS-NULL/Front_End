import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import styled from "styled-components";
export default function IngredientInfo(props) {
  const [isAdded, setIsAdded] = useState(false);
  const us = props.measures.us.amount + " " + props.measures.us.unitShort;
  const metric =
    props.measures.metric.amount + " " + props.measures.metric.unitShort;
  const measures = props.isImperial ? us : metric;

  useEffect(() => {
    if (props.isAllAdded) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [props.isAllAdded]);

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
        <span>
          {measures} {props.name}
        </span>
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
    }
  }
`;
