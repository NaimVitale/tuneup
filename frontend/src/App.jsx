import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
import React, { Suspense } from "react";
import { AuthProvider } from './context/AuthContext';
import Spinner from './components/Spinner';

// Lazy load de páginas
const HomePage = React.lazy(() => import('./pages/HomePage'));
const EventsPage = React.lazy(() => import('./pages/ConcertsPage'));
const SingleEventPage = React.lazy(() => import('./pages/SingleEventPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ProfileLayout = React.lazy(() => import('./layouts/ProfileLayout'));
const ProfileInfoPage = React.lazy(() => import('./pages/ProfilePageInfo'));
const EntradasProfilePage = React.lazy(() => import('./pages/EntradasPage'));
const PublicLayout = React.lazy(() => import('./layouts/PublicLayout'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const AdminConcertsPage = React.lazy(() => import('./pages/AdminPages/AdminConcertsPage'));
const ArtistPage = React.lazy(() => import('./pages/ArtistPage'));
const AdminArtistPage = React.lazy(() => import('./pages/AdminPages/AdminArtistPage'));
const AdminEditPage = React.lazy(() => import('./pages/AdminPages/AdminEditPage'));
const SingleArtistPage = React.lazy(() => import('./pages/SingleArtistPage'));
const AdminPremisesPage = React.lazy(() => import('./pages/AdminPages/AdminPremisesPage'));
const AdminUsersPage = React.lazy(() => import('./pages/AdminPages/AdminUsersPage'));
const AdminGeneroPage = React.lazy(() => import('./pages/AdminPages/AdminGeneroPage'));
const AdminCreatePage = React.lazy(() => import('./pages/AdminPages/AdminCreatePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const SuccessPage = React.lazy(() => import('./pages/SuccessPage'));
const CancelPage = React.lazy(() => import('./pages/CancelPage'));


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<div className='flex justify-center items-center'><Spinner/></div>}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path=':evento/:slug/:id' element={<SingleEventPage />} />
              <Route path='/conciertos/:genero?' element={<EventsPage />} />
              <Route path='/artistas/detalle/:slug' element={<SingleArtistPage />} />
              <Route path='/artistas/:genero?' element={<ArtistPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/perfil' element={<ProfileLayout />}>
                <Route path="ajustes/:id" element={<ProfileInfoPage />} />
                <Route path="entradas/:id" element={<EntradasProfilePage />} />
              </Route>
            </Route>

            <Route path='/admin/dashboard' element={<AdminLayout />}>
              <Route path='conciertos' element={<AdminConcertsPage />} />
              <Route path='artistas' element={<AdminArtistPage />} />
              <Route path='recintos' element={<AdminPremisesPage />} />
              <Route path='generos' element={<AdminGeneroPage />} />
              <Route path='usuarios' element={<AdminUsersPage />} />
              <Route path=':resource/crear' element={<AdminCreatePage />} />
              <Route path=':resource/:slug/editar' element={<AdminEditPage />} />
            </Route>

            <Route path='success' element={<SuccessPage />} />
            <Route path='cancel' element={<CancelPage />} />
            <Route path='*' element={<NotFoundPage />} />
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
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App;