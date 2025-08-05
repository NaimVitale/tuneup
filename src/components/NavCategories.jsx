import { Link } from "react-router-dom";

export default function NavCategories(){
    return(
        <nav className="color-primary">
            <ul className=" w-[90%] m-auto nav-separated flex items-center text-white py-3 font-medium text-lg">
                <li className="pr-4"><Link to="/eventos/conciertos">Conciertos</Link></li>
                <li className="px-4"><Link to="/eventos/festivales">Festivales</Link></li>
                <li className="px-4">Ciudades</li>
            </ul>
        </nav>
    )
}