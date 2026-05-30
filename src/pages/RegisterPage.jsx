import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthShell, { GoogleIcon } from '../components/AuthShell'

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await register({ name, email, password })
    navigate('/app')
  }

  async function handleGoogle() {
    await loginWithGoogle()
    navigate('/app')
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Start digitizing your wardrobe in seconds."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-ink-800 font-medium underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
            Name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-ink-400"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-ink-400"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white border border-cream-200 rounded-xl px-4 py-3 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-ink-400"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-ink-900 text-cream-100 font-semibold py-3 rounded-xl text-sm hover:bg-ink-700 transition-colors"
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <span className="h-px flex-1 bg-cream-200" />
        <span className="text-xs text-ink-300">or</span>
        <span className="h-px flex-1 bg-cream-200" />
      </div>

      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2.5 bg-white border border-cream-200 text-ink-700 font-medium py-3 rounded-xl text-sm hover:border-ink-300 transition-colors"
      >
        <GoogleIcon /> Continue with Google
      </button>
    </AuthShell>
  )
}
