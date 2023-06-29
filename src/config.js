/* eslint-disable import/prefer-default-export */
import smLogo from './img/sm-logo-retina.webp';
import placeholder from './img/placeholder-headshot.png';

import AvatarOne from "./img/avatar-1.jpg";
import AvatarTwo from "./img/avatar-2.jpg";
import AvatarThree from "./img/avatar-3.jpg";

// header will not take up vertical height when transparent, so you need to be mindful of overlap
export const transparentHeader = true;
export const headerHeight = '4.2rem';
export const logo = smLogo;
export const logoAltText = 'Polyverse logo';
export const logoLink = '/';

// background image is positioned in a way that is best for pictures of the persona's face.
// adjust spacing as necessary in Landing.js for different images
// if you want just a color, set landingBackgroundImage to null
// if desired, a gradient can also be added to landingBackgroundColor
export const landingBackgroundColor = '#FFF';
export const landingBackgroundImage = placeholder;

// if set to true, on disconnect, the app will redirect to the specified route.
// if false, it will redirect to /
export const disconnectPage = true;
export const disconnectRoute = '/feedback';

export const avatars = [
    {
      img: AvatarTwo,
      name: "avatar-2",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWM5MGM3OTEtNTc1ZC00NDgwLTk1YjMtYmYxM2VjNzkxNzAxIn0=",
    },
    {
      img: AvatarOne,
      name: "avatar-1",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWhpbmRpIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfZDYxOTJlNmItMDE3Ny00ZGNiLThjYTYtYjVmNjRhYzQ3MGZjIn0=",
    },
    {
      img: AvatarThree,
      name: "avatar-3",
      key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLW1heS0yN3RoLWRlbW8iLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9kNDdiZmZiZi04NjhmLTQzNzYtYWQ5YS1mZTVmM2YyYmNmMWEifQ==",
    },
  ];
