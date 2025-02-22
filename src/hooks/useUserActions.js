import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register, updateProfile } from "../api/auth";
import { createTestResult } from "../api/testResults";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { ROUTES } from "../constants/routes";
import { AuthContext } from "../context/AuthContext";

const useUserActions = () => {
  const { authenticateUser, user, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
        navigate(ROUTES.LOGIN);
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

  // MBTI 테스트 제출 핸들러
  const testSubmitHandler = async (answers, setResult) => {
    try {
      const mbtiResult = calculateMBTI(answers);
      /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다. 이 데이터를 어떻게 API 를 이용해 처리 할 지 고민해주세요. */
      // console.log(`MBTI 결과: ${mbtiResult}`);
      // console.log(mbtiDescriptions[mbtiResult]);

      const resultData = {
        nickname: user?.nickname || "",
        result: mbtiResult,
        visibility: true,
        date: new Date().toISOString().split("T")[0], // yyyy-MM-dd 형식
        userId: user?.id || "unknown",
      };
      await createTestResult(resultData);
      setResult(mbtiResult);
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      toast.success("삭제 성공");
    } catch (error) {
      console.log("삭제 실패:", error);
      toast.error("삭제 실패");
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    try {
      const updated = await updateTestResultVisibility(id, !currentVisibility);
      toast.success(
        `${updated.nickname}님의 결과가 ${
          updated.visibility ? "공개" : "비공개"
        } 처리 되었습니다. `
      );
    } catch (error) {
      console.log(error);
      toast.error("공개여부 전환 실패");
    }
  };

  return {
    loginHandler,
    signupHandler,
    updateProfileHandler,
    testSubmitHandler,
    handleDelete,
    handleToggleVisibility,
  };
};

export default useUserActions;
