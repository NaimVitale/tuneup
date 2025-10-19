import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/search`;

export const getSearch = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};