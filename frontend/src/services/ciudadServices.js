import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/ciudades`;

//Consulta todas las ciudades
export const getCiudades = async() => {
  try{
    const response = await axios.get(`${API_URL}/public`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}