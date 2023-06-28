import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
  transparentHeader, headerHeight, logoLink,
} from '../config';
import Controls from './Controls';
import {
  stopSpeaking,
  setShowTranscript,
  disconnect,
  setOutputMute,
  setMicOn,
  setCameraOn,
} from '../store/sm/index';
import {
  MicFill,
  MicMuteFill,
  SkipEndFill,
  VolumeMuteFill,
  VolumeUpFill
} from 'react-bootstrap-icons';
import { primaryAccent } from '../globalStyle';

const iconSize = 24;

function Header({
  className,
}) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { connected, loading, micOn, highlightMic, speechState, highlightSkip, highlightMute, isOutputMuted} = useSelector(({ sm }) => ({ ...sm }));


  const history = useHistory();
  
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
    if(!isLoggedInUser){
      history.push('/');
    }
  }, []);
  

  return (
    <Fragment>
      <div className={`${className}`}>
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                {/* left align */}
                {/* <Link to={logoLink}  className={`${pathname === '/loading' ? 'logo' : 'd-none'}`}>
                  Polyverse
                </Link> */}
                <aside id="menu" className={"user-menu"}>
                    <div className="menu-child">
                      <img
                        id="profile-pic"
                        src={getUserInfo()?.picture}
                        width={55}
                        height={55}
                      />
                      <div>
                        <p className={`username ${pathname === '/loading' ? "black" : ""}`}>
                          <b>Welcome </b>
                          {getUserInfo()?.name}
                        </p>
                      
                      </div>
                    </div>
                  </aside>
              </div>
              <div>
                {/* middle align */}
              </div>
              <div>
                {/* right align */}
                <div className={`${connected && !loading && pathname === '/video' ? '' : 'd-none'}`}>
                  <Controls />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {connected &&
        <div className={"action-wrapper action-btns"}>
            {!micOn && (
              <button
                onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
                id="un-mute-icon"
                color="primary"
                className=" mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              >
                <span className="mat-button-wrapper">
                <MicMuteFill size={iconSize} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
                </span>
                <span
                  matripple=""
                  className="mat-ripple mat-button-ripple mat-button-ripple-round"
                ></span>
                <span className="mat-button-focus-overlay"></span>
              </button>
            )}
            {micOn && (
              <button
                onClick={() => dispatch(setMicOn({ micOn: !micOn }))}
                id="mute-icon"
                color="primary"
                className="un-mute mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              >
                <span className="mat-button-wrapper">
                <MicFill size={iconSize} color={primaryAccent} style={{ border: highlightMic ? 'red 2px solid' : '' }} />
                </span>
                <span
                  matripple=""
                  className="mat-ripple mat-button-ripple mat-button-ripple-round"
                ></span>
                <span className="mat-button-focus-overlay"></span>
              </button>
            )}

            <div
              id="speech-indicator"
              className={`speech-indicator ${!micOn ? "mute" : ""}`}
            >
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
              <span className="speech-indicator-span"></span>
            </div>

             {/* skip through whatever dp is currently speaking */}
          <div>
            <button
              type="button"
              style={{marginLeft:10}}
              className="control-icon mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
              disabled={speechState !== 'speaking'}
              onClick={() => dispatch(stopSpeaking())}
              data-tip="Skip Speech"
              aria-label="Skip Speech"
            >
              <SkipEndFill size={iconSize} style={{ border: highlightSkip ? 'red 2px solid' : '' }} />
            </button>
          </div>

          {/* mute dp sound */}
        <div>
          <button
            type="button"
            style={{marginLeft:10}}
            className="control-icon mat-focus-indicator microphone mat-fab mat-button-base mat-primary"
            aria-label="Toggle DP Audio"
            data-tip="Toggle DP Audio"
            onClick={() => dispatch(setOutputMute({ isOutputMuted: !isOutputMuted }))}
          >
            {isOutputMuted ? (
              <VolumeMuteFill size={iconSize} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
            ) : (
              <VolumeUpFill size={iconSize} color={primaryAccent} style={{ border: highlightMute ? 'red 2px solid' : '' }} />
            )}
          </button>
        </div>
        

        </div>
      }
    </Fragment>
  );
}
Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Header)`
  position: relative;
  z-index: 20;
  top: 0;
  width: 100%;
  background-color: ${transparentHeader ? 'none' : '#FFFFFF'};

  &>.row {
    height: ${headerHeight};
  }
  .logo {
    margin-top: 20px;

    display: block;
    width: 150px;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
      height: calc(0.8 * ${headerHeight});
   }
  }
`;
