import React, { useState, useEffect, useContext } from "react";
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from "../api/testResults";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


const TestResultPage = () => {
  const [results, setResults] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      // 삭제된 결과를 상태에서 제거
      setResults((prevResults) => prevResults.filter((res) => res.id !== id));
      toast.success("삭제 성공");
    } catch (error) {
      console.log("삭제 실패:", error);
      toast.error("삭제 실패");
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const updated = await updateTestResultVisibility(id, !currentVisibility);
      setResults((prevResults) =>
        prevResults
          .map((res) =>
            res.id === id ? { ...res, visibility: updated.visibility } : res
          )
          .filter((res) => res.visibility)
      );
      // console.log(updated);
      toast.success(
        `${updated.nickname}님의 결과가 ${
          updated.visibility ? "공개" : "비공개"
        } 처리 되었습니다. `
      );
    } catch (error) {
      console.log(error);
      toast.error("공개여부 전환 실패");
    }
  };

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
              {/* 버튼은 현재 사용자 소유의 결과에 대해서만 표시 */}
              {res.userId === user.id && (
                <div className="flex justify-end space-x-3 mt-2">
                  <button
                    onClick={() => handleDelete(res.id)}
                    className={`text-sm px-10 py-2 border border-gray-300 ${
                      index % 2 === 0
                        ? "bg-[#E98934] hover:bg-[#1C5952]"
                        : "bg-[#1C5952] hover:bg-[#E98934]"
                    } rounded-full transition duration-300`}
                  >
                    삭제
                  </button>
                  <button
                    onClick={() =>
                      handleToggleVisibility(res.id, res.visibility)
                    }
                    className={`text-sm px-10 py-2 border border-gray-300 ${
                      index % 2 === 0
                        ? "bg-[#E98934] hover:bg-[#1C5952]"
                        : "bg-[#1C5952] hover:bg-[#E98934]"
                    } rounded-full transition duration-300`}
                  >
                    {res.visibility ? "비공개" : "공개"}
                  </button>
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
