import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import { Tabs } from "antd";
import SearchWithDiets from "../components/SearchWithDiets";
import SearchWithIngredients from "../components/SearchWithIngredients";
import SearchWithAllergies from "../components/SearchWithAllergies";
import SearchWithCuisines from "../components/searchWithCuisines";
import { kServerIP } from "../IP";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function SearchRecipes() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const { recipeQuery } = useParams();
  const [showAd, setShowAd] = useState(true);
  const [query, setQuery] = useState(recipeQuery);
  const [showFilter, setShowFilter] = useState(false);
  const [tabKey, setTabKey] = useState(10);
  const [data, setData] = useState();
  const [showUploadImg, setshowUploadImg] = useState(false);
  const [image, setImage] = useState();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    withIng: "",
    withoutIng: "",
    diet: "",
    allergies: "",
    inCuisines: "",
    exCuisines: "",
  });
  console.log(formData);
  console.log(query);

  useEffect(() => {
    console.log("search recipe");
    const filterData = new FormData();
    filterData.append("query", query);
    const excludeIngredients = formData.withoutIng.toString();
    filterData.append("excludeIngredients", excludeIngredients);
    const includeIngredients = formData.withIng.toString();
    filterData.append("includeIngredients", includeIngredients);
    const intolerances = formData.allergies.toString();
    filterData.append("intolerances", intolerances);
    filterData.append("diet", formData.diet);
    const cuisine = formData.inCuisines.toString();
    filterData.append("cuisine", cuisine);
    const excludeCuisine = formData.exCuisines.toString();
    filterData.append("excludeCuisine", excludeCuisine);

    accessToken
      ? axios({
          method: "post",
          url: `${kServerIP}/RecipeDB/searchRecipes`,
          data: filterData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => {
          console.log(res);
          setData(res);
        })
      : axios({
          method: "post",
          url: `${kServerIP}/RecipeDB/nser/searchRecipes`,
          data: filterData,
        }).then((res) => {
          console.log(res);
          setData(res);
        });
  }, [formData, query]);

  const InputImage = (e) => {
    setImage(Array.from(e.fileList));
  };

  // const uploadImg = () => {
  //   console.log("search recipe with image");
  //   const imageData = new FormData();
  //   image.forEach((item) => {
  //     imageData.append("uploadFile", item.originFileObj);
  //   });
  //   accessToken
  //     ? axios({
  //         method: "post",
  //         url: `${kServerIP}/RecipeDB/foodImageClassification`,
  //         data: imageData,
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }).then(function (res) {
  //         console.log(res);
  //         setData(res);
  //         setQuery(res.data.query);
  //         console.log(res.data.query);
  //       })
  //     : axios({
  //         method: "post",
  //         url: `${kServerIP}/RecipeDB/nser/foodImageClassification`,
  //         data: imageData,
  //       }).then(function (res) {
  //         console.log(res);
  //         setData(res);
  //         setQuery(res.data.query);
  //       });
  // };

  async function uploadImg() {
    console.log("search recipe with image");
    const imageData = new FormData();
    image.forEach((item) => {
      imageData.append("uploadFile", item.originFileObj);
    });
    accessToken
      ? await axios({
          method: "post",
          url: `${kServerIP}/RecipeDB/foodImageClassification`,
          data: imageData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then(function (res) {
          console.log(res);
          setData(res);
          // setQuery(res.data.query);
          // console.log(res.data.query);
        })
      : await axios({
          method: "post",
          url: `${kServerIP}/RecipeDB/nser/foodImageClassification`,
          data: imageData,
        }).then(function (res) {
          console.log(res);
          setData(res);
          // setQuery(res.data.query);
        });
    setQuery(data.data.query);
    console.log(data.data.query);
  }

  const cards = data?.data.results.map((item) => {
    return <Card key={item.id} {...item} />;
  });
  return (
    <Container>
      <div className="search-tools">
        <div className="serch-box">
          <SearchBar
            placeholder="Search Recipes"
            setNavigate={false}
            inputData={query}
            changeQuery={(query) => setQuery(query)}
          />
        </div>
        <div className="filter">
          <span
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              borderRight: " 1px solid #bababa",
              paddingRight: "20px",
              cursor: "pointer",
            }}
            onClick={() => setShowFilter(true)}
          >
            Filter
          </span>
          <span
            style={{
              color: "green",
              fontSize: "15px",
              cursor: "pointer",
              marginRight: "auto",
            }}
            onClick={() => {
              setTabKey(tabKey + 1);
              setFormData({
                withIng: "",
                withoutIng: "",
                diet: "",
                allergies: "",
                inCuisines: "",
                exCuisines: "",
              });
            }}
          >
            Reset
          </span>
          <span
            style={{
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={() => setshowUploadImg(true)}
          >
            Find Recipe with Image
          </span>
        </div>
        {showFilter && (
          <div className="filter-tabs">
            <Tabs key={tabKey}>
              <Tabs.TabPane tab="INGREDIENTS" key="ingredients">
                <SearchWithIngredients setFormData={setFormData} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="DIETS" key="diets">
                <SearchWithDiets setFormData={setFormData} filterValue="diet" />
              </Tabs.TabPane>
              <Tabs.TabPane tab="ALLERGIES" key="allergies">
                <SearchWithAllergies
                  setFormData={setFormData}
                  filterValue="allergies"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="INCLUDE CUISINES" key="includeCuisines">
                <SearchWithCuisines
                  setFormData={setFormData}
                  filterValue="inCuisines"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="EXCLUDE CUISINES" key="excludeCuisines">
                <SearchWithCuisines
                  setFormData={setFormData}
                  filterValue="exCuisines"
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        )}
        {showUploadImg && (
          <div style={{ width: "100%" }}>
            <div className="upload-image">
              <Upload listType="picture-card" onChange={InputImage}>
                <div>
                  <PlusOutlined />
                </div>
              </Upload>
              <button className="simple-button" onClick={uploadImg}>
                Upload Image
              </button>
            </div>
          </div>
        )}
        {showAd && (
          <div className="search-pantry">
            <p className="normal-text">
              Loking for recipes you can make today without a trip to the store?
            </p>
            <div className="search-pantry-buttons ">
              <button
                className="green-button"
                onClick={() => navigate("/readyToCook")}
              >
                Yes, Find Pantry Ready Recipes
              </button>
              <button className="green-button" onClick={() => setShowAd(false)}>
                No, I'm Looking for Inspiration
              </button>
            </div>
          </div>
        )}
        <section className="cards--list" style={{ width: "100%" }}>
          {cards}
        </section>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search-tools {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 130px 300px 0;
    gap: 30px;
    align-items: center;
    .serch-box {
      display: flex;
    }
    .filter {
      display: flex;
      gap: 20px;
      border-bottom: 2px solid #e3e3e3;
      padding: 10px 0;
      width: 100%;
    }
    .filter-tabs {
      width: 100%;
    }
    .search-pantry {
      width: 100%;
      background-color: #f5f5f5;
      padding: 32px 0 32px 40px;
      /* width: calc(100% - 40px); */
      .search-pantry-buttons {
        display: flex;
        flex-direction: row;
        gap: 30px;
      }
    }
  }
`;
