import InputFile from "../../InputFile";
import InputForm from "../../InputForm";
import InputSelect from "../../InputSelect";
import TableSections from "../../TableSections";
import { useRecintoUpdate } from "../../../hooks/recintos/useRecintoUpdate";
import { useGetCiudades } from "../../../hooks/ciudades/useGetCiudades";

export default function RecintoEditForm({data}) {

  const { formData, updateField, updateSections, handleSubmit, loading } = useRecintoUpdate(data);
  console.log(data)
  const { data: ciudades, isLoading: isLoadingGeneros } = useGetCiudades();

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(data.id);
    if (success) {
    }
  };

  return (
    <div className="min-h-[60vh] w-full flex justify-center text-black">
      <form onSubmit={onSubmit} className="w-[95%] gap-10">

        <div className="grid grid-cols-2 gap-8">
          <InputForm label={"Nombre"} id={"nombre"} value={formData.nombre} onChange={(e) => updateField('nombre', e.target.value)} type="text" />
          <InputSelect
            placeholder="Ciudad"
            value={formData?.ciudad?.id || ""}
            onChange={(id) => { const ciudadObj = ciudades.find(c => c.id === id) || null; updateField("ciudad", ciudadObj);}}
            options={[
                ...(ciudades?.map((c) => ({
                label: c.nombre,
                value: c.id,
                })) || []),
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8 mb-10">
          <InputFile label="Imagen tarjeta" />
          <InputFile label="Imagen banner" />
        </div>
        <div>
          <TableSections sections={formData?.secciones || []} onSectionsChange={updateSections} mode="recinto" showActions={true}></TableSections>
        </div>
          <button className="btn-primary py-2 px-4 text-md w-max mt-10">
            Actualizar datos
          </button>
      </form>
    </div>
  );
}