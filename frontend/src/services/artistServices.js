import axios from "../api/api";

const API_URL = `${import.meta.env.VITE_API_URL}/artistas`;


//Crear artista
export const CreateArtist = async(token, artistData) => {
   try{
    const response = await axios.post(`${API_URL}`, artistData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data;
  }catch(error){
    throw error.response?.data || error;
  }
}

//Consulta sobre un artista
export const getArtist = async(slug) => {
  try{
    const response = await axios.get(`${API_URL}/public/${slug}`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta sobre un artista
export const getArtistNavBar = async() => {
  try{
    const response = await axios.get(`${API_URL}/nav-categories`, {
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta sobre un artista
export const getArtistAdmin = async(slug, token) => {
  try{
    const response = await axios.get(`${API_URL}/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

//Consulta sobre todos los artistas panel admin
export const getAllArtist = async(token, params) => {
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

//Consulta sobre todos los artistas para select
export const getAllArtistsSelect = async() => {
  try{
    const response = await axios.get(`${API_URL}/select`,{})
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}


//Consulta sobre todos los artistas
export const getAllArtistPublic = async(genero) => {
  try{
    const response = await axios.get(`${API_URL}/public?genero=${genero}`)
    return response.data;
  }catch{
    throw error.response?.data || error;
  }
}

//Actualiza los datos del artista
export const PatchArtist = async(token, slug, artistData) => {
   try{
    const response = await axios.patch(`${API_URL}/${slug}`, artistData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data;
  }catch(error){
    throw error.response?.data || error;
  }
}

//Softdelete
export const softDeleteArtist = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Restore delete
export const restoreArtist = async (id, token) => {
  const response = await axios.patch(`${API_URL}/restore/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};