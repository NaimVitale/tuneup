import HeroEvent from '../assets/hero_event.webp';

export default function HeroSingleEvent(){
    return(
        <div className="relative text-white bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${HeroEvent})` }}>
            <div className="w-[90%] m-auto h-[30vh] gap-8 pb-8 flex items-end">
                <p className="absolute top-6">Inicio / Conciertos / Rock / <span className='font-medium'>The Rolling Stones</span></p>
                <div className="rounded"><img src="https://www.impericon.com/cdn/shop/articles/20230905_rollingstones_1.jpg?v=1712690942" alt="" className="h-35 w-45 object-cover rounded-[20px]"/></div>
                <div>
                    <h2 className="mb-2">The Rolling Stones</h2>
                    <div className="flex gap-10 text-lg">
                        <div className="flex gap-1">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="#C122ED"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l3 -2" /><path d="M12 7v5" /></svg>
                            <p className="mb-1">Lunes 8 de septiembre de 2025, 21:00</p>
                        </div>
                        <div className="flex gap-1">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="#C122ED"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pinned"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6" /><path d="M12 16l0 5" /><path d="M8 4l8 0" /></svg>
                            <p>Barcelona, Palau Sant Jordi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}