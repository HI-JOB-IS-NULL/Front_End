import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardItem from '../components/ItemCard';
import axios from 'axios';
import { Alert, Button, Select } from 'antd';
import {ShoppingCartOutlined, HeartOutlined} from '@ant-design/icons'
import styled from 'styled-components';


const items = {
  "error": null,
  "data": [
      {
          "product_id": 1,
          "price": 3000,
          "product_classification": "vegetables",
          "product_name": "korea carrot 250g",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/10929117889555031-69eb77cf-6b2f-479e-9627-a7a93836ab07.jpg",
          "image_first": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/10068456578999813-4a1b822b-8857-4cfa-b714-978740480271.jpg",
          "image_second": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/10068463371233705-2875fd70-9cb6-400c-8f22-c5d3342c3cb2.jpg",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/8096852406186329-7b5197df-a976-423e-9f1b-1687ccbcfd4f.jpg",
          "product_category": "carrot"
      },
      {
          "product_id": 2,
          "price": 4200,
          "product_classification": "vegetables",
          "product_name": "korea potato",
          "description": "https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/1970668624727195-8d429c76-2017-48a5-8c83-be4a1dc95fe7.jpg",
          "image_first": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/4082543244346719-fa168f97-3bb0-4ed9-a9ac-e16e4165344f.jpg",
          "image_second": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/3656430168745033-20d5548c-69e7-4bf7-b592-0799eebeac85.jpg",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/3656430121385228-74ed1e81-0274-4bd4-b4e2-c2bd29d642e7.jpg",
          "product_category": "potato"
      },
      {
          "product_id": 3,
          "price": 8900,
          "product_classification": "dairy",
          "product_name": "korea organic brown eggs",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/222897629203386-b74cbab5-3022-49e0-b3cb-22f9a7153d60.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/525620415332264-5ad2cf60-a5aa-49a9-bcb0-e9811eb39c86.jpg",
          "image_second": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2228922581802-5c1626e1-e844-4b02-b9bc-9ce0010db2d0.jpg",
          "image_third": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2230842458178-cfaf8d05-4043-4db8-ae15-9f898b37c3c4.jpg",
          "product_category": "egg"
      },
      {
          "product_id": 4,
          "price": 15990,
          "product_classification": "meat",
          "product_name": "korea pork belly",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/531056978244180-98e8dcd1-61ab-470c-8b0e-b0aba1909537.jpg",
          "image_first": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/71911929875407-2394f7f9-a4a8-4184-a289-33c54275257b.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2020/10/21/16/7/7390f4e8-93b0-49c9-9850-2dc596f1976f.jpg",
          "image_third": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2020/10/21/16/2/76bfc4f2-a58b-4bfa-98dc-1f1b86a9bf5b.jpg",
          "product_category": "pork belly"
      },
      {
          "product_id": 5,
          "price": 20000,
          "product_classification": "meat",
          "product_name": "america sirloin steak",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/product/content/vendorItem/2019/05/17/697604827/6f92ccf4-1cda-4e73-be94-4da7d8cdd804.jpg",
          "image_first": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/05/14/15/2/d49d9f76-b9ba-494a-8d66-e1fd289a1a2f.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/05/14/15/9/fb6e4f1e-87a6-4c98-9b43-9587c1eb1503.jpg",
          "image_third": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/05/14/15/4/a7908b62-c0b8-4f27-b393-8bbb4c43f91a.jpg",
          "product_category": "sirloin steak"
      },
      {
          "product_id": 6,
          "price": 6200,
          "product_classification": "meat",
          "product_name": "korea chicken tenders",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/product/content/vendorItem/2018/11/29/466799206/56475d9e-ae1b-4c96-b7cf-8a1c0671d9c5.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2262448547856349-e44370ab-141f-4360-ab25-3450bce59ccb.jpg",
          "image_second": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2262455566888927-3a39c747-23e6-49b3-9c3e-10563b014515.jpg",
          "image_third": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2701287646082422-353566d6-381d-4140-af12-9604b56b038c.jpg",
          "product_category": "chicken tenders"
      },
      {
          "product_id": 7,
          "price": 7000,
          "product_classification": "dairy",
          "product_name": "seoulmilk butter",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2019/04/03/17/1/ee3937f4-bd31-464e-bf37-7fa9a54f7b1c.jpg",
          "image_first": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2019/04/03/17/6/ee9d1bf3-1a5f-4ddd-b59f-88c59515dbad.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/10981239817244-c5a28cf5-76bd-41a1-b3f7-b5065a7d69ab.png",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/13629799284368-383f919d-e821-40f5-a7e4-54d3de8aeee8.png",
          "product_category": "butter"
      },
      {
          "product_id": 8,
          "price": 5600,
          "product_classification": "vegetables",
          "product_name": "korea mushrooms",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/9092905252057227-dfaa9107-0dc4-4585-bcdb-a21d4e297421.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/84854138851338-816ee748-6aa0-4e7d-909a-16b73d65bd1e.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/84861605185628-ef56eb21-6763-4452-a698-c0e6b8dedda9.jpg",
          "image_third": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/84861730908243-28a5d9ac-516b-4944-a464-9b8cd2fb1ed9.jpg",
          "product_category": "mushrooms"
      },
      {
          "product_id": 9,
          "price": 5460,
          "product_classification": "pantry",
          "product_name": "dececco pasta",
          "description": "https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2017/04/27/17/8/0e252d47-f5b3-46f8-a865-09fff050d3fb.jpg",
          "image_first": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1394815534248625-9866a1fa-55b8-44d4-a838-d81c44f1b9aa.jpg",
          "image_second": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/product/image/vendoritem/2017/10/24/3136057057/8df730a9-1710-4c90-b07f-12a22451b644.jpg",
          "image_third": null,
          "product_category": null
      },
      {
          "product_id": 10,
          "price": 5980,
          "product_classification": "pantry",
          "product_name": "doze bread",
          "description": "https://image11.coupangcdn.com/image/retail/images/1818127525225870-8c539b3d-8a49-4d49-bb02-7d373a388dbf.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/05/17/16/3/645c5640-9693-4dff-875b-097896a4328f.jpg",
          "image_second": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/05/17/16/3/162cd7fc-bbe0-4a5b-8e9b-dea5dead18ea.jpg",
          "image_third": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2022/05/17/16/0/2d24293e-e2b2-43b7-917b-d5251d133c36.jpg",
          "product_category": "bread"
      },
      {
          "product_id": 11,
          "price": 5730,
          "product_classification": "pantry",
          "product_name": "heinz tomato ketchup",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/5295167373103524-8ed2e4e0-7087-4981-8fe9-b1aba3ed2693.jpg",
          "image_first": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2445684569298619-21b0f715-b44c-42d3-bebf-e093c42eb180.jpg",
          "image_second": null,
          "image_third": null,
          "product_category": "tomato sauce"
      },
      {
          "product_id": 12,
          "price": 6200,
          "product_classification": "pantry",
          "product_name": "otoki gold mayonnaise",
          "description": "https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2830126732846-b7358378-a514-436b-83a4-9940a7597c8b.JPG",
          "image_first": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1237308485924786-e55c0c4f-61d4-43e2-a8ea-4d40c8b53fcc.jpg",
          "image_second": "https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/product/content/vendorItem/2017/12/01/2094225/9a9c75ff-d6ef-492d-acf1-bcb500f87d25.jpg",
          "image_third": null,
          "product_category": "mayonnaise"
      },
      {
          "product_id": 13,
          "price": 6800,
          "product_classification": "dairy",
          "product_name": "seoulmilk milk",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/6503954528956242-70ed6622-6c06-44fa-984e-69807f4937a6.jpg",
          "image_first": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/13405061518219613-9752c7be-1dac-4740-9e4f-cdddabf8b48c.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1646694138861134-61ec6514-1ada-4678-9a39-467169992bfc.jpg",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/product/image/vendoritem/2018/09/07/3930090438/16da8535-31b7-4723-905a-92212d5f23c7.jpg",
          "product_category": "milk"
      },
      {
          "product_id": 14,
          "price": 5500,
          "product_classification": "meat",
          "product_name": "dongwo 11 fresh chicken",
          "description": "https://thumbnail8.coupangcdn.com/thumbnails/remote/q89/image/vendor_inventory/5130/b27e75878fb3bd9287f4748ff7fd9ec67806e4689078916b7120315ccdbf.jpg",
          "image_first": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/36f1/9120b2ffc518b2dbdefb40c3c1c149b9a7a0eefe0a784a2255f51d1f3d13.jpg",
          "image_second": null,
          "image_third": null,
          "product_category": "whole chicken"
      },
      {
          "product_id": 15,
          "price": 3500,
          "product_classification": "pantry",
          "product_name": "harim pure chicken broth",
          "description": "https://image1.coupangcdn.com/image/vendor_inventory/9f53/eafd0902a4d37b35f74b47ff8f9f9db65f07e20cd6d7055362e0cddd4290.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/7094/09b127ebbad52949650612de81a3f804f44b46cfc8553a78c45805272a44.jpg",
          "image_second": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/f457/1de88720c19d1dee3818eb50d44a5d38709bedbe9269889ff75dfbfd32b6.jpg",
          "image_third": null,
          "product_category": "chicken broth"
      },
      {
          "product_id": 16,
          "price": 5990,
          "product_classification": "pantry",
          "product_name": "LeeGoldki chicken stock",
          "description": "https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/614384217391748-b0deb233-6998-4b43-b165-7373de123560.jpg",
          "image_first": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2018/10/19/10/0/54e90850-dcca-4084-84ac-f06de69e740f.jpg",
          "image_second": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/284026907637554-86ec6426-6d54-41eb-b0a3-aa3177bfb140.JPG",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/284026910227292-29a1c5a7-65e7-4ee1-8e50-98b58d0f9c80.jpg",
          "product_category": "chicken stock"
      },
      {
          "product_id": 17,
          "price": 5980,
          "product_classification": "vegetables",
          "product_name": "korean peeled onion",
          "description": "https://thumbnail6.coupangcdn.com/thumbnails/remote/q89/image/retail/images/1467971690751249-f249bad2-2e53-4444-9c78-9f50bce10795.jpg",
          "image_first": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1366888984429741-d5886073-8888-4732-baba-7f71bcfe928b.jpg",
          "image_second": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1366908980423585-e8171c86-8742-4347-9bd2-060ea149ae87.jpg",
          "image_third": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1365503988218299-cf61c5ae-1d38-442b-942c-519da95e000b.jpg",
          "product_category": "onion"
      },
      {
          "product_id": 18,
          "price": 7460,
          "product_classification": "pantry",
          "product_name": "sunticket bean cooking oil",
          "description": "https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/retail/images/4505107958455575-97505837-4d5b-4828-bff7-270c4bc7001d.jpg",
          "image_first": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/9596406267355840-61effb21-b6a9-4c2d-874e-b6f095ad763f.jpg",
          "image_second": null,
          "image_third": null,
          "product_category": "cooling oil"
      },
      {
          "product_id": 19,
          "price": 1420,
          "product_classification": "vegetables",
          "product_name": "korean white cucumber",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/7220653267429233-7f892e6f-6280-4e49-a051-45db256fc528.jpg",
          "image_first": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/7220705008763344-8e1e5f5b-cc82-4027-bd50-23deda6a92b9.jpg",
          "image_second": "https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/7220712637286918-f1783991-9db6-458e-9a70-3af77aa89759.jpg",
          "image_third": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/7220712606880365-ddcb9407-187a-47df-86d0-70ac543d8e97.jpg",
          "product_category": "cucumber"
      },
      {
          "product_id": 20,
          "price": 19590,
          "product_classification": "pantry",
          "product_name": "Rio sunflower oil",
          "description": "https://thumbnail9.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2020/03/20/19/5/34a5a80c-2f3f-4be8-a808-86f255d5daa0.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2020/03/20/19/3/bc4c83c8-4ac0-4852-b1d7-5b36aafe625f.jpg",
          "image_second": null,
          "image_third": null,
          "product_category": "vegetable oil"
      },
      {
          "product_id": 21,
          "price": 5730,
          "product_classification": "pantry",
          "product_name": "Bearticket flour",
          "description": "https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/product/content/vendorItem/2019/07/03/689261878/8d6b79d6-de50-4a1f-a5a1-99b31556799d.jpg",
          "image_first": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/product/image/vendoritem/2019/02/07/3036730758/40792e56-e96a-4427-b727-45b21e494356.jpg",
          "image_second": null,
          "image_third": null,
          "product_category": "flour"
      },
      {
          "product_id": 22,
          "price": 2000,
          "product_classification": "vegetables",
          "product_name": "bearbear korean cabbage",
          "description": "https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/6871802367599429-29cdf46a-2429-47bc-adae-dd3e93e20dcd.jpg",
          "image_first": "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/90262080714804-50167cba-bd6d-4d09-b376-df81f37c1db1.jpg",
          "image_second": "https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/90292702496930-308183ed-b872-4680-8c95-074d0f76571f.jpg",
          "image_third": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/90285022601896-2b76490b-2f3b-45a6-8b40-f49a33cb7840.jpg",
          "product_category": "cabbage"
      },
      {
          "product_id": 23,
          "price": 1480,
          "product_classification": "vegetables",
          "product_name": "bearbear korean green lettuce",
          "description": "https://thumbnail8.coupangcdn.com/thumbnails/remote/q89/image/retail/images/11286466295871-b28fd43f-712d-45fd-aaed-9fa3044d00c2.jpg",
          "image_first": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1874101060238-2d0121d6-56d7-44fa-a12a-49a5fe3b1949.jpg",
          "image_second": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/4302648270365-9ea175d8-de05-4d26-8e52-4f74d1e56ff5.jpg",
          "image_third": "https://thumbnail7.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/1882260875432-810f08a9-3c6e-4962-badf-543329a70b16.jpg",
          "product_category": "lettuce"
      }
  ]
}


