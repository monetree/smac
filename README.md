<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# AvatarX Avatar based Techer


## Setup

In order to run this application, you'll either need an API key or a token server. Most projects will use an API key--token servers are only necessary when interfacing with a non-native NLP through a orchestration server.

### Copy `.env.example` contents into `.env`
Create an empty text file called `.env` and copy the contents of `.env.example` into it. These environment variables are required for the UI to run.

If using an API key, set `REACT_APP_PERSONA_AUTH_MODE` to `0` and populate `REACT_APP_TOKEN_URL` with your key.

If using an orchestration server, set `REACT_APP_PERSONA_AUTH_MODE` to `1` and populate `REACT_APP_TOKEN_URL` with your token server endpoint and set `REACT_APP_TOKEN_URL` to `true`.

### `npm install`
Run to install the project's dependencies.

### `npm start`
Starts the development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will automatically reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder. The files will be bundled and minified for production.

## License

Soul Machines React Reference UI is available under the Apache License, Version 2.0. See the [LICENSE.txt](./LICENSE.txt) file for more info.

## Linting & Code Style

This project strictly follows [AirBnB's JavaScript style guide](https://github.com/airbnb/javascript). We recommend you install [ESLint](https://eslint.org/) in your editor and adhere to its recommendations.

We have also provided an `.editorconfig` file that you can use in your editor to match the indentation, whitespace, and other styling rules we used in creating this template.

## Support 
Our team would love to hear from you. For any additional support, feedback, bugs, feature requests, please [submit a ticket](https://support.soulmachines.com) or reach out to us at [support@avatarx.com](support@soulmachines.com). 
>>>>>>> 94bac4ec9818bc3afefaf267d1c437e016ca2f66
