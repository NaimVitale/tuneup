import { useNavigate, useParams } from "react-router-dom";
import InputFile from "../InputFile";
import InputForm from "../InputForm";
import { usePatchArtist } from "../../hooks/artist/usePatchArtist";
import { useEffect } from "react";

export default function ArtistEditForm(artist) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { form, handleChange, handleFileChange, handleSubmit, newSlug, success, errors} = usePatchArtist(slug, artist.data)

    useEffect(() => {
        if (newSlug && newSlug !== slug) {
            navigate(`../artistas/${newSlug}/editar`);
        }
    }, [newSlug, navigate, slug]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit();
    };

    return(
        <div className="min-h-[60vh] w-full flex justify-center text-black">
                <form onSubmit={onSubmit} className="w-[95%] gap-10">
                    <div className="grid grid-cols-1 gap-8">
                        <InputForm label={"Nombre"} id={"nombre"} type="text" value={form?.nombre} onChange={handleChange}></InputForm>
                        {/* {<InputForm label={"Genero"} type="select"></InputForm>} */}
                        <div /*className="col-span-2"*/>
                            <InputForm label={"Descripcion"} id={"descripcion"} type="textarea" value={form?.descripcion}  onChange={handleChange}></InputForm>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-8 mb-10">
                        <InputFile label="Imagen tarjeta" initialUrl={form?.img_card} field="img_card" onChange={handleFileChange}></InputFile>
                        <InputFile label="Imagen banner" initialUrl={form?.img_hero} field="img_hero" onChange={handleFileChange}></InputFile>
                        <InputFile label="Imagen about" initialUrl={form?.images} field="images" onChange={handleFileChange}></InputFile>
                    </div>
                    <button className="btn-primary py-2 px-4 text-md w-max">Actualizar datos</button>
                </form>
        </div>
    )
}