import React, { useEffect, useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { toast } from "react-toastify";
import { getUserProfile } from "../api/auth";

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile(accessToken);
        // console.log(res);
        setUser(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  // console.log("유저:", user);

  const handleTestSubmit = async (answers) => {
    try {
      const mbtiResult = calculateMBTI(answers);
      /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다. 이 데이터를 어떻게 API 를 이용해 처리 할 지 고민해주세요. */
      // console.log(`MBTI 결과: ${mbtiResult}`);
      // console.log(mbtiDescriptions[mbtiResult]);

      const result = {
        nickname: user?.nickname || "",
        result: mbtiResult,
        visibility: true,
        date: new Date().toISOString().split("T")[0], //현재 날짜를 yyyy-MM-dd 형식으로 생성!!
        userId: user?.id || "unknown",
      };

      await createTestResult(result);
      setResult(mbtiResult);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleNavigateToResults = () => {
    navigate(ROUTES.TEST_RESULT_PAGE);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white">
      <div className=" rounded-lg p-8 max-w-2xl w-full h-full shadow-lg">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center ">
              "{user.nickname}" 님의 결과
              <p className="text-4xl mt-3"> {result} </p>
            </h1>
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-md">
              <img
                src="https://cdn.prod.website-files.com/6467b97fbfd703a1664963fb/64948b7cd63ee9b7d47f6873_Star.png"
                alt="결과 아이콘"
                className="w-16 h-16 object-cover transform transition-transform duration-300 hover:scale-110"
              />

              <p className="text-lg text-justify">
                {mbtiDescriptions[result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>

              <div className="flex justify-center space-x-3 mt-4">
                <button className="text-sm px-10 py-2 border border-gray-300 bg-[#1C5952] rounded-full hover:bg-[#E98934] transition ">
                  삭제
                </button>
                <button className="text-sm px-10 py-2 border border-gray-300 bg-[#1C5952] rounded-full hover:bg-[#E98934] transition">
                  공개
                </button>
              </div>

              <button
                onClick={handleNavigateToResults}
                className="w-full bg-primary-color py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#E98934]"
              >
                결과 페이지로 이동하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
