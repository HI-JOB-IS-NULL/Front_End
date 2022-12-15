import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import "../css/Navbar.css";
import LoginModal from "./LoginModal";
import loginIcon from "../assets/login_icon.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "Pantry Ready Recipes", link: "/readyToCook" },
    { name: "Meal Planner", link: "/mealPlanner" },
    { name: "Shop Ingredients", link: "/shop" },
    { name: "Community", link: "community" },
    { name: "RecipeNutrition", link: "/RecipeNutrition" },
  ];
  const [profile, setProfile] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const accesstoken = sessionStorage.getItem("ACCESS_TOKEN");

  const logout = () => {
    sessionStorage.clear("ACCESS_TOKEN");
    window.location.href = "/";
  };

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();
  const navigateToMyPage = (value) => {
    navigate(`/mypage/${value}`);
  };

  return (
    <Container>
      {/* navbar left side */}
      <nav
        className={`${isScrolled ? "scrolled" : ""} flex`}
        style={{ zIndex: "10" }}
      >
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" className="nav--logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* navbar right side */}

        <div className="right flex a-center">
          {!accessToken && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setLoginModal(true)}
            >
              <img src={loginIcon} alt="Login Icon" className="nav--profile" />
            </div>
          )}
          {accessToken && (
            <div className="right flex a-center">
              <ShoppingBasketOutlinedIcon
                className="material-icon margin-right"
                // style={{ color: "black" }}
                onClick={() => navigate("/cart")}
              />

              <ul>
                <li>
                  <img
                    src="/src/assets/profile.png"
                    alt="Profile"
                    className="nav--profile"
                  />
                  <ul>
                    <li
                      className="sub-item"
                      onClick={() => navigateToMyPage(0)}
                    >
                      <AccountCircleOutlinedIcon className="material-icon" />
                      <p>My Profile</p>
                    </li>

                    <li
                      className="sub-item"
                      onClick={() => navigateToMyPage(1)}
                    >
                      <FastfoodOutlinedIcon className="material-icon" />
                      <p>My Meal Plan</p>
                    </li>
                    <li
                      className="sub-item"
                      onClick={() => navigateToMyPage(2)}
                    >
                      <FormatListBulletedOutlinedIcon className="material-icon" />
                      <p>My Orders</p>
                    </li>
                    <li
                      className="sub-item"
                      onClick={() => navigateToMyPage(3)}
                    >
                      <SaveAltOutlinedIcon className="material-icon" />
                      <p>Saved Recipes</p>
                    </li>
                    <li
                      className="sub-item"
                      onClick={() => navigateToMyPage(4)}
                    >
                      <TaskAltOutlinedIcon className="material-icon" />
                      <p>Done Recipes</p>
                    </li>

                    <li className="sub-item">
                      <LogoutOutlinedIcon className="material-icon" />
                      <p onClick={logout}>Log Out</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: #e9f7ef;
    /* #f2f3f4; */
  }
  nav {
    top: 0;
    height: 5.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 3rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    display: flex;
    max-width: 2500px;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: #195a00;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      .margin-right {
        margin-right: 2rem;
      }
      .nav--profile {
        border-radius: 50%;
        width: auto;
        height: 3.5rem;
        cursor: pointer;
      }
    }
  }
`;
