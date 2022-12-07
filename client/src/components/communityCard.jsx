import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "antd";
import styled from "styled-components";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import axios from "axios";
import noimage from "../assets/noimage.png";

function communityCard(props) {
  // community데이터 받아오
  // const [comu, setComu] = useState([]);
  // useEffect(()=> {
  //     axios({
  //       method: 'GET',
  //       url:''
  //     }).then(response => setComu(response.data))
  // })

  const [image, setImage] = useState();

  useEffect(() => {
    console.log(props.cardInfo);
    setImage(props.cardInfo.uploadImgResult);
  }, []);

  const [isBooked, setIsBooked] = useState(false);
  const [like, setLike] = useState(props.cardInfo.like_rate),
    [isLike, setIsLike] = useState(false),
    onLikeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
    };
  return (
    <Container>
      <a
        href={`/CommunityDetailes/${props.cardInfo.csRecipeId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Card
          style={{
            width: "500px",
            display: "flex",
            flexDirection: "row",
            height: "230px",
          }}
        >
          <Card.Img
            className="img"
            variant="top"
            src={
              image != null && props.cardInfo.uploadImgResult.length != 0
                ? image[0].realImageUrl
                : noimage
            }
            style={{ width: "300px", height: "230px" }}
          />
          {/* {console.log(props.cardInfo.uploadImgResult[0].realImageUrl)} */}
          <Card.Body>
            <Card.Title style={{}}>{props.cardInfo.recipeT_title}</Card.Title>

            <div style={{ display: "flex", margin: "0.5vw" }}>
              <Button
                className={"like-button " + (isLike ? "liked" : "")}
                onClick={onLikeButtonClick}
              >
                {"Like"} | {like}
              </Button>
              <style>{`
                        .like-button {
                            font-size: 1rem;
                            padding: 5px 10px;
                            color:  #585858;
                        }
                        .liked {
                            font-weight: bold;
                            color: #1565c0;
                        }
                    `}</style>
              <div onClick={() => setIsBooked(!isBooked)}>
                {isBooked ? (
                  <BookmarkOutlinedIcon />
                ) : (
                  <TurnedInNotOutlinedIcon />
                )}
              </div>
            </div>

            {props.cardInfo.recipe_content}
            <br />
            <br />
            {props.cardInfo.nick_name}
          </Card.Body>
        </Card>
      </a>
    </Container>
  );
}
export default communityCard;

const Container = styled.div`
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 5%;
`;
