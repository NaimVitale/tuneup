import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [rol, setRol] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    setUser(null);
    setToken(null);
    setRol(null);
    setUserID(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const res = await api.post("/auth/refresh");
      const newToken = res.data.access_token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      return newToken;
    } catch {
      logout();
      return null;
    }
  };

  // Decodificar token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setUserID(decoded.sub);
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
  let isRefreshing = false;
  let failedRequestsQueue = [];

  const processQueue = (error, token = null) => {
    failedRequestsQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedRequestsQueue = [];
  };

  const interceptor = api.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;

      // Si NO es 401 → rechazo normal
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }

      // Evitamos bucles infinitos
      if (originalRequest._retry) {
        setSessionExpired(true);
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Si YA se está refrescando → encolamos la petición
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        isRefreshing = true;

        // Pedimos refresh token
        const res = await api.post("/auth/refresh");
        const newToken = res.data.access_token;

        // Actualizamos token
        setToken(newToken);
        localStorage.setItem("token", newToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setSessionExpired(true);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return () => api.interceptors.response.eject(interceptor);
}, [setToken]);

  // useEffect que reacciona cuando sessionExpired cambia
  useEffect(() => {
    if (sessionExpired) {
      
      toast.error("Tu sesión ha expirado. Vuelve a iniciar sesión");
      logout();
      navigate("/login");
      setSessionExpired(false);
    }
  }, [sessionExpired, navigate]);

  const updateUser = (newData) => { setUser(prev => { const updated = { ...prev, ...newData }; localStorage.setItem("user", JSON.stringify(updated)); return updated; }); };

  return (
    <AuthContext.Provider value={{ user, token, rol, userID, login, logout, loading, refreshToken, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);