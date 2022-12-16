import React from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import image from "../../public/assets/rice.png";
export function FloatingButtonWithImage(props) {
  return (
    <Container>
      <div className="suggested-ingredient floating button">
        <div className="ingredient-content">
          {props.image && (
            <img
              src={`https://mkc-automeal-s3.s3.ap-northeast-2.amazonaws.com/2022/ingredientsImg/${props.image}`}
              className="ingredient-image"
            />
          )}
          <span className="ingredient-name">{props.name}</span>
        </div>
      </div>
    </Container>
  );
}

export function FloatingButton(props) {
  return (
    <Container>
      <div className="suggested-ingredient floating button">
        <div className="ingredient-content">
          <span className="ingredient-name">{props.name}</span>
          <div className="remove-icon">
            <CloseOutlinedIcon fontSize="small" />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .suggested-ingredient {
    cursor: pointer;
    padding: 10px 15px;
    margin: 7px 0;
    margin-right: 8px;
    position: relative;
    .ingredient-content {
      line-height: 24px;
      display: flex;
      align-items: center;
      gap: 5px;
      .ingredient-image {
        width: 20px;
      }
    }
  }

  .remove-icon {
    display: inline-block;
    font-size: 8px;
    padding-left: 8px;
    cursor: pointer;
  }
  .floating {
    box-shadow: 0 4px 7px rgb(0 0 0 / 18%);
  }

  .button {
    letter-spacing: 0;
    display: inline-block;
    outline: none;
    border: none;
    border-radius: 3em;
    box-sizing: border-box;
    font-size: 14px;
    text-decoration: none;
    text-transform: capitalize;
    white-space: nowrap;
    text-align: center;
    transition: all 200ms ease;
    background-color: #fff;
  }
`;
