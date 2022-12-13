import React, { useEffect, useState } from "react";

import axios from "axios";
import { getComments } from "./api";
import { useParams } from "react-router-dom";
import { Input, Button } from "antd"
import { RingLoader } from "react-spinners";
import { kServerIP, ServeIP } from "../IP";
import styled from "styled-components";
import { useRef } from "react";

const { TextArea } = Input

export default function CommentForm (props) {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const {csRecipeId} = useParams();
  const [page, setPage] = useState(1);
    let timeInterver = '';
  const [copy, setCopy] = useState([]);
  const [time, setTime] = useState();
  const [key, setKey] = useState("");
  const [modi, setModi] = useState(false)
  const [modinum, setModinum] = useState();



  function handleFocus(i){
    const formdata = new FormData();
    formdata.append('rp_num', i);
    formdata.append('rp_content', document.getElementById('testA').value);
    formdata.append('csRecipeId', csRecipeId);

    axios({
      method:'POST',
      url: `${kServerIP}/CustomRecipeReply/register`,
      data: formdata,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
    window.location.reload();
  }
  const InputText = (e) => {
    setComment(e.target.value)
    console.log(comment);
  }
  const accesstoken = sessionStorage.getItem("ACCESS_TOKEN");
  const delet = (i) => {
    axios({
      method: 'DELETE',
      url: `${kServerIP}/CustomRecipeReply/remove`,
      data: 
      {
        csRecipeId : csRecipeId,
        rp_num: i
      }
      ,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    window.location.reload();
  }

  const modify = (i) =>{
    setModinum(i)
    setModi(true)
  }

  useEffect(() => {
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios.post(`${ServeIP}/profile`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(function (res) {
        console.log("sd");
        if (res.status === 200) {
          console.log(res.data);
          setProfile(res.data.userEmail)
          // return response.json();
        } else if (res.status === 403) {
          //window.location.href = "/login"; // redirect
        } else {
          new Error(res);
        }
      });
    }
  }, [accessToken]);

  const commit = () =>{
    const formData = new FormData();
    formData.append('rp_content', comment);
    formData.append('csRecipeId', csRecipeId);

    axios({
      method:'POST',
      url: `${kServerIP}/CustomRecipeReply/register`,
      data: formData,
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    })
    window.location.reload();
  }
  console.log(comment)

  const loadComments = async (page) => {
    try {
      setLoading(true)
      console.log(comments)
      console.log(page)
      const temp = await getComments(page, 2, props.recipe_id);
      const tempComments = comments.concat(temp.content);
      const copyComments = temp;
      console.log(tempComments)
      setCopy(copyComments)
      setComments(tempComments)
    } catch (e) {
      console.error(e);
    }
 
  };

  useEffect(() => {
    loadComments(page);
  }, [page]);
<<<<<<< HEAD

  const scrollEvent = () => {
=======
  console.log(comments);
  const scrollEvent = ()=>{
>>>>>>> 942eaa9 (reply)
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log('scrollTop: ',scrollTop)
    console.log('clientHeight: ',clientHeight)
    console.log('scrollHeight: ' ,scrollHeight)
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      setPage(page + 1);
    }
  }
 
  const handleScroll = () => {
    clearTimeout(timeInterver);
    timeInterver = setTimeout(scrollEvent, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    {content}
    return () => {
      window.removeEventListener("scroll", handleScroll);
     
    };
  });

  let content = (
    <div style={{ position: "absolute", marginLeft: "45vw", marginTop: 200 }}>
      <RingLoader
        color="hsla(168, 67%, 53%, 1)"
        size={200}
        speedMultiplier={1}
      />
    </div>
  );

  // 가져온 글에 맞게 수정
  console.log(profile);
  // console.log(comments.writer.userEmail)
    return(
        <div>
          <TextArea value={comment} onPressEnter={commit} onChange={InputText} style={{width:'600px', radius: '30'}}/>
          <Button style={{backgroundColor:'green', border:'none', height:55}} type="primary"  onClick={commit}>Enter</Button>
            {comments.map((item, key) => (
            <div style={{marginTop:'30px'}}>
            <BoxLayout>
              <div>
                <TextLayout ai={"center"}>
                  <div style={{ height: "21px", marginRight: "12px", display:'flex' }}>
                    <Imagepro>
                      <img src={item.writer.img} style={{borderRadius:'40px'}}/>
                    </Imagepro>
                    <div style={{marginTop:'8%'}}>
                      <h5 style={{color:'red'}}>{item.writer.nickName}</h5>
                    </div>
                  </div>
                
              </TextLayout>
              
              <div style={{textAlign:'center', marginTop:'4%'}} ht={21} mb={3} ai={"left"}>
                <h6>{item.rp_content}</h6>
              </div>
              {
              item.writer.userEmail === profile
               ? 
              <div style={{marginLeft:'70%', marginTop:'20px'}}>
                <a onClick={() => modify(item.rp_num)} style={{marginRight:30}}>MODIFY</a><a onClick={() => delet(item.rp_num)}>DELETE</a>
              </div>
                :
                ""
              }
              </div>
            </BoxLayout>
              {modi && modinum === item.rp_num ? 
                <div style={{width:'500px', display:'flex', gap:30}}>                
                  <img src={item.writer.img} style={{borderRadius:'50%', width:'10%', height:'10%'}}/>
                  <TextArea id="testA" defaultValue={item.rp_content}/>
                  <Button style={{backgroundColor:'green', border:'none', height:55}} type="primary"  onClick={() => handleFocus(item.rp_num)}>MODIFY</Button>
                </div>
                    :
                ""
              }
        </div>
            ))}
        {loading && !copy.last  ? content : ""}
        </div>
        
    )
}

const BoxLayout = styled.div`
  background: #f8f9fa;
  width: 500px;
  height: 100px;
  border: 0.5px solid #ced4da;
  box-sizing: border-box;
  border-radius: 20px;
  margin-bottom: 12px;
  position: flex;
`;
const TextLayout = styled.div`
  width: 100%;
  height: ${(props) => props.ht}px;
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => props.ai};
  margin-bottom: ${(props) => props.mb}px;
  font-size: 18px;
`;
const TextBodyLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => props.ai};
  margin-bottom: ${(props) => props.mb}px;
  font-size: 18px;
`;
const Imagepro = styled.div`
  border-radius: 20px;
  width: 30%;
  margin:2%;
`
