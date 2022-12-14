import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'antd';
import styled from 'styled-components';
import {ShoppingOutlined , HeartOutlined, ShoppingFilled, HeartFilled} from '@ant-design/icons'
import axios from 'axios';
import { ServeIP } from '../IP';
import LoginModal from "../components/LoginModal";

function ItemCard(props){
    const [like, setLike] = useState(false);
    const [basket, setBasket] = useState(0);
    const [cart, setCart] = useState();
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    const [loginModal, setLoginModal] = useState(false);
    const [bas, setBas] = useState(props.cart);

  useEffect(()=>{
    setBas(props.cart)
  },[props.cart])

    const onBasket = () =>{
        if(accessToken != null){
            setCart(true)
            axios({
                method: 'POST',
                url:`${ServeIP}/cart`,
                data: { "productId" : props.items.product_id , "count" : 1 } ,
                headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            },
            }).then(res => setCart(res.data)) 
            alert(props.items.product_name,'Get Item')
            window.location.reload();
        }
        else{
            // setLoginModal(true)
        }
    
  };

    const onLike = () =>{
        if(like == false){
            setLike(true)
        }
        else{
            setLike(false)
        }
    }   
console.log(bas);
    return(
        <Container>
            {/* <LoginModal setLoginModal={setLoginModal} /> */}
            <Card style={{ width: '17rem', border:'none'}}>
                <a href={`/ProductDetailes/${props.items.product_id}`} style={{textDecoration:'none', color:'black'}}>
                    <Card.Img src={props.items.image_first} />
                </a>
                <Card.Body style={{textAlign:'left'}}>
                    <Card.Text>{props.items.product_name}</Card.Text>
                    <div style={{display:'flex', gap:'2.5vw'}}>
                        <Card.Text style={{fontWeight:700, display:'flex', minWidth:80}}>
                            {props.items.price} won 
                        </Card.Text>
                        
                        <div style={{ display:'flex'}}>
                            <Button style={{border:'none'}} onClick={onBasket}>
                                {!bas ?
                                    <ShoppingOutlined /> : <ShoppingFilled/>
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
    );
}

export default ItemCard;

const Container = styled.div``;
