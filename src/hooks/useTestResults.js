import { useState, useEffect } from "react";
import { getTestResults, deleteTestResult, updateTestResultVisibility } from "../api/testResults";
import { toast } from "react-toastify";

const useTestResults = () => {
  const [results, setResults] = useState([]);

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

  return {
    results,
    handleDelete,
    handleToggleVisibility,
  };
};

export default useTestResults;