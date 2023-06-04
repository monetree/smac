import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = ({setIsLoggedin})=> {

    const responseGoogle = (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let userData = {
            id: profile.getId(),
            name: profile.getName(),
            picture: profile.getImageUrl(),
            email: profile.getEmail()
        }
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsLoggedin(true);
    }

    return (
        <div id="content" className="login-container">
            <div className="login-container-block card">
                <div className="">
                    <h1 className="login-title"> Alie Polyverse</h1>
                    <h3 className="login-title"> Sign in</h3>
                    <h4 className="login-title">to continue to Alie Polyverse</h4>
                </div>
                <div className="btn-position">
                    <div className="space-y-3 text-center ">
                       
                        <GoogleLogin
                            clientId={'118420081966-s1n42272jcg4r5l4erufahti23ubp8o0.apps.googleusercontent.com'}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            // isSignedIn={true}
                            className={"googleLoginBtn"}
                        >
                            <div className="google-btn" id="gSignInWrapper">
                                
                                <p className="text-lg font-medium lg:text-xl btn-text">Sign in with google</p>
                            </div>
                        </GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;