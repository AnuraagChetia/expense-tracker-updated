import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  isVerified: false,
  isLoggedIn: false,
  verify: () => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const loginHandler = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.clear();
  };

  const verifiedHandler = () => {
    setIsVerified(true);
  };
  const contextValue = {
    token: token,
    isVerified: isVerified,
    isLoggedIn: isLoggedIn,
    verify: verifiedHandler,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
