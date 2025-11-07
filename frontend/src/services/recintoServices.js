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

//Consulta sobre un artistas panel admin
export const getRecintoAdmin = async(token, id) => {
  try{
    const response = await axios.get(`${API_URL}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}

//Consulta sobre un artistas panel admin
export const UpdateRecinto = async(token, id, recintoData) => {
  try{
    const response = await axios.patch(`${API_URL}/${id}`, recintoData,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    return response.data;
  }catch(error){
    throw error.response?.data || error;
  }
}