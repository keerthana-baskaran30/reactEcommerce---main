// import * as types from "store/action/actionTypes";

// const initialState = {
//   products: [],
//   singleProduct: [],
//   sellerProducts: [],
//   cart: [],
//   successMessage: "",
//   errorMessage: "",
// };

// const productsReducers = (state = initialState, action) => {
//   switch (action.type) {
//     case types.GET_PRODUCTS:
//       return { ...state, products: action.payload };

//     case types.GET_PRODUCT:
//       return { ...state, singleProduct: action.payload };

//     case types.GET_SELLER_PRODUCTS:
//       return {
//         ...state,
//         sellerProducts: action.payload.data,
//         successMessage: "",
//       };

//     case types.ADD_PRODUCT:
//     case types.PRODUCT_UPDATE:
//     case types.DELETE_PRODUCT:
//     case types.DELETE_CART:
//       return { ...state, successMessage: action.payload };

//     case types.ADD_TO_CART:
//       return { ...state, successMessage: action.payload.successMessage };

//     case types.PRODUCT_NOT_ADDED:
//     case types.PRODUCT_NOT_DELETED:
//     case types.PRODUCT_NOT_UPDATED:
//       return { ...state, errorMessage: action.payload };

//     case types.PRODUCT_ADDED:
//     case types.PRODUCT_DELETED:
//     case types.PRODUCT_UPDATED:
//       return { ...state, successMessage: "" };

//     case types.DISPLAY_CART:
//       return { ...state, cart: action.payload };

//     case types.CLEAR_ERROR:
//       return { ...state, errorMessage: "" };
//     default:
//       return state;
//   }
// };

// export default productsReducers;
