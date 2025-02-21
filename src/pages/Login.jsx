import React, { useContext, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { login, getUserProfile } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { authenticateUser, isAuthenticated } = useContext(AuthContext);

  // console.log(isAuthenticated);

  const handleLogin = async (formData) => {
    try {
      const { accessToken, nickname } = await login(formData);
      // console.log(accessToken);
      // console.log(nickname);
      if (!accessToken) {
        alert("토큰이 없어 로그인에 실패했습니다.");
      }
      authenticateUser(accessToken);
      alert(`${nickname}님 로그인에 성공하셨습니다. 홈화면으로 이동!!`);
      navigate("/");
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
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
