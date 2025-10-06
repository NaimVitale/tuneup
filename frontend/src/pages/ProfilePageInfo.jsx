import { useParams } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useAuth } from "../context/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useEffect } from "react";

export default function ProfileInfoPage(){

    const { id: userId } = useParams();
    const { userData, loading, error } = useGetUser(userId);
    const { form, handleChange} = useUpdateUser({userData})

    return(
        <div>
            <h1 className="text-2xl mb-6">¡Bienvenido! {userData?.nombre}</h1>
            <div className="w-full">
                <h3 className="mb-5 text-xl">Mi información</h3>
                <form action="" className="grid grid-cols-2 gap-4">
                    <InputForm label={"Nombre"} type="text" id={"nombre"} value={form.nombre} onChange={handleChange}></InputForm>
                    <InputForm label={"Apellido"} type="text" id={"apellido"} value={form.apellido} onChange={handleChange}></InputForm>
                    <InputForm label={"Correo electrónico"} type="text" id={"email"} value={form.email} onChange={handleChange}></InputForm>
                    <InputForm label={"Teléfono"} type="text" id={"telefono"} onChange={handleChange}></InputForm>
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar información</button>
                </form>
                <h3 className="mb-5 text-xl mt-8">Cambiar contraseña</h3>
                <form action="" className="grid grid-cols-2 gap-4">
                    <InputForm label={"Contraseña actual"} type="text" id={"old_password"}></InputForm>
                    <InputForm label={"Contraseña nueva"} type="text" id={"new_password"}></InputForm>
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar contraseña</button>
                </form>
            </div>
        </div>         
    );
}