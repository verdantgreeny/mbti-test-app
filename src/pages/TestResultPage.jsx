import React, { useContext } from "react";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { AuthContext } from "../context/AuthContext";
import useTestResults from "../hooks/useTestResults";
import Button from "../components/Button";

const TestResultPage = () => {
  const { user } = useContext(AuthContext);
  const { results, deleteMutation, toggleVisibilityMutation } =
    useTestResults();

  if (!results.length)
    return (
      <div className="p-6 text-center">저장된 테스트 결과가 없습니다.</div>
    );

  return (
    <div className="container mx-auto p-4 md:p-6 text-white max-w-2xl md:max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        테스트 결과 목록
      </h1>
      <ul className="space-y-4">
        {results.map((res, index) => (
          <li
            key={res.id}
            className={`p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center mx-auto w-full md:w-4/5 space-y-4 md:space-y-0 md:space-x-4 ${
              index % 2 === 0
                ? "bg-[#E98934] text-black"
                : "bg-[#1C5952] text-white"
            }`}
          >
            <div className="flex flex-col space-y-2 w-full">
              <p className="text-sm md:text-lg font-medium flex items-center justify-between pr-2 md:pr-2  text-justify">
                <img
                  src="/flower3.png"
                  alt="꽃"
                  className="w-10 h-10 md:w-12 md:h-12 object-cover transform transition-transform duration-300 hover:scale-110 mr-4   "
                />
                "{res.nickname}"님의 결과
              </p>
              <hr className="my-6 md:my-10" />
              <p className="text-xs mb-4 md:mb-10 text-right">
                date: {res.date}
              </p>
              <p className="text-lg font-semibold text-center">{res.result}</p>
              <p className="text-sm md:text-md">
                {mbtiDescriptions[res.result]}
              </p>

              {user && res.userId === user.id && (
                <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3 mt-4">
                  <Button
                    onClick={() => deleteMutation.mutateAsync(res.id)}
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
                        id: res.id,
                        visibility: !res.visibility,
                      })
                    }
                    className={
                      index % 2 === 0
                        ? "bg-[#E98934] hover:bg-[#1C5952]"
                        : "bg-[#1C5952] hover:bg-[#E98934]"
                    }
                  >
                    {res.visibility ? "비공개" : "공개"}
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestResultPage;