export default function ShopIngredients() {
  const [vegetables, setVegetables] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [meat, setMeat] = useState([]);

  useEffect(()=> {
      // vegetables 분류
      setVegetables(items.data.filter((i)=>
      i.product_classification.includes("vegetables")))
      console.log(vegetables)

      // pantry 분류
      setPantry(items.data.filter((i)=>
      i.product_classification.includes("pantry")))
      console.log(pantry)

      // dairy 분류
      setDairy(items.data.filter((i)=>
      i.product_classification.includes("dairy")))
      console.log(dairy)

      //meat 분류
      setMeat(items.data.filter((i)=>
      i.product_classification.includes("meat")))
      console.log(meat)
  }, [])

  const [value, setValue] = useState('1');
  // const [items, setItems] =r useState([]);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // dairy 정렬
  const VeSort = (e) =>{
    const temp = [...dairy];
    console.log(temp)
    if(e === 'ao'){
      setDairy(temp.sort(function (a, b){
        return a.price - b.price;}))
    console.log(sortve);}
    else if(e === 'do'){
      setDairy(temp.sort(function (b, a){
        return a.price - b.price;}))
    }
    else if(e ==='al'){
      setDairy(temp.sort((a, b) => {
        if(a.product_name > b.product_name) return 1;
        if(a.product_name < b.product_name) return -1;
        return 0;
      }))
    }
  }
  // fresh 정렬
  const FrSort = (e) =>{
    const temp = [...vegetables];
    console.log(temp)
    if(e === 'ao'){
      setVegetables(temp.sort(function (a, b){
        return a.price - b.price;}))
    console.log(sortve);}
    else if(e === 'do'){
      setVegetables(temp.sort(function (b, a){
        return a.price - b.price;}))
    }
    else if(e ==='al'){
      setVegetables(temp.sort((a, b) => {
        if(a.product_name > b.product_name) return 1;
        if(a.product_name< b.product_name) return -1;
        return 0;
      }))
    }
  }
  // meat 정렬
  const MeSort = (e) =>{
    const temp = [...meat];
    console.log(temp)
    if(e === 'ao'){
      setMeat(temp.sort(function (a, b){
        return a.price - b.price;}))
    console.log(sortve);}
    else if(e === 'do'){
      setMeat(temp.sort(function (b, a){
        return a.price - b.price;}))
    }
    else if(e ==='al'){
      setMeat(temp.sort((a, b) => {
        if(a.product_name > b.product_name) return 1;
        if(a.product_name< b.product_name) return -1;
        return 0;
      }))
    }
  }
  //pantry 정렬
  const PaSort = (e) =>{
    const temp = [...pantry];
    console.log(temp)
    if(e === 'ao'){
      setPantry(temp.sort(function (a, b){
        return a.price - b.price;}))
    console.log(sortve);}
    else if(e === 'do'){
      setPantry(temp.sort(function (b, a){
        return a.price - b.price;}))
    }
    else if(e ==='al'){
      setPantry(temp.sort((a, b) => {
        if(a.product_name > b.product_name) return 1;
        if(a.product_name< b.product_name) return -1;
        return 0;
      }))
    }
  }


  console.log(items.data)
  return(
    <Box sx={{ width: '100%', typography: 'body1', marginTop:'120px'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList style={{display:"flex", justifyContent:"center"}} onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dairy & Eggs" value="1" />
            <Tab label="Fresh Produce" value="2" />
            <Tab label="Fresh Meat & Seafood" value="3" />
            <Tab label="Frozen Foods" value="4"/>
            <Tab label="Snacks" value="5"/>
            <Tab label="Pantry Essentials" value="6"/>
          </TabList>
        </Box>
        
        <TabPanel value="1" style={{textAlign:'center', justifyContent:'center'}}>
          <div style={{display:'flex', justifyContent:'center', gap:'40px'}}>
            <h4>Dairy & Eggs</h4>
            <Select onChange={VeSort} style={{width:'10vw'}} placeholder='Sort'>
              <option value='ao'>ascending order</option>
              <option value='do'>descending order</option>
              <option value='al'>alphabetically</option>
            </Select>
          </div>
          <div style={{display:"flex", flexWrap:"wrap", gap:30}}>
            {
              dairy.map((item, i)=>{
                return (  
                <Product>
                  <CardItem items={dairy[i]}/>
                </Product>
                )
              })
            }
          </div> 
        </TabPanel>
        <TabPanel value="2">
        <div style={{display:'flex', justifyContent:'center', gap:'40px'}}>
          <h4>FRESH PRODUCE</h4>
          <Select onChange={FrSort} style={{width:'10vw'}} placeholder='Sort'>
                <option value='ao'>ascending order</option>
                <option value='do'>descending order</option>
                <option value='al'>alphabetically</option>
          </Select>
        </div>
          <div style={{display:"flex", flexWrap:"wrap", gap:30}}>
            {
              vegetables.map((item, i)=>{
                return (  
                <Product>
                  <CardItem items={vegetables[i]}/>
                </Product>
                )
              })
            }
          </div> 
        </TabPanel>
        <TabPanel value="3">
        <div style={{display:'flex', justifyContent:'center', gap:'40px'}}>
          <h4>Fresh Meat & Seafood</h4>
          <Select onChange={MeSort} style={{width:'10vw'}} placeholder='Sort'>
              <option value='ao'>ascending order</option>
              <option value='do'>descending order</option>
              <option value='al'>alphabetically</option>
          </Select>
        </div>
          <div style={{display:"flex", flexWrap:"wrap", gap:30}}>
            {
              meat.map((item, i)=>{
                return (  
                <Product>
                  <CardItem items={meat[i]}/>
                </Product>
                )
              })
            }
          </div> 
        </TabPanel>
        <TabPanel value='4'>
          
        </TabPanel>
        <TabPanel value='5'>

        </TabPanel>
        <TabPanel value='6'>
        <div style={{display:'flex', justifyContent:'center', gap:'40px'}}>
          <h4>PANTRY ESSENTIALS</h4>
          <Select onChange={PaSort} style={{width:'10vw'}} placeholder='Sort'>
                <option value='ao'>ascending order</option>
                <option value='do'>descending order</option>
                <option value='al'>alphabetically</option>
          </Select>
        </div>
          <div style={{display:"flex", flexWrap:"wrap", gap:30}}>
            {
              pantry.map((item, i)=>{
                return (  
                <Product>
                  <CardItem items={pantry[i]}/>
                </Product>
                )
              })
            }
          </div> 
        </TabPanel>
      </TabContext> 
    </Box>
  );
}

const Product = styled.div`
`