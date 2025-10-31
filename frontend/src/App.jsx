import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Routes,Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
import HomePage from './pages/HomePage'
import EventsPage from './pages/ConcertsPage';
import SingleEventPage from './pages/SingleEventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import ProfileLayout from './layouts/ProfileLayout';
import ProfileInfoPage from './pages/ProfilePageInfo';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminConcertsPage from './pages/AdminPages/AdminConcertsPage';
import ArtistPage from './pages/ArtistPage';
import AdminArtistPage from './pages/AdminPages/AdminArtistPage';
import AdminEditPage from './pages/AdminPages/AdminEditPage';
import SingleArtistPage from './pages/SingleArtistPage';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
            <Routes>
              <Route element={<PublicLayout/>}>
                <Route path='/'element={<HomePage/>}/>
                <Route path=':evento/:slug/:id' element={<SingleEventPage/>}/>
                <Route path='/conciertos' element={<EventsPage/>}/>
                <Route path='/artistas' element={<ArtistPage/>}></Route>
                <Route path='/artistas/:slug' element={<SingleArtistPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/perfil' element={<ProfileLayout/>}>
                    <Route path="ajustes/:id" element={<ProfileInfoPage/>}/>
                </Route>
              </Route>

              <Route path='/admin/dashboard' element={<AdminLayout/>}>
                <Route path='conciertos' element={<AdminConcertsPage/>}/>
                <Route path='artistas' element={<AdminArtistPage/>}/>
                <Route path=':resource/:slug/editar' element={<AdminEditPage/>}/>
              </Route>
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { background: "#333", color: "black" },
                success: { style: { background: "#fff"} },
                error: { style: { background: "#fff" } },
              }}
            />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
