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
  const [user, setUser] = useState('');

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
        nackname: user?.nickname || '',
        result: mbtiResult,
        visibility: true,
        date: new Date().toISOString().split("T")[0], //현재 날짜를 yyyy-MM-dd 형식으로 생성!!
        userId: user?.id || "unknown",
      }
      
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
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-black py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
