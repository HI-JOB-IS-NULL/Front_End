import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function HomeModal({ setModal }) {
  return (
    <Container>
      <div className="overlay">
        <div className="search--modal">
          <div className="search--box">
            <SearchBar
              placeholder="Search Recipes"
              setNavigate={true}
              inputData={""}
              color={"blue"}
              top={"45px"}
              left={"10px"}
            />
          </div>
          <div className="recent-searches">
            <span className="light-gray-font">Recent Searches:</span>
          </div>
          <div className="pantry-promo-section">
            <a href="/readyToCook">
              <div className="text-content">
                <h1 className="title-text-small bold">
                  Find recipes you can make right now
                </h1>
                <p className="normal-text text-content-p">
                  Get inspired by recipes you can make with infredients you have
                  at home today.
                </p>
                <button className="green-button">
                  Find Pantry Ready Recipes
                </button>
              </div>
            </a>
          </div>

          <div className="close" onClick={() => setModal(false)}>
            <CloseOutlinedIcon />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .overlay {
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: rgba(49, 49, 49, 0.6);
    z-index: 3;

    .search--modal {
      position: fixed;
      display: none;
      z-index: 3;
      right: 0;
      top: 0;
      bottom: auto;
      left: auto;
      background-color: white;
      height: 510px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .search--box {
        position: absolute;
        top: 100px;
        left: 550px;
        z-index: 5;
      }
      .recent-searches {
        position: absolute;
        top: 190px;
        left: 550px;
      }
      .pantry-promo-section {
        position: absolute;
        top: 250px;
        left: 550px;

        .text-content {
          max-height: 200px;
          .text-content-p {
            max-width: 400px;

            :hover {
              color: green;
            }
          }
        }
      }

      .close {
        position: absolute;
        right: 30px;
        top: 20px;
        cursor: pointer;
        :hover {
          color: green;
        }
      }
    }
  }
`;
