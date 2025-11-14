import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/secciones`;

export const getSeccionesByRecinto = async (id_recinto, id_currentConcert) => {
  try {
    const response = await axios.get(`${API_URL}?recinto=${id_recinto}&concierto=${id_currentConcert}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};