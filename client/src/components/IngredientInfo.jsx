import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import styled from "styled-components";
import axios from "axios";
import { kServerIP } from "../IP";
export default function IngredientInfo(props) {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
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

  useEffect(() => {
    if (isAdded) {
      axios({
        method: "get",
        url: `http://172.16.36.178:5000/cart/orderByCate?productCategory=${props.name}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }, [isAdded]);

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
