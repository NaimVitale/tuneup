function SelectFilter({ nombreCategoria }) {
    return (
        <div className="relative">
            <select name="" id={nombreCategoria} className='rounded-3xl py-2 px-5 border-[#C122ED] border-1 text-center text-black text-xl w-full appearance-none'>
                <option value="">{nombreCategoria}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="black"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg> 
            </div>
        </div>
    );
}

export default SelectFilter;