import axios from "axios";

const BASE_URL = "https://smart-fortunate-fighter.glitch.me";
const TEST_RESULTS_PATH = "/testResults";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//테스트 결과들 가져오기 -> 문제없음
export const getTestResults = async () => {
  try {
    const response = await api.get(TEST_RESULTS_PATH);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//테스트 결과 만들기
export const createTestResult = async (resultData) => {
  try {
    const response = await api.post(TEST_RESULTS_PATH, resultData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//테스트 결과 삭제
export const deleteTestResult = async (id) => {
  try {
    const response = await api.delete(`${TEST_RESULTS_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//테스트 결과 업데이트
export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await api.patch(`${TEST_RESULTS_PATH}/${id}`, {
      visibility,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
