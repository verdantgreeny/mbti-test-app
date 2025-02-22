import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";

export const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData);
  return data;
};

export const getUserProfile = async (accessToken) => {
  if (!accessToken) {
    console.log("로그인된 사용자만 프로필을 볼 수 있습니다.");
    return;
  }
  const { data } = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateProfile = async (formData, accessToken) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
