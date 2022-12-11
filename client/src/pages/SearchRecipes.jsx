import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import { Tabs } from "antd";
import SearchWithDiets from "../components/SearchWithDiets";
import SearchWithIngredients from "../components/SearchWithIngredients";
import SearchWithAllergies from "../components/SearchWithAllergies";
import SearchWithCuisines from "../components/searchWithCuisines";
export default function SearchRecipes() {
  const { recipeQuery } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [tabKey, setTabKey] = useState(10);
  const [formData, setFormData] = useState({
    withIng: "",
    withoutIng: "",
    diet: "",
    allergies: "",
    inCuisines: "",
    exCuisines: "",
  });
  console.log(formData);

  return (
    <Container>
      <div className="search-tools">
        <div className="serch-box">
          <SearchBar
            placeholder="Search Recipes"
            setNavigate={false}
            inputData={recipeQuery}
          />
        </div>
        <div className="filter">
          <span
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              borderRight: " 1px solid #bababa",
              paddingRight: "20px",
              cursor: "pointer",
            }}
            onClick={() => setShowFilter(true)}
          >
            Filter
          </span>
          <span
            style={{
              color: "green",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={() => {
              setTabKey(tabKey + 1);
              setFormData({
                withIng: "",
                withoutIng: "",
                diet: "",
                allergies: "",
                inCuisines: "",
                exCuisines: "",
              });
            }}
          >
            Reset
          </span>
        </div>
        {showFilter && (
          <div className="filter-tabs">
            <Tabs key={tabKey}>
              <Tabs.TabPane tab="INGREDIENTS" key="ingredients">
                <SearchWithIngredients setFormData={setFormData} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="DIETS" key="diets">
                <SearchWithDiets setFormData={setFormData} filterValue="diet" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="ALLERGIES" key="allergies">
                <SearchWithAllergies
                  setFormData={setFormData}
                  filterValue="allergies"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="INCLUDE CUISINES" key="includeCuisines">
                <SearchWithCuisines
                  setFormData={setFormData}
                  filterValue="inCuisines"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="EXCLUDE CUISINES" key="excludeCuisines">
                <SearchWithCuisines
                  setFormData={setFormData}
                  filterValue="exCuisines"
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
        <div className="search-pantry">
          <p className="normal-text">
            Loking for recipes you can make today without a trip to the store?
          </p>
          <div className="search-pantry-buttons ">
            <button className="green-button">
              Yes, Find Pantry Ready Recipes
            </button>
            <button className="green-button">
              No, I'm Looking for Inspiration
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search-tools {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 130px 300px 0;
    gap: 30px;
    align-items: center;
    .serch-box {
      display: flex;
    }
    .filter {
      display: flex;
      gap: 20px;
      border-bottom: 2px solid #e3e3e3;
      padding: 10px 0;
      width: 100%;
    }
    .filter-tabs {
      width: 100%;
    }
    .search-pantry {
      /* position: absolute; */
      background-color: #f5f5f5;
      padding: 32px 0 32px 40px;
      width: calc(100% - 40px);
      .search-pantry-buttons {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    }
  }
`;
