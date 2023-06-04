import { Scene } from "@soulmachines/smwebsdk";
import { useEffect, useState } from "react";

const Soulmachine = () => {
  // const [isMute, setIsMute] = useState(false);

  let scene;
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
        "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfMTI0YWRhZDMtM2NkYi00ZGMzLWI2MzYtZjlmOWRjYTExYjhmIn0=",
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
      .then((videoState) =>
        console.info("started video with state:", videoState)
      )
      .catch((error) => console.warn("could not start video:", error));
  }

  /**
   * Handle failed connection
   * On error, we must display some feedback to the user
   */
  function onConnectionError(error) {
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

  function toggleUserMicrophone() {
    setIsMute(!isMute);
    const active = scene.isMicrophoneActive();
    scene.setMediaDeviceActive({
      microphone: !active,
    });
  }

  return (
    <>
      <video id="sm-video" style={{ width: "100%", height: "100%" }}></video>

      <button
        onClick={() => toggleUserMicrophone()}
        style={{ marginTop: "20px" }}
      >
        {isMute ? "Unmute" : "Mute"}
      </button>

      {/* <div id="shadow"></div>

      <div id="content">
        <div className="account-info">
          <button id="logoutBtn">Logout</button>
        </div>
        <div id="show-menu-button">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <div id="video-wrapper">
          <div id="video-container">
            <video id="sm-video" width="300px" height="300px"></video>
          </div>
          <div id="img-container">
            <img
              id="img-avatar"
              width={300}
              height={300}
              style={{ borderRadius: "50%" }}
              src="https://baby-staging-bucket.s3.us-east-2.amazonaws.com/cartoon.jpeg"
            />
          </div>
        </div>

        <br />
        <aside id="menu">
          <div id="right">
            <img
              src="../assets/x-icon.svg"
              width={22}
              height={22}
              id="x-icon"
            />
          </div>
          <div className="in-line in-line-first">
            <img
              id="profile-pic"
              src="../assets/user-icon.svg"
              width={55}
              height={55}
            />
            <p>
              <b>Welcome</b>
            </p>
          </div>
        </aside>

        <div style={{ marginTop: "10cm", marginLeft: "43%" }}>
          <button type="button" onClick={connect}>
            Connect
          </button>
          <button style={{ marginRight: "2cm" }} type="button">
            Reset
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Soulmachine;
