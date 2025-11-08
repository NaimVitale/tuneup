import { ChevronLeft, ChevronRight } from 'lucide-react';
import Cardproduct from '../components/CardProduct';
import CardProfileHome from '../components/CardProfileHome';
import CTAinformacion from '../components/CTAInformacion';
import HeroHome from '../components/HeroHome';
import UpcomingConcertsCard from '../components/UpcomingConcertsCard';
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

function Homepage() {
    const { user, token} = useAuth();
    return (
        <div id="container">
            <HeroHome></HeroHome>
            <div className='m-auto flex flex-col gap-25 md:gap-30 pt-18 md:pt-20'>
                <div id="destacados" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-center mb-10'>
                        <div>
                            <h2 className='text-3xl font-bold text-gray-900 mb-1'>Conciertos destacados</h2>
                            <div className='h-1 w-20 mt-3 bg-gradient-to-r from-[#C122ED] to-[#a01bc7] rounded-full'></div>
                        </div>
                        <Link to="/conciertos" className='hidden md:flex items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group'>
                        Ver todos los conciertos
                            <ChevronRight size={25} className='mt-0.5'></ChevronRight>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:row-span-1 gap-8'>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                        <Cardproduct></Cardproduct>
                    </div>
                    <Link to="/conciertos" className='flex md:hidden items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group mt-10 w-[80%] mx-auto'>
                        Ver todos los conciertos
                            <ChevronRight size={25} className='mt-0.5'></ChevronRight>
                    </Link>
                </div>
                <div id="proximos" className='w-[90%] m-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h2 className='text-3xl font-bold text-gray-900 mb-1'>Próximos conciertos</h2>
                            <div className='h-1 w-20 mt-3 bg-gradient-to-r from-[#C122ED] to-[#a01bc7] rounded-full'></div>
                        </div>
                        <Link 
                            to="/conciertos" 
                            className='hidden md:flex items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group'
                        >
                            Ver más
                            <ChevronRight size={22} className='mt-0.5 transition-transform duration-300'/>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3 mt-6'>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                        <UpcomingConcertsCard></UpcomingConcertsCard>
                    </div>
                    <Link 
                        to="/conciertos" 
                        className='flex md:hidden items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group mt-10 w-[80%] mx-auto'
                    >
                        Ver más
                        <ChevronRight size={22} className='mt-0.5 transition-transform duration-300'/>
                    </Link>
                </div>
                {!token && (
                    <CTAinformacion></CTAinformacion>
                )}
                {token && (
                    <div id="perfil" className='w-[90%] m-auto mb-30'>
                        <div className='flex justify-between items-center mb-8'>
                            <div>
                                <h2 className='text-3xl font-bold text-gray-900 mb-1'>Mi perfil</h2>
                                <div className='h-1 w-20 mt-3 bg-gradient-to-r from-[#C122ED] to-[#a01bc7] rounded-full'></div>
                            </div>
                            <Link to={`perfil/ajustes/${user.id}`} className='hidden md:flex items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group'
                            >Ver perfil completo
                                <ChevronRight size={22} className='mt-0.5 transition-transform duration-300'/>
                            </Link>
                        </div>
                        <div className='mt-2'>
                            <CardProfileHome usuario={user}></CardProfileHome>
                        </div>
                        <Link to={`perfil/ajustes/${user.id}`} className='flex md:hidden items-center justify-center gap-1 text-[#C122ED] hover:text-[#a01bc7] font-semibold text-lg bg-[#f3e0ff] hover:bg-[#e6d0ff] pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3 shadow-sm group mt-10 w-[80%] mx-auto'
                            >Ver perfil completo
                                <ChevronRight size={22} className='mt-0.5 transition-transform duration-300'/>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Homepage
