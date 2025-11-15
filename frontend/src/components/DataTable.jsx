export default function DataTable({ columns, data, actions }) {
  const isImageUrl = (value) => {
    if (typeof value !== "string") return false;
    try {
      const url = new URL(value);
      return /\.(jpeg|jpg|png|gif|webp|svg|avif)$/i.test(url.pathname);
    } catch {
      return false;
    }
  };

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
              <tr
                key={item.id || index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
               
                {columns.map((col) => {
                  const value = col.render ? col.render(item, item.id) : item[col.key];

                  return (
                    <td
                      key={col.key}
                      className="px-6 py-4 max-w-[150px] truncate"
                      title={typeof value === "string" ? value : ""}
                    >
                      {isImageUrl(value) ? (
                        <img
                          src={value}
                          alt={col.label}
                          className="h-12 w-24 object-cover rounded-md border shadow-sm"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        value ?? "-"
                      )}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-6 py-4 text-center">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(item)}
                        className={`ml-2 px-2 py-2 rounded-lg ${
                          typeof action.className === "function"
                            ? action.className(item)
                            : action.className
                        }`}
                      >
                        {typeof action.icon === "function" ? action.icon(item) : action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}