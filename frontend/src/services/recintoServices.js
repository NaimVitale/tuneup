import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/recintos`;


//Crear un recinto en panel admin
export const CreateRecinto = async(token, recintoData) => {
  try {
    const response = await axios.post(`${API_URL}`, recintoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//Consulta sobre todos los recintos panel admin
export const getAllRecintos = async(token, params) => {
  try{
    const response = await axios.get(`${API_URL}`,{
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    })
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}

//Consulta sobre todos los recintos para select
export const getAllRecintosSelect = async() => {
  try{
    const response = await axios.get(`${API_URL}/select`,{})
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}

//Consulta sobre un recinto panel admin
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

//Actualizar un recinto en panel admin
export const UpdateRecinto = async(token, id, recintoData, files = {}) => {
  try{
    const formData = new FormData();

    // Campos del formulario
    Object.entries(recintoData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Para secciones enviadas desde front, pasarlas como JSON
        if (key === "secciones") {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object" && value.id) {
          formData.append(key, value.id); // ciudad como número
        } else {
          formData.append(key, value);
        }
      }
    });

    // Archivos
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    const response = await axios.patch(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  }catch(error){
    throw error.response?.data || error;
  }
}


//Softdelete
export const softDeleteRecinto = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Restore delete
export const restoreRecinto = async (id, token) => {
  const response = await axios.post(`${API_URL}/restore/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};