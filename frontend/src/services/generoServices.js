import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/generos`;

export const getGenerosPublic = async () => {
  try {
    const response = await axios.get(`${API_URL}/public`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getGeneros= async (token) => {
  try {
    const response = await axios.get(`${API_URL}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};