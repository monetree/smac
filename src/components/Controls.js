import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Escape, ThreeDotsVertical, X } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
import { disconnect } from "../store/sm/index";
import mic from "../img/mic.svg";
import micFill from "../img/mic-fill.svg";
import breakpoints from "../utils/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse, faShare } from "@fortawesome/free-solid-svg-icons";

const volumeMeterHeight = 24;
const volumeMeterMultiplier = 1.2;
const smallHeight = volumeMeterHeight;
const largeHeight = volumeMeterHeight * volumeMeterMultiplier;

const Controls = ({ className, setIsPopup }) => {
  const { highlightMenu } = useSelector((state) => ({ ...state.sm }));

  const dispatch = useDispatch();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const iconSize = 24;

  const [showContextMenu, setShowContextMenu] = useState(false);

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

  return (
    <div className={className}>
      <div className="d-flex" style={{ background: "#ffff", marginTop: 20 }}>
        <div className="context-control-parent">
          <button
            className="control-icon context-controls-trigger"
            type="button"
            aria-label="More Options"
            data-tip="More Options"
            id="dpChatDropdown"
            onClick={() => setShowContextMenu(!showContextMenu)}
          >
            {showContextMenu ? (
              <X size={iconSize} color="black" />
            ) : (
              <ThreeDotsVertical
                size={iconSize}
                style={{ border: highlightMenu ? "red 2px solid" : "" }}
              />
            )}
          </button>
          {showContextMenu ? (
            <div className="context-controls shadow-">
              <div className="d-flex justify-content-end align-items-start">
                <ul>
                  <li>
                    <button className={"btn-unstyled"}>
                      <img id="profile-pic" src={getUserInfo()?.picture} />
                      <span style={{ fontWeight: 600 }}>
                        {getUserInfo()?.name}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={"btn-unstyled"}
                      onClick={() => window.location.reload()}
                    >
                      <FontAwesomeIcon icon={faHouse} /> Home
                    </button>
                  </li>
                  <li>
                    <button
                      className={"btn-unstyled"}
                      onClick={() => setIsPopup(true)}
                    >
                      <FontAwesomeIcon icon={faGear} /> Settings
                    </button>
                  </li>

                  <li>
                    <button
                      className={"btn-unstyled"}
                      onClick={() => (window.location = "/invite")}
                    >
                      <FontAwesomeIcon icon={faShare} /> Invite
                    </button>
                  </li>

                  <li>
                    <button
                      className="btn-unstyled "
                      type="button"
                      onClick={() => {
                        dispatch(disconnect());
                        localStorage.setItem("userInfo", "");
                      }}
                    >
                      <Escape size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = { className: PropTypes.string.isRequired };

export default styled(Controls)`
  .context-control-parent {
    position: relative;

    @media (min-width: 768px) {
      display: none;
    }
  }
  .context-controls {
    position: absolute;
    z-index: 100;
    // background: rgba(0, 0, 0, 0.3);
    right: -100%;
    top: 0;

    @media (max-width: 600px) {
      right: 0;
    }

    & > div {
      // width: 100vw;
      // height: 100vh;

      margin-top: 3rem;
    }

    ul {
      padding: 1rem;

      list-style-type: none;

      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;

      & > li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        padding: 0.5rem;
      }
      & > li:last-child {
        border: none;
        padding-bottom: 0;
      }
    }
  }
  .context-controls-trigger {
    position: relative;
    border: 1px solid red;
    z-index: 105;
  }
  .control-icon {
    border: none;
    // background: none;
    color: black;

    padding: 0.4rem;
  }
  .form-control {
    opacity: 0.8;
    &:focus {
      opacity: 1;
    }
  }

  .interrupt {
    opacity: 1;
    transition: opacity 0.1s;
  }
  .interrupt-active {
    opacity: 0;
  }

  .volume-display {
    position: relative;
    top: ${volumeMeterHeight * 0.5}px;
    display: flex;
    align-items: flex-end;
    justify-content: start;
    min-width: ${({ videoWidth }) =>
      videoWidth <= breakpoints.md ? 21 : 32}px;
    .meter-component {
      /* don't use media queries for this since we need to write the value
      in the body of the component */
      height: ${({ videoWidth }) =>
        videoWidth >= breakpoints.md ? largeHeight : smallHeight}px;
      background-size: ${({ videoWidth }) =>
        videoWidth >= breakpoints.md ? largeHeight : smallHeight}px;
      background-position: bottom;
      background-repeat: no-repeat;
      min-width: ${({ videoWidth }) =>
        videoWidth <= breakpoints.md ? 21 : 28}px;
      position: absolute;
    }
    .meter-component-1 {
      background-image: url(${mic});
      z-index: 10;
    }
    .meter-component-2 {
      background-image: url(${micFill});
      z-index: 20;
    }
  }
  .alert-modal {
    position: absolute;
    z-index: 1000;
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }
  .alert-modal-card {
    background: #fff;
    padding: 1.3rem;
    border-radius: 5px;
  }
`;
