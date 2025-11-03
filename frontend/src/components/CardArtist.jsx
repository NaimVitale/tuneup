import { Link } from "react-router-dom"

export default function CardArtist({ information }) {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden group transition-all">
      <div className="relative">
        <img
          src={information?.img_card}
          alt={information?.slug}
          loading="lazy"
          className="h-[35vh] object-cover w-full group-hover:scale-102 transition duration-300"
        />
        <Link
          to={`/artistas/detalle/${information?.slug}`}
          className="absolute bottom-0 w-full px-4 py-3
                     text-lg font-semibold text-white
                     backdrop-blur-md bg-black/20
                     flex items-center justify-between"
        >
          <span>{information?.nombre}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22" height="22"
            viewBox="0 0 22 22"
            fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M15 16l4-4" />
            <path d="M15 8l4 4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
