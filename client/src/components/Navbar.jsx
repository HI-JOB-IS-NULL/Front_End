import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import "../css/Navbar.css";
import LoginModal from "./LoginModal";
import loginIcon from "../assets/login_icon.png";
export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "Pantry Ready Recipes", link: "/readyToCook" },
    { name: "Meal Planner", link: "/mealPlanner" },
    { name: "Shop Ingredients", link: "/shop" },
    { name: "Community", link: "community" },
  ];

  const [loginModal, setLoginModal] = useState(false);

  const logout = () => {
    sessionStorage.clear("ACCESS_TOKEN");
    window.location.href = "/";
  };

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

  return (
    <Container>
      {/* navbar left side */}
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
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
              <ShoppingBasketOutlinedIcon className="material-icon margin-right" />

              <ul>
                <li>
                  <img
                    src="/src/assets/profile.png"
                    alt="Profile"
                    className="nav--profile"
                  />
                  <ul>
                    <li className="sub-item">
                      <a
                        href="../mypage"
                        style={{
                          whiteSpace: "nowrap",
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <AccountCircleOutlinedIcon className="material-icon" />
                        <p>My Profile</p>
                      </a>
                    </li>
                    <li className="sub-item">
                      <ManageAccountsOutlinedIcon className="material-icon" />
                      <p>Edit Profile</p>
                    </li>
                    <li className="sub-item">
                      <SaveAltOutlinedIcon className="material-icon" />
                      <p>Saved Recipes</p>
                    </li>
                    <li className="sub-item">
                      <FastfoodOutlinedIcon className="material-icon" />
                      <p>My Meal Plan</p>
                    </li>
                    <li className="sub-item">
                      <FormatListBulletedOutlinedIcon className="material-icon" />
                      <p>My Orders</p>
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
    background-color: gray;
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
