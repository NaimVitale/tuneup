export default function NavCategories(){
    return(
        <nav className="color-primary">
            <ul className="flex justify-center items-center text-white py-3 font-medium text-lg">
                <li>
                    <a href="/entradas/rock" className="px-4 hover:underline">Rock</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/pop" className="px-4 hover:underline">Pop</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/electronica" className="px-4 hover:underline">Electrónica</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/jazz" className="px-4 hover:underline">Metal</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/jazz" className="px-4 hover:underline">Jazz</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/jazz" className="px-4 hover:underline">Blues</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/jazz" className="px-4 hover:underline">K-Pop</a>
                </li>
                <li className="border-l border-white">
                    <a href="/entradas/festivales" className="px-4 hover:underline">Festivales</a>
                </li>
            </ul>
        </nav>
    )
}