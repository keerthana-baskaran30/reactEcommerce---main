// import * as types from "./actionTypes";
// import axiosInstance from "api/api";

// export const getProducts = (productData) => ({
//   type: types.GET_PRODUCTS,
//   payload: productData,
// });

// export const getProduct = (productData) => ({
//   type: types.GET_PRODUCT,
//   payload: productData,
// });

// export const SellerProducts = (productData) => ({
//   type: types.GET_SELLER_PRODUCTS,
//   payload: productData,
// });

// export const productAdd = (product) => ({
//   type: types.ADD_PRODUCT,
//   payload: product,
// });

// export const productNotAdded = (data) => ({
//   type: types.PRODUCT_NOT_ADDED,
//   payload: data,
// });

// export const productAdded = () => ({
//   type: types.PRODUCT_ADDED,
// });

// export const productDelete = (data) => ({
//   type: types.DELETE_PRODUCT,
//   payload: data,
// });

// export const productNotDeleted = (data) => ({
//   type: types.PRODUCT_NOT_DELETED,
//   payload: data,
// });

// export const productDeleted = () => ({
//   type: types.PRODUCT_DELETED,
// });

// export const productUpdate = (product) => ({
//   type: types.PRODUCT_UPDATE,
//   payload: product,
// });

// export const productUpdated = () => ({
//   type: types.PRODUCT_UPDATED,
// });
// export const productNotUpdated = (data) => ({
//   type: types.PRODUCT_NOT_UPDATED,
//   payload: data,
// });

// export const clearError = () => ({
//   type: types.CLEAR_ERROR,
// });

// export function displayProducts(category = null) {
//   return function (dispatch) {
//     if (category) {
//       axiosInstance
//         .get(`/product/category/?category=${category}`)
//         .then((response) => {
//           dispatch(getProducts(response.data.results));
//         })
//         .catch((error) => {});
//     } else {
//       axiosInstance
//         .get("/products")
//         .then((response) => {
//           dispatch(getProducts(response.data.results));
//         })
//         .catch((error) => {
//           dispatch(productNotUpdated(error.response.data));
//         });
//     }
//   };
// }

// export function getSingleProduct(id) {
//   return function (dispatch) {
//     axiosInstance
//       .get(`product/pid?pid=${id}`)
//       .then((response) => {
//         dispatch(getProduct(response.data.results[0]));
//       })
//       .catch((error) => {
//         dispatch(productNotUpdated(error.response.data));
//       });
//   };
// }

// export function getSellerProducts(user) {
//   return function (dispatch) {
//     axiosInstance
//       .post("/seller/product", user)
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(SellerProducts(response.data));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotUpdated(error.response.data));
//       });
//   };
// }

// export function addProducts(products, user) {
//   return function (dispatch) {
//     axiosInstance
//       .post("seller/product/add", { product: products, user: user })
//       .then((response) => {
//         if (response.status === 201) {
//           dispatch(productAdd(response.data.successMessage));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotAdded(error.response.data.errorMessage));
//       });
//   };
// }

// export function deleteProduct(pid, username) {
//   return function (dispatch) {
//     axiosInstance
//       .delete(`seller/product/delete?pid=${pid}`, {
//         data: { username: username },
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(productDelete(response.data.successMessage));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotDeleted(error.response.data.errorMessage));
//       });
//   };
// }

// export function updateProduct(pid, product, username) {
//   return function (dispatch) {
//     axiosInstance
//       .put(`seller/product/update?pid=${pid}`, {
//         product: product,
//         username: username,
//       })
//       .then((response) => {
//         if (response.status === 201) {
//           dispatch(productUpdate(response.data.successMessage));
//         }
//       })
//       .catch((error) => {
//         dispatch(productNotUpdated(error.response.data.errorMessage));
//       });
//   };
// }
