import { useState, useEffect, useRef } from "react";
import { Search, Music, Calendar, MapPin, X } from "lucide-react";
import { useGetSearch } from "../hooks/search/useGetSearch";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const { data: results, loading } = useGetSearch(query);

  // Cerrar dropdown al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleResultClick = (result) => {
    let path;
    switch (result.tipo) {
      case "Artista":
        path = `/artistas/detalle/${result.slug}`;
        break;
      case "Recinto":
        path = `/recintos/${result.slug}`;
        break;
      default:
        path = `/`;
    }
    window.location.href = path;
    setQuery("");
    setIsOpen(false);
  };

  const getIcon = (tipo) => {
    if (tipo === "Artista") return <Music size={16} className="text-[#C122ED]" />;
    if (tipo === "Recinto") return <MapPin size={16} className="text-[#C122ED]" />;
    if (tipo === "Festival") return <Calendar size={16} className="text-[#C122ED]" />;
    return <Music size={16} className="text-[#C122ED]" />;
  };

  const highlightText = (text = "", highlight = "") => {
    if (!text) return "";
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part)
        ? <span key={i} className="font-bold">{part}</span>
        : part
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full py-3 pl-5 pr-24 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C122ED] focus:border-transparent transition-all text-gray-700 placeholder:text-gray-400"
          placeholder="Buscar..."
        />
        
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#C122ED] text-gray-600 hover:text-white transition-all duration-200"
          >
            <X size={14} />
          </button>
        )}
        
        <Search 
          size={20} 
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
      </div>

      {/* Dropdown de resultados */}
      {isOpen && query && (
        <div className="absolute top-full mt-3 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 max-h-[500px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#C122ED] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-500">Buscando...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-y-auto max-h-[500px]">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
                  {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                </p>
              </div>
              <ul>
                {results.map((result) => (
                  <li
                    key={`${result.tipo}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-[#f3e0ff] hover:to-white cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 group"
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={result.imagen} 
                        alt={result.nombre}
                        className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                        {getIcon(result.tipo)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#C122ED] transition-colors truncate">
                          {highlightText(result?.nombre ?? "", query)}
                        </h4>
                        <span className="flex-shrink-0 text-xs bg-[#C122ED] text-white px-2.5 py-1 rounded-full font-medium">
                          {result.tipo}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        {result.tipo === "Artista" && result.numConciertos > 0 && (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {result.numConciertos} {result.numConciertos === 1 ? 'evento' : 'eventos'}
                          </span>
                        )}
                        {result.tipo === "Recinto" && (
                          <>
                            {result.ciudad && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {result.ciudad}
                              </span>
                            )}
                            {result.numConciertos > 0 && (
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {result.numConciertos} {result.numConciertos === 1 ? 'concierto' : 'conciertos'}
                              </span>
                            )}
                          </>
                        )}
                        {result.tipo === "Festival" && (
                          <>
                            {result.fecha && (
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(result.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                            {result.ubicacion && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {result.ubicacion}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-[#C122ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium mb-1">No se encontraron resultados</p>
              <p className="text-gray-500 text-sm">Intenta con otros términos de búsqueda</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}