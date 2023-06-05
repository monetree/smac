import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import Soulmachine from "./soulmachine";
import { googleLogout } from "@react-oauth/google";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const logOut = () => {
    googleLogout();
  };

  return (
    <React.Fragment>
      {!isLoggedIn && (
        <GoogleOAuthProvider clientId="118420081966-s1n42272jcg4r5l4erufahti23ubp8o0.apps.googleusercontent.com">
          <Login
            setIsLoggedin={(isLoggedinState) => {
              setIsLoggedIn(isLoggedinState);
            }}
          />
        </GoogleOAuthProvider>
      )}
      {isLoggedIn && <Soulmachine logout={logOut} />}
    </React.Fragment>
  );
}

export default App;
