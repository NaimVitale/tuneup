import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/generos`;

export const getGeneros = async (query) => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};