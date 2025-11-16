import { useNavigate } from "react-router-dom";
import InputForm from "../../InputForm";
import { useCreateUserAdminForm } from "../../../hooks/users/useCreateUserAdmin";
import InputSelect from "../../InputSelect";

export default function UserCreateForm() {
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, loading, error } = useCreateUserAdminForm();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await handleSubmit();
        if (response) {
            navigate("/admin/dashboard/usuarios");
        }
    };

      return (
    <div className="w-full flex justify-center text-black">
      <form onSubmit={onSubmit} className="w-[95%] min-h-[40vh] justify-start">
        <div className="flex grid grid-cols-2 gap-6">
          <InputForm 
            label="Nombre*" 
            id="nombre"
            value={formData.nombre} 
            onChange={handleChange}
            error={error?.nombre}
          />
          <InputForm 
            label="Apellido" 
            id="apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={error?.apellido}
          />
          <InputForm 
            label="Email*" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            error={error?.email}
          />
          <InputForm 
            label="Contraseña*" 
            id="password" 
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={error?.password}
          />
          <InputSelect
            id="rol"
            value={formData.rol || "user"}
            onChange={(value) => handleChange({ target: { id: "rol", value } })}
            options={[
                { label: "Usuario", value: "user" },
                { label: "Admin", value: "admin" }
            ]}
            error={error?.rol}
          />
        </div>

        {error?.general && <p className="text-red-500 mt-2">{error.general}</p>}

        <button className="btn-primary py-2 px-4 text-md w-max mt-6" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
}