import React, { useState } from "react";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import styled from "styled-components";

export default function AddToPlan(props) {
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  const handleClick = () => {
    // setIsAddedToPlan((prevPlanState) => !prevPlanState);
    setIsAddedToPlan(true);
    props.addToMealPlan;
  };
  return (
    <Container>
      <div className=" mealPlan--section " onClick={handleClick}>
        <EventNoteOutlinedIcon />
        {isAddedToPlan ? (
          <span className="unclickable-span">All Added to Meal Plan</span>
        ) : (
          <span className="hover--text">Add All to Meal Plan</span>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .mealPlan--section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .unclickable-span {
    color: gray;
    cursor: default;
  }
`;
