import HeroImage from '../assets/hero_tuneup.webp';
import HeroMetallica from '../assets/hero_metallica.webp';
import HeroRCHP from '../assets/hero_redhot.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {Link} from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: '¡Vive la música en vivo como nunca antes!',
    text: 'Desde los festivales más grandes hasta shows íntimos, tenemos tus entradas listas. Descubrí nuevos artistas, reviví tus clásicos favoritos y sentí la energía del escenario en vivo.',
    image: `${HeroImage}`,
    path: '/conciertos'
  },
  {
    title: '¡Metallica llega con todo a España!',
    text: 'Viví la potencia del metal en un show inolvidable Entradas anticipadas ya disponibles. ¡No te quedes afuera!',
    image: `${HeroMetallica}`,
    path: '/conciertos'
  },
  {
    title: 'La banda más incendiaria del funk rock vuelve a los escenarios.',
    text: 'Una noche cargada de clásicos, energía y pura adrenalina. ¡Conseguí tus entradas antes de que se agoten!',
    image: `${HeroRCHP}`,
    path: '/conciertos'
  },
];

const HeroHome = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-[60vh] lg:h-[80vh]">
      <h1 className="sr-only">TuneUp – vive la música en vivo como nunca antes</h1>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000}}
        loop={true}
        pagination={{ clickable: true }}
        speed={2000}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[80vh] md:h-[60vh] lg:h-[80vh] bg-cover bg-no-repeat bg-position-[center_top_35%] flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-[#C122ED] opacity-50 mix-blend-multiply z-0"></div>
              <div className="relative z-10 w-[90%] m-auto">
                <div className="flex flex-col gap-6 lg:w-[60%]">
                  <h2 className="h2-slider text-white whitespace-pre-line ">{slide.title}</h2>
                  <p className="text-2xl text-white mb-6">{slide.text}</p>
                  <Link to={slide.path} className="btn-hero py-3 px-5 text-lg w-max">
                    Consigue tu entrada
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroHome;