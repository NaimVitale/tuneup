import { Ticket, LogOut, Settings, Star } from "lucide-react";
import InputForm from "../components/InputForm";
import { Link } from "react-router-dom";

export default function ProfilePage(){
    return(
        <div className="h-[90vh] flex justify-center items-center w-full bg-gradient-to-l from-[#6B21A8]/70 via-[#7E22CE]/50 to-[#9333EA]/30">
                <div className="p-[3em] rounded-2xl bg-white shadow-lg flex gap-12 w-[60%] h-[60vh]">
                    <div className="w-[20%] border-r border-gray-300 pt-2">
                        <ul className="flex flex-col gap-8 text-gray-700 text-lg">
                            <li>
                                <Link className="flex items-center gap-2 ">
                                    <Ticket className="text-[#C122ED]" size={25} />
                                    Mis entradas
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center gap-2">
                                    <Star className="text-[#C122ED]" size={25} />
                                    Mis favoritos
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center gap-2">
                                    <Settings className="text-[#C122ED]" size={25} />
                                    Mi perfil
                                </Link>
                            </li>
                            <li>
                                <Link className="flex items-center gap-2">
                                    <LogOut className="text-[#C122ED]" size={25} />
                                    Desconectar
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-[80%]">
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
                </div>
        </div>
    );
}