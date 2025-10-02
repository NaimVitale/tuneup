import { useState } from 'react'
import {Routes,Route} from "react-router-dom";
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import NavCategories from './components/NavCategories'
import EventsPage from './pages/EventsPage';
import ScrollToTop from './components/ScrollToTop';
import SingleEventPage from './pages/SingleEventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


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
          <Route path=':tipo' element={<EventsPage/>}></Route>
          <Route path='evento/:tipo/:id' element={<SingleEventPage/>}/>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Routes>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default App
