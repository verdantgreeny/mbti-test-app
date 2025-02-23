import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Home = () => {
  const { TEST_PAGE } = ROUTES;
  return (
    <div className="flex flex-row items-center justify-center min-h-full text-white">
      <img
        src="../../public/flower.png"
        alt="메인홈화면 이미지"
        className="max-w-md hover:animate-wiggle transition-transform duration-2000"
      />
      <div className="flex flex-col justify-center items-center min-h-full text-center">
        <img
          src="../../public/logo.png"
          alt="홈화면 title"
          className="w-56 mb-6"
        />

        <h3 className="text-2xl text-gray-300 mb-10">
          무한한 MBTI 조합과 가능성
        </h3>

        <Link
          to={TEST_PAGE}
          className="px-6 py-3 bg-[#1C5952] text-white border border-gray-300 rounded-full hover:bg-[#E98934] transition"
        >
          MBTI 테스트 시작하기
        </Link>
      </div>
      <img
        src="../../public/flower2.png"
        alt="메인홈화면 이미지"
        className="max-w-md hover:animate-wiggle transition-transform duration-2000"
      />
    </div>
  );
};

export default Home;
