import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import { Bell, CheckCircle, Shield, Ticket } from "lucide-react";

export default function RegisterPage(){
    return(
        <div className="h-[90vh] flex justify-center items-center text-black bg-gradient-to-l from-[#D946EF]/70 via-[#9333EA]/50 to-[#6D28D9]/40">
                <div className="p-[4em] w-[50%] rounded-2xl bg-white shadow-lg flex gap-12">
                    <div className="md:w-1/2 flex flex-col justify-start gap-6 mb-8 md:mb-0 pr-6">
                        <h1 className="text-6xl font-semibold mb-2">Registrate</h1>
                        <h3 className="text-2xl font-semibold">Disfruta de ventajas exclusivas</h3>
                        <ul className="flex flex-col gap-6 text-gray-700">
                            <li className="flex items-center gap-2">
                            <CheckCircle className="text-[#C122ED]" size={20} />
                            Accede a ofertas y promociones especiales
                            </li>
                            <li className="flex items-center gap-2">
                            <Ticket className="text-[#C122ED]" size={20} />
                            Guarda tus entradas favoritas fácilmente
                            </li>
                            <li className="flex items-center gap-2">
                            <Bell className="text-[#C122ED]" size={20} />
                            Recibe alertas de conciertos y eventos
                            </li>
                            <li className="flex items-center gap-2">
                            <Shield className="text-[#C122ED]" size={20} />
                            Gestiona tus compras de forma segura
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex flex-col items-center justify-center gap-12">
                        <form action="" className="w-full flex flex-col gap-4">
                            <InputForm label={"Nombre*"} type="text" id={"nombre"}></InputForm>
                            <InputForm label={"Apellido"} type="text" id={"apellido"}></InputForm>
                            <InputForm label={"Correo electrónico*"} type="text" id={"email"}></InputForm>
                            <InputForm label={"Teléfono"} type="text" id={"telefono"}></InputForm>
                            <InputForm label={"Contraseña*"} type="password" id={"password"}></InputForm>
                            <button className="btn-primary py-2 px-4 text-md w-max">Registrate</button>
                        </form>
                    </div>
            </div>
        </div>
    );
}