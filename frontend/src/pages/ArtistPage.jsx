import Cardproduct from "../components/CardProduct";
import HeroArtist from "../components/HeroArtist";
import HeroRCHP from '../assets/hero_redhot.webp';

export default function ArtistPage(){
    return(
        <div>
            <HeroArtist></HeroArtist>
            <div className='m-auto flex flex-col gap-30 pt-20 pb-12'>
                <div id="destacados" className='w-[90%] m-auto mb-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:row-span-1 gap-8'>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                                <Cardproduct></Cardproduct>
                    </div>
                </div>
            </div>
            <div className='w-[90%] m-auto flex gap-6 items-center mb-10'>
                <div className="w-[50%]">
                    <h2 className="text-lg mb-6">Sobre el artista</h2>
                    <p className="mb-3 text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie imperdiet nulla, mattis fermentum tortor finibus nec. Pellentesque sem metus, tincidunt vitae tincidunt quis, laoreet et mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ullamcorper sem eu augue blandit consequat eget finibus ex. Nullam ac viverra nisi. Aenean ac orci sit amet sapien ullamcorper volutpat. Sed consequat diam efficitur ex egestas euismod. Suspendisse eget libero maximus, lobortis est eget, euismod lectus. Etiam et molestie tellus, vel pharetra arcu. Phasellus non leo quam. Maecenas dignissim hendrerit est, quis convallis lacus tincidunt nec. Nullam eget commodo erat, eget viverra lacus. Nullam congue, dui ac ullamcorper accumsan, libero massa cursus ligula, sed cursus mi neque vel turpis. Mauris malesuada egestas nisl commodo mollis. In sed augue lacus. Curabitur eros mi, mattis eget quam nec, pellentesque finibus lectus.
                    </p>
                    <p className="text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut molestie imperdiet nulla, mattis fermentum tortor finibus nec. Pellentesque sem metus, tincidunt vitae tincidunt quis, laoreet et mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ullamcorper sem eu augue blandit consequat eget finibus ex. Nullam ac viverra nisi. Aenean ac orci sit amet sapien ullamcorper volutpat. Sed consequat diam efficitur ex egestas euismod. Suspendisse eget libero maximus, lobortis est eget, euismod lectus. Etiam et molestie tellus, vel pharetra arcu. Phasellus non leo quam. Maecenas dignissim hendrerit est, quis convallis lacus tincidunt nec. Nullam eget commodo erat, eget viverra lacus. Nullam congue, dui ac ullamcorper accumsan, libero massa cursus ligula, sed cursus mi neque vel turpis. Mauris malesuada egestas nisl commodo mollis. In sed augue lacus. Curabitur eros mi, mattis eget quam nec, pellentesque finibus lectus.
                    </p>
                </div>
                <img src="https://r2.theaudiodb.com/images/media/artist/cutout/ulbf7x1642419587.png" className="w-[50%]"/>
            </div>
        </div>
    )
}