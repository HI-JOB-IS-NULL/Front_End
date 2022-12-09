import React from "react";
import GridChoices from "./GridChoices";
export default function SearchWithCuisines() {
  const cuisines = [
    "African",
    "German",
    "Mediterranean",
    "American",
    "Greek",
    "Mexican",
    "British",
    "Indian",
    "Middle Eastern",
    "Cajun",
    "Irish",
    "Nordic",
    "Caribbean",
    "Italian",
    "Southern",
    "Chinese",
    "Japanese",
    "Spanish",
    "European",
    "Korean",
    "Vietnamese",
    "French",
    "Latin American",
  ];
  return <GridChoices group={cuisines} multiple={true} />;
}
