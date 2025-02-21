import React from "react";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    console.log("formData:", formData);
    try {
      const res = await register(formData);
      // console.log(res.success);
      if (res.success) {
        alert(res.message);
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
      alert(error.response.data.message);
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
