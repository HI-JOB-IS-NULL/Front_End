import React from "react";
import styled from "styled-components";

export default function DirectionCard(props) {
  return (
    <Container>
      <div className="direction--card">
        <img
          src={`https://spoonacular.com/cdn/${props.title}_100x100/${props.image}`}
          className="direction-card-image"
        />
        <span className="direction-card-name">{props.name}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .direction--card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100px;
    height: 100px;
    .direction-card-name {
      padding: 1%;
      align-content: center;
      font-size: small;
    }

    .direction-card-image {
      height: auto;
      width: auto;
      max-height: 50px;
      max-height: 50px;
    }
  }
`;
