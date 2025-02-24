import React, { useState } from "react";
import { questions } from "../data/questions";
import { toast } from "react-toastify";
import Button from "./Button";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 질문에 답을 하지 않을 경우 리턴!
    if (answers.some((a) => a.answer === "")) {
      toast.error("모든 질문에 답해주세요.");
      return;
    }
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg ">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold text-lg mb-3">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, i) => (
              <label
                key={i}
                className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                  answers[index]?.answer === option ? "bg-[#1c595263]" : ""
                } hover:bg-[#e9883452]`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index]?.answer === option}
                  onChange={() => handleChange(index, option)}
                  className="mr-2 text-primary-color"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button type="submit" className="w-full hover:bg-white hover:text-black">
        제출하기
      </Button>
    </form>
  );
};

export default TestForm;
