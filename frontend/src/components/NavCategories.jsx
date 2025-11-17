import { useEffect, useMemo, useState } from "react";
import { useGetGenerosNavbar } from "../hooks/genero/useGetGenerosNavbar";
import { useGetArtistNavbar } from "../hooks/artist/useGetArtistNavBar";
import { useGetRecintosNavbar } from "../hooks/recintos/useGetRecintosNavbar";

export default function NavCategories() {
  const { data: generos, isLoadingGeneros, isErrorGeneros} = useGetGenerosNavbar()
  const { data: artist, isLoadingArtist, isErrorArtist} = useGetArtistNavbar()
  const { data: recintos, isLoadingRecintos, isErrorRecintos} = useGetRecintosNavbar()

  const categories = useMemo(() => [
    {
      name: "Conciertos",
      path: "/conciertos",
      subcategories: generos?.map(g => ({
        name: g.genero,
        path: `/conciertos/${g.genero.toLowerCase()}`,
      })) || [],
    },
    {
      name: "Artistas",
      path: "/artistas",
      subcategories: artist?.map(a => ({
        name: a.nombre,
        path: `/artistas/detalle/${a.slug}`,
      })) || [],
    },
    {
      name: "Recintos",
      path: "/recintos",
      subcategories: recintos?.map(r => ({
        name: r.nombre,
        path: `/recintos/detalle/${r.id}`,
      })) || [],
    },
  ], [generos, artist, recintos]);

  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="relative">
      <nav 
        className="bg-[#C122ED] text-white relative z-20"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <ul className="w-[90%] m-auto flex items-center py-3 font-medium text-lg gap-10 justify-around md:justify-start">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCategory(cat)}
            >
              <a href={cat.path}>{cat.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      {hoveredCategory?.subcategories?.length > 0 && (
        <div
          className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200 top-full z-20"
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <div className="w-[90%] m-auto py-8">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hoveredCategory.subcategories.map((sub, j) => (
                <li key={j}>
                  <a
                    href={sub.path}
                    className="block px-4 py-2 rounded-md hover:bg-[#f3e0ff] transition-colors text-gray-800"
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
