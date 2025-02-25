import React, { useState, useEffect } from "react";
import useUserActions from "../hooks/useUserActions";
import { getTestResults } from "../api/testResults";
import Button from "../components/Button";
import useTestResults from "../hooks/useTestResults";
import { toast } from "react-toastify";
import useAuthStore from "../zustand/bearsStore";
import useKakaoShare from "../hooks/useKakaoShare";

const Profile = () => {
  const { user } = useAuthStore();
  const { updateProfileHandler } = useUserActions();
  const { deleteMutation, toggleVisibilityMutation } = useTestResults();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [results, setResults] = useState([]);
  const { handleShareResult } = useKakaoShare(user);

  // 테스트 결과 가져오기
  const fetchTestResults = async () => {
    try {
      const data = await getTestResults(user.id);
      const userResults = data
        .filter((res) => res.userId === user.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setResults(userResults);
    } catch (error) {
      toast.error("테스트 결과를 불러오지 못했습니다.");
    }
  };

  // 닉네임 변경
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 닉네임 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfileHandler(nickname);
  };

  // 테스트 결과 삭제
  const handleDeleteUserResult = async (id) => {
    await deleteMutation.mutateAsync(id);
    await fetchTestResults();
  };

  // 테스트 결과 공개/비공개
  const handleToggleUserResult = async (id, currentVisibility) => {
    await toggleVisibilityMutation.mutateAsync({
      id,
      visibility: !currentVisibility,
    });
    setResults((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, visibility: !currentVisibility } : res
      )
    );
  };

  // 유저 변경 됐을 때 테스트 결과 다시 가져오기
  useEffect(() => {
    setNickname(user?.nickname || "");
    fetchTestResults();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-white">
      <div className="max-w-2xl w-full border rounded-lg p-10 space-y-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          프로필 수정
        </h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex items-center justify-center space-x-4">
            <label htmlFor="nickname" className="block mb-2 font-bold text-2xl">
              닉네임 :
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력하세요"
              className="p-2 border border-gray-300 bg-inherit rounded-lg w-3/5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#1C5952] text-white shadow-md border border-gray-300 rounded-full hover:bg-[#E98934] transition"
          >
            프로필 업데이트
          </button>
        </form>

        {/* 사용자의 테스트 결과 표시 */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            테스트 결과
          </h2>
          {results.length === 0 ? (
            <p className="text-center">아직 제출한 테스트 결과가 없습니다.</p>
          ) : (
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
                  <div className="flex flex-col space-y-3 w-full">
                    <p className=" text-xl font-medium text-center truncate">
                      "{res.nickname}"님의 결과
                    </p>
                    <hr className="my-6" />
                    <p className="text-xs text-right mb-6 ">date: {res.date}</p>
                    <p className="text-lg font-semibold text-center">
                      {res.result}
                    </p>
                    {res.userId === user.id && (
                      <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3 mt-4">
                        <Button
                          onClick={() => handleDeleteUserResult(res.id)}
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
                            handleToggleUserResult(res.id, res.visibility)
                          }
                          className={
                            index % 2 === 0
                              ? "bg-[#E98934] hover:bg-[#1C5952]"
                              : "bg-[#1C5952] hover:bg-[#E98934]"
                          }
                        >
                          {res.visibility ? "비공개" : "공개"}
                        </Button>
                        <Button
                          onClick={() => handleShareResult(res.result)}
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
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
