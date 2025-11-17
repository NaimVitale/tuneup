import { useState } from "react";
import { Edit2, Trash2, Plus, Check, X } from "lucide-react";

export default function SectionsTable({ 
  sections = [], 
  onSectionsChange,
  mode = "recinto", // "recinto" o "precio"
  showActions = true 
}) {
  const [editingId, setEditingId] = useState(null);
  const [newSection, setNewSection] = useState(null);

  const handleEdit = (id) => setEditingId(id);

  const truncate = (str, max = 25) =>
    str && str.length > max ? str.slice(0, max) + "..." : str;

  const handleChange = (id, field, value) => {
    const updated = sections.map(s => s.id === id ? { ...s, [field]: value } : s);
    onSectionsChange?.(updated);
  };

  const handleSave = () => setEditingId(null);

  const handleDelete = (id) => {
    const filtered = sections.filter(s => s.id !== id);
    onSectionsChange?.(filtered);
  };

  const handleAdd = () => {
    const template = mode === "recinto" 
      ? { id: Date.now(),  nombre: "", capacidad: 0, tipo_svg: "rect", svg_path: "" }
      : { id: Date.now(), nombre: "", precio: 0 };
    setNewSection(template);
  };

  const handleSaveNew = () => {
    onSectionsChange?.([...sections, newSection]);
    setNewSection(null);
  };

  const columns = mode === "recinto" 
    ? [
        { key: "nombre", label: "Nombre", type: "text", editable: true },
        { key: "capacidad", label: "Capacidad", type: "number", editable: true },
        { key: "tipo_svg", label: "Tipo", type: "select", editable: true, options: ["rect", "path"] },
        { key: "svg_path", label: "SVG", type: "text", editable: true }
      ]
    : [
        { key: "nombre", label: "Sección", type: "text", editable: false },
        { key: "capacidad", label: "Capacidad", type: "number", editable: false },
        { key: "precio", label: "Precio (€)", type: "number", editable: true }
      ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          {mode === "recinto" ? "Secciones del recinto" : "Precios por sección"}
        </h3>
        {showActions && mode === "recinto" && (
          <button 
            type="button" 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C122ED] hover:bg-[#a01bc7] text-white font-medium py-2 px-4 rounded-full transition-colors"
          >
            <Plus size={18} />
            Agregar sección
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="text-left p-4 text-sm font-semibold text-gray-700">
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="text-center p-4 text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {sections.filter(s => mode === "precio" ? s.capacidad > 0 : true).map((s, idx) => (
              <tr key={s.id} className={`border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#f3e0ff] transition-colors`}>
                {editingId === s.id ? (
                  <>
                    {columns.map(col => (
                      <td key={col.key} className="p-4">
                        {col.type === "select" ? (
                          <select
                            value={s[col.key] || "rect"}
                            onChange={(e) => handleChange(s.id, col.key, e.target.value)}
                            className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C122ED] focus:border-transparent"
                            disabled={!col.editable}
                          >
                            {col.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            type={col.type}
                            value={s[col.key] || (col.type === "number" ? 0 : "")}
                            onChange={(e) => handleChange(s.id, col.key, col.type === "number" ? Number(e.target.value) : e.target.value)}
                            className={`border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C122ED] focus:border-transparent ${!col.editable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                            disabled={!col.editable}
                          />
                        )}
                      </td>
                    ))}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          type="button" 
                          onClick={handleSave}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Guardar"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setEditingId(null)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    {columns.map(col => (
                      <td key={col.key} className="p-4 text-gray-700">
                        {col.key === "svg_path"
                          ? truncate(s[col.key], 30)
                          : col.key === "precio"
                            ? `${s[col.key] || 0}€`
                            : s[col.key]
                        }
                      </td>
                    ))}
                    {showActions && (
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            type="button" 
                            onClick={() => handleEdit(s.id)}
                            className="p-2 text-[#C122ED] hover:bg-[#f3e0ff] rounded-xl transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          {mode === "recinto" && (
                            <button 
                              type="button" 
                              onClick={() => handleDelete(s.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}

            {newSection && (
              <tr className="bg-purple-50 border-t-2 border-[#C122ED]">
                {columns.map(col => (
                  <td key={col.key} className="p-4">
                    {col.type === "select" ? (
                      <select
                        value={newSection[col.key] || "rect"}
                        onChange={(e) => setNewSection({ ...newSection, [col.key]: e.target.value })}
                        className="border border-[#C122ED] rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C122ED]"
                      >
                        {col.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type={col.type}
                        value={newSection[col.key]}
                        onChange={(e) => setNewSection({ 
                          ...newSection, 
                          [col.key]: col.type === "number" ? Number(e.target.value) : e.target.value 
                        })}
                        className="border border-[#C122ED] rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C122ED]"
                        placeholder={col.label}
                      />
                    )}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      type="button" 
                      onClick={handleSaveNew}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                      title="Guardar"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewSection(null)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                      title="Cancelar"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sections.length === 0 && !newSection && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No hay secciones {mode === "recinto" ? "creadas" : "disponibles"}</p>
          {showActions && mode === "recinto" && (
            <button 
              type="button" 
              onClick={handleAdd}
              className="text-[#C122ED] hover:underline font-medium"
            >
              Agregar la primera sección
            </button>
          )}
        </div>
      )}
    </div>
  );
}