import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
      } catch (error) {
        console.error("Token inválido", error);
        setRol(null);
        localStorage.removeItem("token");
      }
    } else {
      setRol(null);
    }
  }, [token]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

   const updateUser = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, rol, login, logout, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);