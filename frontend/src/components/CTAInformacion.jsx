import HeroImage from '../assets/concierto_filmado_cta.webp';
export default function CTAinformacion(){
    return(
        <div className="relative bg-no-repeat bg-center bg-cover text-white py-12 bg-[#C122ED]" style={{ backgroundImage: `url(${HeroImage})` }}>
            <div className="absolute inset-0 bg-[#C122ED] opacity-80 mix-blend-multiply z-0"></div>
            <div className='relative w-[90%] m-auto flex flex-col items-center'>
                <h2 className='text-6xl mb-8 text-medium'>¡No te pierdas ningún concierto!</h2>
                <p className='text-xl w-[60%] text-center'>Registrate gratis y sé el primero en enterarte de nuevos shows, entradas anticipadas y noticias exclusivas de tus artistas favoritos.</p>
                <button className='btn-light py-2 px-6 text-xl mt-10'>Registrarme</button>
            </div>
        </div>
    )
}