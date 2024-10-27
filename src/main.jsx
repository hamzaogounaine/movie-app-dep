import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './contexts/authContext/authContext.jsx'
import { MoviesProvider } from './contexts/moviesContext/moviesContext.jsx'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MoviesProvider>

      <App />
      <Toaster />
      </MoviesProvider>
      </AuthProvider>
   
  </StrictMode>,
)
