import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Tag,
  Tooltip,
  Modal,
  Select,
  Form,
  Checkbox,
  Switch,
} from "antd";
import styled from "styled-components";
import PropTypes, { number } from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../css/mypage.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import SurveyComponent from "../components/Survey";
import axios from "axios";
import { ServeIP } from "../IP";
import PaymentMethods from "../components/PaymentMethods";
import DataTableRowExpansionDemo from "../components/DataTableRowExpansionDemo";
import Checkout from "../components/Checkout";
import Payment from "../components/RequestPay";
import MyMealPlan from "./MyMealPlan";

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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Mypage() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
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
  const changeImg = () => {
    console.log("change Img");
  };

  const onFinish = (values) => {
    console.log("Success", values);

    console.log("JSON", JSON.stringify(values));
    let js = JSON.stringify(values);
    //const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNreXBhcmsxMjNAbmF2ZXIuY29tIiwiaWF0IjoxNjY5NjMyNjg2LCJleHAiOjE2Njk3MTkwODZ9.VWqHcIrak7JnKJdSNXFFdA_m2rGWH2-IItu9dFHUeJv8o6o30dcIFMf6btsNW2OyCQCOUi1Hcxd-yHBRG8X8Aw";
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios({
        method: "POST",
        url: `${ServeIP}/profile/updateProfile`,
        data: js,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
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

    setComponentDisabled(true);
  };

  useEffect(() => {
    //임시방편
    //const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNreXBhcmsxMjNAbmF2ZXIuY29tIiwiaWF0IjoxNjY5NjMyNjg2LCJleHAiOjE2Njk3MTkwODZ9.VWqHcIrak7JnKJdSNXFFdA_m2rGWH2-IItu9dFHUeJv8o6o30dcIFMf6btsNW2OyCQCOUi1Hcxd-yHBRG8X8Aw";
    console.log("accessToken", accessToken);
    let config = null;
    if (accessToken && accessToken !== null) {
      //headers.append("Authorization",`Bearer ${accessToken}`);//여기 뛰어쓰기 안하면 안됨 주의 요망
      axios
        .post(
          `${ServeIP}/profile`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (res) {
          console.log("sd");
          if (res.status === 200) {
            console.log(res.data.userEmail);
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

  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const [form] = Form.useForm();

  const Sub = () => {
    const form = Form.useFormInstance();
    form.setFieldsValue({
      nickName: userInfo.nickName,
      phoneNum: userInfo.phoneNum,
      address: userInfo.address,
      diet: userInfo.diet,
    });
    return (
      <Button htmlType="submit" style={{ marginLeft: "23vw" }}>
        {" "}
        Correction
      </Button>
    );
  };

  const phoneChange = (v) => {
    console.log("asd", v.phone);
  };

  return (
    <Container>
      <Box
        className="box"
        sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}
      >
        <Tabs
          style={{ marginTop: 30 }}
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <Tab label="User Info" {...a11yProps(0)} />
          <Tab label="Basket" {...a11yProps(1)} />
          <Tab label="Meal Plan" {...a11yProps(2)} />
          <Tab label="Order List" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            EditProfile
          </Checkbox>
          <Form
            form={form}
            onFinish={onFinish}
            disabled={componentDisabled}
            className="vh-50"
            style={{ backgroundColor: "#f4f5f7" }}
          >
            <MDBContainer className="py-1">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol
                  lg="6"
                  className="mb-4 mb-lg-0"
                  style={{ width: "auto" }}
                >
                  <MDBCard
                    className="mb-3"
                    style={{
                      borderRadius: ".5rem",
                      width: "50vw",
                      marginBottom: "500px",
                    }}
                  >
                    <MDBRow className="g-0">
                      <MDBCol
                        md="4"
                        className="gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        {/*이미지 삽입 */}
                        <MDBCardImage
                          src={userInfo.img}
                          alt="Avatar"
                          className="my-3"
                          fluid
                        />
                        {/*사용자 이름*/}
                        {/* <MDBTypography tag="h3">User1</MDBTypography> */}
                        <MDBTypography tag="h5">Nick name</MDBTypography>
                        {/* <Input id="nickName"  /> */}
                        <Form.Item
                          name="nickName"
                          rules={[
                            {
                              required: true,
                              message: "Please input your nickName!",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              textAlign: "center",
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            }}
                          />
                        </Form.Item>
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
                              <MDBCardText className="text-muted">
                                {userInfo.userEmail}
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Phone</MDBTypography>
                              {/* <Input key={userInfo.phoneNum} defaultValue={userInfo.phoneNum} /> */}
                              <Form.Item name="phoneNum">
                                <Input pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" />
                              </Form.Item>
                            </MDBCol>
                          </MDBRow>

                          <hr className="mt-1 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">
                                Home address
                              </MDBTypography>
                              <MDBCardText className="text-muted">
                                <Form.Item name="address">
                                  <Input />
                                </Form.Item>
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">taste</MDBTypography>
                              <Form.Item name="diet">
                                <Select style={{ minWidth: 150 }}>
                                  <Select.Option value="None">
                                    None
                                  </Select.Option>
                                  <Select.Option value="Gluten Free">
                                    Gluten Free
                                  </Select.Option>
                                  <Select.Option value="Ketogenic">
                                    Ketogenic
                                  </Select.Option>
                                  <Select.Option value="Vegetarian">
                                    Vegetarian
                                  </Select.Option>
                                  <Select.Option value="Lacto-Vegetarian">
                                    Lacto-Vegetarian
                                  </Select.Option>
                                  <Select.Option value="Ovo-Vegetarian">
                                    Ovo-Vegetarian
                                  </Select.Option>
                                  <Select.Option value="Vegan">
                                    Vegan
                                  </Select.Option>
                                  <Select.Option value="Pescetarian">
                                    Pescetarian
                                  </Select.Option>
                                  <Select.Option value="Paleo">
                                    Paleo
                                  </Select.Option>
                                  <Select.Option value="Primal">
                                    Primal
                                  </Select.Option>
                                  <Select.Option value="Low FODMAP">
                                    Low FODMAP
                                  </Select.Option>
                                  <Select.Option value="Whole30">
                                    Whole30
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                              <MDBCardText className="text-muted"></MDBCardText>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <Sub />
            {/* <Button htmlType="submit" style={{ marginLeft: '23vw' }} >Correction</Button> */}
          </Form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PaymentMethods />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyMealPlan />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <DataTableRowExpansionDemo />
        </TabPanel>
      </Box>
    </Container>
  );
}
const Container = styled.div`
  margin-top: 6%;
  margin-left: 16%;
`;
