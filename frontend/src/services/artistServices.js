import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/artistas`;

export const getArtist = async(slug) => {
  try{
    const response = await axios.get(`${API_URL}/${slug}`, {
    })
    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
}