import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'dressai_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore a mock session from localStorage on load.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setUser(JSON.parse(saved))
    } catch (e) {
      // ignore
    }
    setLoading(false)
  }, [])

  function persist(nextUser) {
    setUser(nextUser)
    if (nextUser) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    else localStorage.removeItem(STORAGE_KEY)
  }

  // Mock auth — accepts any credentials (Feature 1).
  async function login({ email }) {
    const name = email?.split('@')[0] || 'there'
    persist({ name: capitalize(name), email })
  }

  async function register({ name, email }) {
    persist({ name: name || 'New User', email })
  }

  async function loginWithGoogle() {
    persist({ name: 'Alex Morgan', email: 'alex.morgan@gmail.com' })
  }

  function updateProfile(patch) {
    persist({ ...user, ...patch })
  }

  function logout() {
    persist(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
