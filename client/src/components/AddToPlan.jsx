import React, { useState } from "react";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import styled from "styled-components";

export default function AddToPlan() {
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  return (
    <Container>
      <div
        className=" mealPlan--section hover--text"
        onClick={() => setIsAddedToPlan((prevPlanState) => !prevPlanState)}
      >
        <EventNoteOutlinedIcon />
        {isAddedToPlan ? (
          <span>Added to Meal Planner</span>
        ) : (
          <span>Add All to Meal Planner</span>
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
`;
