import React from "react";
import Login from "./Login";
import Soulmachine from "./soulmachine";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <React.Fragment>
      {!isLoggedIn && 
        <Login setIsLoggedin={(isLoggedinState)=>{
          setIsLoggedIn(isLoggedinState);
        }} />
      }
      {isLoggedIn && <Soulmachine />}
    </React.Fragment>
  );
}

export default App;
