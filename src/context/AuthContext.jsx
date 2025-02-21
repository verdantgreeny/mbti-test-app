import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 사용자 로그인
  const authenticateUser = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  // 사용자 로그아웃
  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    authenticateUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
