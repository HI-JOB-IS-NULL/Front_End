import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import DetailList from '../components/DetailList';
import 'antd/dist/antd.css';
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Spin,
} from 'antd';
import axios from 'axios'
import Item from 'antd/lib/list/Item';
import { ServeIP, kServerIP } from '../IP';
import { useEffect } from 'react';

const { TextArea } = Input;

export default function ModifyWrite(){
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const {csRecipeId} = useParams();
  const [name, setName] = useState('');
  const [recipeName, setrecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState();
  const [recipeExplan, setRecipeExplan] = useState();
  const [Image, setImage] = useState([]);
  const [countList, setCountList] = useState([0])
  const [text, setText] = useState([]);
  const [info, setInfo] = useState([]);
  const [defaultImg, setDefaultImg] = useState([]);
  const [arr, setArr] = useState([]);
  const [sibal, setSibal] = useState();
  const [getImage, setGetImage] = useState();

console.log(defaultImg)

  const onAddDetailDiv = () => {
    const temp = [...recipeExplan].join('')
    text.push(temp);
    console.log(text);

    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)	
    setCountList(countArr)
  }
  console.log(text);

  // const InputName = (e) =>{
  //   setName(e.target.value)
  //   console.log(name)
  // }

  // const InputRecipe = (e) => {
  //   setrecipeName(e.target.value)
  //   console.log(recipeName)
  // }

  const InputTime = (e) => {
    setRecipeTime(e.target.value)
    console.log(recipeTime)
  } 

  // const InputExplan = (e) => {
  //   setRecipeExplan(Array.from(e.target.value))
  //   console.log(recipeExplan);
  // }

  const InputImage = (e) => {
    console.log(e.file.uid)
    let temp = e.file.originFileObj;
    if(Image.length == 0){
      Image.push(temp);
    }
    for(let i = 0; i < Image.length; i++){
      if(Image[i].uid !== e.file.uid){
        Image.push(temp);
      }
    }
    console.log(Image)
  }
  
  const DELETE = () => {
    window.location.reload();
  }
console.log(getImage)


//전송
  const onsubmit = (e) => {
    const temp = [...recipeExplan].join('')
    text.push(temp);
    console.log(text)

    e.preventDefault();
    const formData = new FormData();
    formData.append('user_email', name);
    formData.append("recipeT_title", recipeName);
    for(let i = 0; i < text.length; i++){
      formData.append("recipe_content", text[i])
    }
    //수정 후 사진
    Image.forEach((item) => {
      formData.append("uploadFiles", item)
    })

    //수정 전 사진
    // getImage.forEach((item) => {
    //   console.log(item)
    //   formData.append("defaultUploadImgResult", item)
    // })

    // 탈출구
    let plz = JSON.stringify(getImage);
    formData.append("defaultUploadImgResult", plz);
    
    console.log(formData.get('recipe_content'))

    console.log(formData.get('uploadFiles'))

    console.log(formData.get('recipeT_title'))
    console.log(formData.get('user_email'))
    console.log(formData.get('defaultUploadImgResult'))

      axios({
        method: 'POST',
        url: `${kServerIP}/CustomRecipe/modify`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      if(formData != null){
        // window.location.href="/community"
      }
  };
console.log(getImage)
console.log(defaultImg)

  useEffect(()=>{
    axios
    .get(
      `${ServeIP}/CustomRecipe/nser/get?csRecipeId=${csRecipeId}`
    )
    .then((res) => {
      console.log(res.data.uploadImgResult)
      setInfo(res.data)
      setName(res.data.nick_name)
      setrecipeName(res.data.recipeT_title)
      for(let i =0; i<res.data.uploadImgResult.length; i++){
        defaultImg.push
        (
        {
          name: res.data.uploadImgResult[i].fileName,
          url: res.data.uploadImgResult[i].realImageUrl,
          status:'done'
        }
        )
        setGetImage(res.data.uploadImgResult)
      }
      let temp = res.data.recipe_content;
      let tem = (temp.split(","))
      setSibal(temp);
      setRecipeExplan(temp)
      console.log(tem)    
    })
  }, [])

console.log('get',getImage)

console.log('defalut',defaultImg)

  const Hoho = () =>{
    const form = Form.useFormInstance();
    form.setFieldsValue({'nick_name': info.nick_name, 'title': info.recipeT_title, 'explan': sibal});
    setName(form.getFieldValue('nick_name'))
    setrecipeName(form.getFieldValue('title'))
    setRecipeExplan(form.getFieldValue('explan'))
    return <Button onClick={onsubmit} style={{marginBottom:'4%'}} type='submit'>Recipe Share</Button>
  }
console.log(name)
console.log(info)
    return(
        <Container>
      <h2>Introduce your Recipe</h2>
      <br/>
      <Form  id='formData' onSubmit={onsubmit} style={{justifyContent:"center", width:"40%"}}>
          <p>nick Name</p>
          <Form.Item
          name='nick_name'>
            <Input  style={{marginBottom:30}} />
          </Form.Item>
          <p>recipe Name</p>
          <Form.Item
          name='title'>
            <Input style={{marginBottom:30}} name="recipe"/>   
          </Form.Item>
          <p>cooking Time</p>
          <Select name="time" onChange={InputTime} value={recipeTime} placeholder="How long take" style={{marginBottom:30}}>
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
          </Select>

      <div style={{width:'auto'}}>
        <div>
          <p>recipe Explan (write in order)</p>
          <CreateListDiv >
            <DetailDiv>
              {console.log(countList)}
              {countList.map((item, i) => (         
                   i == 0 ? 
                  <div>
                    <Form.Item name='explan' key={i}>
                    <TextArea  autoSize={{ minRows: 4, maxRows: 6 }}/> 
                    </Form.Item> 
                  </div>
                  :
                  <TextArea  autoSize={{ minRows: 4, maxRows: 6 }}/>   
              ))}
            </DetailDiv>
            <div style={{display:"flex", gap:'1vw'}}>
              <Button onClick={onAddDetailDiv}>ADDTEXT</Button>
              <Button onClick={DELETE}>DELETE</Button>
            </div>
          </CreateListDiv>
        </div>
     
        {/* <div style={{marginTop:'2.5vw'}}> */}
         {console.log(Image)}
          {/* <span onChange={InputImage}> */}
          {info && info.length!=0
          ? <Upload 
          style={{paddingTop:'10%'}}
          name="img"
          onChange={InputImage}
          type='file'
          listType="picture-card"
          accept=".png, .jpeg, .doc, .jpg" 
          beforeUpload={(file) => {
            console.log({file})
            return true;
          }}
            iconRender={() => {
              return <Spin></Spin>;
            }}   
            
          defaultFileList={defaultImg}
            >
              {console.log(info.uploadImgResult[0])}
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}>
                Upload
              </div>
            </div>
        </Upload>
          :null  
          }
         
          </div>
        {/* </div> */}
          {/* </span> */}
          <center style={{marginTop:'8%'}}>
          <Hoho className='Ho'/>
          </center>
          
      </Form>
    </Container>
  );
};

const Container = styled.div`
margin-top: 8%;
  margin-left: 38%`
const CreateListDiv = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const DetailDiv = styled.div`
div {
  width: 25vw;
}
`