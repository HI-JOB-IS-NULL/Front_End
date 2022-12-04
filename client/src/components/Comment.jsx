
import React, { createElement, useState } from 'react';
import { Comment, Avatar, Tooltip, Input } from 'antd';
import "antd/dist/antd.css";
import {
  LikeOutlined, DislikeFilled,
  DislikeOutlined, LikeFilled
} from '@ant-design/icons';
import styled from 'styled-components';

export default function CommentForm () {
    const [likesCount, setLikesCount] = useState(0);
    // To maintain Dislike state
    const [dislikesCount, setDislikesCount] = useState(0);
  
    // To maintain action state
    const [action, setAction] = useState(null);

    return(
        <Container>
        <div style={{display: 'block', width: 700}}>
            <Comment
              author={<a>Gourav Hammad</a>}
              avatar={<Avatar style={{ backgroundColor: 'green' }}>G</Avatar>}
              content={
                <p> 
                 Greetings from GeeksforGeeks, I am sample comment.
                 I am good, what about you?
                </p>}
              actions={[
                <Tooltip title="Like">
                  <span onClick={() => {
                    setLikesCount(1);
                    setDislikesCount(0);
                    setAction('liked');
                  }}>
                    {createElement(action === 'liked' ? 
                    LikeFilled : LikeOutlined)}
                    {likesCount}
                  </span>
                </Tooltip>,
                <Tooltip title="Dislike">
                  <span onClick={() => {
                    setLikesCount(0);
                    setDislikesCount(1);
                    setAction('disliked');
                  }}>
                    {React.createElement(action === 'disliked' ? 
                    DislikeFilled : DislikeOutlined)}
                    {dislikesCount}
                  </span>
                </Tooltip>
              ]}
              // 댓글 시간
              datetime={'30-05-2021 11:09AM'}
            />
          </div>
        </Container>
    )
}

const Container = styled.div`
`