import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/conciertos`;

//Consulta publica sobre un artista
export const getConcert = async(id) => {
  try{
    const response = await axios.get(`${API_URL}/public/${id}`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta privada sobre un artista
export const getConcertPrivate = async(id, token) => {
  try{
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Actualizar un concierto en panel admin
export const UpdateConcierto = async(token, id, conciertoData) => {
  try{
    const response = await axios.patch(`${API_URL}/${id}`, conciertoData,{
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

// Consulta sobre todos los artistas
export const getConcerts = async() => {

}