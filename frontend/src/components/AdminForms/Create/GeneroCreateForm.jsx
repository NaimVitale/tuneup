import { useNavigate } from "react-router-dom";
import InputForm from "../../InputForm";
import { useCreateGenero } from "../../../hooks/genero/useCreateGenero";

export default function GeneroCreateForm() {
    const navigate = useNavigate();
    const { formData, updateField, handleSubmit, loading, errors} = useCreateGenero();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await handleSubmit();
        if (response) {
        navigate("/admin/dashboard/generos"); // redirige después de crear
        }
    };

    return(
        <div className=" w-full flex justify-center text-black">
                <form onSubmit={onSubmit} className="w-[95%] min-h-[40vh] justify-start">
                    <div className="flex flex-col gap-6">
                        <InputForm 
                            label="Nombre*" 
                            id="nombre" 
                            value={formData.nombre} 
                            onChange={(v) => updateField(v, "nombre")} 
                            error={errors.nombre} 
                        />
                        <InputForm 
                            label="Descripción*" 
                            id="descripcion" 
                            type="textarea" 
                            value={formData.descripcion} 
                            onChange={(v) => updateField(v, "descripcion")} 
                            error={errors.descripcion} 
                        />
                    </div>
                    <button className="btn-primary py-2 px-4 text-md w-max mt-6" disabled={loading}>Actualizar datos</button>
                </form>
        </div>
    )
}