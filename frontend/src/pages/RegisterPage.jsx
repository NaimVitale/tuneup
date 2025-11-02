import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useRegisterForm } from "../hooks/useRegisterForm"
import { Bell, CheckCircle, Shield, Ticket } from "lucide-react";

export default function RegisterPage(){
    
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, loading, error } = useRegisterForm(navigate);

    return(
        <div className="sm:h-[90vh] flex justify-center items-center text-black bg-gradient-to-l from-[#D946EF]/70 via-[#9333EA]/50 to-[#6D28D9]/40">
                <div className="h-[80vh] sm:h-[55vh] w-full px-[1em] py-[3em] sm:p-[4em] sm:w-[50%] sm:rounded-2xl bg-white shadow-lg flex gap-12">
                    <div className="md:w-1/2 flex flex-col justify-start gap-6 mb-8 md:mb-0 pr-6 hidden sm:flex">
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
                    <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-12">
                        <h2 className="text-6xl font-semibold mb-2 w-full sm:hidden">Registrate</h2>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <InputForm label={"Nombre*"} type="text" id={"nombre"} value={formData.nombre} onChange={handleChange}></InputForm>
                                {error?.nombre && <p className="text-red-500 text-sm pl-4">{error?.nombre}</p>}
                             </div>
                             <div className="flex flex-col gap-1">
                                <InputForm label={"Apellido"} type="text" id={"apellido"} value={formData.apellido} onChange={handleChange}></InputForm>
                                {error?.apellido && <p className="text-red-500 text-sm pl-4">{error?.apellido}</p>}
                            </div>
                             <div className="flex flex-col gap-1">
                                <InputForm label={"Correo electrónico*"} type="text" id={"email"} value={formData.email} onChange={handleChange}></InputForm>
                                {error?.email && <p className="text-red-500 text-sm pl-4">{error?.email}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <InputForm label={"Contraseña*"} type="password" id={"password"} value={formData.password} onChange={handleChange}></InputForm>
                                {error?.password && <p className="text-red-500 text-sm pl-4">{error?.password}</p>}
                            </div>
                            <button className="btn-primary py-2 px-4 text-md w-max mt-4 sm:mt-0" type="submit">Registrate</button>
                        </form>
                    </div>
            </div>
        </div>
    );
}