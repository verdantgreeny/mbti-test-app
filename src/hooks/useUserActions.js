import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register, updateProfile } from "../api/auth";
import { ROUTES } from "../constants/routes";
import useAuthStore from "../zustand/bearsStore";

const useUserActions = () => {
  const { authenticateUser, accessToken, fetchUserProfile } = useAuthStore();
  const { LOGIN } = ROUTES;
  const navigate = useNavigate();

  const loginHandler = async (userData) => {
    try {
      const { accessToken, nickname } = await login(userData);
      if (!accessToken) {
        toast.error("토큰이 없어 로그인에 실패했습니다.");
        return;
      }
      authenticateUser(accessToken);
      toast.success(`${nickname}님 환영합니다(홈으로 이동).`);
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  const signupHandler = async (userData) => {
    try {
      const res = await register(userData);
      if (res.success) {
        toast.success(res.message);
        navigate(LOGIN);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  const updateProfileHandler = async (nickname) => {
    if (!accessToken) {
      toast.error("접근 토큰이 없습니다.");
      return;
    }
    try {
      const { data } = await updateProfile({ nickname }, accessToken);
      await fetchUserProfile();
      toast.success(`'${data.nickname}'(으)로 닉네임이 변경되었습니다.`);
    } catch (error) {
      toast.error(error.response?.data?.message || "프로필 업데이트 실패");
    }
  };

  return {
    loginHandler,
    signupHandler,
    updateProfileHandler,
  };
};

export default useUserActions;
