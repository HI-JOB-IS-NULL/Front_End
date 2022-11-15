import React from "react";
import styled from "styled-components";
import "../css/Home.css";
import Card from "../components/Card";
import data from "../cardData.js";
// import star from "../assets/ShiningStars.png";

export default function Home() {
  const cards = data.map((item) => {
    return <Card key={item.id} {...item} />;
  });
  return (
    <Container>
      <main>
        <h1 className="title">Enjoy Healthy Life & Testy Food.</h1>
        {/* <img className="title--star"  src={star} alt="Star" /> */}
      </main>
      <section className="cards--list">{cards}</section>
    </Container>
  );
}
const Container = styled.div``;
