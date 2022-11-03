// import * as types from "store/action/actionTypes";

// const initialState = {
//   users: [],
//   profile: [],
//   successMessage: "",
//   errorMessage: "",
//   role: "",
// };

// const usersReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.REGISTER_USER:
//       return { ...state, successMessage: action.payload.successMessage };
//     case types.LOGIN_USER:
//       return {
//         ...state,
//         users: action.payload.data,
//         successMessage: action.payload.successMessage,
//         role: action.payload.role,
//       };

//     case types.USER_LOGGED:
//       return { ...state, successMessage: "" };
//     case types.USER_NOT_LOGGED:
//       return { ...state, errorMessage: action.payload.errorMessage };
//     case types.SET_NOT_LOGGED:
//       return { ...state, errorMessage: "" };
//     case types.LOGOUT_USER:
//       return {
//         ...state,
//         users: "",
//         successMessage: "",
//         errorMessage: "",
//         role: "",
//       };
//     case types.PROFILE_DETAIL:
//       return { ...state, profile: action.payload };
//     default:
//       return state;
//   }
// };

// export default usersReducer;
