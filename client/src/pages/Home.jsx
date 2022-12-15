import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../css/Home.css";
import Card from "../components/Card";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import banner from "../../public/assets/default_bkg.png";

import bannerImg from "../../public/assets/banner_img.png";
import { ServerIP, apiKey3 } from "../IP";
import HomeModal from "../components/HomeModal";
import axios from "axios";
export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [modal, setModal] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    axios
      .get(`https://api.spoonacular.com/recipes/random?${apiKey3}&number=28`)
      .then((response) => {
        console.log(response);
        setRandomRecipes(response.data.recipes);
      });
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios({
        method: "post",
        url: `${ServerIP}/auth/recipeBookMarkList`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res.data.BookMarkList);
        setBookmarkList(res.data.BookMarkList);
      });
    }
  }, []);

  const cards = randomRecipes.map((item, index) => {
    console.log(
      bookmarkList.some((bookmark) => {
        return bookmark.recipe_id === item.id;
      })
    );
    return (
      <Card
        key={index}
        {...item}
        bookMark={
          bookmarkList.some((bookmark) => {
            return bookmark.recipe_id === item.id.toString();
          })
            ? true
            : false
        }
      />
    );
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
      <h1
        style={{
          padding: "4vh 0 0 5vw",
          margin: "0",
          fontWeight: "200",
          fontSize: "2rem",
        }}
      >
        Just For You
      </h1>
      <section className="cards--list" style={{ paddingTop: "25px" }}>
        {cards}
      </section>
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
