import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Color from "color";
import breakpoints from "../utils/breakpoints";
import { landingBackgroundImage, landingBackgroundColor } from "../config";
import micFill from "../img/mic-fill.svg";
import videoFill from "../img/camera-video-fill.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleButton from "react-google-button";
import { useHistory } from "react-router-dom";
import "./index.css";

function Landing({ className }) {
  const history = useHistory();
  // const { mic, camera } = useSelector(({ sm }) => sm.requestedMediaPerms);
  // const dispatch = useDispatch();

  const [user, setUser] = useState([]);
  const emails = [
    "mailbox@phanig.com",
    "soubhagyakumar666@gmail.com",
    "pinnamanenivvs@gmail.com",
    "dprabhakar@webprodigiesinc.com",
    "taranjeetsingh3326@gmail.com",
    "manmohanalla@gmail.com",
    "vpsps@yahaoo.com",
    "vpspublicschool@gmail.com",
    "krishna.samanth@gmail.com",
    "prajaykamat@gmail.com",
    "msrmeda1961@gmail.com",
    "stjps2023@gmail.com",
    "keerthanaduggirala@gmail.com",
    "msrmeda1961@gmail.com",
    "krishna.medasani@gmail.com",
    "rakeshkolli@gmail.com",
    "mvc@rvrpro.in",
    "aditya.tummala10@gmail.com",
    "ruhifatimaa@gmail.com",
    "contact@phanig.com",
    "soubhagya.developer@gmail.com",
    "luxury.traveller.vlog@gmail.com",
    "ashishmohanty000@gmail.com",
  ];

  const getUserInfo = () => {
    let userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      return null;
    }
    userInfo = JSON.parse(userInfo);
    if (!userInfo?.name) {
      return null;
    }
    return userInfo;
  };

  useEffect(() => {
    let isLoggedInUser = getUserInfo();
    if (isLoggedInUser) {
      history.push("/loading");
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    let isLoggedInUser = getUserInfo();

    if (user && !isLoggedInUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (!emails.includes(res.data.email)) {
            alert("You don't have access to this page .. ");
            return;
          } else {
            console.log("***google Info**", res.data);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            history.push("/loading");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className={className}>
      {/* <div className="landing-wrapper"> */}
      <div id="content" className="login-container">
        <div className="login-container-block card-">
          <div className="">
            <h1 className="login-title"> AvatarX</h1>
            <h3 className="login-title"> Sign in</h3>
            {/* <h4 className="login-title">to continue to Alie AvatarX</h4> */}
          </div>
          <div className="btn-position">
            <div className="space-y-3 text-center ">
              {/* <button onClick={() => login()}>Sign in with Google 🚀 </button> */}
              <GoogleButton onClick={() => login()} />
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}

Landing.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Landing)`
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
