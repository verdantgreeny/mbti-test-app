import React, { useContext, useEffect, useRef } from "react";
import AuthForm from "../components/AuthForm";
import { login, getUserProfile } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleLogin = async (userData) => {
    try {
      const { accessToken, nickname } = await login(userData);
      // console.log(accessToken);
      // console.log(nickname);
      if (!accessToken) {
        toast.error("토큰이 없어 로그인에 실패했습니다.");
      }
      authenticateUser(accessToken);
      toast.success(`${nickname}님 환영합니다(홈으로 이동).`);
      navigate(ROUTES.HOME);
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div className="text-center mt-4">
          <p>
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
