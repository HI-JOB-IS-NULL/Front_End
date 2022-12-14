import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AdCard from "../components/AdCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IngredientsData from "../IngredientsData";
import {
  FloatingButtonWithImage,
  FloatingButton,
} from "../components/FloatingButtons";
import axios from "axios";
import Card from "../components/Card";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImageAnalyzResult from "../components/ImageAnalyzResult";
import Spinner from "react-bootstrap/Spinner";
import { ServerIP } from "../IP";
import bg_1 from "../../public/assets/bg_1.jpg";

export default function PantryReadyRecipes() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [showUploadImg, setShowUploadImg] = useState(false);
  const [image, setImage] = useState();
  const [imageResult, setImageResult] = useState();
  const [uploadIsClicked, setUploadIsClicked] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    if (ingredientsData.length === 0) {
      setIngredientsData(IngredientsData);
    }
  }, []);
  console.log(tags);
  useEffect(() => {
    const ingredientsData = new FormData();
    const ingredientsArr = tags.map((tag) => {
      return tag.name;
    });
    const ingredients = ingredientsArr.toString();
    ingredientsData.append("includeIngredients", ingredients);
    axios({
      method: "post",
      url: `${ServerIP}/RecipeDB/nser/searchRecipes`,
      data: ingredientsData,
    }).then(function (res) {
      console.log(res);
      setData(res);
    });
  }, [tags]);

  useEffect(() => {
    if (accessToken) {
      axios({
        method: "post",
        url: `${ServerIP}/auth/recipeBookMarkList`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res.data.BookMarkList);
        setBookmarkList(res.data.BookMarkList);
      });
    }
  }, []);

  const cards = data?.data.results.map((item) => {
    return (
      <Card
        key={item.id}
        {...item}
        bookMark={
          bookmarkList.some((bookmark) => {
            return bookmark.recipe_id === item.id.toString();
          })
            ? true
            : false
        }
      />
    );
  });

  function addTags(item) {
    setTags([...tags, { id: item.id, name: item.name, image: item.image }]);
    removeFromData(item);
  }

  function removeFromData(item) {
    setIngredientsData(
      ingredientsData.filter((element) => element.id !== item.id)
    );
  }

  function removeFromTags(item) {
    setTags(tags.filter((element) => element.id !== item.id));
    if (item.id < 50) addData(item);
  }

  function addData(item) {
    setIngredientsData([
      ...ingredientsData,
      { id: item.id, name: item.name, image: item.image },
    ]);
  }

  const InputImage = (e) => {
    setImage(Array.from(e.fileList));
  };

  const handleUploadClick = () => {
    uploadImg();
    setUploadIsClicked(true);
  };

  const uploadImg = () => {
    const imageData = new FormData();
    image.forEach((item) => {
      imageData.append("uploadFile", item.originFileObj);
    });
    axios({
      method: "post",
      url: `${ServerIP}/RecipeDB/nser/ingredientDetection`,
      data: imageData,
    }).then(function (res) {
      console.log(res);
      res.data.map((item, index) => {
        console.log(item.detectionList[0].name);
        setTags((prevState) => [
          ...prevState,
          {
            id: item.detectionList[0].ingredientNum,
            name: item.detectionList[0].name,
            image: null,
          },
        ]);
      });

      setImageResult(res);
    });
  };
  console.log(imageResult);

  return (
    <Container>
      <img
        style={{
          objectFit: "cover",
          height: "400px",
          width: "1920px",
          marginTop: "5%",
        }}
        src={bg_1}
      />
      <div
        style={{
          marginLeft: "80%",
          position: "absolute",
          zIndex: "10",
          marginTop: "4%",
        }}
      >
        <AdCard />
      </div>
      <div className="pantry-ready-page">
        <div className="pantry-ready-content">
          <h1 className="pantry-ready-title bold">Cook with what you have</h1>
          <p className="pantry-ready-description normal-text">
            Don't want to go to the store? No problem! Enter the ingredients you
            have on hand, and we'll show you recipes you could make. For best
            results, enter 10 or more ingredients below, including staples like
            salt, pepper, and olive oil.
          </p>
        </div>
        <div className="upload-image-button">
          <button
            className="green-button"
            onClick={() => setShowUploadImg(true)}
          >
            Upload Your Ingredients image to find your recipe easily
          </button>
        </div>
        {showUploadImg && (
          <div className="search-with-image">
            <div className="upload-image">
              <Upload listType="picture-card" onChange={InputImage}>
                <div>
                  <PlusOutlined />
                </div>
              </Upload>
              <button className="simple-button" onClick={handleUploadClick}>
                Upload Image
              </button>
            </div>
            <div className="show-image-result">
              {uploadIsClicked && imageResult === undefined && (
                <Spinner variant="success" />
              )}
              {imageResult != undefined
                ? imageResult.data.map((item, index) => {
                    return (
                      <ImageAnalyzResult
                        key={index}
                        {...item}
                        setTags={setTags}
                        tags={tags}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        )}
        <div className="pantry-ingredient-search">
          <div className="search-header">
            <div
              className="pantry-ingredient-suggest-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={` ${isFocused ? "active" : ""} suggest-form `}>
                <div className="ingredient-suggest-container">
                  <input
                    type="text"
                    placeholder="Enter your ingredients"
                    className="ingredient-suggest-input bold"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      if (!isHovered) setIsFocused(false);
                    }}
                  />
                  <div className="suggestion-container">
                    <div className="search-bubbles-section">
                      <div className="pantry-suggest-tooltip"></div>
                      <p className="search-bubble-title micro-caps bold">
                        Suggested Ingredients
                      </p>
                      <div className="search-bubbles">
                        {ingredientsData.map((item) => {
                          return (
                            <div key={item.id} onClick={() => addTags(item)}>
                              <FloatingButtonWithImage {...item} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {isFocused ? (
                  <SearchOutlinedIcon
                    fontSize="big"
                    className="input-icon y-icon"
                  />
                ) : (
                  <AddCircleOutlineOutlinedIcon
                    fontSize="small"
                    className="input-icon y-icon"
                  />
                )}
                <HighlightOffOutlinedIcon
                  fontSize="small"
                  className={` ${isFocused ? "display" : ""} close-icon y-icon`}
                  onClick={() => setIsFocused(false)}
                />
              </div>
            </div>
            <h4 className="pantry-ingredients-title micro-text bold">
              Your Pantry Ingredients
            </h4>
            <div className="pantry-ingredient-list-wrapper">
              <div className="pantry-ingredient-list">
                {tags.map((tag) => (
                  <div onClick={() => removeFromTags(tag)}>
                    <FloatingButton key={tag.id} name={tag.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cards--list">{cards}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .pantry-ready-page {
    margin: 90px auto 32px;
    max-width: 1340px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 80px;

    .pantry-ready-content {
      .pantry-ready-title {
        margin-bottom: 32px;
        font-size: 40px;
      }
      .pantry-ready-description {
        max-width: 75%;
        margin-bottom: 32px;
      }
    }

    .search-with-image {
      margin-top: 40px;

      .upload-image {
        display: flex;
        flex-direction: column;

        gap: 10px;
        margin-right: 20px;
      }
      .show-image-result {
        max-height: 400px;
        overflow-y: auto;
        margin-top: 30px;
      }
    }

    .pantry-ingredient-search {
      padding: 40px 0;
      border-bottom: 2px solid #f5f5f5;
      margin-bottom: 50px;
      .search-header {
        .pantry-ingredient-suggest-wrapper {
          position: relative;

          .suggest-form {
            width: 310px;
            max-width: 100%;
            background: #fff;
            border-radius: 50px;
            display: flex;
            transition: width 400ms;
            overflow: hidden;
            box-shadow: 0 0 14px rgb(0 0 0 / 8%);
            position: relative;
            z-index: 3;
            align-items: center;
          }

          .active {
            width: 642px;
            overflow: visible;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .ingredient-suggest-container {
            order: 2;
            width: 100%;
            position: relative;
            display: inline-block;
            .ingredient-suggest-input {
              box-sizing: border-box;
              background: #fff;
              border: 0;
              font-size: 14px;
              width: 100%;
              padding: 10px 30px 10px 45px;
              outline: none;
              transition: border 400ms ease-in, box-shadow 400ms ease-in;
            }
            .suggestion-container {
              box-shadow: 0 18px 14px rgb(0 0 0 / 8%);
              position: absolute;
              background: #fff;
              width: 100%;
              .search-bubbles-section {
                .search-bubble-title {
                  padding: 0 24px 16px;
                  margin: 16px 0;
                  color: #bababa;
                }
                .search-bubbles {
                  max-height: 190px;
                  overflow-y: auto;
                  padding: 0 24px 16px;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                }
                .micro-caps {
                  font-size: 12px;
                  line-height: 1;
                  letter-spacing: 1px;
                }
              }
            }
          }

          .input-icon {
            position: absolute;
            left: -9px;
            order: 1;
            margin-left: 23px;
            margin-right: -40px;
            color: #3a9691;
            z-index: 1;
            font-size: 16px;

            pointer-events: none;

            height: 28px;
            width: 17px;

            vertical-align: top;
          }
          .close-icon {
            position: absolute;
            top: 9px;
            right: 16px;
            cursor: pointer;
            color: #bababa;
            display: none;
          }

          .display {
            display: block;
          }
        }

        .pantry-ingredients-title {
          margin-top: 32px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .pantry-ingredient-list-wrapper {
          position: relative;
          max-height: 240px;
          display: inline-block;
          width: 100%;
          .pantry-ingredient-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 8px;
            max-height: 240px;
            overflow-y: auto;
            position: relative;
            width: 100%;
          }
        }

        .micro-text {
          font-size: 12px;
          line-height: 1;
          color: #bababa;
        }
      }
    }
  }
`;
