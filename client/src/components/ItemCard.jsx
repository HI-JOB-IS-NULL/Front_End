import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Alert, Button } from 'antd';
import styled from 'styled-components';
import {ShoppingCartOutlined, HeartOutlined} from '@ant-design/icons'


function ItemCard(props){
    const onbasket = () =>{
        Alert('In basket')
    }
    const [ImageList, setImageList] = useState([]);
    
    const Listmade = () =>{
        // ImageList.push(props.items.image_first);
        // ImageList.push(props.items.image_second);
        // ImageList.push(props.items.image_third);
        // window.sessionStorage.clear;
        // window.sessionStorage.setItem("ImageList", JSON.stringify(ImageList));
        
        // console.log(ImageList)
        // console.log(sessionStorage.getItem("ImageList"))

        window.location.href = `/ProductDetailes/${props.items.product_id}`;
    }
    console.log(sessionStorage.getItem("ImageList"))
    return(
        <Container>
            <Card onClick={Listmade} style={{ width: '17rem', border:'none'}}>
                <a style={{textDecoration:'none', color:'black'}}>
                    <Card.Img src={props.items.image_first} />
                </a>
                <Card.Body style={{textAlign:'left'}}>
                    <Card.Text>{props.items.product_name}</Card.Text>
                    <div style={{display:'flex', gap:'4vw'}}>
                        <Card.Text style={{fontWeight:700, display:'flex', minWidth:80}}>
                            {props.items.price} won 
                        </Card.Text>
                        
                        <div style={{ display:'flex'}}>
                            <Button style={{border:'none'}} onClick={onbasket}><ShoppingCartOutlined/></Button>
                            <Button style={{border:'none'}} onClick={onbasket}><HeartOutlined /></Button>
                        </div>
                    </div>                 
                </Card.Body>
            </Card>
            
        </Container>
    )
}

export default ItemCard;

const Container = styled.div`
    
`