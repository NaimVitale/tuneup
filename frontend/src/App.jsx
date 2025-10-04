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
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <div>
    <Header></Header>
    <NavCategories></NavCategories>
    <main>
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path=':tipo' element={<EventsPage/>}/>
          <Route path='evento/:tipo/:id' element={<SingleEventPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/perfil/:id' element={<ProfilePage/>}/>
        </Routes>
    </main>
    <Footer></Footer>
    </div>
    </AuthProvider>
  )
}

export default App
