import React from "react";
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

export default function Navbar() {
  const links = [
    { name: "Home", link: "/" },
    { name: "Pantry Ready Recipes", link: "/readyToCook" },
    { name: "Meal Planner", link: "/mealPlanner" },
    { name: "Shop Ingredients", link: "/shop" },
    { name: "Community", link: "community" },
  ];
  return (
    <Container>
      {/* navbar left side */}
      <nav className="scrolled flex ">
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
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
                  <AccountCircleOutlinedIcon className="material-icon" />
                  <p>My Profile</p>
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
                  <p>Log Out</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  /* .scrolled {
    background-color: #abebc6;
  } */

  nav {
    position: sticky;
    top: 0;
    height: 5.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 2rem;
    align-items: center;
    transition: 0.3s ease-in-out;
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
        height: 3rem;
        cursor: pointer;
      }
    }
  }
`;
