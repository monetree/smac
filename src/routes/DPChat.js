import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PersonaVideo from "../components/PersonaVideo";
import Captions from "../components/Captions";
import ContentCardDisplay from "../components/ContentCardDisplay";
import { disconnect, sendEvent, setVideoDimensions } from "../store/sm/index";
import Header from "../components/Header";
import { disconnectPage, disconnectRoute } from "../config";
import TextInput from "../components/TextInput";
import STTFeedback from "../components/STTFeedback";

import AvatarOne from "./assets/img/avatar-1.jpg";
import AvatarTwo from "./assets/img/avatar-2.jpg";
import AvatarThree from "./assets/img/avatar-3.jpg";

import Popup from "../components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const DPChat = ({ className }) => {
  const {
    connected,
    loading,
    disconnected,
    error,
    showTranscript,
    micOn,
    isOutputMuted,
  } = useSelector(({ sm }) => ({ ...sm }));

  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoader, setIsLoader] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState(
    localStorage.getItem("activeAvatar")
      ? JSON.parse(localStorage.getItem("activeAvatar"))
      : {
          img: AvatarTwo,
          name: "avatar-2",
          key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWM5MGM3OTEtNTc1ZC00NDgwLTk1YjMtYmYxM2VjNzkxNzAxIn0=",
        }
  );

  const [apiKey, setApikey] = useState(activeAvatar.key);

  const handleSubmit = () => {
    window.location.reload();
  };

  const handleActiveAvatar = (item) => {
    setActiveAvatar(item);
    localStorage.setItem("activeAvatar", JSON.stringify(item));
  };

  const avatars = [
    {
      img: AvatarTwo,
      name: "avatar-2",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWM5MGM3OTEtNTc1ZC00NDgwLTk1YjMtYmYxM2VjNzkxNzAxIn0=",
    },
    {
      img: AvatarOne,
      name: "avatar-1",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWhpbmRpIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfZDYxOTJlNmItMDE3Ny00ZGNiLThjYTYtYjVmNjRhYzQ3MGZjIn0=",
    },
    {
      img: AvatarThree,
      name: "avatar-3",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLW1heS0yN3RoLWRlbW8iLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9kNDdiZmZiZi04NjhmLTQzNzYtYWQ5YS1mZTVmM2YyYmNmMWEifQ==",
    },
  ];

  if (disconnected === true) {
    if (disconnectPage) {
      history.push(disconnectRoute);
    } else history.push("/");
  } else if (error !== null) history.push("/loading?error=true");
  // usually this will be triggered when the user refreshes
  else if (connected !== true) history.push("/");

  const handleResize = () => {
    if (connected) {
      dispatch(
        setVideoDimensions({
          videoWidth: window.innerWidth,
          videoHeight: window.innerHeight,
        })
      );
    }
  };

  const [startedAt] = useState(Date.now());
  const cleanup = () => {
    if (Date.now() - startedAt < 1000) {
      console.warn(
        "cleanup function invoked less than 1 second after component mounted, ignoring!"
      );
    } else {
      console.log("cleanup function invoked!");
      window.removeEventListener("resize", handleResize);
      if (connected === true && loading === false) dispatch(disconnect());
    }
  };

  useEffect(() => {
    // send init event, since we will finish loading before we display the DP
    dispatch(sendEvent({ eventName: "", payload: {}, kind: "init" }));
    // run resize once on mount, then add listener for future resize events
    handleResize();
    window.addEventListener("resize", handleResize);
    // run cleanup on unmount
    return () => cleanup();
  }, []);

  window.onbeforeunload = () => {
    console.log("cleaning up");
    cleanup();
  };

  // content card display is dependent on remaining space between header and footer
  // there might be a better way to do this w/ flexbox
  const ccDisplaRef = createRef();
  const [ccDisplayHeight, setCCDisplayHeight] = useState("auto");
  useEffect(() => {
    setCCDisplayHeight(ccDisplaRef.current.clientHeight);
  }, [ccDisplaRef]);

  return (
    <div className={className} style={{ background: "black" }}>
      <div className="video-overlay">
        {/* top row */}
        <div className="row">
          <Header setIsPopup={setIsPopup} />
          {/* {
            // consumers of the template can uncomment this block if they want a camera preview
            // will need to add cameraOn to the values they get from the state
              cameraOn
                ? (
                  <div className="row d-flex justify-content-end">
                    <div className="col-auto">
                      <div className="camera-preview">
                        <CameraPreview />
                      </div>
                    </div>
                  </div>
                )
                : <div />
            } */}
        </div>
        {/* middle row */}
        <div
          className="row d-flex justify-content-end align-items-center flex-grow-1 ps-3 pe-3"
          style={{ overflow: "scroll" }}
          ref={ccDisplaRef}
        >
          <div
            className="col col-md-5 d-flex align-items-end align-items-md-center"
            style={{ height: `${ccDisplayHeight}px` || "auto" }}
          >
            <div>
              <ContentCardDisplay />
            </div>
          </div>
        </div>
        {/* bottom row */}
        <div>
          {isOutputMuted ? (
            <div className="row">
              <div className="col text-center">
                <Captions />
              </div>
            </div>
          ) : null}
          {/* <div className="row">
            <div className="d-flex justify-content-center m-2">
              <STTFeedback />
            </div>
          </div> */}
          {showTranscript === true || micOn === false ? (
            <div
              className="row justify-content-center"
              style={{ marginBottom: 5 }}
            >
              <div className="col-md-8 col-lg-5 p-3-">
                <TextInput />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {connected ? <PersonaVideo /> : null}

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
    </div>
  );
};

DPChat.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(DPChat)`
  height: 90vh;

  .video-overlay {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    z-index: 10;

    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .vertical-fit-container {
    flex: 0 1 auto;
    overflow-y: scroll;

    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
