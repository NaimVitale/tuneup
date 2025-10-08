import HeroEvents from "../components/HeroEvents";
import UpcomingConcertsCard from "../components/UpcomingConcertsCard"
import SelectFilter from "../components/SelectFilter";

export default function FestivalsPage() {
    return (
        <div className="mb-20">
            <HeroEvents></HeroEvents>
            <div className="w-[90%] m-auto">
                <div className="pb-6 pt-12">
                    <div className="w-[50%] grid grid-cols-3 gap-6">
                        <SelectFilter nombreCategoria="Fecha"></SelectFilter>
                        <SelectFilter nombreCategoria="Ubicacion"></SelectFilter>
                    </div>
                </div>
                <div className=" pb-12 pt-6">
                    <div>
                        <div className="border border-[#C122ED] mt-20 mb-20"></div>
                    </div>
                    <div id="proximamente">
                        <h3 className="text-xl">300 Proximos Conciertos</h3>
                        <div className="flex gap-8 mt-6">
                            <div className="w-[100%] flex flex-col gap-4">
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                                <UpcomingConcertsCard></UpcomingConcertsCard>
                            </div>
                            <div className="w-[25%]">
                                <div className="color-primary rounded-2xl text-white p-4 h-[30vh]">
                                    <h3></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}