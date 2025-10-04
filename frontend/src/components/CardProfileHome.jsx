import { dateFormatDateOnly } from "../utils/dateFormat"
import CardSpotifySong from "./CardSpotifySong"

function CardProfileHome({ usuario }) {
    return(
        <div className="bg-white py-4 px-10 rounded-2xl">
            <div className="flex items-center gap-3">
                <img src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png" alt=""  className="h-20 w-20"/>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl">{usuario.nombre}</p>
                    <p>{dateFormatDateOnly(usuario.fecha)}</p>
                </div>
            </div>
            <div className="border border-[#C122ED] mt-3 mb-6"></div>
            <div>
                <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-xl'>Mi musica</h3>
                        <a className='text-md text-[#C122ED] flex items-center gap-1'>Conectar con Spotify
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#1DB954"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-spotify"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" /><path d="M9 15c1.5 -1 4 -1 5 .5" /><path d="M7 9c2 -1 6 -2 10 .5" /></svg>
                        </a>
                </div>
                <div className="flex gap-3 flex-col mb-10">
                    <CardSpotifySong></CardSpotifySong>
                    <CardSpotifySong></CardSpotifySong>
                    <CardSpotifySong></CardSpotifySong>
                </div>
            </div>
        </div>
    )
}

export default CardProfileHome