import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavCategories from "../components/NavCategories";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

export default function PublicLayout(){

    return(
        <div>
            <Header></Header>
            <NavCategories></NavCategories>
        <main>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
        </main>
            <Footer></Footer>
    </div>
    );
};