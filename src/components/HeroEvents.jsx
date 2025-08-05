import HeroRCHP from '../assets/hero_redhot.webp';

export default function HeroEvents ({ titulo }) {
    return (
        <div className="relative bg-cover bg-no-repeat bg-position-[center_top_20%]" style={{ backgroundImage: `url(${HeroRCHP})` }}>
            <div className="absolute inset-0 bg-[#C122ED] opacity-20 mix-blend-multiply z-0"></div>
            <div className="relative text-white w-[90%] h-[30vh] m-auto flex items-center">
                <p className='font-medium absolute top-10 text-[#C122ED]'>Inicio/<span className='capitalize'>{titulo}</span></p>
                <h1 className='text-6xl z-10 capitalize'>{titulo}</h1>
            </div>
        </div>
    )
}