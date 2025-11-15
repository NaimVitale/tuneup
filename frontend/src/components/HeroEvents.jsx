export default function HeroEvents ({bg_image, title}) {
    return (
        <div className="relative bg-cover bg-no-repeat bg-position-[center_top_20%]" style={{ backgroundImage: `url(${bg_image})` }}>
            <div className="absolute inset-0 bg-black opacity-40 mix-blend-multiply z-0"></div>
            <div className="relative text-white w-[90%] h-[30vh] m-auto flex items-center">
                <h1 className='text-6xl z-10 capitalize'>{title}</h1>
            </div>
        </div>
    )
}