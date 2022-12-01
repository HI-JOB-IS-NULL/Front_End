import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ServeIP } from "../IP";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Button, Carousel } from 'antd';
import "../css/RecipeDetailes.css";
import Comment from "./Comment";
import 'antd/dist/antd.css';
import { Input } from "antd"
const { TextArea } = Input
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
function communityDetailes(){
    const [comment, setComment] = useState('');
    const [isBooked, setIsBooked] = useState(false);
    const {csRecipeId} = useParams();
    const [info, setInfo] = useState([]); 

    const InputText = (e) => {
      setComment(e.target.value)
      console.log(comment);
    }
    
    const commit = () =>{
      window.sessionStorage.setItem("com", comment)
    }

    useEffect(()=> {
        axios
        .get(
            `${ServeIP}/CustomRecipe/list?csRecipeId=${csRecipeId}`
        )
        .then((response) => {
            console.log(response.data);
            setInfo(response.data.dtoList[0])
        });
    }, []);
    const enter = () =>{
      alert('hi')
    }
    const imgurl = info.uploadImgResult && info.uploadImgResult[0].realImageUrl
    console.log(info.uploadImgResult && info.uploadImgResult)
    return(
        <Container>
      <div className="recipe-summary-wrapper">
        <div className="recipe--detailes">
          <div className="recipe--title bold">
            <h1>{info.recipeT_title}</h1>
          </div>
          <div className="summary-item-wrapper">
            <div className="recipe-summary-item h2-text">
              <span className=" font-light h2-text">5</span>
              <span className=" font-normal p-text">Ingredients</span>
            </div>
            <div className="recipe-summary-item unit h2-text">
              <span className=" font-light h2-text">35</span>
              <span className=" font-normal p-text">Minutes</span>
            </div>
            <div className="recipe-summary-item h2-text">
              <span className=" font-light h2-text">340</span>
              <span className=" font-normal p-text">Calories</span>
            </div>
          </div>
          <div className="recipe--detailes-mealPlan">
          
          </div>
          <div
            className="recipe--detailes-bookmark"
            onClick={() => setIsBooked(!isBooked)}
          >
            {isBooked ? (
              <BookmarkOutlinedIcon fontSize="large" />
            ) : (
              <TurnedInNotOutlinedIcon fontSize="large" />
            )}
          </div>
        </div>

        <div className="recipe-details-image">    
        {/*이미지 슬라이드*/}
          <img src={imgurl}/>
        </div>
      </div>
    <hr />

    <div>
      <center>
      <h2>Recipe</h2>
      {console.log(info)}
      <h4>{info.recipe_content}</h4>
      
      </center>

      <div style={{marginLeft:'35vw', display:'block'}}>
        <Comment comment = {comment}/>
        <TextArea value={comment} onChange={InputText} style={{width:'600px'}}/>
        <Button type="primary" onPressEnter={commit} onClick={commit}>Enter</Button>
      </div>

    </div>
    </Container>
  );
}


export default communityDetailes;

const Container = styled.div`
.recipe-summary-wrapper {
    display: flex;
    flex-direction: row;
    gap: 300px;
    justify-content: center;

    .recipe--detailes {
      margin-top: 13%;

      .summary-item-wrapper {
        display: flex;
        flex-direction: row;
        gap: 30px;
        .recipe-summary-item {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      }
      .recipe--detailes-mealPlan {
        margin-top: 40px;
      }

      .recipe--detailes-bookmark {
        margin-top: 50px;
        cursor: pointer;
      }
      .recipe--detailes-bookmark:hover {
        color: #a8bca1;
      }
    }
    .recipe-details-image {
      margin-top: 150px;
    }
    .recipe-details-image > img {
      width: 400px;
      height: 400px;
      border-radius: 20px;
    }
  }
  hr {
    border-style: inset;
    margin: 50px 100px 0 100px;
  }
`;