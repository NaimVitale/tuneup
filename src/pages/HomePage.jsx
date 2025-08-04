import Cardproduct from '../components/CardProduct';
import CardProfileHome from '../components/CardProfileHome';
import CTAinformacion from '../components/CTAInformacion';
import HeroHome from '../components/HeroHome';
import SelectFilter from '../components/SelectFilter';
import UpcomingConcertsCard from '../components/UpcomingConcertsCard';

function Homepage() {
    return (
        <div id="container" className='flex flex-col gap-8'>
            <HeroHome></HeroHome>
            <div className='m-auto flex flex-col gap-30'>
                <div id="destacados" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-end mb-10'>
                        <h2 className='text-3xl'>Conciertos destacados</h2>
                        <a href="" className='text-xl text-[#C122ED]'>Ver mas</a>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:row-span-1 gap-8'>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                    </div>
                </div>
                <div id="proximos" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-end mb-6'>
                        <h2 className='text-3xl'>Proximos conciertos</h2>
                        <a href="" className='text-xl text-[#C122ED]'>Ver mas
                            <img src="/assets/arrow-narrow-right" alt="Flecha" className="w-5 h-5" />
                        </a>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <SelectFilter nombreCategoria={"Fecha"}></SelectFilter>
                        <SelectFilter nombreCategoria={"Genero"}></SelectFilter>
                        <SelectFilter nombreCategoria={"Ubicacion"}></SelectFilter>
                    </div>
                    <div className='flex flex-col gap-3 mt-6'>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                    </div>
                </div>
                <CTAinformacion></CTAinformacion>
                <div id="perfil" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-end mb-6'>
                        <h2 className='text-3xl'>Mi perfil</h2>
                        <a href="" className='text-xl text-[#C122ED]'>Ver perfil completo</a>
                    </div>
                    <div className='mt-2'>
                        <CardProfileHome></CardProfileHome>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
