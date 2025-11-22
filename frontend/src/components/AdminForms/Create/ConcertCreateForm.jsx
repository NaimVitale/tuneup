import InputSelect from "../../../components/InputSelect"
import TableSections from "../../TableSections";
import InputDate from "../../../components/InputDate"
import { useGetArtistsSelect } from "../../../hooks/artist/useGetArtistsSelect";
import { useGetRecintosSelect } from "../../../hooks/recintos/useGetRecintosSelect";
import { useConcertCreate } from "../../../hooks/concerts/useConcertCreate";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../../ErrorMessages";

export default function ConcertCreateForm() {
    const navigate = useNavigate();
    const { data: artist, isLoading: isLoadingArtist } = useGetArtistsSelect();
    const { data: recintos, isLoading: isLoadingRecintos } = useGetRecintosSelect();
    const { form, fecha, setFecha, hora, setHora , fechaVenta, setFechaVenta, horaVenta, setHoraVenta, handleSelectChange, handleRecintoChange, updateSections, handleSubmit, loading, errors } = useConcertCreate();

    console.log(form.secciones)

    const onSubmit = async (e) => {
        e.preventDefault();
        const ok = await handleSubmit();
        if(ok){
            navigate('/admin/dashboard/conciertos')
        }
    };

    console.log(errors)

    return(
        <div className="min-h-[60vh] w-full flex justify-center text-black">
                <form onSubmit={onSubmit} className="w-[95%] gap-10 flex flex-col justify-evenly">
                    <fieldset disabled={loading}>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <InputSelect 
                            placeholder="Seleccione artista"
                            value={form?.id_artista}
                            onChange={(val) => handleSelectChange("id_artista", val)}
                            options={[
                                ...(artist?.map((g) => ({
                                label: g.nombre,
                                value: g.id,
                                })) || []),
                            ]}
                            error={errors?.id_artista}
                        />
                        <InputSelect
                            placeholder="Seleccione recinto" 
                            value={form.id_recinto}
                            onChange={handleRecintoChange}
                            options={[
                                ...(recintos?.map((g) => ({
                                label: g.nombre,
                                value: g.id,
                                })) || []),
                            ]}
                            error={errors?.id_recinto}
                        />
                        <InputDate value={fecha} onChange={setFecha} error={errors?.fecha} />
                        <InputSelect type="hour"  placeholder="Seleccione hora" value={hora} onChange={setHora} error={errors?.hora}/>
                        <InputDate placeholder="Seleccione fecha de venta de entradas" value={fechaVenta} onChange={setFechaVenta}/>
                        <InputSelect type="hour" placeholder="Seleccione hora de venta" value={horaVenta} onChange={setHoraVenta}/>
                    </div>
                    <div className="mt-15">
                    <TableSections sections={form.secciones} onSectionsChange={updateSections} mode="precio" showActions={true}></TableSections>
                    {errors?.precio && (<ErrorMessages errors={errors?.precio}></ErrorMessages>)}
                    <button className="btn-primary py-2 px-4 text-md w-max mt-10">Crear Concierto</button>
                    </div>
                    </fieldset>
                </form>
        </div>
    )
}