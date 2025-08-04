import CardSpotifySong from "./CardSpotifySong"

function CardProfileHome() {
    return(
        <div className="bg-white py-4 px-10 rounded-2xl">
            <div className="flex items-center gap-3">
                <img src="https://images.icon-icons.com/3446/PNG/512/account_profile_user_avatar_icon_219236.png" alt=""  className="h-20 w-20"/>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl">Naim</p>
                    <p>Usuario desde Nov 2023</p>
                </div>
            </div>
            <div className="border border-black mt-3 mb-6"></div>
            <div>
                <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-xl'>Mi musica</h3>
                        <a className='text-md text-[#C122ED]'>Conectar con Spotify</a>
                </div>
                <div className="flex gap-3 flex-col">
                    <CardSpotifySong></CardSpotifySong>
                    <CardSpotifySong></CardSpotifySong>
                    <CardSpotifySong></CardSpotifySong>
                </div>
            </div>
            <div className="flex justify-around items-center my-6">
                <div className="flex flex-col items-center basis-1/3">
                    <img src="https://cdn.creazilla.com/icons/3204714/ticket-icon-sm.png" alt="" className="h-8 w-8"/>
                    <p className="text-xl">2</p>
                    <p className="text-center">Tickets</p>
                </div>
                <div className="flex flex-col items-center basis-1/3">
                    <img src="https://static.thenounproject.com/png/2890596-200.png" alt="" className="h-8 w-8" />
                    <p className="text-xl">20</p>
                    <p className="text-center">Eventos guardados</p>
                </div>
                <div className="flex flex-col items-center basis-1/3 ">
                    <img src="https://static.vecteezy.com/system/resources/previews/001/189/165/non_2x/star-png.png" alt="" className="h-8 w-8"/>
                    <p className="text-xl">120</p>
                    <p className="text-center">Puntos recompensa</p>
                </div>
            </div>
        </div>
    )
}

export default CardProfileHome