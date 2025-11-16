import { useState } from "react";

export default function NavCategories() {
  const [categories] = useState([
    {
      name: "Conciertos",
      path: "/conciertos",
      subcategories: [
        { name: "Rock", path: "/conciertos/rock" },
        { name: "Pop", path: "/conciertos/pop" },
        { name: "Indie", path: "/conciertos/indie" },
        { name: "Rap / Trap", path: "/conciertos/rap-trap" },
        { name: "Electrónica", path: "/conciertos/electronica" },
      ],
    },
    {
      name: "Artistas",
      path: "/artistas",
      subcategories: [
        { name: "The Rolling Stones", path: "/artistas/detalle/the-rolling-stones" },
        { name: "Dua Lipa", path: "/artistas/detalle/dua-lipa" },
        { name: "Ed Sheeran", path: "/artistas/detalle/ed-sheeran" },
        { name: "Guns 'N Roses", path: "#" },
      ],
    },
    {
      name: "Recintos",
      path: "/recintos",
      subcategories: [
        { name: "Madrid", path: "/ciudades/madrid" },
        { name: "Barcelona", path: "/ciudades/barcelona" },
        { name: "Valencia", path: "/ciudades/valencia" },
        { name: "Bilbao", path: "/ciudades/bilbao" },
      ],
    },
  ]);

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
