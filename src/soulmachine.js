import { Scene } from "@soulmachines/smwebsdk";
import { Fragment, useEffect, useState } from "react";

let scene;

const Soulmachine = ({ logout }) => {
  const [isLoader, setIsLoader] = useState(true);
  const [isMute, setIsMute] = useState(false);

  /**
   * Start a new connection.
   * Request a JWT from the token server and use it
   * to connect to the Soul Machines session server.
   */

  async function connect() {
    // get the video element
    const videoEl = document.getElementById("sm-video");
    // create a new scene object
    scene = new Scene({
      apiKey:
        "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWM5MGM3OTEtNTc1ZC00NDgwLTk1YjMtYmYxM2VjNzkxNzAxIn0=",
      videoElement: videoEl,
      requestedMediaDevices: { microphone: true, camera: true },
    });

    await scene
      .connect()
      .then((sessionId) => onConnectionSuccess(sessionId))
      .catch((error) => onConnectionError(error));
  }

  useEffect(() => {
    connect();
  }, []);

  /**
   * Handle successful connection
   * On success, we must start the video.
   */
  function onConnectionSuccess(sessionId) {
    console.info("success! session id:", sessionId);

    // start the video playing
    
    scene
      .startVideo()
      .then((videoState) => {
        console.info("started video with state:", videoState);
        setIsLoader(false);

        scene.connectionState.onConnectionStateUpdated.addListener(
          (connectionStateData) => {
            // callback handling for connectionState upda
            console.log("***onConnectionStateUpdated***", connectionStateData);
            if (
              connectionStateData &&
              connectionStateData.name === "Disconnected"
            ) {
              connect();
              setIsMute(false);
            }
          }
        );

        scene.conversation.onConversationStateUpdated.addListener(
          (conversationState) => {
            // callback handling for conversationState updates
            console.log("***onConversationStateUpdated***", conversationState);
          }
        );
      })
      .catch((error) => {
        console.warn("could not start video:", error);
        setIsLoader(false);
      });
  }

  /**
   * Handle failed connection
   * On error, we must display some feedback to the user
   */
  function onConnectionError(error) {
    setIsLoader(false);
    switch (error.name) {
      case "noUserMedia":
        console.warn("user blocked device access");
        break;
      case "noScene":
      case "serverConnectionFailed":
        console.warn("server connection failed");
        break;
      default:
        console.warn("unhandled error:", error);
    }
  }

  const toggleUserMicrophone = () => {
    setIsMute(!isMute);
    console.log("status: ", scene.isMicrophoneActive());
    const active = scene.isMicrophoneActive();
    scene.setMediaDeviceActive({
      microphone: !active,
    });
  };

  const getUserInfo = () => {
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    return userInfo;
  };

  return (
    <div className={"main-wrapper"}>
      {isLoader && (
        <div className="loader ">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <video
        id="sm-video"
        style={{ height: "100%" }}
        autoPlay={true}
        playsInline={true}
      ></video>
      {!isLoader && (
        <Fragment>
          <aside id="menu" className={"user-menu"}>
            <div className="menu-child">
              <img
                id="profile-pic"
                src={getUserInfo().picture}
                width={55}
                height={55}
              />
              <div>
                <p className={"username"}>
                  <b>Welcome </b>
                  {getUserInfo().name}
                </p>
                <div className="account-info-visible-mobile">
                  <button className={"logout-btn"} onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="account-info account-info-visible-desktop">
              <button className={"logout-btn"} onClick={logout}>
                Logout
              </button>
            </div>
          </aside>
          <div className={"action-wrapper action-btns"}>
            {!isMute && (
              <button
                onClick={() => toggleUserMicrophone()}
                id="un-mute-icon"
                color="primary"
                className=" mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              >
                <span className="mat-button-wrapper">
                  <mat-icon
                    _ngcontent-vsg-c85=""
                    role="img"
                    svgicon="microphone_mute"
                    className="mat-icon notranslate microphone-icon mat-icon-no-color ng-star-inserted"
                    aria-hidden="true"
                    data-mat-icon-type="svg"
                    data-mat-icon-name="microphone_mute"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 29"
                      fit=""
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#FFF"
                        stroke-width="2"
                        transform="translate(1)"
                      >
                        <path
                          stroke-linecap="round"
                          d="M18 13c0 5.523-3.477 10-9 10s-9-4.477-9-10"
                          opacity=".56"
                        ></path>
                        <rect width="8" height="17" x="5" y="1" rx="4"></rect>
                        <path
                          stroke-linecap="round"
                          d="M4 28h10"
                          opacity=".56"
                        ></path>
                        <path stroke-linecap="round" d="M9 23v5"></path>
                      </g>
                    </svg>
                  </mat-icon>
                </span>
                <span
                  matripple=""
                  className="mat-ripple mat-button-ripple mat-button-ripple-round"
                ></span>
                <span className="mat-button-focus-overlay"></span>
              </button>
            )}
            {isMute && (
              <button
                onClick={() => toggleUserMicrophone()}
                id="mute-icon"
                color="primary"
                className="un-mute mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              >
                <span className="mat-button-wrapper">
                  <mat-icon
                    _ngcontent-jop-c85=""
                    role="img"
                    svgicon="microphone_unmute"
                    className="mat-icon notranslate microphone-icon mat-icon-no-color ng-star-inserted"
                    aria-hidden="true"
                    data-mat-icon-type="svg"
                    data-mat-icon-name="microphone_unmute"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 22 29"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      fit=""
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                    >
                      <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g
                          transform="translate(1.000000, 1.000000)"
                          stroke="#FFFFFF"
                          stroke-width="2"
                        >
                          <path
                            d="M19,12 C19,17.523 15.523,22 10,22 C4.477,22 1,17.523 1,12"
                            opacity="0.56"
                            stroke-linecap="round"
                          ></path>
                          <path
                            d="M10,0 C7.790861,0 6,1.790861 6,4 L6,13 C6,15.209139 7.790861,17 10,17 C12.209139,17 14,15.209139 14,13 L14,4 C14,1.790861 12.209139,0 10,0 Z"
                            opacity="0.5"
                          ></path>
                          <path
                            d="M5,27 L15,27"
                            opacity="0.56"
                            stroke-linecap="round"
                          ></path>
                          <path
                            d="M10,22 L10,27"
                            opacity="0.5"
                            stroke-linecap="round"
                          ></path>
                          <path d="M0,2 L21,23" stroke-linecap="round"></path>
                        </g>
                      </g>
                    </svg>
                  </mat-icon>
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
              className={`speech-indicator ${isMute ? "mute" : ""}`}
            >
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Soulmachine;
