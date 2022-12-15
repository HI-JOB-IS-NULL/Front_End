import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardItem from "../components/ItemCard";
import axios from "axios";
import { Alert, Button, Select } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Shopcss from '../css/Shop.css';
import { ServeIP } from "../IP";
import bg_1 from "../assets/bg_1.jpg";

export default function ShopIngredients() {
  const [vegetables, setVegetables] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [meat, setMeat] = useState([]);
  const [items, setItems] = useState([]);
  const [snack, setSnack] = useState([]);
  const [frozen, setFrozen] = useState([]);

  useEffect(() => {

    axios({
      method:'GET',
      url:`${ServeIP}/shop/itemList`
    })
    .then((res) =>{
      setItems(res.data)
      console.log(res.data)
    // vegetables 분류
    setVegetables(
      res.data.data.filter((i) => i.product_classification.includes("vegetables"))
    );
    console.log(vegetables);

    // pantry 분류
    setPantry(
      res.data.data.filter((i) => i.product_classification.includes("pantry"))
    );
    console.log(pantry);

    // dairy 분류
    setDairy(
      res.data.data.filter((i) => i.product_classification.includes("dairy"))
    );
    console.log(dairy);

    //meat 분류
    setMeat(
      res.data.data.filter((i) => i.product_classification.includes("meat"))
    );
    console.log(meat);

    //SNACK 분류
    setSnack(
      res.data.data.filter((i) => i.product_classification.includes("snack"))
    );

    //Frozen 분류
    setFrozen(
      res.data.data.filter((i) => i.product_classification.includes("frozen"))
    )
  })
  }, []);

  const [value, setValue] = useState("1");
  // const [items, setItems] =r useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // dairy 정렬
  const VeSort = (e) => {
    const temp = [...dairy];
    console.log(temp);
    if (e === "ao") {
      setDairy(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setDairy(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setDairy(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };
  // fresh 정렬
  const FrSort = (e) => {
    const temp = [...vegetables];
    console.log(temp);
    if (e === "ao") {
      setVegetables(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setVegetables(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setVegetables(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };
  // meat 정렬
  const MeSort = (e) => {
    const temp = [...meat];
    console.log(temp);
    if (e === "ao") {
      setMeat(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setMeat(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setMeat(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };
  //pantry 정렬
  const PaSort = (e) => {
    const temp = [...pantry];
    console.log(temp);
    if (e === "ao") {
      setPantry(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setPantry(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setPantry(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };
  // snack 정렬
  const SnSort = (e) => {
    const temp = [...snack];
    console.log(temp);
    if (e === "ao") {
      setSnack(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setSnack(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setSnack(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };
  // frozen 정렬
  const FzSort = (e) => {
    const temp = [...frozen];
    console.log(temp);
    if (e === "ao") {
      setFrozen(
        temp.sort(function (a, b) {
          return a.price - b.price;
        })
      );
      console.log(sortve);
    } else if (e === "do") {
      setFrozen(
        temp.sort(function (b, a) {
          return a.price - b.price;
        })
      );
    } else if (e === "al") {
      setFrozen(
        temp.sort((a, b) => {
          if (a.product_name > b.product_name) return 1;
          if (a.product_name < b.product_name) return -1;
          return 0;
        })
      );
    }
  };

  console.log(items.data);
  return (
    <Container style={{width: "100%", marginTop: "120px"}}>
    <img style={{objectFit:'cover', height:'400px', width:'1920px'}} src={bg_1}/>
    <Box sx={{ width: "100%", typography: "body1", marginTop: "120px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", justifyContent: 'center'}}>
          <TabList
            style={{ display: "flex", justifyContent: "center" }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Dairy & Eggs" value="1" />
            <Tab label="Fresh Produce" value="2" />
            <Tab label="Fresh Meat & Seafood" value="3" />
            <Tab label="Frozen Foods" value="4" />
            <Tab label="Snacks" value="5" />
            <Tab label="Pantry Essentials" value="6" />
          </TabList>
        </Box>

        <TabPanel value="1"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", gap: "40px" }}
          >
            <h4>Dairy & Eggs</h4>
            <Select
              onChange={VeSort}
              style={{ width: "10vw" }}
              placeholder="Sort"
            >
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {dairy.map((item, i) => {
              return (
                <Product>
                  <CardItem items={dairy[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            <h4>FRESH PRODUCE</h4>
            <Select
              onChange={FrSort}
              style={{ width: "10vw" }}
              placeholder="Sort"
            >
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {vegetables.map((item, i) => {
              return (
                <Product>
                  <CardItem items={vegetables[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}
          >
            <h4>Fresh Meat & Seafood</h4>
            <Select
              onChange={MeSort}
              style={{ width: "10vw" }}
              placeholder="Sort"
            >
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {meat.map((item, i) => {
              return (
                <Product>
                  <CardItem items={meat[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="4">
        <div
            style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}
          >
            <h4>FROZEN FOODS</h4>
            <Select
              onChange={FzSort}
              style={{ width: "10vw" }}
              placeholder="Sort">
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {frozen.map((item, i) => {
              return (
                <Product>
                  <CardItem items={frozen[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="5">
        <div
            style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}
          >
            <h4>SNACKS</h4>
            <Select
              onChange={SnSort}
              style={{ width: "10vw" }}
              placeholder="Sort">
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {snack.map((item, i) => {
              return (
                <Product>
                  <CardItem items={snack[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="6">
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}
          >
            <h4>PANTRY ESSENTIALS</h4>
            <Select
              onChange={PaSort}
              style={{ width: "10vw" }}
              placeholder="Sort">
              <option value="ao">ascending order</option>
              <option value="do">descending order</option>
              <option value="al">alphabetically</option>
            </Select>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent:'center', marginTop:'2%'}}>
            {pantry.map((item, i) => {
              return (
                <Product>
                  <CardItem items={pantry[i]} />
                </Product>
              );
            })}
          </div>
        </TabPanel>
      </TabContext>
    </Box>
    </Container>
  );
}

const Product = styled.div``;
const Container = styled.div``;
