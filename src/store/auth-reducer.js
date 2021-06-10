const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        token: "",
        user: null,
      };
    case "SET_LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
