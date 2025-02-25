import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import useAuthStore from "../zustand/bearsStore";

const ProtectedRoutes = ({ element, isLogin }) => {
  const { isAuthenticated } = useAuthStore();
  const { HOME, LOGIN } = ROUTES;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && !isAuthenticated) {
      // 로그인해야 하는 페이지인데 로그인X
      navigate(LOGIN);
    } else if (isLogin && isAuthenticated) {
      // 로그인하지 않아야 하는 페이지인데 로그인O
      navigate(HOME);
    }
  }, [isLogin, isAuthenticated]);

  return element;
};

export default ProtectedRoutes;
