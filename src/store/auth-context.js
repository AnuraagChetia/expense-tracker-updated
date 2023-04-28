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
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const verifiedHandler = () => {
    setIsVerified(true);
  };
  const contextValue = {
    token: token,
    isVerified: isVerified,
    isLoggedIn: userIsLoggedIn,
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
