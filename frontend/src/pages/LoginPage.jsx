import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";

export default function LoginPage(){
    return(
        <div className="h-[80vh] flex justify-center items-center text-black">
            <div className="p-[4em] h-[40vh] w-[30vw] rounded-2xl flex flex-col items-center justify-center gap-12 bg-white shadow-lg">
                <h1 className="text-5xl">Iniciar sesión</h1>
                <form action="" className="w-full flex flex-col gap-4">
                    <InputForm label={"Correo electrónico*"} type="text" id={"email"}></InputForm>
                    <InputForm label={"Contraseña*"} type="password" id={"password"}></InputForm>
                    <div className="flex justify-between items-center mt-2">
                        <button className="btn-primary py-2 px-4 text-md w-max">Iniciar sesión</button>
                        <p className="text-sm">¿No tienes cuenta? <Link to={"/register"} className="text-[#C122ED] underline">Registrarte</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}