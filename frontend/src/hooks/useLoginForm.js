import { useState } from "react";
import { userLogin } from "../services/userServices";
import { useAuth } from "../context/AuthContext";

export const useLoginForm = (navigate) => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const validate = () => {
    const errors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Email inválido";
    return errors;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        return;
        }
    
        setLoading(true);
        setError({});
        try {
            const user = await userLogin(formData);
            setFormData({ email: "", password: "" });
            login(user.usuario, user.token);
            navigate("/");
        } catch (err) {
          const response = err
          if (response?.errors) {
            setError(response.errors);
          } else if (response?.field && response?.message) {
            setError({ [response.field]: response.message });
          } else {
            setError({ general: 'Error al registrar usuario' });
          }
        } finally {
          setLoading(false);
        }
      };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
    };
}