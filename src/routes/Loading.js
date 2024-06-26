import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createScene } from "../store/sm";
import Header from "../components/Header";
import {
  headerHeight,
  landingBackgroundColor,
  landingBackgroundImage,
} from "../config";
import { datadogRum } from "@datadog/browser-rum";

function Loading({ className, ignoreError }) {
  const { connected, loading, error, connectionState } = useSelector(
    ({ sm }) => sm
  );
  const dispatch = useDispatch();

  // create persona scene on button press on on mount, depending on device size
  const createSceneIfNotStarted = () => {
    if (loading === false && connected === false && error === null) {
      dispatch(createScene());
    }
  };

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (connected === true) history.push("/chat");
  }, [connected]);

  useEffect(() => {
    datadogRum.setUser({
      id: localStorage.getItem("email"),
      name: localStorage.getItem("email"),
      email: localStorage.getItem("email"),
    });
  }, []);

  return (
    <div className={className}>
      <Header />
      {!error && (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-11 col-md-6 text-center mobile">
              <div className="row">
                <div>
                  <div className="row justify-content-center">
                    <div className="loader ">
                      <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Loading)`
  background: ${landingBackgroundColor};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;

  width: 100vw;
  height: 100vh;
  color: #3C3C3C;

  &>.container>.row {
    height: calc(100vh - ${headerHeight});
  }
  .mobile {
    @media (max-width: 400px) {
      width: 300px;
    }
  .connected-button {
    background-color: #3C3C3C;
    border: 2px solid #3C3C3C;
  }

  .unconnected-button {
    font-size: 14px;
    font-family: "Helvetica Neue";
  }

  .tutorial-icon {
    width: 180px;
    height: 180px;
    aspect-ratio: 1;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #EAEAEA;
  }
  .tutorial-icon-dp {
    background-image: url(${landingBackgroundImage});
    background-size: cover;
    background-position: bottom center;
  }
  .open-dot {
    border: 2px solid #3C3C3C;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .closed-dot {
    border: 2px solid #3C3C3C;
    background: #3C3C3C;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;
