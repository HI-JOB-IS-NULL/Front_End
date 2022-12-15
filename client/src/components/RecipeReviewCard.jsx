import React, { useState, useEffect, useCallback } from "react";
import Card from "./communityCard";
import styled from "styled-components";
import axios from "axios";
import { ServerIP } from "../IP";

export default function GridExample(props) {
  const [posts, setPosts] = useState([]);
  const [copyPosts, setCopyPosts] = useState([]);

  useEffect(() => {
    if (!props.url) {
      axios({
        method: "GET",
        url: `${ServerIP}/CustomRecipe/nser/list?page=` + props.info,
      }).then((response) => setPosts(response.data.dtoList));
    } else {
      axios({
        method: "GET",
        url: props.url,
      }).then((response) => setCopyPosts(response.data.dtoList));
    }
  }, [props]);

  return (
    <Container>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {posts && !props.url
          ? posts.map((a, i) => {
              return <Card cardInfo={posts[i]} />;
            })
          : copyPosts.map((a, i) => {
              return <Card cardInfo={copyPosts[i]} />;
            })}
        {console.log(copyPosts)}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  flex-wrap: wrap;
  display: block;
`;
