import { useEffect, useMemo, useState } from "react";
import { useGetGenerosNavbar } from "../hooks/genero/useGetGenerosNavbar";
import { useGetArtistNavbar } from "../hooks/artist/useGetArtistNavBar";
import { useGetRecintosNavbar } from "../hooks/recintos/useGetRecintosNavbar";
import { ArrowRight, MapPin, Music, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavCategories() {
  const { data: generos, isLoadingGeneros, isErrorGeneros} = useGetGenerosNavbar()
  const { data: artist, isLoadingArtist, isErrorArtist} = useGetArtistNavbar()
  const { data: recintos, isLoadingRecintos, isErrorRecintos} = useGetRecintosNavbar()

  const categories = useMemo(() => [
    {
      name: "Conciertos",
      path: "/conciertos",
      icon: Music,
      subcategories: [
        ...(generos?.slice(0, 7).map(g => ({
          name: g.genero,
          path: `/conciertos/${g.genero.toLowerCase()}`,
        })) || []),
        {
          name: "Ver todos los conciertos",
          path: "/conciertos",
          isViewAll: true,
        },
      ],
    },
    {
      name: "Artistas",
      path: "/artistas",
      icon: Users,
      subcategories: [
        ...(artist?.slice(0, 7).map(a => ({
          name: a.nombre,
          path: `/artistas/detalle/${a.slug}`,
        })) || []),
        {
          name: "Ver todos los artistas",
          path: "/artistas",
          isViewAll: true,
        },
      ],
    },
    {
      name: "Recintos",
      path: "/recintos",
      icon: MapPin,
      subcategories: [
        ...(recintos?.slice(0, 7).map(r => ({
          name: r.nombre,
          path: `/recintos/detalle/${r.id}`,
        })) || []),
        {
          name: "Ver todos los recintos",
          path: "/recintos",
          isViewAll: true,
        },
      ],
    },
  ], [generos, artist, recintos]);

  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="relative z-[998]">
      <nav 
        className="bg-[#C122ED] text-white relative z-20"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <ul className="w-[90%] m-auto flex items-center py-3 font-medium text-lg gap-10 justify-around md:justify-start">
          {categories.map((cat, i) => {
            return (
              <li
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseMove={() => setHoveredCategory(cat)}
              >
                <Link to={cat.path} className="flex items-center gap-2" onClick={() => setHoveredCategory(null)}>
                  {cat.name}
                </Link>
              </li>
            );
          })}
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
                <li key={j} className="group">
                  <Link
                    to={sub.path}
                    className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden
                      ${sub.isViewAll
                        ? "text-[#C122ED] font-bold bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-2 border-[#C122ED]/20"
                        : "text-gray-700 hover:text-[#C122ED] bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-2 border-transparent hover:border-[#C122ED]/20"
                      }`}
                  >
                    <span className="relative z-10 font-medium">{sub.name}</span>
                    {sub.isViewAll && (
                      <ArrowRight
                        size={18}
                        className="text-[#C122ED] transition-transform duration-200 group-hover:translate-x-1 relative z-10"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C122ED]/0 via-[#C122ED]/5 to-[#C122ED]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}