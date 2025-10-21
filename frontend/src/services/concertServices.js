import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/conciertos`;

//Consulta sobre un artista
export const getConcert = async(id) => {
  try{
    const response = await axios.get(`${API_URL}/${id}`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}