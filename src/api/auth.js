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
  try {
    const { data } = await api.post("/register", userData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const { data } = await api.post("/login", userData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (accessToken) => {
  try {
    const { data } = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData, accessToken) => {
  try {
    const response = await api.patch("/profile", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
