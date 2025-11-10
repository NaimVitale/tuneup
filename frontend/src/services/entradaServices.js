import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/entradas`;

//Consulta sobre todas las entradas de un usuario
export const getEntradas = async(id, token) => {
  try{
    const response = await axios.get(`${API_URL}?id_usuario=${id}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}