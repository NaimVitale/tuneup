import { useParams } from "react-router-dom";
import InputSelect from "../../../components/InputSelect"
import TableSections from "../../TableSections";
import InputDate from "../../../components/InputDate"
import { useGetArtistsSelect } from "../../../hooks/artist/useGetArtistsSelect";
import { useGetRecintosSelect } from "../../../hooks/recintos/useGetRecintosSelect";
import { useConcertUpdate } from "../../../hooks/concerts/useConcertUpdate";

export default function ConcertEditForm({ data }) {
    const { slug } = useParams();
    const { data: artist, isLoading: isLoadingArtist } = useGetArtistsSelect();
    const { data: recintos, isLoading: isLoadingRecintos } = useGetRecintosSelect();
    const { form, handleRecintoChange, handleSelectChange, updateSections, fecha, setFecha, hora, setHora, fechaVenta, setFechaVenta, horaVenta, setHoraVenta, handleSubmit, loading, success, errorUpdate, errors} = useConcertUpdate(slug, data)

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit();
    };

    return(
        <div className="min-h-[60vh] w-full flex justify-center text-black">
                <form onSubmit={onSubmit} className="w-[95%] gap-10 flex flex-col justify-evenly">
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
                        />
                        <InputDate placeholder="Seleccione fecha del concierto" value={fecha} onChange={setFecha}/>
                        <InputSelect type="hour"  placeholder="Seleccione hora del concierto" value={hora} onChange={setHora}/>
                        <InputDate placeholder="Seleccione fecha de venta de entradas" value={fechaVenta} onChange={setFechaVenta}/>
                        <InputSelect type="hour" placeholder="Seleccione hora de venta" value={horaVenta} onChange={setHoraVenta}/>
                    </div>
                    <div>
                    <TableSections sections={form.secciones} onSectionsChange={updateSections} mode="precio" showActions={true}></TableSections>
                    <button className="btn-primary py-2 px-4 text-md w-max mt-10">Actualizar datos</button>
                    </div>
                </form>
        </div>
    )
}