import React from "react";
import GridChoices from "./GridChoices";
export default function SearchWithDiets({ setFormData, filterValue }) {
  const diets = [
    "none",
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto Vegetarian",
    "Ovo Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];

  return (
    <GridChoices
      group={diets}
      multiple={false}
      setFormData={setFormData}
      filterValue={filterValue}
    />
  );
}
