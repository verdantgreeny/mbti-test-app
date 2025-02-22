import React, { useContext, useState } from "react";
import TestForm from "../components/TestForm";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { AuthContext } from "../context/AuthContext";
import useUserActions from "../hooks/useUserActions";
import Button from "../components/Button";

const TestPage = () => {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const { testSubmitHandler } = useUserActions();
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    const res = await testSubmitHandler(answers);
    if (res) {
      setResult(res.result);
    } else {
      console.error("테스트 결과가 없습니다.");
    }
  };

  const handleNavigateToResults = () => {
    navigate(ROUTES.TEST_RESULT_PAGE);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white">
      <div className="rounded-lg p-8 max-w-2xl w-full h-full shadow-lg">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
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
