import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import './App.css'
import { Suspense} from "react";
import { AuthProvider} from './context/AuthContext';
import Spinner from './components/Spinner';
import AppRoutes from './AppRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<div className='flex justify-center items-center h-[100dvh]'><Spinner/></div>}>
          <AppRoutes/>
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