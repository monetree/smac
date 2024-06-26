import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReactTooltip from "react-tooltip";
import Router from "./Router";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./globalStyle";
import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "2b7e8214-35c4-4691-ab02-4356d8099ba4",
  clientToken: "pubd2a89f8d39cdd89366a83bd36952b270",
  site: "us5.datadoghq.com",
  service: "avatarx",
  env: "prod",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  premiumSampleRate: 100,
  trackUserInteractions: true,
  defaultPrivacyLevel: "mask-user-input",
});

datadogRum.startSessionReplayRecording();

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router />
    </Provider>
    <GlobalStyle />
    {/* globally enable react tooltips */}
    <ReactTooltip />
    {/* will be null if GA tracking is not enabled */}
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
