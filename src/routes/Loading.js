import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
  MicFill,
} from "react-bootstrap-icons";
import { createScene } from "../store/sm";
import Header from "../components/Header";
import {
  headerHeight,
  landingBackgroundColor,
  landingBackgroundImage,
} from "../config";

function Loading({ className }) {
  const { connected, loading, error, requestedMediaPerms, connectionState } =
    useSelector(({ sm }) => sm);
  const dispatch = useDispatch();

  const { percentageLoaded, name, currentStep, totalSteps } = connectionState;

  const stateNameMap = {
    SearchingForDigitalPerson: "Searching For Digital Person",
    DownloadingAssets: "Downloading Assets",
    ConnectingToDigitalPerson: "Connecting To Digital Person",
  };
  // map name vals to plain english if we know the state name, otherwise just display the name as is
  const stateName = name in stateNameMap ? stateNameMap[name] : name;

  // // pull querystring to see if we are displaying an error
  // // (app can redirect to /loading on fatal err)
  // const useQuery = () => new URLSearchParams(useLocation().search);
  // const query = useQuery();

  // create persona scene on button press on on mount, depending on device size
  const createSceneIfNotStarted = () => {
    if (loading === false && connected === false && error === null) {
      dispatch(createScene());
    }
  };

  useEffect(() => {
    createSceneIfNotStarted();
  }, []);

  const iconSize = 66;
  const [page, setPage] = useState(0);
  const pages = [
    <div>
      <div className="row justify-content-center">
        {/* <div className="tutorial-icon mb-2"> */}
        <div className="loader ">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>,
  ];

  const [skip, setSkip] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (connected === true) history.push("/video");
  }, [connected]);

  return (
    <div className={className}>
      <Header />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-11 col-md-6 text-center mobile">
            <div className="row">{pages[page]}</div>
          </div>
        </div>
      </div>
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
