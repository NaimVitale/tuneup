import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/usuarios`;
const AUTH_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createUserAdmin = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/admin`, userData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const userLogin = async (userData) => {
  try {
    const response = await axios.post(AUTH_URL, userData, { withCredentials: true });
    return response.data; // debe contener { token, usuario }
  } catch (error) {
    console.log(error)
    throw error.response?.data || error;
  }
};

export const getUser = async(id, token) => {
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

export const getUsers = async(token) => {
  try{
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
}

export const getNewUsers = async(token) => {
  try{
    const response = await axios.get(`${API_URL}/new-users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
}


export const patchUserPassword = async(id, userData, token) => {
  try{
    const response = await axios.patch(
      `${API_URL}/${id}/password`,
      userData,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  }catch (error) {
    throw error.response?.data || error;
  }
}

export const patchUser = async(id, userData, token) => {
  try{
    const response = await axios.patch(
      `${API_URL}/${id}`,
      userData,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  }catch (error) {
    throw error.response?.data || error;
  }
}