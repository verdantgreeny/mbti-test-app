import { useState, useEffect } from "react";
import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTestResults = () => {
  // const [results, setResults] = useState([]);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const fetchResults = async () => {
  //     try {
  //       const testResults = await getTestResults();
  //       // console.log(testResults);
  //       setResults(
  //         testResults
  //           .filter((res) => res.visibility)
  //           .sort((a, b) => new Date(b.date) - new Date(a.date))
  //       );
  //     } catch (error) {
  //       // console.log(error);
  //       toast.error(error);
  //     }
  //   };
  //   fetchResults();
  // }, []);

  const { data: results = [] } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
    select: (data) =>
      data
        .filter((res) => res.visibility)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
  });

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteTestResult(id);
  //     setResults((prevResults) => prevResults.filter((res) => res.id !== id));
  //     toast.success("삭제 성공");
  //   } catch (error) {
  //     // console.log("삭제 실패:", error);
  //     toast.error("삭제 실패");
  //   }
  // };

  const deleteMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
      toast.success("삭제 성공");
    },
  });

  // const handleToggleVisibility = async (id, currentVisibility) => {
  //   try {
  //     const updated = await updateTestResultVisibility(id, !currentVisibility);
  //     setResults((prevResults) =>
  //       prevResults
  //         .map((res) =>
  //           res.id === id ? { ...res, visibility: updated.visibility } : res
  //         )
  //         .filter((res) => res.visibility)
  //     );

  //     toast.success(
  //       `결과가 ${updated.visibility ? "공개" : "비공개"}되었습니다.`
  //     );
  //   } catch (error) {
  //     // console.log(error);
  //     toast.error("공개여부 전환 실패");
  //   }
  // };

  const toggleVisibilityMutation = useMutation({
    mutationFn: ({ id, visibility }) =>
      updateTestResultVisibility(id, visibility),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData(["testResults"], (oldResults) =>
        oldResults
          .map((res) =>
            res.id === id ? { ...res, visibility: updated.visibility } : res
          )
          .filter((res) => res.visibility)
      );

      toast.success(
        `결과가 ${updated.visibility ? "공개" : "비공개"}되었습니다.`
      );
    },
  });

  return {
    results,
    deleteMutation,
    toggleVisibilityMutation,
  };
};

export default useTestResults;
