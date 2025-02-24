import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import useUserActions from "../hooks/useUserActions";

const Signup = () => {
  const { signupHandler } = useUserActions();

  const handleSignup = async (userData) => {
    await signupHandler(userData);
  };

  return (
    <div className="flex justify-center items-center min-h-full text-white">
      <div className=" p-10 rounded-lg max-w-md w-full space-y-8 border">
        <h1 className="text-3xl font-bold text-center mb-6">회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="text-center mt-6">
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-[#E98934] hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
