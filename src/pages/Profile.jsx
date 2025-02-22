import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import useUserActions from "../hooks/useUserActions";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const { updateProfileHandler } = useUserActions();

  useEffect(() => {
    setNickname(user?.nickname || "");
  }, [user]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfileHandler(nickname);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full text-white">
      <div className="max-w-2xl w-full border rounded-lg p-10 space-y-10">
        <h1 className="text-3xl font-bold text-center">프로필 수정</h1>
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
              className="p-2 border border-gray-300 bg-inherit rounded-lg w-96"
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
      </div>
    </div>
  );
};

export default Profile;
