import React from "react";
import DirectionCard from "./DirectionCard";
import styled from "styled-components";

export default function Direction(props) {
  return (
    <Container>
      <div className="direction--step">
        <span className="step--text bold ">STEP {props.stepNum}</span>
        <span className="gray--font">{props.step}</span>
        {props.ingredients.length && (
          <div className="ingredints--wrapper">
            <span className="light-gray-font ingredients--title">
              INGREDIENTS
            </span>
            <div className="direction-step-ingredients-cards">
              {props.ingredients.map((item) => {
                return (
                  <DirectionCard key={item.id} title="ingredients" {...item} />
                );
              })}
            </div>
          </div>
        )}

        {props.ingredients.length && (
          <div className="equipment--wrapper">
            <span className="light-gray-font equipment--title">EQUIPMENT</span>
            <div className="direction-step-equipment-cards">
              {props.equipment.map((item) => {
                return (
                  <DirectionCard key={item.id} title="equipment" {...item} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .direction--step {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
    .step--text {
      font-size: 15px;
      line-height: 1.625;
    }

    .ingredints--wrapper {
      border-bottom: 1px solid #bababa;
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .equipment--wrapper {
      border-bottom: 1px solid #bababa;
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .direction-step-ingredients-cards {
      display: flex;
      gap: 20px;
    }

    .direction-step-equipment-cards {
      display: flex;
      gap: 20px;
    }
    .ingredients--title {
      margin-left: 20px;
    }

    .equipment--title {
      margin-left: 20px;
    }
  }
`;
