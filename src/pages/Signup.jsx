import React from "react";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    console.log("userData:", userData);
    try {
      const res = await register(userData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="text-center mt-4">
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
