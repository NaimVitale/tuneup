export default function HeroEvents ({bg_image, title}) {
    return (
        <div className="relative bg-cover bg-no-repeat bg-position-[center_top_20%]" style={{ backgroundImage: `url(${bg_image})` }}>
            <div className="absolute inset-0 bg-[#C122ED] opacity-20 mix-blend-multiply z-0"></div>
            <div className="relative text-white w-[90%] h-[30vh] m-auto flex items-center">
                <p className='absolute top-10 text-white'>Inicio / <span className='capitalize font-medium'>{title}</span></p>
                <h1 className='text-6xl z-10 capitalize'>{title}</h1>
            </div>
        </div>
    )
}