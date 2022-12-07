import React, { useState } from "react";
import "../css/Card.css";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import BeenhereRoundedIcon from "@mui/icons-material/BeenhereRounded";
export default function Card(props) {
  const [isBooked, setIsBooked] = useState(false);
  const [isCleared, setIsCleared] = useState(props.clear_state);
  const handleClick = () => {
    setIsCleared(!isCleared);
    props.changeStatus(props.planListId);
  };

  return (
    <div className="card">
      <a href={`/recipe/${props.id}`}>
        <img src={props.image} alt="Food Image" className="card--image" />
        <p className="card--title">{props.title} </p>
      </a>

      <div className="card--bookmark" onClick={() => setIsBooked(!isBooked)}>
        {isBooked ? <BookmarkOutlinedIcon /> : <TurnedInNotOutlinedIcon />}
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
            <BeenhereOutlinedIcon fontSize="large" color="success" />
          )}
        </div>
      )}
    </div>
  );
}
