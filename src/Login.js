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
    "claire.shiying@gmail.com",
    "ashishmohanty000@gmail.com",
    "manmohanalla@gmail.com",
    "genesaigal@gmail.com",
    "erilineresorts@gmail.com",
    "sameera1892@gmail.com",
    "sanjeev@vscgroup.co",
    "vpsps@yahaoo.com",
    "vpspublicschool@gmail.com",
    "ikonsway@gmail.com",
    "bablusb143@gmail.com",
    "sfwhyd@gmail.com",
    "krudra@gmail.com",
    "mail4lucky@gmail.com",
    "Kchawalla79@gmail.com",
    "pasupuleti9@gmail.com",
    "agrrohit11@gmail.com",
    "kunapareddypadmasree@gmail.com",
    "shaikhzameer99@gmail.com",
    "saunakasae21@gmail.com",
    "apernavolluru14@gmail.com",
    "turukrish@gmail.com",
    "skillioma.work@gmail.com",
    "sbharat4u1985@gmail.com",
    "chaitoos82@gmail.com",
    "pradeepsutodiya1@gmail.com",
    "jainashoakkumar@gmail.com",
    "Krishna.samanth@gmail.com",
    "krishna.samanth@gmail.com",
    "prajaykamat@gmail.com",

    "msrmeda1961@gmail.com",
    "clarusitsol@gmail.com",
    "ramapin@gmail.com",
    "stjps2023@gmail.com",

    "msrmeda1961@gmail.com",
    "clarusitsol@gmail.com",
    "ramapin@gmail.com",
    "stjps2023@gmail.com",
    "krishna.medasani@gmail.com",
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
