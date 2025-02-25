import { create } from "zustand";
import { getUserProfile } from "../api/auth";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: "",
      isAuthenticated: false,
      user: null,

      //사용자가 로그인하면
      authenticateUser: (token) => {
        set({ accessToken: token, isAuthenticated: true }); //상태 업데이트
        get().fetchUserProfile(); //사용자 프로필 정보 가져오기
      },

      //사용자가 로그아웃하면
      logoutUser: () => {
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
    }),
    {
      name: "user",
      getStorage: () => localStorage, //getStorage: 저장할 스토리지 지정
      partialize: (state) => ({ //저장할 상태(state) 지정
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
