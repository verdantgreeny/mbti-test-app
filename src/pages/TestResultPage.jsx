import React from "react";
import useTestResults from "../hooks/useTestResults";
import TestResultCard from "../components/TestResultCard";

const TestResultPage = () => {
  const { results } = useTestResults();

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
          <TestResultCard key={res.id} result={res} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default TestResultPage;
