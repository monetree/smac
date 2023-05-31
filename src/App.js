import "./App.css";
import { Scene } from "@soulmachines/smwebsdk";

function App() {
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
        "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWRpZ2l0YWwtZ3JlZXRlciIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxX2FmNzViZTg3LTRlYWEtNDQzYi04YWVkLTI1OTM4YjAxMmY2ZCJ9",
      videoElement: videoEl,
      requestedMediaDevices: { microphone: true, camera: true },
    });

    // connect the Scene to the session server
    await scene
      .connect()
      .then((sessionId) => onConnectionSuccess(sessionId))
      .catch((error) => onConnectionError(error));
  }

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

  return (
    <div className="App">
      <button
        id="connect-button"
        style={{ marginRight: "2cm" }}
        type="button"
        onClick={connect}
      >
        Connect
      </button>
      <button id="reset-button" style={{ marginRight: "2cm" }} type="button">
        Reset
      </button>

      <video id="sm-video" width="300px" height="300px"></video>
    </div>
  );
}

export default App;
