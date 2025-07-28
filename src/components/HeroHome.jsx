import HeroImage from '../assets/concierto_hero_1.webp';
function HeroHome() {
    return (
        <div id="hero" className="h-[100vh] bg-no-repeat bg-center bg-cover flex items-center" style={{ backgroundImage: `url(${HeroImage})` }}>
            <div className='w-[90%] m-auto'>
                <div className='p-8 flex flex-col gap-10 w-[60%]'>
                    <h1 className="text-6xl font-bold text-white">¡Vive la música en vivo como nunca antes!</h1>
                    <p className='text-2xl text-white'>Desde los festivales más grandes hasta shows íntimos, tenemos tus entradas listas. Descubrí nuevos artistas, reviví tus clásicos favoritos y sentí la energía del escenario en vivo.</p>
                    <button className='bg-[#C122ED] py-4 px-6 rounded-md text-white text-xl font-bold w-max'>Consigue tu entrada</button>
                </div>
            </div>
        </div>
    )
}

export default HeroHome