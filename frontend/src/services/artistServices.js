import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/artistas`;

//Consulta sobre un artista
export const getArtist = async(slug) => {
  try{
    const response = await axios.get(`${API_URL}/${slug}`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta sobre todos los artistas
export const getAllArtist = async(token) => {
  try{
    const response = await axios.get(`${API_URL}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}