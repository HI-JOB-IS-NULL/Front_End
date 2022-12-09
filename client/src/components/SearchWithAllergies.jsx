import React from "react";
import GridChoices from "./GridChoices";
export default function SearchWithAllergies() {
  const allergies = [
    "Dairy-Free",
    "Peanut-Free",
    "Soy-Free",
    "Egg-Free",
    "Seafood-Free",
    "Sulfite-Free",
    "Gluten-Free",
    "Sesame-Free",
    "Tree Nut-Free",
    "Grain-Free",
    "Shellfish-Free",
    "Wheat-Free",
  ];
  return <GridChoices group={allergies} multiple={true} />;
}
