import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import useUserActions from "../hooks/useUserActions";
import { ROUTES } from "../constants/routes";

const Login = () => {
  const { loginHandler } = useUserActions();
  const { SIGNUP } = ROUTES;

  const handleLogin = async (userData) => {
    await loginHandler(userData);
  };

  return (
    <div className="flex justify-center items-center min-h-full text-white">
      <div className="p-10 rounded-lg border max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div className="text-center mt-6">
          <p>
            계정이 없으신가요?{" "}
            <Link to={SIGNUP} className="text-[#E98934] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
