import { createContext, useReducer } from "react";

export const Auth = createContext();

export const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Auth.Provider value={value}> {props.children} </Auth.Provider>;
}