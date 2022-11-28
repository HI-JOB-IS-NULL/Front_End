import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Tag, Tooltip, Modal, Select } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import  '../css/mypage.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios'
import SurveyComponent from '../components/Survey';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Mypage() {

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const changeImg = () =>{
    console.log("change Img")
  }

  const correction = () =>{
    console.log(tags)
  }
  return (
    <Container>
    <Box className='box'
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Tabs
        style={{marginTop:30}}
          orientation="vertical"
          value={value}
          onChange={handleChange}>
          <Tab label="User Info" {...a11yProps(0)} />
          <Tab label="Basket" {...a11yProps(1)} />
          <Tab label="Meal Plan" {...a11yProps(2)} />
          <Tab label="Order List" {...a11yProps(3)} />   
      </Tabs>
      <TabPanel value={value} index={0} >
      <section className="vh-50" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-1">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0" style={{width:'auto'}}>
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', width:'50vw', marginBottom:'500px' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    {/*이미지 삽입 */}
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-3"  fluid />
                    {/*사용자 이름*/}
                  {/* <MDBTypography tag="h3">User1</MDBTypography> */}
                  <MDBTypography tag="h5">Nick name</MDBTypography>
                  <Input style={{textAlign:'center', fontSize:'1.2rem', fontWeight:'bold'}} defaultValue="social_name"/>
                  <MDBCardText>General Membership</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-6">
                    <MDBTypography tag="h3">Profile</MDBTypography>
                    <hr className="mt-5 mb-5" />
                    <MDBRow className="pt3">
                      <MDBCol size="6" className="mb-5">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <Input defaultValue='010-1234-5678'/>
                      </MDBCol>
                    </MDBRow>

                    
                    <hr className="mt-1 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Home address</MDBTypography>
                        <MDBCardText className="text-muted">
                          <Input defaultValue='Input your address'/>
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">taste</MDBTypography>
                          <Select  style={{minWidth:150}}>
                            <Select.Option value="Gluten Free">Gluten Free</Select.Option>
                            <Select.Option value="Ketogenic">Ketogenic</Select.Option>
                            <Select.Option value="Vegetarian">Vegetarian</Select.Option>
                            <Select.Option value="Lacto-Vegetarian">Lacto-Vegetarian</Select.Option>
                            <Select.Option value="Ovo-Vegetarian">Ovo-Vegetarian</Select.Option>
                            <Select.Option value="Vegan">Vegan</Select.Option>
                            <Select.Option value="Pescetarian">Pescetarian</Select.Option>
                            <Select.Option value="Paleo">Paleo</Select.Option>
                            <Select.Option value="Primal">Primal</Select.Option>
                            <Select.Option value="Low FODMAP">Low FODMAP</Select.Option>
                            <Select.Option value="Whole30">Whole30</Select.Option>
                          </Select>
                          <MDBCardText className="text-muted">
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>     
        </MDBContainer>
        <Button onClick={correction} style={{marginLeft:'23vw'}}>Correction</Button>
        </section>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
    </Container>
    
  );
}
const Container = styled.div`
  margin-top:6%;
  margin-left:16%;
`