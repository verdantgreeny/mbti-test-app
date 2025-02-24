import React, { useState } from "react";
import TestForm from "../components/TestForm";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from "../components/Button";
import { toast } from "react-toastify";
import useTestResults from "../hooks/useTestResults";
import useAuthStore from "../zustand/bearsStore";
import useKakaoShare from "../hooks/useKakaoShare";

const TestPage = () => {
  const { user } = useAuthStore();
  const { testSubmitMutation } = useTestResults();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { handleShareResult } = useKakaoShare(user);

  const handleTestSubmit = async (answers) => {
    const res = await testSubmitMutation.mutateAsync(answers);
    if (res) {
      setResult(res.result);
    } else {
      toast.error("테스트 결과가 없습니다.");
    }
  };

  const handleNavigateToResults = () => {
    navigate(ROUTES.TEST_RESULT_PAGE);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white">
      <div className="rounded-lg p-8 max-w-2xl w-full h-full ">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">
              "{user.nickname}" 님의 결과
              <p className="text-4xl mt-3"> {result} </p>
            </h1>
            <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg ">
              <img
                src="/flower3.png"
                alt="결과 아이콘"
                className="w-16 h-16 object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <p className="text-lg text-justify">
                {mbtiDescriptions[result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>

              <Button
                onClick={() => handleShareResult(result)}
                className="w-full bg-[#E98934] hover:bg-[#1C5952] text-white"
              >
                결과 공유하기
              </Button>

              <Button
                onClick={handleNavigateToResults}
                type="submit"
                className="w-full hover:bg-white hover:text-black"
              >
                결과 페이지로 이동하기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
