import { useState } from "react";
import InputFile from "../../InputFile";
import InputForm from "../../InputForm";
import InputSelect from "../../InputSelect";

export default function RecintoEditForm() {
  const [sections, setSections] = useState([
    { id: 1, nombre: "Platea A", capacidad: 1200, svg: "-" },
    { id: 2, nombre: "Platea B", capacidad: 1400, svg: "-" },
    { id: 3, nombre: "VIP Central", capacidad: 500, svg: "-" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newSection, setNewSection] = useState(null);

  const handleEdit = (id) => setEditingId(id);

  const handleChange = (id, field, value) => {
    setSections(prev =>
      prev.map(s => s.id === id ? { ...s, [field]: value } : s)
    );
  };

  const handleSave = () => setEditingId(null);

  const handleDelete = (id) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleAdd = () => {
    setNewSection({ id: Date.now(), nombre: "", capacidad: 0, svg: "-" });
  };

  const handleSaveNew = () => {
    setSections(prev => [...prev, newSection]);
    setNewSection(null);
  };

  return (
    <div className="min-h-[60vh] w-full flex justify-center text-black">
      <form className="w-[95%] gap-10">

        {/* Datos del recinto */}
        <div className="grid grid-cols-2 gap-8">
          <InputForm label="Nombre" id="nombre" type="text" />
          <InputSelect label="Ciudad" />
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8 mb-10">
          <InputFile label="Imagen tarjeta" />
          <InputFile label="Imagen banner" />
        </div>

        {/* Tabla de secciones */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Secciones del recinto</h3>
            <button type="button" className="btn-primary py-1 px-3 text-sm"
              onClick={handleAdd}>
              + Agregar sección
            </button>
          </div>

          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">Capacidad</th>
                <th className="text-left p-3">SVG</th>
                <th className="text-center p-3">Acciones</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {sections.map(s => (
                <tr key={s.id} className="even:bg-gray-100 border-b">
                  {editingId === s.id ? (
                    <>
                      <td className="p-3">
                        <input value={s.nombre}
                          onChange={(e) => handleChange(s.id, "nombre", e.target.value)}
                          className="border px-2 py-1 w-full" />
                      </td>
                      <td className="p-3">
                        <input type="number" value={s.capacidad}
                          onChange={(e) => handleChange(s.id, "capacidad", e.target.value)}
                          className="border px-2 py-1 w-full" />
                      </td>
                      <td className="p-3">
                        <input value={s.svg}
                          onChange={(e) => handleChange(s.id, "svg", e.target.value)}
                          className="border px-2 py-1 w-full" />
                      </td>
                      <td className="text-center p-3 flex justify-center gap-3">
                        <button type="button" onClick={handleSave}
                          className="text-green-600 hover:text-green-800">
                          Guardar
                        </button>
                        <button type="button" onClick={() => setEditingId(null)}
                          className="text-gray-600 hover:text-gray-800">
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{s.nombre}</td>
                      <td className="p-3">{s.capacidad}</td>
                      <td className="p-3">{s.svg}</td>
                      <td className="text-center p-3 flex justify-center gap-3">
                        <button type="button" onClick={() => handleEdit(s.id)}
                          className="text-blue-600 hover:text-blue-800">
                          Editar
                        </button>
                        <button type="button" onClick={() => handleDelete(s.id)}
                          className="text-red-600 hover:text-red-800">
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}

              {newSection && (
                <tr className="bg-yellow-50 border-b">
                  <td className="p-3">
                    <input value={newSection.nombre}
                      onChange={(e) =>
                        setNewSection({ ...newSection, nombre: e.target.value })}
                      className="border px-2 py-1 w-full" />
                  </td>
                  <td className="p-3">
                    <input type="number" value={newSection.capacidad}
                      onChange={(e) =>
                        setNewSection({ ...newSection, capacidad: e.target.value })}
                      className="border px-2 py-1 w-full" />
                  </td>
                  <td className="p-3">
                    <input value={newSection.svg}
                      onChange={(e) =>
                        setNewSection({ ...newSection, svg: e.target.value })}
                      className="border px-2 py-1 w-full" />
                  </td>
                  <td className="text-center p-3 flex justify-center gap-3">
                    <button type="button" onClick={handleSaveNew}
                      className="text-green-600 hover:text-green-800">
                      Guardar
                    </button>
                    <button type="button" onClick={() => setNewSection(null)}
                      className="text-gray-600 hover:text-gray-800">
                      Cancelar
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button className="btn-primary py-2 px-4 text-md w-max mt-10">
            Actualizar datos
          </button>
        </div>
      </form>
    </div>
  );
}