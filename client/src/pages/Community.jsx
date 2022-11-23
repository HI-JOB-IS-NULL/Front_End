import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Recipe from '../components/RecipeReviewCard';
import { Input, Tag, Spin, Select } from 'antd';
import Communitycss from '../css/Community.css';
import Button from '@mui/material/Button';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { ServeIP } from '../IP';
import { useDispatch } from 'react-redux';
import Paging from '../css/Paging.css';

// const [loading, setLoading] = useState(false)
const { CheckableTag } = Tag;
const tagsData = ['Vegan', 'Vegetarian', 'low Calorie', 'noodle', 'seafood', 'meat'];

//커뮤니티 글작성
const toShare = () => {
  window.location.href = "/writeRecipe";
}

const {Search} = Input;



export default function Community() {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState();
  const [type, setType] = useState();
  const [items, setItems] = useState([]);
  //검색어 
  const onSearch = async (keyword) => {
    setUrl(`${ServeIP}/CustomRecipe/list?type=${type}&keyword=${keyword}`);
    console.log(url)
  }

  useEffect(()=> {
    axios({
      method: 'GET',
      url: `${ServeIP}/CustomRecipe/list?page=`+page
    }).then(res => setItems(res.data.dtoList))
  }, [])

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
    
    setSelectedTags(nextSelectedTags);
  };
  
  const toDetail = () =>{
    window.location.href="/"
  }

  return (
    <Container>
      <div>
        <div>
          {/* {loading &&
          <Spin tip="Loading...">

          </Spin>
          } */}
        </div>
        <List>
          <Recipe info={page} url={url} onClick={toDetail}/>
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
        <Select onChange={setType}>
          <Option value='t'>Title</Option>
          <Option value='w'>Writer</Option>
          <Option value='c'>Contents</Option>
        </Select>
        <Search id="search"
        placeholder="input search Recipe"
        onSearch={(e)=>onSearch(e)}
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
