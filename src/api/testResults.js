import axios from "axios";

const API_URL = "https://buttercup-axiomatic-currant.glitch.me";

//테스트 결과들 가져오기
export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//테스트 결과 만들기
export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData);
  return response.data;
};

//테스트 결과 삭제
export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

//테스트 결과 업데이트
export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, { visibility });
  return response.data;
};
