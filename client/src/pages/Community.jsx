import React, { useState } from 'react';
import styled from 'styled-components';
import Recipe from '../components/RecipeReviewCard';
import { Input, Tag } from 'antd';
import Communitycss from '../css/Community.css';
import Button from '@mui/material/Button';


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
          <Recipe/>
        </List>
      </div>

      <FloatingBtn>
        <Search id="search"
        placeholder="input search Recipe"
        onSearch={onSearch}
        style={{width: "25%"}}/>
        <br/><br/>
        <>
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
      <br/><br/><br/><br/><br/><br/>
      <Button variant="contained" color="success" onClick={toShare}>
        Share Recipe
      </Button>
      </>
    </FloatingBtn>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin: 5%;
`
const List = styled.div`
  white-space: wrap;
`
const FloatingBtn = styled.div`
  position: fixed;
  left: 70%
`