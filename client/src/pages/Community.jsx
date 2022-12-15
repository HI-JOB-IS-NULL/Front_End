import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Recipe from "../components/RecipeReviewCard";
import { Input, Tag, Spin, Select } from "antd";
import Communitycss from "../css/Community.css";
import Button from "@mui/material/Button";
import Pagination from "react-js-pagination";
import axios from "axios";
import { ServerIP } from "../IP";
import AdCard from "../components/AdCard";
import bg_1 from "../../public/assets/bg_1.jpg";

// const [loading, setLoading] = useState(false)
const { CheckableTag } = Tag;
const tagsData = [
  "Vegan",
  "Vegetarian",
  "low Calorie",
  "noodle",
  "seafood",
  "meat",
];

//커뮤니티 글작성
const toShare = () => {
  window.location.href = "/writeRecipe";
};

const { Search } = Input;

export default function Community() {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState();
  const [type, setType] = useState();
  const [items, setItems] = useState([]);
  //검색어
  const onSearch = async (keyword) => {
    setUrl(
      `${ServerIP}/CustomRecipe/nser/list?type=${type}&keyword=${keyword}`
    );
    console.log(url);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${ServerIP}/CustomRecipe/nser/get?page=` + page,
    }).then((res) => setItems(res.data.dtoList));
  }, []);

  const handlePageChange = (page) => {
    localStorage.setItem("pro", page);
    setPage(localStorage.getItem("pro"));
    window.location.reload();
  };

  const [selectedTags, setSelectedTags] = useState(["low Calorie"]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <Container>
      <img
        style={{ objectFit: "cover", height: "400px", width: "1920px" }}
        src={bg_1}
      />
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          width: "70%",
          marginLeft: "6%",
        }}
      >
        <div>
          <div
            style={{
              marginLeft: "65%",
              marginTop: "15%",
              position: "absolute",
              zIndex: "10",
            }}
          ></div>
          <div>
            {/* {loading &&
          <Spin tip="Loading...">

          </Spin>
          } */}
          </div>
          <List>
            <Recipe info={page} url={url} />
          </List>
          <Pagination
            lastPageText={false}
            firstPageText={false}
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={items.length}
            pageRangeDisplayed={3}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
        </div>

        <FloatingBtn>
          <Select
            onChange={setType}
            style={{ minWidth: 100 }}
            placeholder="choose option"
          >
            <Option value="t">Title</Option>
            <Option value="w">Writer</Option>
            <Option value="c">Contents</Option>
          </Select>
          <Search
            id="search"
            placeholder="input search Recipe"
            onSearch={(e) => onSearch(e)}
            style={{ width: "25%" }}
          />
          <br />
          <br />
          <span
            style={{
              marginRight: 8,
            }}
          >
            Categories:
          </span>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
          <br />
          <br />
          <br />
          <br />
          <Button variant="contained" color="success" onClick={toShare}>
            Share Recipe
          </Button>
        </FloatingBtn>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 5%;
`;
const List = styled.div`
  white-space: wrap;
`;
const FloatingBtn = styled.div`
  position: fixed;
  margin-left: 58%;
`;
