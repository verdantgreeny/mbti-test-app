import { useState, useEffect, useContext } from "react";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
  createTestResult,
} from "../api/testResults";
import { toast } from "react-toastify";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { AuthContext } from "../context/AuthContext";

const useTestResults = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  // MBTI 테스트 제출 핸들러
  const testSubmitHandler = async (answers, setResult) => {
    try {
      const mbtiResult = calculateMBTI(answers);
      // console.log(`MBTI 결과: ${mbtiResult}`);
      // console.log(mbtiDescriptions[mbtiResult]);
      const resultData = {
        nickname: user?.nickname || "",
        result: mbtiResult,
        visibility: true,
        date: new Date().toISOString().replace("T", " ").split(".")[0], // yyyy-MM-dd 형식 + 시간까지도 표시
        userId: user?.id || "unknown",
      };
      await createTestResult(resultData);
      // setResult(mbtiResult);
      return resultData;
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const testResults = await getTestResults();
        // console.log(testResults);
        setResults(
          testResults
            .filter((res) => res.visibility)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (error) {
        // console.log(error);
        toast.error(error);
      }
    };
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      setResults((prevResults) => prevResults.filter((res) => res.id !== id));
      toast.success("삭제 성공");
    } catch (error) {
      // console.log("삭제 실패:", error);
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

      toast.success(
        `결과가 ${updated.visibility ? "공개" : "비공개"}되었습니다.`
      );
    } catch (error) {
      // console.log(error);
      toast.error("공개여부 전환 실패");
    }
  };

  return {
    results,
    handleDelete,
    handleToggleVisibility,
    testSubmitHandler,
  };
};

export default useTestResults;
