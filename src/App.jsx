import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { WardrobeProvider } from './context/WardrobeContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import DressingPage from './pages/DressingPage'
import OutfitsPage from './pages/OutfitsPage'
import CalendarPage from './pages/CalendarPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import PremiumPage from './pages/PremiumPage'
import ProfilePage from './pages/ProfilePage'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen bg-cream-50"><div className="w-8 h-8 border-2 border-cream-400 border-t-transparent rounded-full animate-spin-slow" /></div>
  if (!user) return <Navigate to="/auth" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" replace /> : <LandingPage />} />
      <Route path="/auth" element={user ? <Navigate to="/app" replace /> : <AuthPage />} />
      <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dressing" element={<DressingPage />} />
        <Route path="tenues" element={<OutfitsPage />} />
        <Route path="calendrier" element={<CalendarPage />} />
        <Route path="favoris" element={<FavoritesPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="premium" element={<PremiumPage />} />
        <Route path="profil" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WardrobeProvider>
          <AppRoutes />
        </WardrobeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
