import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from 'react-router-dom';

function UpcomingConcertsCard({ concierto }) {
  const [timeLeft, setTimeLeft] = useState("");

  console.log(concierto)

  // Calcular tiempo restante
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const eventDate = new Date(concierto?.concierto_fecha_venta);
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft("¡Entradas disponibles!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Actualiza cada minuto

    return () => clearInterval(interval);
  }, [concierto?.concierto_fecha_venta]);

  // Extraer fecha del concierto
  const concertDate = new Date(concierto?.concierto_fecha || "2025-09-23");
  const month = concertDate.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
  const day = concertDate.getDate();

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-8 py-5 bg-white rounded-2xl justify-between items-start md:items-center shadow-sm transition-shadow gap-4 md:gap-0">
      <div className="flex items-center gap-4 md:gap-10 w-full md:w-auto">

        <div className="text-2xl text-center font-bold text-[#C122ED] min-w-[60px]">
          <p className="text-sm">{month}</p>
          <p className="text-3xl">{day}</p>
        </div>

        <div className="flex-shrink-0">
          <img 
            src={concierto?.artista_img_card || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"} 
            alt={concierto?.artista_nombre} 
            className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-xl shadow-md" 
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2.5">
            {concierto?.artista_nombre || "Guns N' Roses"}
          </h3>
          <div className="flex flex-col gap-2.5 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-[#f3e0ff] text-[#C122ED] rounded-full text-xs font-medium">
                {concierto?.genero_nombre || "Rock"}
              </span>
            </p>
            <p className="ml-1 flex items-center gap-1">
              <MapPin size={13} className="text-[#C122ED]" />
              {`${concierto?.ciudad_nombre}, ${concierto?.recinto_nombre}`|| "Barcelona, Palau Sant Jordi"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-end w-full md:w-auto">
        <div className="flex items-center gap-2 text-gray-700  px-4 py-2 rounded-full">
          <Clock size={18} className="text-[#C122ED]" />
          <span className="font-semibold text-sm">{timeLeft}</span>
        </div>
        <Link to={`${concierto?.artista_slug}/${concierto?.concierto_id}`} className="px-6 py-2 bg-[#C122ED] hover:bg-[#a01bc7] text-white font-semibold rounded-full transition-colors">
            Mas información
        </Link>
      </div>
    </div>
  );
}

export default UpcomingConcertsCard;