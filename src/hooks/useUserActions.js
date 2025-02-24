import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register, updateProfile } from "../api/auth";
import { ROUTES } from "../constants/routes";
import { AuthContext } from "../context/AuthContext";

const useUserActions = () => {
  const { authenticateUser, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { LOGIN } = ROUTES;

  // 로그인 핸들러
  const loginHandler = async (userData) => {
    try {
      const { accessToken, nickname } = await login(userData);
      // console.log(accessToken);
      // console.log(nickname);
      if (!accessToken) {
        toast.error("토큰이 없어 로그인에 실패했습니다.");
        return;
      }
      authenticateUser(accessToken);
      toast.success(`${nickname}님 환영합니다(홈으로 이동).`);
      navigate(ROUTES.HOME);
    } catch (error) {
      // console.log(error)
      toast.error(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  // 회원가입 핸들러
  const signupHandler = async (userData) => {
    try {
      const res = await register(userData);
      if (res.success) {
        toast.success(res.message);
        navigate(LOGIN);
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  // 프로필 업데이트 핸들러
  const updateProfileHandler = async (nickname) => {
    if (!accessToken) {
      toast.error("접근 토큰이 없습니다.");
      return;
    }
    try {
      const { data } = await updateProfile({ nickname }, accessToken);
      toast.success(`'${data.nickname}'(으)로 닉네임이 변경되었습니다.`);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
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
