import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/conciertos`;


//Consulta publica sobre un artista
export const getHomeConciertosActivos = async() => {
  try{
    const response = await axios.get(`${API_URL}/home/activos`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta publica sobre un artista
export const getHomeConciertosProximos = async() => {
  try{
    const response = await axios.get(`${API_URL}/home/proximamente`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Crear un concierto en panel admin
export const CreateConcierto = async(token, conciertoData) => {
  try{
    const response = await axios.post(`${API_URL}`, conciertoData,{
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

// Consulta sobre todos los conciertos panel admin
export const getConcertsAdmin = async (token, params) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getConcertsPublic = async ({ estado, genero = '', fechaInicio = '', page = 1, limit }) => {
  try {
    const params = { page: Number(page), limit: Number(limit) };
    if (genero) params.genero = genero;
    if (fechaInicio) params.fechaInicio = fechaInicio;

    const { data } = await axios.get(`${API_URL}/public?estado=${estado}`, { params });
    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Softdelete
export const softDeleteConcert = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Restore delete
export const restoreConcert = async (id, token) => {
  const response = await axios.patch(`${API_URL}/restore/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRestoreWarningsConcert = async (conciertoId) => {
  const res = await axios.get(`${API_URL}/restore-warnings/${conciertoId}`);
  return res.data;
};
