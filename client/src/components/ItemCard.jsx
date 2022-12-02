import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'antd';
import styled from 'styled-components';
import {ShoppingOutlined , HeartOutlined, ShoppingFilled, HeartFilled} from '@ant-design/icons'
import axios, { Axios } from 'axios';
import { ServeIP } from '../IP';

function ItemCard(props){
    const [like, setLike] = useState(false);
    const [basket, setBasket] = useState(0);
    const [cart, setCart] = useState();
 
    const onBasket = () =>{
        axios.post(`${ServeIP}/cart?productId=${props.items.product_id}`)
        .then((res => {
            setCart(res.data)
        }))
    }

    const onLike = () =>{
        if(like == false){
            setLike(true)
        }
        else{
            setLike(false)
        }
    }   
 
    return(
        <Container>
            <Card style={{ width: '17rem', border:'none'}}>
                <a href={`/ProductDetailes/${props.items.product_id}`} style={{textDecoration:'none', color:'black'}}>
                    <Card.Img src={props.items.image_first} />
                </a>
                <Card.Body style={{textAlign:'left'}}>
                    <Card.Text>{props.items.product_name}</Card.Text>
                    <div style={{display:'flex', gap:'4vw'}}>
                        <Card.Text style={{fontWeight:700, display:'flex', minWidth:80}}>
                            {props.items.price} won 
                        </Card.Text>
                        
                        <div style={{ display:'flex'}}>
                            <Button style={{border:'none'}} onClick={onBasket}>
                                {basket === 0 ?
                                    <ShoppingOutlined/> : <ShoppingFilled/>
                                }
                            </Button>
                            <Button style={{border:'none'}} onClick={onLike}>
                                {like == false ?
                                    <HeartOutlined /> : <HeartFilled/>
                                }
                            </Button>
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