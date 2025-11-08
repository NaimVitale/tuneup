import { PlayCircle } from "lucide-react"

export default function CardSpotifySong({ cancion }) {
    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 flex justify-between rounded-2xl px-6 py-4 items-center hover:from-[#f3e0ff] hover:to-white transition-all duration-200 shadow-sm group">
            <div className="flex gap-4 items-center flex-1 min-w-0">
                <div className="flex-shrink-0">
                    <img 
                        src={cancion?.imagen || "https://upload.wikimedia.org/wikipedia/commons/3/33/Red_Hot_Chili_Peppers_logo.png"} 
                        alt={cancion?.artista}
                        className="h-12 w-12 rounded-lg object-cover" 
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900 truncate group-hover:text-[#C122ED] transition-colors">
                        {cancion?.artista || "Red Hot Chili Peppers"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                        {cancion?.titulo || "Soul To Squeeze"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                <p className="text-sm font-medium text-gray-500">
                    {cancion?.duracion || "3:45"}
                </p>
                <button className="p-2 hover:bg-[#f3e0ff] rounded-full transition-colors">
                    <PlayCircle size={24} className="text-[#C122ED] group-hover:scale-110 transition-transform"/>
                </button>
            </div>
        </div>
    );
}