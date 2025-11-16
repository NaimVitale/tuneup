
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

export default function CardRecinto({ recinto }) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden group transition-all duration-300">
      <div className="relative">
        <img
          src={recinto?.img_card}
          alt={recinto?.nombre}
          loading="lazy"
          className="h-[35vh] object-cover w-full group-hover:scale-101 transition-transform duration-300"
        />
        
        {/* Overlay con info */}
        <Link
          to={`/recintos/detalle/${recinto?.id || recinto?.slug}`}
          className="absolute bottom-0 w-full px-5 py-4 backdrop-blur-md bg-[#C122ED]/80 hover:bg-[#C122ED]/90 transition-colors"
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold truncate mb-1">
                {recinto?.nombre || "Nombre del Recinto"}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-white/90">
                <MapPin size={16} className="flex-shrink-0" />
                <span className="truncate">
                  {recinto?.ciudad?.nombre || recinto?.ubicacion || "Ciudad"}
                </span>
              </div>
            </div>
            <ArrowRight 
              size={22} 
              className="flex-shrink-0 ml-3 transition-transform" 
            />
          </div>
        </Link>
      </div>
    </div>
  );
}