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
    <div className="flex-1 bg-white overflow-x-auto">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-gradient-to-r from-[#C122ED] to-[#9333EA] text-white sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-semibold tracking-wide">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-4 text-center font-semibold tracking-wide">Acciones</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-[#f3e0ff] transition-colors duration-150 group"
              >
                {columns.map((col) => {
                  const value = col.render ? col.render(item, item.id) : item[col.key];

                  return (
                    <td
                      key={col.key}
                      className="px-6 py-4 max-w-[200px] truncate text-gray-700 group-hover:text-gray-900"
                      title={typeof value === "string" ? value : ""}
                    >
                      {isImageUrl(value) ? (
                        <img
                          src={value}
                          alt={col.label}
                          className="h-14 w-24 object-cover rounded-xl border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-all duration-200"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        value ?? <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.onClick(item)}
                          className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md ${
                            typeof action.className === "function"
                              ? action.className(item)
                              : action.className
                          }`}
                        >
                          {typeof action.icon === "function" ? action.icon(item) : action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No hay datos disponibles</p>
                  <p className="text-sm text-gray-400">Intenta agregar nuevos registros</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}