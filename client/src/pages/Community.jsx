import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Recipe from '../components/RecipeReviewCard';
import { Input, Tag } from 'antd';
import Communitycss from '../css/Community.css';
import Button from '@mui/material/Button';
import Pagination from 'react-js-pagination';
import axios from 'axios';

const { CheckableTag } = Tag;
const tagsData = ['Vegan', 'Vegetarian', 'low Calorie', 'noodle', 'seafood', 'meat'];

//검색어 
const onSearch = (value) => console.log(value);

//커뮤니티 글작성
const toShare = () => {
  window.location.href = "/writeRecipe";
}

const {Search} = Input;

export default function Community() {

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    localStorage.setItem("pro", page);
    setPage(localStorage.getItem("pro"));
    window.location.reload();
  };

  const [selectedTags, setSelectedTags] = useState(['low Calorie']);
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  return (
    <Container>
      <div>
        <List>
          <Recipe info={page}/>
        </List>
        <Pagination
      activePage={page}
      itemsCountPerPage={3}
      totalItemsCount={30}
      pageRangeDisplayed={3}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}/>
      </div>

      <FloatingBtn>
   
        <Search id="search"
        placeholder="input search Recipe"
        onSearch={onSearch}
        style={{width: "25%"}}/>
        <br/><br/>
      
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
      <br/><br/><br/><br/>
      <Button variant="contained" color="success" onClick={toShare}>
        Share Recipe
      </Button>
     
      
    </FloatingBtn>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin: 9%;
`
const List = styled.div`
  white-space: wrap;
`
const FloatingBtn = styled.div`
  position: fixed;
  margin-left: 58%;
`
