import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Routes,Route} from "react-router-dom";
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
import FestivalsPage from './pages/FestivalsPage';
import ArtistPage from './pages/ArtistPage';
import AdminArtistPage from './pages/AdminPages/AdminArtistPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
            <Routes>
              <Route element={<PublicLayout/>}>
                <Route path='/'element={<HomePage/>}/>
                <Route path='evento/:tipo/:id' element={<SingleEventPage/>}/>
                <Route path='/conciertos' element={<EventsPage/>}/>
                <Route path='/festivales' element={<FestivalsPage/>}></Route>
                <Route path='/artista/:slug' element={<ArtistPage/>}></Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/perfil' element={<ProfileLayout/>}>
                    <Route path="ajustes/:id" element={<ProfileInfoPage/>}/>
                </Route>
              </Route>

              <Route path='/admin/dashboard' element={<AdminLayout/>}>
                <Route path='conciertos' element={<AdminConcertsPage/>}/>
                <Route path='artistas' element={<AdminArtistPage/>}/>
              </Route>
            </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
