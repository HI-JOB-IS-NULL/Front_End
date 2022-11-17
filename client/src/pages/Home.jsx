import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../css/Home.css";
import Card from "../components/Card";
import data from "../cardData.js";
import Axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Home() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    Axios.get("http://10.20.33.134:9111/RecipeDB/random_recipe").then(
      (response) => {
        setRandomRecipes(response.data.recipes);
      }
    );
  }, []);

  // const cards = data.map((item) => {
  //   return <Card key={item.id} {...item} />;
  // });

  const cards = randomRecipes.map((item) => {
    return <Card {...item} />;
  });

  return (
    <Container>
      <main>
        <div className="home--stats">
          <div className="home--search">
            <SearchOutlinedIcon className="home--icon" />
            <input
              type="text"
              placeholder="Search recipes"
              className="home--input"
            />
          </div>

          <h1 className="home--title">Enjoy Healthy Life & Testy Food.</h1>
        </div>
      </main>
      <section className="cards--list">{cards}</section>
    </Container>
  );
}
const Container = styled.div`
  .home--search {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;

    .home--input {
      border: 2px solid #eee;
      font-size: 15px;
      line-height: 20px;
      display: block;
      padding: 5px 10px 5px 50px;
      border-radius: 50px;
    }

    .home--icon {
      position: absolute;
      align-items: center;
      justify-content: center;
      left: 15px;
    }
  }
`;
