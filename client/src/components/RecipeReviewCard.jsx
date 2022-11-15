import Card from 'react-bootstrap/Card';
import food from '../assets/hamber.png';
import { Rate } from 'antd';
import React, { useState } from 'react';
import Rec from './Recipe.css';
import styled from 'styled-components';
import { Button, Modal } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function GridExample() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [value, setValue] = useState(3);
    const cardInfo = [
        {image: {food}, title: "food1_title", text:"food1_text"},
        {image: "../assets/hamber.png", title: "food2_title", text:"food2_text"},
        {image: "", title: "food3_title", text:"food3_text"},
        {image: "", title: "food4_title", text:"fodd4_text"},
    ];
    
    const renderCard = (card, index) => {
        return ( 
            <Container>
            <Card onClick={showModal} style={{width:"18rem", display:"flex", flexDirection:"row", width:550}} key={index}>
              <Card.Img variant="top" src={food}/>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  {card.text}
                </Card.Text>
                
                <Rate style={{whiteSpace:"nowrap"}} tooltips={desc} onChange={setValue} value={value} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
              </Card.Body>
            </Card>
            </Container>
    );
    };

    return <div className={Rec.app}>{cardInfo.map(renderCard)}</div>
}

export default GridExample;

const Container = styled.div`
    padding :2% 15%;
`