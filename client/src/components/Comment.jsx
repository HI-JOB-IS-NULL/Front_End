import React, { useEffect, useState } from "react";
import Box from "./Box";
import axios from "axios";
import { getComments } from "./api";
import { useParams } from "react-router-dom";
import { Input, Button } from "antd"
import { RingLoader } from "react-spinners";
import { kServerIP, ServeIP } from "../IP";

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
  const InputText = (e) => {
    setComment(e.target.value)
    console.log(comment);
  }
  const accesstoken = sessionStorage.getItem("ACCESS_TOKEN");
  
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
      setCopy(copyComments)
      setComments(tempComments)
    } catch (e) {
      console.error(e);
    }
 
  };

  useEffect(() => {
    loadComments(page);
  }, [page]);

  const scrollEvent = () => {
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
  console.log(comments);
  console.log(copy)
    return(
        <div>
          <TextArea value={comment} onPressEnter={commit} onChange={InputText} style={{width:'600px'}}/>
          <Button style={{backgroundColor:'green', border:'none', height:55}} type="primary"  onClick={commit}>Enter</Button>
            {comments.map((item, key) => (
            <Box key={item.rp_num} id={item.nick_name} email={item.email} body={item.rp_content} user={profile}/>
            ))}
        {loading && !copy.last  ? content : ""}
        </div>
        
    )
}
