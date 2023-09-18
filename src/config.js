/* eslint-disable import/prefer-default-export */
import smLogo from "./img/sm-logo-retina.webp";
import placeholder from "./img/placeholder-headshot.png";

import AvatarOne from "./img/avatar-1.jpg";
import AvatarTwo from "./img/avatar-2.jpg";
import AvatarThree from "./img/avatar-3.jpg";
import Doggo from "./img/dog.png";

// header will not take up vertical height when transparent, so you need to be mindful of overlap
export const transparentHeader = true;
export const headerHeight = "4.2rem";
export const logo = smLogo;
export const logoAltText = "AvatarX logo";
export const logoLink = "/";

// background image is positioned in a way that is best for pictures of the persona's face.
// adjust spacing as necessary in Landing.js for different images
// if you want just a color, set landingBackgroundImage to null
// if desired, a gradient can also be added to landingBackgroundColor
export const landingBackgroundColor = "#FFF";
export const landingBackgroundImage = placeholder;

// if set to true, on disconnect, the app will redirect to the specified route.
// if false, it will redirect to /
export const disconnectPage = true;
export const disconnectRoute = "/";

export const avatars = [
  {
    img: AvatarTwo,
    name: "avatar-2",
    language: "English",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVtbWFiZXRhIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNWM5MGM3OTEtNTc1ZC00NDgwLTk1YjMtYmYxM2VjNzkxNzAxIn0=",
  },
  {
    img: AvatarTwo,
    name: "avatar-1",
    language: "Hindi",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWhpbmRpIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfZDYxOTJlNmItMDE3Ny00ZGNiLThjYTYtYjVmNjRhYzQ3MGZjIn0=",
  },
  {
    img: AvatarTwo,
    name: "avatar-3",
    language: "English Indian",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVuZ2xpc2hpbmRpYW4iLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV83Y2Y3ODNkNC0xOTE3LTRiMzItYWU5OC1jNzMwNjhkZjYzNWMifQ==",
  },
  {
    img: AvatarTwo,
    name: "avatar-4",
    language: "Arabic",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWFyYWJpYyIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzEzMzNjMWU5LWZkYWItNDA0ZC1iODM5LWM5MDlkNTgwYTgzMyJ9",
  },
  {
    img: AvatarTwo,
    name: "avatar-5",
    language: "Indian Telugu",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWZyZW5jaCIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzcxMDhmMzdmLWQ5ZjQtNDI5Ny04MTJlLTg0MjE2MDJjMGNiNyJ9",
  },
  {
    img: AvatarTwo,
    name: "avatar-6",
    language: "English Philipines",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLWVuZ2xpc2hwaGlsaXBwaW5lcyIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzU2M2U5NDJjLTJkZDYtNGM4MS04NjMzLTE1NjNmNWM5M2ViMyJ9",
  },
  {
    img: AvatarTwo,
    name: "avatar-7",
    language: "Spanish Colombia",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLXNwYW5pc2hjb2xvbWJpYSIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzZhYTg5ZTE1LTI0ZDQtNDE3NC05MTZjLWUzY2I0MmRhZTVjNSJ9",
  },
  {
    link: "https://login.avatarx.live/",
    img: Doggo,
    name: "Beta",
    language: "Multilanguage",
    key: "eyJzb3VsSWQiOiJkZG5hLXVzaGEtbXVzdW51cmktLXNwYW5pc2hjb2xvbWJpYSIsImF1dGhTZXJ2ZXIiOiJodHRwczovL2RoLmF6LnNvdWxtYWNoaW5lcy5jbG91ZC9hcGkvand0IiwiYXV0aFRva2VuIjoiYXBpa2V5X3YxXzZhYTg5ZTE1LTI0ZDQtNDE3NC05MTZjLWUzY2I0MmRhZTVjNSJ9",
  },
];
