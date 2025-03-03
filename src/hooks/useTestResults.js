import {
  getTestResults,
  deleteTestResult,
  updateTestResultVisibility,
  createTestResult,
} from "../api/testResults";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calculateMBTI } from "../utils/mbtiCalculator";
import useAuthStore from "../zustand/bearsStore";
import { TEST_RESULTS_KEY } from "../constants/queryKey";

const useTestResults = () => {
  const { user } = useAuthStore();

  const queryClient = useQueryClient();

  //데이터 조회
  const { data: results = [], isLoading } = useQuery({
    queryKey: [TEST_RESULTS_KEY],
    queryFn: getTestResults,
    select: (data) =>
      data
        .filter((res) => res.visibility)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    onError: (error) => {
      toast.error(error);
    },
  });

  //테스트 결과 제출
  const testSubmitMutation = useMutation({
    mutationFn: async (answers) => {
      const mbtiResult = calculateMBTI(answers);
      const resultData = {
        nickname: user?.nickname || "",
        result: mbtiResult,
        visibility: true,
        date: new Date(new Date().getTime() + 9 * 60 * 60 * 1000) // UTC + 9시간
          .toISOString()
          .replace("T", " ")
          .split(".")[0],
        userId: user?.id || "unknown",
      };
      await createTestResult(resultData);
      return resultData;
    },
    onSuccess: (newResult) => {
      queryClient.invalidateQueries([TEST_RESULTS_KEY]);
      toast.success(`테스트 결과 (${newResult.result})가 저장되었습니다.`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  //테스트 결과 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries([TEST_RESULTS_KEY]);
      toast.success("삭제 성공");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  //테스트 결과 공개/비공개
  const toggleVisibilityMutation = useMutation({
    mutationFn: ({ id, visibility }) =>
      updateTestResultVisibility(id, visibility),
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData([TEST_RESULTS_KEY], (oldResults) =>
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
    onError: (error) => {
      toast.error(error);
    },
  });

  return {
    results,
    isLoading,
    testSubmitMutation,
    deleteMutation,
    toggleVisibilityMutation,
  };
};

export default useTestResults;
