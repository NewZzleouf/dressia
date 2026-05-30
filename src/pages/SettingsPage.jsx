import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { Check, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth()
  const { items } = useWardrobe()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    updateProfile({ name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-1">Settings</h1>
      <p className="text-ink-400 text-sm mb-8">Manage your account and preferences.</p>

      <section className="bg-white border border-cream-200 rounded-3xl p-6 mb-6">
        <h2 className="font-semibold text-ink-800 mb-4">Profile</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <label className="block">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
              Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-ink-400"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-ink-400"
            />
          </label>
          <button
            type="submit"
            className="self-start inline-flex items-center gap-2 bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-ink-700 transition-colors"
          >
            {saved ? (
              <>
                <Check size={15} /> Saved
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </section>

      <section className="bg-white border border-cream-200 rounded-3xl p-6 mb-6">
        <h2 className="font-semibold text-ink-800 mb-4">Wardrobe</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-700">Items stored</p>
            <p className="text-xs text-ink-400">Across all categories</p>
          </div>
          <p className="font-display text-3xl text-ink-900">{items.length}</p>
        </div>
      </section>

      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 text-sm font-medium text-red-500 border border-red-200 px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
      >
        <LogOut size={15} /> Sign out
      </button>
    </div>
  )
}
