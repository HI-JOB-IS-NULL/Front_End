import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ServeIP } from '../IP';
import styled from "styled-components";

const CartPayment = (effect, deps) => {
  const [cart, setCart] = useState([]);
    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    const [cartId, setCartId] = useState([]);

    //const [itemId, setItemId]

    useEffect(()=>{
      axios({
        method: 'GET',
        url: `${ServeIP}/cart`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log("sd");
        if (res.status === 200) {
          console.log(res.data);
          setCart(res.data);
          for(let i=0; i<res.data.length; i++){
            //  cartId.push(res.data[i].cartItemId)
             cartId.push({cartItemId:res.data[i].cartItemId})
          }
          console.log(cartId)
        } else if (res.status === 403) {
          alert("잘못된 접근입니다");
        } else {
          new Error(res);
        }
      });
    },[])



    const {product_id} = useParams();
    const [products, setProducts] = useState([]);
    const [userInfo ,setUserInfo] = useState([]);
    const [abled, setAbled] = useState(false);
    const [total, setTotal] = useState();
  
  useEffect(() => {
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios.post(`${ServeIP}/profile`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(function (res) {
        console.log("sd");
        if (res.status === 200) {
          console.log(res.data);
          setUserInfo(res.data);
          // return response.json();
        } else if (res.status === 403) {
          //window.location.href = "/login"; // redirect
        } else {
          new Error(res);
        }
      });
    }
  }, []);
  console.log(userInfo)
  console.log(products)
  
    useEffect(() => {
        setTotal(sessionStorage.getItem("total"));
      const jquery = document.createElement("script");
      jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
      const iamport = document.createElement("script");
      iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
      document.head.appendChild(jquery);
      document.head.appendChild(iamport);
      return () => {
        document.head.removeChild(jquery); document.head.removeChild(iamport);
      }
    }, []);
    
    const onClickPayment = () => {
      
      sessionStorage.getItem("payse")
      const { IMP } = window;
      IMP.init([['imp60214404']]); // 결제 데이터 정의
      const data = {
        pg: 'html5_inicis', // PG사 (필수항목)
        pay_method: 'card', // 결제수단 (필수항목)
        merchant_uid: `mid_${new Date().getTime()}`,
        name:'Auto_CartItem', // 주문명 (필수항목)
        amount: '100',
        // amount: total,
        custom_data: { name: '부가정보', desc: '세부 부가정보' },
        buyer_name: `${userInfo.nickName}`, // 구매자 이름
        buyer_tel: `${userInfo.phoneNum}`, // 구매자 전화번호 (필수항목)
        buyer_email: `${userInfo.userEmail}`, // 구매자 이메일
        buyer_addr: [[]],
        buyer_postalcode: [[]]
        };
      IMP.request_pay(data, callback);
      setAbled(true);
      }
    
    const callback = (response) => {
      const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status, rec} = response;
      console.log(response)
      if (success) {
        sessionStorage.setItem("payse", true);
        alert('결제 성공');
        axios.post(
          `${ServeIP}/cart/orderCartItem`, 
          {
            cartOrderDtoList:cartId,
            imp_uid: response.imp_uid,
            preceipt_url: response.receipt_url
          },{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        ).then((res) => {
          console.log(res)
        })
  
      } else {
        alert(`결제 실패 : ${error_msg}`);
      }
    }
    
    return (
      <Container>
        <center>
        <Button type='primary' disabled={abled} onClick={onClickPayment}>Payment</Button>
        </center>
      </Container>
     );
  }
    
    export default CartPayment;
  
    const Container = styled.div`
      width: auto;
    `