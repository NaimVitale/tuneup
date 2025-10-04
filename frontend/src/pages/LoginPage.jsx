import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useLoginForm } from "../hooks/useLoginForm"

export default function LoginPage(){
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, loading, error } = useLoginForm(navigate);

    return(
        <div className="h-[90vh] flex justify-center items-center text-black bg-gradient-to-r from-[#D946EF]/70 via-[#A21CAF]/50 to-[#7C3AED]/40">
            <div className="p-[4em] h-[40vh] w-[30vw] rounded-2xl flex flex-col items-center justify-center gap-12 bg-white shadow-lg">
                <h1 className="text-5xl">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <InputForm label={"Correo electrónico*"} type="text" id={"email"} value={formData.email} onChange={handleChange}></InputForm>
                        {error?.email && <p className="text-red-500 text-sm pl-4">{error?.email}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <InputForm label={"Contraseña*"} type="password" id={"password"} value={formData.password} onChange={handleChange}></InputForm>
                        {error?.unauthorized && <p className="text-red-500 text-sm pl-4">{error?.unauthorized}</p>}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <button className="btn-primary py-2 px-4 text-md w-max">Iniciar sesión</button>
                        <p className="text-sm">¿No tienes cuenta? <Link to={"/register"} className="text-[#C122ED] underline">Registrarte</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}