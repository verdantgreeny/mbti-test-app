import { create } from "zustand";
import { getUserProfile } from "../api/auth";

const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,

  //사용자가 로그인하면
  authenticateUser: (token) => {
    localStorage.setItem("accessToken", token); //토큰 저장
    set({ accessToken: token, isAuthenticated: true }); //상태 업데이트
    get().fetchUserProfile(); //사용자 프로필 정보 가져오기
  },

  //사용자가 로그아웃하면
  logoutUser: () => {
    localStorage.removeItem("accessToken"); //토큰 제거
    set({ accessToken: "", isAuthenticated: false, user: null }); //상태 업데이트
  },

  //accessToken을 사용햐 프로필 데이터 가져옴(비동기함수)
  fetchUserProfile: async () => {
    const { accessToken } = get(); //토큰 겟
    if (!accessToken) return;
    try {
      const res = await getUserProfile(accessToken); //api로 데이터 요청
      set({ user: res }); // 성공 시 사용자 정보를 user에 저장
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useAuthStore;
