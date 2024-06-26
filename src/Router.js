import ReactGA from "react-ga4";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { XCircle } from "react-bootstrap-icons";
import DPChat from "./routes/DPChat";
import Landing from "./routes/Landing";
import Loading from "./routes/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Admin from "./routes/Admin";
import Invite from "./routes/Invite";

function App() {
  const { error } = useSelector(({ sm }) => ({ ...sm }));
  const [ignoreError, setIgnoreError] = useState(false);

  // every time error changes, set ignore error to false
  useEffect(() => setIgnoreError(false), [error]);

  return (
    <Router>
      {error && !ignoreError ? (
        <div className="error-modal">
          <div className="error-modal-card">
            <div className="d-flex justify-content-end">
              <button
                className="btn-unstyled"
                type="button"
                onClick={() => {
                  setIgnoreError(true);
                  window.location.reload();
                }}
              >
                <XCircle size={22} />
              </button>
            </div>
            <div className="error-modal-inner">
              <h2 className="text-center mb-4">Something has gone wrong!</h2>
              <p className="mb-4">
                Sorry for the interruption. Feel free to start again, or give us
                some feedback to help us improve!
              </p>
              <div className="d-flex justify-content-center mb-4">
                {/* <Link to="/loading" className="btn btn-dark me-2">
                  Reconnect
                </Link> */}
                <a href="/loading" className="btn btn-dark me-2">
                  Reconnect
                </a>
              </div>
              {/* <div className="d-flex justify-content-center">
                <code className="text-danger">{error.msg}</code>
              </div> */}
            </div>
          </div>
        </div>
      ) : null}
      <Switch>
        {/* <Route path="/content-card-test">
          <ContentCardTest />
        </Route> */}

        <Route path="/invite/:token">
          <Invite />
        </Route>
        <Route path="/loading">
          <Loading ignoreError={ignoreError} />
        </Route>
        <Route path="/chat">
          <DPChat />
        </Route>
        <Route path="/invite">
          <Admin />
        </Route>
        <Route path="/">
          <GoogleOAuthProvider clientId="118420081966-s1n42272jcg4r5l4erufahti23ubp8o0.apps.googleusercontent.com">
            <Landing />
          </GoogleOAuthProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
