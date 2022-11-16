import React, { useState } from 'react';
import Card from './communityCard';
import styled from 'styled-components';


const cardInfo = 
[
    {
        index : "1",
        nick_name:"USER1",
        image: '/src/assets/hamber.png',
        recipeT_title: "food1_title",
        recipe_content:"food1_text",
        like_rate:10
    },
    {   
        index : "2",
        nick_name:"USER2",
        image: '/src/assets/hamber.png',
        recipeT_title: "food2_title",
        recipe_content:"food2_text",
        like_rate:21
    },
    {
        index : "3",
        nick_name:"USER3",
        image: '/src/assets/hamber.png',
        recipeT_title: "food3_title",
        recipe_content:"food3_text",
        like_rate:23
    },
    {
        index : "4",
        nick_name:"USER4",
        image: '/src/assets/hamber.png',
        recipeT_title: "food4_title",
        recipe_content:"fodd4_text",
        like_rate:37
    },
    {   
        index : "2",
        nick_name:"USER2",
        image: '/src/assets/hamber.png',
        recipeT_title: "food2_title",
        recipe_content:"food2_text",
        like_rate:21
    },
    {
        index : "3",
        nick_name:"USER3",
        image: '/src/assets/hamber.png',
        recipeT_title: "food3_title",
        recipe_content:"food3_text",
        like_rate:23
    },
    {
        index : "4",
        nick_name:"USER4",
        image: '/src/assets/hamber.png',
        recipeT_title: "food4_title",
        recipe_content:"fodd4_text",
        like_rate:37
    },
    {   
        index : "2",
        nick_name:"USER2",
        image: '/src/assets/hamber.png',
        recipeT_title: "food2_title",
        recipe_content:"food2_text",
        like_rate:21
    },
    {
        index : "3",
        nick_name:"USER3",
        image: '/src/assets/hamber.png',
        recipeT_title: "food3_title",
        recipe_content:"food3_text",
        like_rate:23
    },
    {
        index : "4",
        nick_name:"USER4",
        image: '/src/assets/hamber.png',
        recipeT_title: "food4_title",
        recipe_content:"fodd4_text",
        like_rate:37
    },
];

function GridExample() {
    const [card, setCard] = useState(cardInfo)
    
    return <Container className='con'>
        {
            card.map((a, i) => {
                return <Card cardInfo={card[i]}/>
            })
        }
        </Container>
}

export default GridExample;

const Container = styled.div`
    width:105%;
    flex-wrap: wrap;
    display:flex;
    flex-wrap: wrap;
  
`