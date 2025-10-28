import React, { useState, useRef } from "react";
import parseRectAttributes from "../utils/parseRectAttributes";

export default function SeatMap({ secciones, onSelect }) {
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [hoverZona, setHoverZona] = useState(null);
  const [posMouse, setPosMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const manejarMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = 10; // margen mínimo del tooltip respecto al borde
    let x = e.clientX - rect.left - 150;
    let y = e.clientY - rect.top - 50;

    const tooltipWidth = 150;
    const tooltipHeight = 50;

    if (x + tooltipWidth > rect.width) x = rect.width - tooltipWidth - offset;
    if (x < 0) x = offset;

    // Ajuste vertical
    if (y < 0) y = e.clientY - rect.top + 20; // debajo del cursor si top < 0
    if (y + tooltipHeight > rect.height) y = rect.height - tooltipHeight - offset;

    setPosMouse({ x, y });
  };

  const manejarSeleccion = (seccion) => {
    setZonaSeleccionada(seccion);
    console.log("Sección seleccionada:", seccion.nombre, "Precio:", seccion.precio);
    if (onSelect) onSelect(seccion);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] flex items-center justify-center"
      onMouseMove={manejarMouseMove}
    >
      <svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" className="w-[90%] h-[90%]">
        {secciones.map((seccion) => {
          const isSelected = zonaSeleccionada?.id === seccion.id;
          const agotada = seccion.capacidad === 0;

          const commonProps = {
            onClick: () => !agotada && manejarSeleccion(seccion),
            onMouseEnter: () => !agotada && setHoverZona(seccion),
            onMouseLeave: () => setHoverZona(null),
            className: `transition-all duration-300 ${
              isSelected
                ? "fill-[#C122ED] opacity-90"
                : agotada
                ? "fill-gray-300 cursor-not-allowed"
                : "fill-white hover:fill-[#C122ED]/60 cursor-pointer"
            }`,
          };

          if (seccion.tipo_svg === "path") {
            return <path key={seccion.id} {...commonProps} d={seccion.svg_path} />;
          } else if (seccion.tipo_svg === "rect") {
            const rectProps = parseRectAttributes(seccion.svg_path);
            return <rect key={seccion.id} {...commonProps} {...rectProps} />;
          } else {
            return null;
          }
        })}
      </svg>

      {hoverZona && (
        <div
          style={{ top: posMouse.y, left: posMouse.x }}
          className="absolute bg-white text-gray-800 px-4 py-2 rounded shadow-lg pointer-events-none z-50 w-[150px]"
        >
          <p className="font-semibold truncate">{hoverZona.nombre}</p>
          {hoverZona.precio !== undefined && (
            <p className="text-sm text-gray-600">Precio: {hoverZona.precio}€</p>
          )}
        </div>
      )}
    </div>
  );
}

