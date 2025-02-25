import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";
import useAuthStore from "../zustand/bearsStore";

const ProtectedRoutes = ({ element, isLogin }) => {
  const { isAuthenticated } = useAuthStore();
  const { HOME, LOGIN } = ROUTES;
  const navigate = useNavigate();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!isLogin && !isAuthenticated && !hasAlerted.current) {
      // 로그인해야 하는 페이지인데 로그인X
      hasAlerted.current = true;
      navigate(LOGIN);
    } else if (isLogin && isAuthenticated && !hasAlerted.current) {
      // 로그인하지 않아야 하는 페이지인데 로그인O
      hasAlerted.current = true;
      navigate(HOME);
    }
  }, [navigate, isLogin, isAuthenticated]);

  return element;
};

export default ProtectedRoutes;
