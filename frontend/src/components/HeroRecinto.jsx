import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroRecinto ({ nombre, imagen, data }) {
    return (
        <div className="relative bg-cover bg-no-repeat bg-center h-[30vh]" style={{ backgroundImage: `url(${imagen})` }}>
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="relative h-full w-[90%] m-auto flex items-end pb-10">
                <div className="w-full lg:w-[60%] space-y-6">
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white capitalize'>
                        {nombre}
                    </h1>
                    <button
                        className="btn-hero py-3 px-5 text-lg w-max"
                        onClick={() => {
                            const query = encodeURIComponent(`${data[0]}, ${data[1]}`);
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, "_blank");
                        }}
                        >
                        Ver cómo llegar
                    </button>
                </div>
            </div>
        </div>
    )
}
