import React, { useContext } from "react";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { AuthContext } from "../context/AuthContext";
import useTestResults from "../hooks/useTestResults";
import Button from "../components/Button";

const TestResultPage = () => {
  const { user } = useContext(AuthContext);
  const { results, handleDelete, handleToggleVisibility } = useTestResults();

  if (!results.length)
    return (
      <div className="p-6 text-center">저장된 테스트 결과가 없습니다.</div>
    );

  return (
    <div className="container mx-auto p-6 text-white max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">테스트 결과 목록</h1>
      <ul className="space-y-4">
        {results.map((res, index) => (
          <li
            key={res.id}
            className={`p-6 border rounded-lg flex items-center mx-auto w-4/5 space-x-4 ${
              index % 2 === 0
                ? "bg-[#E98934] text-black"
                : "bg-[#1C5952] text-white"
            }`}
          >
            <div className="flex flex-col space-y-2 w-full">
              <p className="text-xl font-medium flex items-center justify-between">
                <img
                  src="https://cdn.prod.website-files.com/6467b97fbfd703a1664963fb/64948b7cd63ee9b7d47f6873_Star.png"
                  alt="스타"
                  className="w-12 h-12 object-cover transform transition-transform duration-300 hover:scale-110"
                />
                "{res.nickname}"님의 결과
                <span className="text-xs">date: {res.date}</span>
              </p>
              <hr className="my-6" />
              <p className="text-lg font-semibold text-center">{res.result}</p>
              <p className="text-md">{mbtiDescriptions[res.result]}</p>

              {res.userId === user.id && (
                <div className="flex justify-end space-x-3 mt-2">
                  <Button
                    onClick={() => handleDelete(res.id)}
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
                      handleToggleVisibility(res.id, res.visibility)
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
