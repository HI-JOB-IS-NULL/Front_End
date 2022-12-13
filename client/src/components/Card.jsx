import React, { useState } from "react";
import "../css/Card.css";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import BeenhereRoundedIcon from "@mui/icons-material/BeenhereRounded";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { kServerIP } from "../IP";
import axios from "axios";
import LoginModal from "./LoginModal";
import styled from "styled-components";
export default function Card(props) {
  console.log(props.bookMark);
  const [isBooked, setIsBooked] = useState(props.bookMark);
  const [isCleared, setIsCleared] = useState(props.clear_state);
  const [showLogin, setShowLogin] = useState(false);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const handleClick = () => {
    setIsCleared(!isCleared);
    props.changeStatus(props.planListId);
  };
  const bookmark = () => {
    setIsBooked(!isBooked);
    const formData = new FormData();
    formData.append("recipe_id", props.id);
    formData.append("recipe_title", props.title);
    formData.append("recipe_thumbnail", props.image);
    axios({
      method: "post",
      url: `${kServerIP}/RecipeDB/ChangeBookmark`,
      data: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  if (showLogin && accessToken) {
    setShowLogin(false);
  }
  //

  return (
    <Container>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      <div className="card">
        <div className={`${isCleared ? "disable" : ""}`}>
          <a href={`/recipe/${props.id}/${props.bookMark}`}>
            <img src={props.image} alt="Food Image" className="card--image" />
            <p className="card--title">{props.title} </p>
          </a>

          <div
            className="card--bookmark"
            onClick={() => (accessToken ? bookmark() : setShowLogin(true))}
          >
            {isBooked ? <BookmarkOutlinedIcon /> : <TurnedInNotOutlinedIcon />}
          </div>
        </div>

        {props.clear_state != undefined && (
          <div
            onClick={handleClick}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
          >
            {isCleared ? (
              <BeenhereRoundedIcon fontSize="large" color="success" />
            ) : (
              <Tippy content="Click if you done the Plan" arrow={false}>
                <BeenhereOutlinedIcon fontSize="large" color="success" />
              </Tippy>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .disable {
    pointer-events: none;
    opacity: 0.3;
  }
`;
