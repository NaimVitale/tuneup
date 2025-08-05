import HeroImage from '../assets/hero_tuneup.webp';
import HeroMetallica from '../assets/hero_metallica.webp';
import HeroRCHP from '../assets/hero_redhot.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: '¡Vive la música en vivo como nunca antes!',
    text: 'Desde los festivales más grandes hasta shows íntimos, tenemos tus entradas listas. Descubrí nuevos artistas, reviví tus clásicos favoritos y sentí la energía del escenario en vivo.',
    image: `${HeroImage}`,
  },
  {
    title: '¡Metallica llega con todo a España!',
    text: 'Viví la potencia del metal en un show inolvidable Entradas anticipadas ya disponibles. ¡No te quedes afuera!',
    image: `${HeroMetallica}`,
  },
  {
    title: 'La banda más incendiaria del funk rock vuelve a los escenarios.',
    text: 'Una noche cargada de clásicos, energía y pura adrenalina. ¡Conseguí tus entradas antes de que se agoten!',
    image: `${HeroRCHP}`,
  },
];

const HeroHome = () => {
  return (
    <section className="relative w-full h-[80vh]">
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
              className="relative h-[80vh] bg-cover bg-no-repeat bg-position-[center_top_35%] flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-[#C122ED] opacity-50 mix-blend-multiply z-0"></div>
              <div className="relative z-10 w-[90%] m-auto">
                <div className="flex flex-col gap-6 w-[60%]">
                  <h1 className="text-6xl font-bold text-white whitespace-pre-line">{slide.title}</h1>
                  <p className="text-2xl text-white mb-6">{slide.text}</p>
                  <button className="btn-primary py-3 px-5 text-lg w-max">
                    Consigue tu entrada
                  </button>
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