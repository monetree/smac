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

  const getUserInfo = () => {
    let userInfo = localStorage.getItem("userInfo");
    if(!userInfo){
      return null;
    }
    userInfo = JSON.parse(userInfo);
    if(!userInfo?.name){
      return null;
    }
    return userInfo;
  }

  return (
    <React.Fragment>
      {!isLoggedIn && !getUserInfo() && (
        <GoogleOAuthProvider clientId="118420081966-s1n42272jcg4r5l4erufahti23ubp8o0.apps.googleusercontent.com">
          <Login
            setIsLoggedin={(isLoggedinState) => {
              setIsLoggedIn(isLoggedinState);
            }}
          />
        </GoogleOAuthProvider>
      )}
      {(isLoggedIn || getUserInfo() ) && <Soulmachine logout={logOut} />}
    </React.Fragment>
  );
}

export default App;
