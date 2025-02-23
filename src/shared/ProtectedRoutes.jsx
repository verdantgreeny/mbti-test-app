import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoutes = ({ element, isLogin }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { HOME, LOGIN } = ROUTES;
  const navigate = useNavigate();
  // useEffect가 두번 실행 되는 이유 : stricmode에서 제대로 된 함수인 지 확인하려고 두번 실행해서 검증
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!isLogin && !isAuthenticated && !hasAlerted.current) {
      // 로그인해야 하는 페이지인데 로그인X
      toast.info("로그인을 해야 테스트가 가능합니다.");
      // console.log("useEffect 실행 if 조건");
      hasAlerted.current = true;
      navigate(LOGIN);
    } else if (isLogin && isAuthenticated && !hasAlerted.current) {
      // 로그인하지 않아야 하는 페이지인데 로그인O
      // toast.info("로그인 상태이므로 홈으로 이동합니다.");
      // console.log("useEffect 실행 if else 조건");
      hasAlerted.current = true;
      navigate(HOME);
    }
  }, [navigate, isLogin, isAuthenticated]);

  return element;
};

export default ProtectedRoutes;
