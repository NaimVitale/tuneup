import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import NavCategories from './components/NavCategories'
import EventsPage from './pages/EventsPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header></Header>
    <NavCategories></NavCategories>
    <main>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/eventos/:tipo' element={<EventsPage/>}></Route>
        </Routes>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default App
