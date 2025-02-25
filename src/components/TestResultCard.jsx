import React from "react";
import Button from "../components/Button";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import useAuthStore from "../zustand/bearsStore";
import useTestResults from "../hooks/useTestResults";
import useKakaoShare from "../hooks/useKakaoShare";

const TestResultCard = ({ result, index }) => {
  const { user } = useAuthStore();
  const { deleteMutation, toggleVisibilityMutation } = useTestResults();
  const { handleShareResult } = useKakaoShare(user);
  return (
    <li
      key={result.id}
      className={`p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center mx-auto w-full md:w-4/5 space-y-4 md:space-y-0 md:space-x-4 ${
        index % 2 === 0 ? "bg-[#E98934] text-black" : "bg-[#1C5952] text-white"
      }`}
    >
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm md:text-lg font-medium flex items-center justify-between pr-2 md:pr-2 text-justify">
          <img
            src="/flower3.png"
            alt="꽃"
            className="w-10 h-10 md:w-12 md:h-12 object-cover transform transition-transform duration-300 hover:scale-110 mr-4"
          />
          "{result.nickname}"님의 결과
        </p>
        <hr className="my-6 md:my-10" />
        <p className="text-xs mb-4 md:mb-10 text-right">date: {result.date}</p>
        <p className="text-lg font-semibold text-center">{result.result}</p>
        <p className="text-sm md:text-md">{mbtiDescriptions[result.result]}</p>

        {user && result.userId === user.id && (
          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3 mt-4">
            <Button
              onClick={() => deleteMutation.mutateAsync(result.id)}
              className={
                index % 2 === 0
                  ? "bg-[#E98934] hover:bg-[#1C5952]"
                  : "bg-[#1C5952] hover:bg-[#E98934]"
              }
            >
              삭제
            </Button>
            <Button
              onClick={() =>
                toggleVisibilityMutation.mutateAsync({
                  id: result.id,
                  visibility: !result.visibility,
                })
              }
              className={
                index % 2 === 0
                  ? "bg-[#E98934] hover:bg-[#1C5952]"
                  : "bg-[#1C5952] hover:bg-[#E98934]"
              }
            >
              {result.visibility ? "비공개" : "공개"}
            </Button>
            <Button
              onClick={() => handleShareResult(result.result)}
              className={
                index % 2 === 0
                  ? "bg-[#E98934] hover:bg-[#1C5952]"
                  : "bg-[#1C5952] hover:bg-[#E98934]"
              }
            >
              결과 공유하기
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TestResultCard;
