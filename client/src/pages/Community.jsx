import React from "react";
import styled from 'styled-components';
import Recipe from '../components/RecipeReviewCard';
import { Input, Space } from 'antd';

const onSearch = (value) => console.log(value);
const {Search} = Input;
export default function Community() {
  return (
    <Container>
      <List>
        <Recipe/>
      </List>
      <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width:100%;
  display: flex;
`
const List = styled.div`
  width: 60%;
`
