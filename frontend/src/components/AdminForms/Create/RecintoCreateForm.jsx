import InputFile from "../../InputFile";
import InputForm from "../../InputForm";
import InputSelect from "../../InputSelect";
import TableSections from "../../TableSections";
import { useGetCiudades } from "../../../hooks/ciudades/useGetCiudades";
import { useRecintoCreate } from "../../../hooks/recintos/useRecintoCreate";
import { useNavigate } from "react-router-dom";

export default function RecintoCreateForm() {
  const navigate = useNavigate();
  const { form, updateField, updateSections, updateFile, handleSubmit, loading } = useRecintoCreate();
  const { data: ciudades, isLoading: isLoadingGeneros } = useGetCiudades();

  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await handleSubmit();
    if (ok) {
      navigate('/admin/dashboard/recintos');
    }
  };

  return (
    <div className="min-h-[60vh] w-full flex justify-center text-black">
      <form onSubmit={onSubmit} className="w-[95%] gap-10">

        <div className="grid lg:grid-cols-2 gap-8">
          <InputForm label={"Nombre"} id={"nombre"} type="text" value={form?.nombre} onChange={(e) => updateField('nombre', e.target.value)} />
          <InputSelect
            placeholder="Seleccione ciudad"
            value={form?.ciudad}
            onChange={(value) => updateField("ciudad", value)}
            options={[
                ...(ciudades?.map((c) => ({
                label: c.nombre,
                value: c.id,
                })) || []),
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8 mb-10">
            <InputFile
              label="Imagen tarjeta"
              field="img_card"
              initialUrl={form?.img_card}
              onChange={updateFile}
            />
            <InputFile
              label="Imagen banner"
              field="img_hero"
              initialUrl={form?.img_hero}
              onChange={updateFile}
            />
        </div>
        <div>
          <TableSections sections={form.secciones} onSectionsChange={updateSections} mode="recinto" showActions={true}></TableSections>
        </div>
          <button className="btn-primary py-2 px-4 text-md w-max mt-10" disabled={loading}>
            Crear Recinto
          </button>
      </form>
    </div>
  );
}