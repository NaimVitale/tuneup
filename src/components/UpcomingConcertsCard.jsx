function UpcomingConcertsCard() {
    return (
        <div className="flex px-8 py-4 bg-white rounded-2xl justify-between items-center">
            <div className="flex items-center gap-10">
                <div className="text-2xl text-center">
                    <p>SEP</p>
                    <p>23</p>
                </div>
                <div>
                    <img src="https://media.istockphoto.com/id/1806011581/es/foto/j%C3%B3venes-felices-y-alegres-bailando-saltando-y-cantando-durante-el-concierto-del-grupo-favorito.jpg?s=612x612&w=0&k=20&c=Gd46vV8OOIgFzqE5hEH2LW30pNcAxGE8W6Jgd1mvHoI=" alt="" className="h-22 w-22 object-cover rounded-xl" />
                </div>
                <div className="">
                    <p className="text-xl">Guns N Roses</p>
                    <p className="text-">Rock</p>
                    <p>Barcelona</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-end text-l">
                <p>50mil les interesa</p>
                <button className="px-6 py-2 rounded-2xl border border-black">Me interesa</button>
            </div>
        </div>
    );
}

export default UpcomingConcertsCard