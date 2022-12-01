import React from "react";
import { FloatingButtonWithImage } from "./FloatingButtons";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function ImageAnalyzResult(props) {
  const { tags, setTags, base64Img, detectionList } = props;
  function handleClick(item) {
    props.setTags([
      ...props.tags,
      { id: item.ingredientNum, name: item.name, image: null },
    ]);
  }

  return (
    <Container>
      <div className="result-wrapper">
        <img
          className="result-image"
          src={`data:image/png;base64,${base64Img}`}
        />
        <div className="bubles-wrapper">
          {detectionList.map((item, index) => {
            console.log(index);
            return (
              <div
                className="buble"
                key={index}
                onClick={() => handleClick(item)}
              >
                <FloatingButtonWithImage name={item.name} />
                <span style={{ color: "#bababa" }}>
                  {Number(item.prob).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .result-wrapper {
    display: flex;
    margin-top: 30px;
    gap: 20px;
    align-items: center;
    .result-image {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .bubles-wrapper {
      display: flex;
      text-align: center;
      .buble {
      }
    }
  }
`;
