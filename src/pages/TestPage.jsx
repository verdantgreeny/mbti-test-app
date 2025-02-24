import React, { useState } from "react";
import TestForm from "../components/TestForm";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Button from "../components/Button";
import { toast } from "react-toastify";
import useTestResults from "../hooks/useTestResults";
import useAuthStore from "../zustand/bearsStore";

const TestPage = () => {
  const { user } = useAuthStore();
  const { testSubmitMutation } = useTestResults();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

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

  const handleShareResult = () => {
    if (!result) return;

    // Kakao SDK가 로드되었는지 확인
    if (!window.Kakao) {
      toast.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("1031360ce41e4d35acea6fe1571b7314");
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${user.nickname}님의 MBTI 결과는 ${result}`,
        description: mbtiDescriptions[result] || "",
        imageUrl:
          "/home2.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "결과 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      success: () => {
        toast.success("카카오톡으로 공유되었습니다.");
      },
      fail: (error) => {
        // console.error(error);
        toast.error("카카오톡 공유에 실패했습니다.");
      },
    });
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
