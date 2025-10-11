export default function DataTable({ columns, data, actions }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b text-gray-900 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-center">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id || index} className="border-b hover:bg-gray-50 transition-colors" >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 max-w-[100px] truncate" title={item[col.key]}>
                    {col.render ? col.render(item, index) : item[col.key] ?? "-"}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-center">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(item)}
                        className={`ml-2 px-2 py-2 rounded-lg ${action.className}`}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-6 text-gray-500">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}