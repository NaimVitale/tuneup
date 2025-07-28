import ArrowFilter from "../assets/arrow_filter.png"

function SelectFilter({ nombreCategoria }) {
    return (
        <div className="relative">
            <select name="" id={nombreCategoria} className='rounded-3xl py-1 px-5 border-black border-1 bg-[#8C8C8C]/50 text-center text-xl w-full appearance-none'>
                <option value="">{nombreCategoria}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                 <img src={ArrowFilter} alt="flecha" className="w-4 h-5" />
            </div>
        </div>
    );
}

export default SelectFilter;