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

  const [user, setUser] = useState({});
  const [emails, setEmails] = useState([]);

  const getEmails = () => {
    axios
      .get(`https://api.polyverse.app/api/whitelisted-emails/`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        let emails = res.data;
        // let emails_ = [];
        // for (let i of emails) {
        //   emails_.push(i.email);
        // }
        setEmails(emails);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmails();
  }, []);

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

    if (user && user.email) {
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
    }

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
          for (let i of emails) {
            if (i.email === res.data.email) {
              console.log("***google Info**", res.data);
              localStorage.setItem("id", i.id);
              localStorage.setItem("role", i.role);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              window.location = "/loading";
              return;
            }
          }

          alert("You don't have access to this page .. ");
          return;
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
            {emails && emails.length ? (
              <div className="space-y-3 text-center ">
                <GoogleButton onClick={() => login()} />
              </div>
            ) : (
              <div className="space-y-3 text-center ">Please wait ...</div>
            )}
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
