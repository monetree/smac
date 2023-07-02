import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { transparentHeader, headerHeight, logoLink } from "../config";
import Controls from "./Controls";
import {
  stopSpeaking,
  disconnect,
  setOutputMute,
  setMicOn,
} from "../store/sm/index";
import {
  MicFill,
  MicMuteFill,
  SkipEndFill,
  VolumeMuteFill,
  VolumeUpFill,
} from "react-bootstrap-icons";
import { primaryAccent } from "../globalStyle";

import Popup from "../components/popup";

import {avatars} from "../config";

const iconSize = 24;

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    connected,
    loading,
    micOn,
    highlightMic,
    speechState,
    highlightSkip,
    highlightMute,
    isOutputMuted,
  } = useSelector(({ sm }) => ({ ...sm }));

  const [isPopup, setIsPopup] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState({});


  const history = useHistory();

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
    if (!isLoggedInUser) {
      history.push("/");
    }

    let activeAvatar = localStorage.getItem("activeAvatar")
    ? JSON.parse(localStorage.getItem("activeAvatar"))
    : avatars[0];
    setActiveAvatar(activeAvatar);

  }, []);

  const handleSubmit = () => {
    window.location.reload();
  };

  const handleActiveAvatar = (item) => {
    setActiveAvatar(item);
    localStorage.setItem("activeAvatar", JSON.stringify(item));
  };

  return (
    <Fragment>
      <div className={`${className}`}>
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <div className={"main-menu"}>
                {/* left align */}
                <a href={"/"} style={{color : pathname === '/chat' ? "#fff" : "black"}}  className={`${(pathname === '/loading' || pathname === '/chat') ? 'logo' : 'd-none'}`}>
                  AvatarX
                </a>
                <ul className={"main-menu-ul"}>
                  <li className={"main-menu-li"}>
                    <a className={`${(pathname === '/loading') ? 'loading-li' : ''}`} href={"/"}>Home</a>
                  </li>
                  <li className={"main-menu-li"} onClick={()=> setIsPopup(true)}>
                    <a className={`${(pathname === '/loading') ? 'loading-li' : ''}`}>Settings</a>
                  </li>
                  <li className={"main-menu-li"}>
                    <a className={`${(pathname === '/loading') ? 'loading-li' : ''}`} onClick={() => {
                        dispatch(disconnect());
                        localStorage.setItem("userInfo", "");
                        window.location.reload();
                      }} >Logout</a>
                  </li>
                </ul>
                <aside id="menu" className={`user-menu ${pathname === '/loading' ? 'd-none-' : ''}`}>
                  <div className="menu-child">
                    <img
                      id="profile-pic"
                      src={getUserInfo()?.picture}
                      width={55}
                      height={55}
                    />
                    <div>
                      <p
                        className={`username ${
                          pathname === "/loading" ? "black" : ""
                        }`}
                      >
                        <b>Welcome </b>
                        {getUserInfo()?.name}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
              <div>{/* middle align */}</div>
              <div>
                {/* right align */}
                <div
                //connected && !loading &&
                  className={`${
                     pathname === "/chat"
                      ? ""
                      : "d-none-"
                  }`}
                >
                  <Controls setIsPopup={setIsPopup} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {connected && (
        <div className={"action-wrapper action-btns"}>
          {!micOn && (
            <button
              onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
              id="un-mute-icon"
              color="primary"
              className=" mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
            >
              <span className="mat-button-wrapper">
                <MicMuteFill
                  size={iconSize}
                  style={{ border: highlightMic ? "red 2px solid" : "" }}
                />
              </span>
              <span
                matripple=""
                className="mat-ripple mat-button-ripple mat-button-ripple-round"
              ></span>
              <span className="mat-button-focus-overlay"></span>
            </button>
          )}
          {micOn && (
            <button
              onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
              id="mute-icon"
              color="primary"
              className="un-mute mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
            >
              <span className="mat-button-wrapper">
                <MicFill
                  size={iconSize}
                  color={primaryAccent}
                  style={{ border: highlightMic ? "red 2px solid" : "" }}
                />
              </span>
              <span
                matripple=""
                className="mat-ripple mat-button-ripple mat-button-ripple-round"
              ></span>
              <span className="mat-button-focus-overlay"></span>
            </button>
          )}

          <div
            id="speech-indicator"
            className={`speech-indicator ${!micOn ? "mute" : ""}`}
          >
            <span className="speech-indicator-span"></span>
            <span className="speech-indicator-span"></span>
            <span className="speech-indicator-span"></span>
            <span className="speech-indicator-span"></span>
            <span className="speech-indicator-span"></span>
            <span className="speech-indicator-span"></span>
          </div>

          {/* skip through whatever dp is currently speaking */}
          <div>
            <button
              type="button"
              style={{ marginLeft: 10 }}
              className="control-icon mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              disabled={speechState !== "speaking"}
              onClick={() => dispatch(stopSpeaking())}
              data-tip="Skip Speech"
              aria-label="Skip Speech"
            >
              <SkipEndFill
                size={iconSize}
                style={{ border: highlightSkip ? "red 2px solid" : "" }}
              />
            </button>
          </div>

          {/* mute dp sound */}
          <div>
            <button
              type="button"
              style={{ marginLeft: 10 }}
              className="control-icon mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              aria-label="Toggle DP Audio"
              data-tip="Toggle DP Audio"
              onClick={() =>
                dispatch(setOutputMute({ isOutputMuted: !isOutputMuted }))
              }
            >
              {isOutputMuted ? (
                <VolumeMuteFill
                  size={iconSize}
                  style={{ border: highlightMute ? "red 2px solid" : "" }}
                />
              ) : (
                <VolumeUpFill
                  size={iconSize}
                  color={primaryAccent}
                  style={{ border: highlightMute ? "red 2px solid" : "" }}
                />
              )}
            </button>
          </div>
        </div>
      )}
      {isPopup ? (
        <Popup
          setIsPopup={setIsPopup}
          avatars={avatars}
          activeAvatar={activeAvatar}
          handleActiveAvatar={handleActiveAvatar}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};
Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Header)`
  position: relative;
  z-index: 20;
  top: 0;
  width: 100%;
  background-color: ${transparentHeader ? "none" : "#FFFFFF"};

  & > .row {
    height: ${headerHeight};
  }
  .logo {
    margin-top: 20px;

    display: block;
    width: 150px;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      height: calc(0.8 * ${headerHeight});
    }
  }

  .main-menu {
    display: flex;

    .main-menu-ul {
      display: flex;
      list-style: none;
      margin-top: 20px;
      align-items: center;

      @media (max-width: 768px) {
        display: none;
      }
    }
    .main-menu-li {
      padding: 0 10px;
      cursor: pointer;
    }
    .main-menu-li a {
      color : #fff;
      font-weight: 600;
    }
    .loading-li {
      color : black !important;
    }
    .main-menu-li a:hover {
      opacity: 0.8
    }
  }

  #menu {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
