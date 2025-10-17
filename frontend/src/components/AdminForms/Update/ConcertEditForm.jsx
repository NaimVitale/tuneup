import { useNavigate, useParams } from "react-router-dom";
import InputFile from "../../InputFile";
import InputForm from "../../InputForm";
import { useEffect } from "react";
import InputSelect from "../../../components/InputSelect"
import InputDate from "../../../components/InputDate"

export default function ConcertEditForm(artist) {
    const { slug } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit();
    };

    return(
        <div className="min-h-[60vh] w-full flex justify-center text-black">
                <form className="w-[95%] gap-10 flex flex-col justify-evenly">
                    <div className="grid grid-cols-2 gap-8">
                        <InputSelect placeholder="Seleccione artista"/>
                        <InputDate/>
                        <div className="col-span-2">
                            <InputSelect placeholder="Seleccione recinto"/>
                        </div>
                    </div>
                    <div>
                    <p className="mt-20 mb-8 text-xl ">Precio Secciones de Recinto</p>
                    <div className="grid grid-cols-3 gap-8  mb-10">
                        <InputForm label="Precio Sección A"/>
                        <InputForm label="Precio Sección B"/>
                        <InputForm label="Precio Sección C"/>
                        <InputForm label="Precio Sección D"/>
                        <InputForm label="Precio Sección E"/>
                        <InputForm label="Precio Sección F"/>
                    </div>
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar datos</button>
                    </div>
                </form>
        </div>
    )
}