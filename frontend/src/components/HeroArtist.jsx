export default function HeroArtist ({ nombre, imagen }) {
    return (
        <div className="relative bg-cover bg-no-repeat bg-position-[center_top_20%]" style={{ backgroundImage: `url(${imagen})` }}>
            <div className="absolute inset-0 bg-[#C122ED] opacity-20 mix-blend-multiply z-0"></div>
            <div className="relative text-white w-[90%] h-[30vh] m-auto flex items-center">
                <p className='absolute top-10 text-[#C122ED]'>Inicio / Artista / <span className='capitalize font-medium'>{nombre}</span></p>
                <h1 className='text-6xl z-10 capitalize'>{nombre}</h1>
            </div>
        </div>
    )
}