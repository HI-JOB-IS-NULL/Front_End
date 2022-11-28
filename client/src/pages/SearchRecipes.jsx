import React from "react";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
export default function SearchRecipes() {
  return (
    <Container>
      <div className="search-tools">
        <div className="serch-box">
          <SearchBar placeholder="Search Recipes" />
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
          >
            Filter
          </span>
          <span
            style={{
              color: "green",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Reset
          </span>
        </div>
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
