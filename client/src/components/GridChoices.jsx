import React, { useState } from "react";
import styled from "styled-components";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
export default function GridChoices(props) {
  const [isSelected, setIsSelected] = useState([]);
  console.log(isSelected);
  return (
    <Container>
      <div className="grid-group">
        {props.group.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                props.multiple
                  ? !isSelected.includes(item) &&
                    setIsSelected((prevState) => [...prevState, item])
                  : setIsSelected(item);
              }}
            >
              <span
                className={`${
                  isSelected.includes(item) ? "color--green" : ""
                } item-span`}
              >
                {item}
              </span>
              {isSelected.includes(item) && (
                <CheckOutlinedIcon style={{ color: "green" }} />
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .grid-group {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    cursor: pointer;
  }
  .item-span {
    color: #707070;
  }
  .item-span:hover {
    color: green;
  }
  .color--green {
    color: green;
  }
`;
