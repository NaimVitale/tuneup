import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/compras`;

//Consulta una compra
export const getCompra = async(stripe_payment_id, token) => {
  try{
    const response = await axios.get(`${API_URL}/${stripe_payment_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const getComprasAdmin = async(token) => {
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


export const getComprasDiarias = async(token) => {
  try{
    const response = await axios.get(`${API_URL}/admin/compras-diarias`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}