import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { WardrobeProvider } from './context/WardrobeContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import WardrobePage from './pages/WardrobePage'
import GeneratorPage from './pages/GeneratorPage'
import SettingsPage from './pages/SettingsPage'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-cream-50">
        <div className="w-8 h-8 border-2 border-cream-400 border-t-transparent rounded-full animate-spin-slow" />
      </div>
    )
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/app" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/app" replace /> : <RegisterPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="wardrobe" element={<WardrobePage />} />
        <Route path="generator" element={<GeneratorPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
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
