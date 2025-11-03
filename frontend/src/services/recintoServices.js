import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/recintos`;

//Consulta sobre todos los artistas panel admin
export const getAllRecintos = async(token) => {
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