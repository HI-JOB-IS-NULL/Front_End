import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {  Button } from 'antd';
import styled from "styled-components";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

//레시피 공유 상세 페이지
const toDetail = () => {
    
}

function communityCard(props){
    const [isBooked, setIsBooked] = useState(false);
    const [like, setLike] = useState(props.cardInfo.like_rate),
    [isLike, setIsLike] = useState(false),
    onLikeButtonClick = () => {
      setLike(like + (isLike?-1:1));
      setIsLike(!isLike);
    };
    return(
        <Contain>
        <Card onClick={toDetail} style={{width:"30vw", display:"flex", flexDirection:"row", height:'15vw'}}>
              <Card.Img className='img' variant="top" src={(props.cardInfo.image)} style={{width:'20vw', height:'14vw'}}/>
              <Card.Body style={{padding:20}}>
                <Card.Title>{props.cardInfo.recipeT_title}</Card.Title>
                
                <div style={{display:"flex"}}>
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
                <div  onClick={() => setIsBooked(!isBooked)}>
                    {isBooked ? <BookmarkOutlinedIcon/> : <TurnedInNotOutlinedIcon />}
                </div>
                </div>
                {props.cardInfo.nick_name}<br/>
                
                
              </Card.Body>
              
        </Card>
        </Contain>
    )
}
export default communityCard

const Contain = styled.div`
    margin-left:1%;
    margin-right:1%;
    margin-bottom:5%;
`