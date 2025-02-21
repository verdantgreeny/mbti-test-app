import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-gray-800">
      <h1 className="text-4xl font-extrabold mb-4">INF∞</h1>
      <h4 className="text-lg text-gray-600 mb-6">무한한 MBTI 조합과 가능성</h4>

      <Link
        to="/test-page"
        className="px-6 py-3 bg-green-900 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        MBTI 테스트 시작하기
      </Link>
    </div>
  );
};

export default Home;
