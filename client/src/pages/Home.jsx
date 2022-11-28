import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../css/Home.css";
import Card from "../components/Card";
import Axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import banner from "../assets/default_bkg.png";

import bannerImg from "../assets/banner_img.png";
import { ServeIP, apiKey3 } from "../IP";
import HomeModal from "../components/HomeModal";
export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://api.spoonacular.com/recipes/random?${apiKey3}&number=10`
    ).then((response) => {
      setRandomRecipes(response.data.recipes);
    });
  }, []);

  const cards = randomRecipes.map((item, index) => {
    return <Card key={index} {...item} />;
  });

  return (
    <Container>
      <section className="home--banner">
        <div className="banner--wrapper">
          <div className="banner--content">
            <button className="search--opener" onClick={() => setModal(true)}>
              <SearchOutlinedIcon />
              <span>Search Recipes</span>
            </button>

            <h1 className="banner-content-text">
              Enjoy Healthy Life & Testy Food.
            </h1>
          </div>

          <img src={bannerImg} alt="Banner Image" className="banner--img" />
        </div>
      </section>
      {modal && <HomeModal setModal={setModal} />}

      <section className="cards--list">{cards}</section>
    </Container>
  );
}
const Container = styled.div`
  .home--banner {
    position: relative;

    .banner--wrapper {
      display: flex;
      .banner--content {
        position: absolute;
        top: 40%;
        left: 5%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .search--opener {
          width: 400px;
          padding: 2%;
          border-radius: 50px;
          border: none;
          background-color: #fff;
          cursor: pointer;
          box-shadow: 0 4px 10px rgb(0 0 0 / 12%), 0 0 1px rgb(0 0 0 / 5%) inset;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 20px;
        }

        .banner-content-text {
          font-size: 32px;
          max-width: 300px;
        }
      }
    }

    .banner--img {
      width: 50%;
      height: 50%;
      position: relative;
      display: block;
      margin-left: auto;
      margin-top: -50px;
      margin-right: -35px;
    }
  }

  /* a:link {
    text-decoration: none;
    color: black;
  }

  a:visited {
    color: green;
  } */
`;