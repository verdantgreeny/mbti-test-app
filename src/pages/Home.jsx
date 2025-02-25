import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Home = () => {
  const { TEST_PAGE } = ROUTES;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-full text-white p-4 ">
      {/* 왼쪽 이미지 */}
      <img
        src="/home2.png"
        alt="메인홈화면 이미지"
        className="w-1/3 max-w-xs hover:animate-wiggle transition-transform duration-2000 rounded-full mb-10"
      />

      {/* 중앙 컨텐츠 */}
      <div className="flex flex-col justify-center items-center w-full max-w-md text-center md:p-10">
        <img
          src="/logo.png"
          alt="홈화면 title"
          className="w-40 sm:w-40 md:w-56 mb-4"
        />

        <h3 className="sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 w-40 ">
          MBTI로 열리는 <br /> 무한한 가능성, <br /> 나를 알아가는 여정
        </h3>

        <Link
          to={TEST_PAGE}
          className="px-5 py-2 bg-[#1C5952] text-white border border-gray-300 rounded-full hover:bg-[#E98934] transition"
        >
          MBTI 테스트
        </Link>
      </div>

      {/* 오른쪽 이미지 */}
      <img
        src="/home.png"
        alt="메인홈화면 이미지"
        className="w-1/3 max-w-xs hover:animate-wiggle transition-transform duration-2000 hidden md:block rounded-full"
      />
    </div>
  );
};

export default Home;
