import Cardproduct from '../components/CardProduct';
import CardProfileHome from '../components/CardProfileHome';
import CTAinformacion from '../components/CTAInformacion';
import HeroHome from '../components/HeroHome';
import SelectFilter from '../components/SelectFilter';
import UpcomingConcertsCard from '../components/UpcomingConcertsCard';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div id="container" className='flex flex-col gap-8'>
            <HeroHome></HeroHome>
            <div className='m-auto flex flex-col gap-30'>
                <div id="destacados" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-end mb-10'>
                        <h2 className='text-3xl'>Conciertos destacados</h2>
                        <Link to="/eventos" className='text-xl text-[#C122ED] flex items-center'>Ver mas
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:row-span-1 gap-8'>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                    </div>
                </div>
                <div id="proximos" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-end mb-6'>
                        <h2 className='text-3xl'>Proximos conciertos</h2>
                        <Link to="/eventos#proximamente" className='text-xl text-[#C122ED] flex items-center'>Ver mas
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                        </Link>
                        
                    </div>
                    <div className='flex flex-col gap-3 mt-6'>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
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
                        <a href="" className='text-xl text-[#C122ED] flex items-center'>Ver perfil completo
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
                        </a>
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
