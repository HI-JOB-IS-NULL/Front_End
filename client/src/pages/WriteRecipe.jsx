import React, { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import DetailList from '../components/DetailList';
import 'antd/dist/antd.css';
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
import { ServeIP } from '../IP';

// const { TextArea } = Input;

const WriteRecipe = () => {
  const [countList, setCountList] = useState([0])

const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)	
    setCountList(countArr)
}

const onDeleteDiv = () => {
  console.log(countArr);
}

  const [name, setName] = useState('');
  const [recipeName, setrecipeName] = useState('');
  const [recipeTime, setRecipeTime] = useState('');
  const [recipeExplan, setRecipeExplan] = useState('');
  const [Image, setImage] = useState();

  const InputName = (e) =>{
    setName(e.target.value)
    console.log(name)
  }

  const InputRecipe = (e) => {
    setrecipeName(e.target.value)
    console.log(recipeName)
  }

  const InputTime = (e) => {
    setRecipeTime(e.target.value)
    console.log(recipeTime)
  } 
  console.log(recipeTime)
  const InputExplan = (e) => {
    setRecipeExplan(e.target.value)
    console.log(recipeExplan)
  }

  const InputImage = (e) => {
    
    //console.log(e.target);
    console.log(e);
    console.log(e.fileList);
   // const ImageList = e.target.files;
    //e.file.status='done';
    //console.log(ImageList);
    //const UrlList = [...Image];
    // for (let i = 0; i < ImageList.length; i+=1){
    //   // const nowImage = URL.createObjectURL(ImageList[i]);
    //   // UrlList.push(nowImage);
    //   Image.push(e.target.files[0])
    //   setImage(Image=>[...Image]);
    // }
  
    const ImageList=e.file;
    
    // for(let i =0;i<ImageList.lenght;i+=1){
    //   Image.push(e.file);
    
    // }
    // if(e.file.status=='error'){
    //   setImage(e.file);
    // }
    // Image.push(e.file);
    setImage(Array.from(e.fileList));
   // setImage(UrlList);
   // setImage(ImageList[0]);
   console.log(Image)
   console.log(e.file.status);
 
  }





  const onsubmit = (e) => {
    console.log("start")
    console.log(Image);
    console.log(typeof Image);
    console.log(Image[0]);
    e.preventDefault();
    const formData = new FormData();

    formData.append('user_email', name);
    console.log(name);
    console.log(e);
    console.log(e.target.value)
    formData.append("recipeT_title", recipeName);
    // formData.append("time", recipeTime);
    formData.append("recipe_content", recipeExplan);
    //formData.append("uploadFiles",Image);
    //formData.append("uploadFiles",Image[0]);
    Image.forEach((item) =>{
      formData.append("uploadFiles",item.originFileObj)
      console.log('item',item.originFileObj)
    })
    // Array.from(Image).forEach((item) =>{
    //   formData.append('uploadFiles',item)
    //   console.log('item',item)
    //   console.log(formData.get('uploadFiles'));
    // })
    // for(let i=0;i<Image.length;i++){
    //   formData.append("uploadFiles",Image[i]);
    // }

    // Image.map((item)=>{
    //   console.log(typeof item);
    //   formData.append(`uploadFiles`,item)
      
    // });

    //a formData.append('uploadFiles',Image);

    console.log(formData.get('nick_name'));
    console.log(formData.getAll('uploadFiles'));
    

    

      axios({
        method: 'POST',
        url: `${ServeIP}/CustomRecipe/register`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if(formData != null){
        window.location.href="/community"
      }
  };


  return (
    <Container>
      <h2>Introduce your Recipe</h2>
      <br/>
      <Form  id='formData' onSubmit={onsubmit} style={{justifyContent:"center", width:"40%"}}>
          <p>nick Name</p>
          <Input style={{marginBottom:30}} name="name" value={name} onChange={InputName}/>
          <p>recipe Name</p>
          <Input style={{marginBottom:30}} name="recipe" value={recipeName} onChange={InputRecipe}/>   

          <p>cooking Time</p>
          <Select name="time" onSelect={InputTime} placeholder="How long take" style={{marginBottom:30}}>
            <Select.Option value="5">5 min</Select.Option>
            <Select.Option value="10">10 min</Select.Option>
            <Select.Option value="30">30 min</Select.Option>
            <Select.Option value="60">1 hour</Select.Option>
          </Select>

          <p>recipe Explan (write in order)</p>
          {/* <TextArea name="explan" rows={4} onChange={InputExplan} placeholder="Please explain in 4 lines" style={{marginBottom:30}}/> */}
          <CreateListDiv>
            <DetailList countList={countList} />
            <div style={{display:"flex", gap:'1vw'}}>
            <Button onClick={onAddDetailDiv}>
              add
            </Button>
            <Button onClick={onDeleteDiv}>
              delete
            </Button>
            </div>
          </CreateListDiv>
          <p>recipe Image</p>
          {/* <span onChange={InputImage}> */}
          <Upload name="img"
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
              >
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
          {/* </span> */}
          <center style={{marginTop:'8%'}}>
          <Button onClick={onsubmit} style={{marginBottom:'10%'}} type='submit'>Recipe Share</Button>
          </center>
      </Form>
    </Container>
  );
};


export default WriteRecipe;

const Container = styled.div`
  margin-top: 8%;
  margin-left: 38%
`
const CreateListDiv = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`