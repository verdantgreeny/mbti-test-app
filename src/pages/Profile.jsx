import React, { useContext, useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

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
        console.log(error);
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
      alert(`'${data.nickname}'(으)로 닉네임이 변경되었습니다.`);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">프로필 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label htmlFor="nickname" className="block mb-2 font-medium">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력하세요"
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-700 transition"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
  );
};

export default Profile;
