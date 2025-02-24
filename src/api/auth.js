import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const register = async (userData) => {
  const { data } = await api.post(`${API_URL}/register`, userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await api.post(`${API_URL}/login`, userData);
  return data;
};

export const getUserProfile = async (accessToken) => {
  const { data } = await api.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const updateProfile = async (formData, accessToken) => {
  const response = await api.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
