import React, { useState } from "react";
import "../css/Card.css";

import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
export default function Card(props) {
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="card">
      <a href={`/recipe/${props.id}`}>
        <img src={props.image} alt="Food Image" className="card--image" />
        <p className="card--title">{props.title} </p>
      </a>

      <div className="card--bookmark" onClick={() => setIsBooked(!isBooked)}>
        {isBooked ? <BookmarkOutlinedIcon /> : <TurnedInNotOutlinedIcon />}
      </div>
    </div>
  );
}
