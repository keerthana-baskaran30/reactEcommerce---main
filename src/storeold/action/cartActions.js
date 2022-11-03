// import * as types from "./actionTypes";
// import { productNotUpdated } from "./productActions";
// import axiosInstance from "api/api";

// export const cartAdd = (data) => ({
//   type: types.ADD_TO_CART,
//   payload: data,
// });

// export const cartDisplay = (data) => ({
//   type: types.DISPLAY_CART,
//   payload: data,
// });

// export const cartNotDisplayed = (data) => ({
//   type: types.NOT_DISPLAY,
// });

// export const cartDelete = (data) => ({
//   type: types.DELETE_CART,
//   payload: data,
// });

// export function AddToCart(pid, qty = 1, username) {
//   return function (dispatch) {
//     axiosInstance
//       .post(`/cart/add?pid=${pid}&qty=${qty}`, { username: username })
//       .then((response) => {
//         if (response.status === 200 || response.status === 201) {
//           dispatch(cartAdd(response.data));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotUpdated(error.response.data.errorMessage));
//       });
//   };
// }

// export function displayCart(username) {
//   return function (dispatch) {
//     axiosInstance
//       .post(`/cartitems`, { username: username })
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(cartDisplay(response.data.data.cartItem));
//         }
//       })
//       .catch((error) => {
//         dispatch(cartNotDisplayed(error.response.data));
//       });
//   };
// }

// export function deleteCart(pid) {
//   return function (dispatch) {
//     axiosInstance
//       .delete(`/cartitems/delete?pid=${pid}`, {
//         data: { username: localStorage.getItem("username") },
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(cartDelete(response.data.successMessage));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotUpdated(error.response.data.errorMessage));
//       });
//   };
// }
