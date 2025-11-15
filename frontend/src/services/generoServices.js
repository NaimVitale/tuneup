import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/generos`;


export const createGenero = async ( generoData, token) => {
  try {
    const response = await axios.post(`${API_URL}`, generoData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const getGenerosPublic = async () => {
  try {
    const response = await axios.get(`${API_URL}/public`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getGeneros= async (token) => {
  try {
    const response = await axios.get(`${API_URL}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getGenero = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateGenero = async (id, generoData, token) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, generoData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const softDeleteGenero = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const restoreGenero = async (id, token) => {
  const response = await axios.post(`${API_URL}/restore/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
