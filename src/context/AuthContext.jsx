import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/auth";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [user, setUser] = useState("");

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  // 사용자 로그인
  const authenticateUser = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  // 사용자 로그아웃
  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setUser(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) return;
      try {
        const res = await getUserProfile(accessToken);
        // console.log(res);
        setUser(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  // console.log("유저:", user);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    authenticateUser,
    logoutUser,
    user,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
