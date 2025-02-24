import React, { useContext, useState } from "react";
import TestForm from "../components/TestForm";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { AuthContext } from "../context/AuthContext";
import useUserActions from "../hooks/useUserActions";
import Button from "../components/Button";
import { toast } from "react-toastify";
import useTestResults from "../hooks/useTestResults";

const TestPage = () => {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { testSubmitMutation } =
    useTestResults();

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

  const handleShareResult = async () => {
    if (!result) return;

    const shareText = `${user.nickname}님의 MBTI 결과는 ${result}입니다!\n\n${mbtiDescriptions[result]} \n\n 나도 해보기 ===> ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(shareText); // 클립보드에 텍스트를 복사하는 기능
      toast.success("결과가 클립보드에 복사되었습니다.");
    } catch (error) {
      toast.error("복사 실패했씁니다.");
    }
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
                src="../../public/flower3.png"
                alt="결과 아이콘"
                className="w-16 h-16 object-cover transform transition-transform duration-300 hover:scale-110"
              />
              <p className="text-lg text-justify">
                {mbtiDescriptions[result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>

              <Button
                onClick={handleShareResult}
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
