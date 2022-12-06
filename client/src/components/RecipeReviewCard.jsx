import React, { useState, useEffect, useCallback } from 'react';
import Card from './communityCard';
import styled from 'styled-components';
import axios from 'axios';
import { ServeIP } from '../IP';

// community데이터 받아오

// const cardInfo = 
// {
//     "dtoList":
//     [
//        {
//           "csRecipeId":202,
//           "user_email":"test10@gmail.com",
//           "nick_name":"USER10",
//           "recipeT_title":"수정 기능 테스트하는 타이틀",
//           "recipe_content":"수정 기능 테스트하는 내용",
//           "like_rate":0,
//           "recipe_category":"수정 기능 테스트하는 카테고리",
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:44:40.245575",
//           "modDate":"2022-11-17T10:44:40.245575",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
//              {
//                 "fileName":"다운로드 (1).jpeg",
//                 "uuid":"ed51680e-7c49-431c-9c9f-a3b27662f63f",
//                 "folderPath":"2022/11/17",
//                 "realImageUrl":"http://10.20.34.27:9111/getImages/2022/11/17/ed51680e-7c49-431c-9c9f-a3b27662f63f_다운로드 (1).jpeg"
//              },
//              {
//                 "fileName":"2368203D5651591C32.jpeg",
//                 "uuid":"ad6d7a2f-5ac2-4e72-b5b5-b5879d9986b8",
//                 "folderPath":"2022/11/17",
//                 "realImageUrl":"http://10.20.34.27:9111/getImages/2022/11/17/ad6d7a2f-5ac2-4e72-b5b5-b5879d9986b8_2368203D5651591C32.jpeg"
//              },
//              {
//                 "fileName":"main_img_05.jpg",
//                 "uuid":"bb351f8d-1827-43b8-83ee-33853b1d143a",
//                 "folderPath":"2022/11/17",
//                 "realImageUrl":"http://10.20.34.27:9111/getImages/2022/11/17/bb351f8d-1827-43b8-83ee-33853b1d143a_main_img_05.jpg"
//              }
//           ]
//        },
//        {
//           "csRecipeId":201,
//           "user_email":"test99@gmail.com",
//           "nick_name":"USER99",
//           "recipeT_title":"customRecipe 테스트 제목입니다99",
//           "recipe_content":"customRecipe 테스트 내용입니다99",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.955594",
//           "modDate":"2022-11-17T10:41:29.955594",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":200,
//           "user_email":"test98@gmail.com",
//           "nick_name":"USER98",
//           "recipeT_title":"customRecipe 테스트 제목입니다98",
//           "recipe_content":"customRecipe 테스트 내용입니다98",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.899973",
//           "modDate":"2022-11-17T10:41:29.899973",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":199,
//           "user_email":"test97@gmail.com",
//           "nick_name":"USER97",
//           "recipeT_title":"customRecipe 테스트 제목입니다97",
//           "recipe_content":"customRecipe 테스트 내용입니다97",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.819356",
//           "modDate":"2022-11-17T10:41:29.819356",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":198,
//           "user_email":"test96@gmail.com",
//           "nick_name":"USER96",
//           "recipeT_title":"customRecipe 테스트 제목입니다96",
//           "recipe_content":"customRecipe 테스트 내용입니다96",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.760404",
//           "modDate":"2022-11-17T10:41:29.760404",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":197,
//           "user_email":"test95@gmail.com",
//           "nick_name":"USER95",
//           "recipeT_title":"customRecipe 테스트 제목입니다95",
//           "recipe_content":"customRecipe 테스트 내용입니다95",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.700098",
//           "modDate":"2022-11-17T10:41:29.700098",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":196,
//           "user_email":"test94@gmail.com",
//           "nick_name":"USER94",
//           "recipeT_title":"customRecipe 테스트 제목입니다94",
//           "recipe_content":"customRecipe 테스트 내용입니다94",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.63856",
//           "modDate":"2022-11-17T10:41:29.63856",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":195,
//           "user_email":"test93@gmail.com",
//           "nick_name":"USER93",
//           "recipeT_title":"customRecipe 테스트 제목입니다93",
//           "recipe_content":"customRecipe 테스트 내용입니다93",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.584759",
//           "modDate":"2022-11-17T10:41:29.584759",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":194,
//           "user_email":"test92@gmail.com",
//           "nick_name":"USER92",
//           "recipeT_title":"customRecipe 테스트 제목입니다92",
//           "recipe_content":"customRecipe 테스트 내용입니다92",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.528917",
//           "modDate":"2022-11-17T10:41:29.528917",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        },
//        {
//           "csRecipeId":193,
//           "user_email":"test91@gmail.com",
//           "nick_name":"USER91",
//           "recipeT_title":"customRecipe 테스트 제목입니다91",
//           "recipe_content":"customRecipe 테스트 내용입니다91",
//           "like_rate":0,
//           "recipe_category":null,
//           "cr_hits":0,
//           "replyCount":0,
//           "regDate":"2022-11-17T10:41:29.474053",
//           "modDate":"2022-11-17T10:41:29.474053",
//           "thumbnail_url":null,
//           "uploadFiles":null,
//           "uploadImgResult":[
             
//           ]
//        }
//     ],
//     "totalPage":21,
//     "page":1,
//     "size":10,
//     "start":1,
//     "end":10,
//     "prev":false,
//     "next":true,
//     "pageList":[
//        1,
//        2,
//        3,
//        4,
//        5,
//        6,
//        7,
//        8,
//        9,
//        10
//     ]
//  }

export default function GridExample(props) {
   const [posts, setPosts] = useState([]);  
   const [copyPosts, setCopyPosts] = useState([]);
   

   useEffect(() => {
       if(!props.url){
           axios({
               method: 'GET',
               url:`${ServeIP}/CustomRecipe/list?page=`+props.info
       }).then(response => setPosts(response.data.dtoList))
       }
       else{
           axios({
               method: 'GET',
               url:props.url
           }).then(response => setCopyPosts(response.data.dtoList))
       }
   }, [props])

   return (
       <Container>
           <div style={{display:"flex", flexWrap:"wrap"}}>
               {posts && !props.url ?
                   posts.map((a, i) => { 
                       return <Card cardInfo={posts[i]}/>
                   })
               :
                   copyPosts.map((a, i) =>{
                       return <Card cardInfo={copyPosts[i]}/>
                   })
               }
               {console.log(copyPosts)}
           </div>
       </Container>
   )
}


const Container = styled.div`
   width:auto;
   flex-wrap: wrap;
   display:block;
`