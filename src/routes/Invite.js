import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Color from "color";
import breakpoints from "../utils/breakpoints";
import { landingBackgroundImage, landingBackgroundColor } from "../config";
import micFill from "../img/mic-fill.svg";
import videoFill from "../img/camera-video-fill.svg";
import "./index.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Invite({ className }) {
  const { token } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setMsg("You don't have access to this page");
      return;
    } else {
      localStorage.setItem("org_token", token);
      window.location.href = "/";
    }
  }, [token]);

  return (
    <div className={className}>
      {/* <div className="landing-wrapper"> */}
      <div id="content" className="login-container">
        <div className="login-container-block card-">
          <div className="">
            <h1 className="login-title"> AvatarX</h1>
            <h3 className="login-title">{msg}</h3>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

Invite.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Invite)`
  .landing-wrapper {
    min-height: 100vh;

    background: ${landingBackgroundImage
        ? `url(${landingBackgroundImage})`
        : ""}
      ${landingBackgroundColor ? `${landingBackgroundColor};` : ""};
    background-size: auto 60%;
    background-repeat: no-repeat;
    background-position: bottom center;

    @media (min-width: ${breakpoints.lg}px) {
      background-size: 60% auto;
      background-position: right bottom;
    }
  }
  .landing-container {
    padding-top: 1rem;
    display: flex;

    & > div {
      background-color: ${Color(landingBackgroundColor).alpha(0.5)};
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 1rem;
      border-radius: 5px;

      @media (min-width: ${breakpoints.lg}px) {
        border: none;
      }
    }
  }
  .form-switch .form-check-input {
    min-width: 7rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.mic-switch::before,
    &.mic-switch.status-checked::after {
      background-image: url(${micFill});
    }
    &.video-switch::before,
    &.video-switch.status-checked::after {
      background-image: url(${videoFill});
    }
    &.mic-switch.status-checked::before,
    &.video-switch.status-checked::before {
      background-image: none;
    }

    &.status-unchecked {
      &::after {
        content: "OFF";
        color: #000;
        margin-right: 18%;
      }
      &::before {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: rgb(220, 220, 220);
        background-position: 45% center;
        content: "";
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-left: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }

    &.status-checked {
      &::before {
        content: "ON";
        color: #fff;
        margin-left: 22%;
      }

      &::after {
        background-size: 60%;
        background-repeat: no-repeat;
        background-color: #fff;
        background-position: 55% center;
        content: "";
        display: block;

        border-radius: 50%;

        height: 80%;
        margin-right: 5%;
        aspect-ratio: 1;
        float: right;
      }
    }
  }
`;
