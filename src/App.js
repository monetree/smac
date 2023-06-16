import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import Soulmachine from "./soulmachine";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const logOut = () => {
    console.log("***logOut Called**");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
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

  useEffect(()=> {
    let isLoggedInUser = getUserInfo();
    setIsLoggedIn(!!isLoggedInUser);
  }, []);

  console.log("***isLoggedIn***", isLoggedIn);

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
