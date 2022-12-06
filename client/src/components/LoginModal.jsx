import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import kakaoLogo from "../assets/kakaotalk_logo.png";
import naverLogo from "../assets/naver_logo.png";
import { ServeIP } from "../IP";

export default function LoginModal({ setLoginModal }) {

  function socialLogin(provider){
    const frontendUrl = window.location.protocol+"//"+window.location.host;
    //window.location.href= ServeIP + "/auth/authorize/" +provider +"?redirect_url="+frontendUrl;//redirect url 추가
    window.location.href= "http://automealbackend-env-1.eba-jh3xikep.ap-northeast-2.elasticbeanstalk.com" + "/auth/authorize/" +provider +"?redirect_url="+frontendUrl;//redirect url 추가
  }

  const handleSocialLogin=(provider)=>{
    console.log(provider);
    socialLogin(provider);
  }

  return (
    <Container>
      <div className="overlay">
        <div className="modal-wrapper">
          <CloseOutlinedIcon
            className="close-icon"
            onClick={() => setLoginModal(false)}
          />
          <img src={logo} className="modal-logo" />
          <div className="modal-text">
            <h1>Your recipes are wating</h1>
            <span>Connect to customize your recipe discovery.</span>
          </div>
          <ul className="login-buttons">
            <li>
              <button className="button naver " onClick={()=> handleSocialLogin("naver")}>Connect With Naver</button>
            </li>
            <li>
              <button className="button google " onClick={()=> handleSocialLogin("google")}>Connect With Google</button>
            </li>
            <li>
              <button className="button kakaotalk " onClick={()=> handleSocialLogin("kakao")}>
                Connect With Kakaotalk
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .overlay {
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: rgba(49, 49, 49, 0.6);
    z-index: 3;

    .modal-wrapper {
      width: 800px;
      height: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -350px;
      margin-top: -250px;

      align-items: center;
      background: #fff;
      box-shadow: 0 0 1em rgb(0 0 0 / 27%);
      display: flex;
      flex-direction: column;

      .close-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      .modal-logo {
        width: 150px;
      }
      .login-buttons {
        display: flex;
        flex-direction: column;
        margin: 0;
        gap: 0;
        margin-left: -15px;
        .naver {
          background-color: #03c75a;

          background-image: url(${naverLogo});
        }
        .google {
          background-color: #fff;

          background-image: url(https://x.yummlystatic.com/web/auth/google.png);
        }

        .kakaotalk {
          background-color: #ffe812;

          background-image: url(${kakaoLogo});
        }
      }

      .button {
        background: 8px 50% no-repeat;
        background-size: 2em;
        text-align: left;
        padding: 12px 1.5em;
        box-shadow: 0 0.125em 0.25em rgb(0 0 0 / 12%),
          0 0 2px 0 rgb(0 0 0 / 27%) inset;
        min-width: 16.5em;
        text-indent: 2em;
        border: none;
        border-radius: 3em;
        font-size: 14px;
        color: #000;
        cursor: pointer;
      }
      .modal-text {
        text-align: center;
        margin-bottom: 30px;
        margin-left: 20px;
      }
    }
  }
`;
