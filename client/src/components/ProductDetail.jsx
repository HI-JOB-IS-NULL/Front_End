import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { ServeIP } from "../IP";
import "../css/ProductDetail.css";
import { Button } from 'antd';
import { RingLoader } from "react-spinners";

export default function ProductDetail(){
    const {product_id} = useParams();
    const [currentIndex, setCurrentIndex] = useState();
    const [imageData, setImageData] = useState([]);
    const [iteminfo, setIteminfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const Buy = () =>{

    }
    const Basket = () =>{
        axios.get(`${ServeIP}/cart`)
    }

    function handleChange(index) {
        setCurrentIndex(index);
    }

    let renderSlides = imageData.map((image) => (
        <div style={{width:500}}>
          <img src={image}/>
        </div>
    ));

    useEffect(()=> {
        axios
        .get(
            `${ServeIP}/shop/productFindByPId?productId=${product_id}`
        )
        .then((res) => {
            console.log(res.data);
            let temp = [];
            temp.push(res.data.imageFirst)
            if(res.data.imageSecond != null){
                temp.push(res.data.imageSecond)
            }
            if(res.data.imageThird != null){
                temp.push(res.data.imageThird)
            }
            setIteminfo(res.data);
            setImageData(temp);
            console.log(iteminfo.productName)
            setLoading(true);
        });
    }, []);
    //console.log(imageData);
    // useEffect(()=>{

    // },[imageData])
    
    let content=(
        <div style={{position:'absolute', marginLeft:'25vw', marginTop:200}}>
            <RingLoader 
  color="hsla(168, 67%, 53%, 1)"
  size={200}
  speedMultiplier={1}
/>
        </div>
    );

    let fi=(
        <div>
            <Top>
                <Carousel
                autoPlay={true}
                infiniteLoop={true}
                style={{width:'50%'}}
                className="carousel-container"
              >
                { imageData &&

                    renderSlides
                    
                }
                </Carousel>
                <Pro_info>
                    {console.log(iteminfo.productName)}
                    <label>Product Name</label>
                    <h4>{iteminfo.productName}</h4>
                    <hr/>
                    <br/><br/><br/>
                    <label>Price</label>
                    <h5>{iteminfo.price } ₩ </h5>
                    <hr/>
                    <br/><br/><br/>
                  
                        <Button onClick={Buy} type="primary" style={{marginRight: 20}}>Buy it</Button>
                        <Button onClick={Basket}>Basket</Button>
                 
                </Pro_info>
            </Top>
            <Bottom>
                <img style={{alignItem: 'center'}} src={iteminfo.description}/>
            </Bottom>
        </div>
    );

    if(loading){
        content=fi;
    }

    return(
        <Container>
            {content}
        </Container>
    )
}

const Container = styled.div`
    display: block;
    align-items: center;
    margin-top: 5%;
    margin-left: 20%;
    width:auto;
`
const Top = styled.div`
    display:flex;
`
const Bottom = styled.div`
justify-content: center;

`
const Pro_info = styled.div`
    width:500px;
    margin-top:10%;
    justify content: end
`