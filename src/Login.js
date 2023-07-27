import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleButton from "react-google-button";

const Login = ({ setIsLoggedin }) => {
  const [user, setUser] = useState([]);
  const emails = [
    "mailbox@phanig.com",
    "soubhagyakumar666@gmail.com",
    "pinnamanenivvs@gmail.com",
    "dprabhakar@webprodigiesinc.com",
    "taranjeetsingh3326@gmail.com",
    "manmohanalla@gmail.com",
    "vpsps@yahaoo.com",
    "vpspublicschool@gmail.com",
    "krishna.samanth@gmail.com",
    "prajaykamat@gmail.com",
    "msrmeda1961@gmail.com",
    "stjps2023@gmail.com",
    "keerthanaduggirala@gmail.com",
    "msrmeda1961@gmail.com",
    "krishna.medasani@gmail.com",
    "rakeshkolli@gmail.com",
    "mvc@rvrpro.in",
    "aditya.tummala10@gmail.com",
    "ruhifatimaa@gmail.com",
    "contact@phanig.com",
    "soubhagya.developer@gmail.com",
  ];

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (!emails.includes(res.data.email)) {
            alert("You don't have access to this page .. ");
            return;
          } else {
            console.log("***google Info**", res.data);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setIsLoggedin(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div id="content" className="login-container">
      <div className="login-container-block card-">
        <div className="">
          <h1 className="login-title"> Polyverse</h1>
          <h3 className="login-title"> Sign in</h3>
          {/* <h4 className="login-title">to continue to Alie Polyverse</h4> */}
        </div>
        <div className="btn-position">
          <div className="space-y-3 text-center ">
            {/* <button onClick={() => login()}>Sign in with Google 🚀 </button> */}
            <GoogleButton onClick={() => login()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
