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
import { avatars } from "../config";

function Landing({ className }) {
  const history = useHistory();
  // const { mic, camera } = useSelector(({ sm }) => sm.requestedMediaPerms);
  // const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const search = window.location.search;
  const params = new URLSearchParams(search);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  const saveUserProfile = (data, token, id) => {
    axios
      .patch(`https://api.avatarx.live/api/whitelisted-emails/${id}/`, {
        img_url: data.picture,
        name: data.name,
        social_token: token,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/talk";
      })
      .catch((err) => console.log(err));
  };

  const loginUser = (email, data, token) => {
    axios
      .post(`https://api.avatarx.live/api/login/`, {
        email: email,
        token: localStorage.getItem("org_token") || null,
      })
      .then((res) => {
        localStorage.setItem("id", res.data.id);
        saveUserProfile(data, token, res.data.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("name", res.data.name);
          loginUser(res.data.email, res.data, user);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const validateToken = (token, email) => {
    axios
      .post(`https://api.avatarx.live/api/verify-token/`, {
        token: token,
        email: email,
      })
      .then((res) => {
        let data = res.data;
        localStorage.setItem("id", data.id);
        localStorage.setItem("email", data.email);
        window.location.href = "/loading";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setActiveAvatar = (name) => {
    for (let i of avatars) {
      if (i.name === name) {
        localStorage.setItem("activeAvatar", JSON.stringify(i));
        return;
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("id");
    const token = params.get("token");
    const email = params.get("email");
    const name = params.get("name");
    if (user) {
      window.location.href = "/loading";
    } else {
      if (token && email && name) {
        setActiveAvatar(name);
        validateToken(token, email);
      }
    }
  }, []);

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
