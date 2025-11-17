import { useNavigate, useParams } from "react-router-dom";
import InputFile from "../../InputFile";
import InputForm from "../../InputForm";
import { usePatchArtist } from "../../../hooks/artist/usePatchArtist";
import { useEffect } from "react";
import InputSelect from "../../InputSelect";
import { useGetGenerosPublic } from "../../../hooks/genero/useGetGenerosPublic";
import { useCreateArtist } from "../../../hooks/artist/useCreateArtist";

export default function ArtistCreateForm() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { form, handleChange, handleFileChange, handleSelectChange, handleSubmit, newSlug, success, errors, loading} = useCreateArtist()
    const { data: generos, isLoading: isLoadingGeneros } = useGetGenerosPublic();

    /*useEffect(() => {
        if (newSlug && newSlug !== slug) {
            navigate(`../artistas/${newSlug}/editar`);
        }
    }, [newSlug, navigate, slug]);*/

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await handleSubmit();
        if(response){
            navigate(`/admin/dashboard/artistas`)
        }
    };

    return(
        <div className="min-h-[60vh] w-full flex justify-center text-black">
            <form onSubmit={onSubmit} className="w-[95%] gap-10">
                <div className="grid lg:grid-cols-2 gap-8">
                    <InputForm label={"Nombre"} id={"nombre"} type="text" value={form?.nombre} onChange={handleChange}></InputForm>
                    <InputSelect
                        placeholder="Género"
                        value={form?.genero}
                        onChange={(value) => handleSelectChange("genero", value)}
                        options={[
                            ...(generos?.map((g) => ({
                            label: g.nombre,
                            value: g.id,
                            })) || []),
                        ]}
                    />
                    <div className="lg:col-span-2">
                        <InputForm label={"Descripcion"} id={"descripcion"} type="textarea" value={form?.descripcion}  onChange={handleChange}></InputForm>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 mt-8 mb-10">
                    <InputFile label="Imagen tarjeta" initialUrl={form?.img_card} field="img_card" onChange={handleFileChange}></InputFile>
                    <InputFile label="Imagen banner" initialUrl={form?.img_hero} field="img_hero" onChange={handleFileChange}></InputFile>
                    <InputFile label="Imagen about" initialUrl={form?.images} field="images" onChange={handleFileChange}></InputFile>
                </div>
                <button className="btn-primary py-2 px-4 text-md w-max" disabled={loading}>Crear Artista</button>
            </form>
        </div>
    )
}