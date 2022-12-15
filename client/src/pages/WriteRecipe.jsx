import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import DetailList from "../components/DetailList";
import "antd/dist/antd.css";
import { Form, Input, Button, Select, Upload, Spin } from "antd";
import axios from "axios";
import Item from "antd/lib/list/Item";
import { ServerIP } from "../IP";

const { TextArea } = Input;

const WriteRecipe = () => {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [name, setName] = useState("");
  const [recipeName, setrecipeName] = useState("");
  const [recipeTime, setRecipeTime] = useState();
  const [recipeExplan, setRecipeExplan] = useState();
  const [Image, setImage] = useState();
  const [countList, setCountList] = useState([0]);
  const [text, setText] = useState([]);

  const onAddDetailDiv = () => {
    const temp = [...recipeExplan].join("");
    text.push(temp);
    console.log(text);

    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter);
    setCountList(countArr);
  };
  console.log(text);

  const InputName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const InputRecipe = (e) => {
    setrecipeName(e.target.value);
    console.log(recipeName);
  };

  const InputTime = (e) => {
    setRecipeTime(e.target.value);
    console.log(recipeTime);
  };

  const InputExplan = (e) => {
    setRecipeExplan(Array.from(e.target.value));
    console.log(recipeExplan);
  };

  const InputImage = (e) => {
    setImage(Array.from(e.fileList));
    console.log(Image);
    console.log(e.file.status);
  };
  console.log(Image);
  const DELETE = () => {
    window.location.reload();
  };

  const onsubmit = (e) => {
    const temp = [...recipeExplan].join("");
    text.push(temp);
    console.log(text);

    e.preventDefault();
    const formData = new FormData();
    formData.append("user_email", name);
    formData.append("recipeT_title", recipeName);

    // text.forEach((i) => {
    //   formData.append("recipe_content", text)
    // })
    for (let i = 0; i < text.length; i++) {
      formData.append("recipe_content", text[i]);
    }

    Image.forEach((item) => {
      formData.append("uploadFiles", item.originFileObj);
    });
    axios({
      method: "POST",
      // url: `${ServerIP}/CustomRecipe/register`,
      url: `${ServerIP}/CustomRecipe/register`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (formData != null) {
      window.location.href = "/community";
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <img
        style={{ objectFit: "cover", height: "400px", width: "1920px" }}
        src={bg_1}
      />
      <Container>
        <h2>Introduce your Recipe</h2>
        <br />
        <Form
          id="formData"
          onSubmit={onsubmit}
          style={{ justifyContent: "center", width: "40%" }}
        >
          <p>nick Name</p>
          <Input
            style={{ marginBottom: 30 }}
            name="name"
            value={name}
            onChange={InputName}
          />
          <p>recipe Name</p>
          <Input
            style={{ marginBottom: 30 }}
            name="recipe"
            value={recipeName}
            onChange={InputRecipe}
          />

          <p>cooking Time</p>
          <Select
            name="time"
            onChange={InputTime}
            value={recipeTime}
            placeholder="How long take"
            style={{ marginBottom: 30 }}
          >
            <option value="5">5 min</option>
            <option value="10">10 min</option>
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
          </Select>

          <div style={{ width: "auto", justifyContent: "center" }}>
            <div>
              <p>recipe Explan (write in order)</p>
              <CreateListDiv onChange={InputExplan}>
                <DetailList name="explane" countList={countList} />
                <div style={{ display: "flex", gap: "1vw", marginTop: "10%" }}>
                  <Button onClick={onAddDetailDiv}>ADDTEXT</Button>
                  <Button onClick={DELETE}>DELETE</Button>
                </div>
              </CreateListDiv>
            </div>
            <div style={{ marginTop: "2.5vw" }}>
              {/* <span onChange={InputImage}> */}
              <Upload
                style={{ paddingTop: "10%" }}
                name="img"
                onChange={InputImage}
                type="file"
                listType="picture-card"
                accept=".png, .jpeg, .doc, .jpg"
                beforeUpload={(file) => {
                  console.log({ file });
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
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </div>
          </div>
          {/* </span> */}
          <center style={{ marginTop: "8%" }}>
            <Button
              onClick={onsubmit}
              style={{ marginBottom: "4%" }}
              type="submit"
            >
              Recipe Share
            </Button>
          </center>
        </Form>
      </Container>
    </div>
  );
};

export default WriteRecipe;

const Container = styled.div`
  margin-top: 3%;
  margin-left: 38%;
`;
const CreateListDiv = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
