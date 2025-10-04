import { Ticket, LogOut, Settings, Star } from "lucide-react";
import InputForm from "../components/InputForm";
import { Link } from "react-router-dom";

export default function ProfileInfoPage(){
    return(
        <div>
            <h1 className="text-2xl mb-10">¡Bienvenido! %User%</h1>
            <div className="w-full">
                <h3 className="mb-6 text-xl">Mi información</h3>
                <form action="" className="grid grid-cols-2 gap-6">
                    <InputForm label={"Nombre"} type="text" id={"nombre"}></InputForm>
                    <InputForm label={"Apellido"} type="text" id={"apellido"}></InputForm>
                    <InputForm label={"Correo electrónico"} type="text" id={"email"}></InputForm>
                    <InputForm label={"Teléfono"} type="text" id={"telefono"}></InputForm>
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar información</button>
                </form>
            </div>
        </div>
                        
    );
}