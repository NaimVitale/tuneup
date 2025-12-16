// components/TrackList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Cambia por tu router
import { Play, ExternalLink, Pause } from 'lucide-react';

export default function TrackList({ tracks }) {
  const [playingTrack, setPlayingTrack] = useState(null);

  const handlePlayPause = (trackId) => {
    const audio = document.getElementById(`audio-${trackId}`);
    if (playingTrack === trackId) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      // Pausar cualquier audio que esté sonando
      if (playingTrack) {
        const prevAudio = document.getElementById(`audio-${playingTrack}`);
        prevAudio?.pause();
      }
      audio.play();
      setPlayingTrack(trackId);
    }
  };

  return (
    <div className="bg-[#121212] rounded-3xl py-10 px-8 shadow-2xl">
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <div key={track.id}>
            {track.hasPreview ? (
              // Si tiene preview, el click reproduce el audio
              <div
                onClick={() => handlePlayPause(track.id)}
                className="group flex items-center gap-4 p-4 rounded-lg bg-[#181818] hover:bg-[#282828] transition-all duration-200 cursor-pointer border border-[#282828] hover:border-[#1DB954]/30"
              >
                {/* Número de track / Play button */}
                <div className="w-5 md:w-6 text-center hidden sm:block">
                  <span className={`text-[#b3b3b3] text-xs md:text-sm font-medium ${playingTrack === track.id ? 'hidden' : 'group-hover:hidden'}`}>
                    {index + 1}
                  </span>
                  {playingTrack === track.id ? (
                    <Pause size={16} className="text-[#1DB954] fill-[#1DB954] mx-auto" />
                  ) : (
                    <Play size={16} className="hidden group-hover:block text-white fill-white mx-auto" />
                  )}
                </div>

                {/* Imagen del track */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                  {track.imagen ? (
                    <img
                      src={track.imagen}
                      alt={track.nombre}
                      className="w-full h-full object-cover rounded shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#282828] rounded flex items-center justify-center">
                      <Play size={22} className="text-[#b3b3b3]" />
                    </div>
                  )}
                </div>

                {/* Info del track */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm md:text-base truncate transition-colors ${
                    playingTrack === track.id ? 'text-[#1DB954]' : 'text-white group-hover:text-[#1DB954]'
                  }`}>
                    {track.nombre}
                  </h3>
                  <p className="text-[#b3b3b3] text-xs md:text-sm hidden sm:block">Vista previa • 30s</p>
                </div>

                {/* Audio oculto */}
                <audio
                  id={`audio-${track.id}`}
                  src={track.preview}
                  onEnded={() => setPlayingTrack(null)}
                  className="hidden"
                />
              </div>
            ) : (
              // Si no tiene preview, el click va a Spotify
              <Link
                to={track.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl md:rounded-lg bg-[#181818] hover:bg-[#282828] transition-all duration-200 cursor-pointer border border-[#282828] hover:border-[#1DB954]/30"
              >
                {/* Número de track */}
                <div className="w-5 md:w-6 text-center hidden sm:block">
                  <span className="text-[#b3b3b3] text-xs md:text-sm font-medium group-hover:hidden">
                    {index + 1}
                  </span>
                  <ExternalLink size={16} className="hidden group-hover:block text-white mx-auto" />
                </div>

                {/* Imagen del track */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                  {track.imagen ? (
                    <img
                      src={track.imagen}
                      alt={track.nombre}
                      className="w-full h-full object-cover rounded shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#282828] rounded flex items-center justify-center">
                      <Play size={22} className="text-[#b3b3b3]" />
                    </div>
                  )}
                </div>

                {/* Info del track */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm md:text-base truncate group-hover:text-[#1DB954]">
                    {track.nombre}
                  </h3>
                  <p className="text-[#b3b3b3] text-xs md:text-sm hidden sm:block">Escuchar en Spotify</p>
                </div>

                {/* Botón de Spotify */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-1 md:gap-2 bg-[#1DB954] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm group-hover:bg-[#1ed760] group-hover:scale-105 transition-all duration-200 shadow-lg">
                    <span className="hidden sm:inline">Abrir</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}