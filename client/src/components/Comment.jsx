import React, { useEffect, useState } from "react";
import Box from "./Box";
import axios from "axios";
import { getComments } from "./api";

export default function CommentForm () {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
    let timeInterver = '';



  const loadComments = async (page) => {
    try {
      const temp = await getComments(page, 10);
      const tempComments = comments.concat(temp);
      setComments(tempComments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadComments(page);
  }, [page]);

  const scrollEvent = ()=>{
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollTop)
    if (scrollTop + clientHeight >= scrollHeight - 950) {
      setPage(page + 1);
    }
  }

  const handleScroll = () => {
    clearTimeout(timeInterver);
    timeInterver = setTimeout(scrollEvent, 300)
  };

  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(()=>{
    axios.get(``)
    .then()
  })
    return(
        <>
          {comments.map((item, key) => (
          <Box key={item.id} id={item.id} email={item.email} body={item.body} />
          ))}
        </>
    )
}

