import React, { useContext, useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  // const [nickname, setNickname] = useState(user?.nickname || "");
  const [nickname, setNickname] = useState(""); //임시
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { nickname } = await getUserProfile(accessToken);
        // console.log(res);
        setNickname(nickname);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //바꿀 닉네임을 서버에 보내고 인증된 사용자인지는 accessToken으로 확인하여 성공하면 결과 반환
      const { data } = await updateProfile({ nickname }, accessToken);
      // console.log(data);
      toast.success(`'${data.nickname}'(으)로 닉네임이 변경되었습니다.`);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
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
