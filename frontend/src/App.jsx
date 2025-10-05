import { useState } from 'react'
import {Routes,Route} from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage';
import SingleEventPage from './pages/SingleEventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import ProfileLayout from './layouts/ProfileLayout';
import ProfileInfoPage from './pages/ProfilePageInfo';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
          <Routes>
            <Route element={<PublicLayout/>}>
              <Route path='/'element={<HomePage/>}/>
              <Route path=':tipo' element={<EventsPage/>}/>
              <Route path='evento/:tipo/:id' element={<SingleEventPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/perfil' element={<ProfileLayout/>}>
                  <Route path="ajustes/:id" element={<ProfileInfoPage/>}/>
              </Route>
            </Route>

            <Route path='/admin' element={<AdminLayout/>}>
            </Route>
          </Routes>
    </AuthProvider>
  )
}

export default App
