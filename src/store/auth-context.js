import React, { useReducer } from "react";
import authReducer from "./auth-reducer";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || "",
  loader: false,
  error: {},
  success: "",
};

const AuthContext = React.createContext(initialState);

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
