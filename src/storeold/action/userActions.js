// import * as types from "./actionTypes";
// import { cartNotDisplayed } from "./cartActions";
// import axiosInstance from "api/api";

// export const registerUser = (user) => ({
//   type: types.REGISTER_USER,
//   payload: user,
// });

// export const logUserIn = (user) => ({
//   type: types.LOGIN_USER,
//   payload: user,
// });

// export const setLoggedIn = () => ({
//   type: types.USER_LOGGED,
// });

// export const userNotLogged = (error) => ({
//   type: types.USER_NOT_LOGGED,
//   payload: error,
// });

// export const setNotLogged = () => ({
//   type: types.SET_NOT_LOGGED,
// });
// export const logoutUser = () => ({
//   type: types.LOGOUT_USER,
// });

// export const profileDetail = (data) => ({
//   type: types.PROFILE_DETAIL,
//   payload: data,
// });

// export default function registerData(user, role) {
//   return async function (dispatch) {
//     axiosInstance
//       .post(`/${role}/register`, user)
//       .then((response) => {
//         dispatch(registerUser(response.data));
//         localStorage.setItem("username", user["username"]);
//         localStorage.setItem("email", user["email"]);
//         localStorage.setItem("role", role);
//       })
//       .catch((error) => {
//         dispatch(userNotLogged(error.response.data));
//       });
//   };
// }

// export function loginData(user) {
//   return function (dispatch) {
//     axiosInstance
//       .post("/login", user)
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(logUserIn(response.data));
//           localStorage.setItem("username", response.data.data["username"]);
//           localStorage.setItem("email", response.data.data["email"]);
//           localStorage.setItem("role", response.data.role);
//         }
//       })
//       .catch((error) => {
//         dispatch(userNotLogged(error.response.data));
//       });
//   };
// }

// export function getUserProfile(username) {
//   return function (dispatch) {
//     axiosInstance
//       .get(`/userprofile/username?username=${username}`)
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(profileDetail(response.data.data));
//         }
//       })
//       .catch((error) => {
//         dispatch(cartNotDisplayed(error.response.data));
//       });
//   };
// }
