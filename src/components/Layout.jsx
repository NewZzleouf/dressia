import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import UploadModal from './UploadModal'
import { LayoutGrid, Shirt, Sparkles, Settings, LogOut, Plus } from 'lucide-react'

const NAV = [
  { to: '/app', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/app/wardrobe', label: 'My Wardrobe', icon: Shirt },
  { to: '/app/generator', label: 'Outfit Generator', icon: Sparkles },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const { openAddModal } = useWardrobe()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const initials = (user?.name || 'U')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-cream-200 bg-white px-5 py-6">
        <div className="px-2 mb-8">
          <span className="font-display text-2xl italic text-ink-800 tracking-wide">DressAI</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-900 text-cream-100'
                    : 'text-ink-500 hover:bg-cream-100 hover:text-ink-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-cream-100 text-ink-800 font-semibold px-4 py-2.5 rounded-xl text-sm mt-6 hover:bg-cream-200 transition-colors"
        >
          <Plus size={16} /> Add Clothing Item
        </button>

        <div className="mt-auto pt-6 border-t border-cream-200">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-ink-900 text-cream-100 flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink-800 truncate">{user?.name}</p>
              <p className="text-xs text-ink-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-ink-400 px-2 hover:text-ink-700"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-5 h-14 bg-white/90 backdrop-blur border-b border-cream-200">
        <span className="font-display text-xl italic text-ink-800">DressAI</span>
        <div className="w-8 h-8 rounded-full bg-ink-900 text-cream-100 flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
      </header>

      {/* Main content */}
      <main className="lg:pl-64 pb-24 lg:pb-0">
        <Outlet />
      </main>

      {/* Floating add button (mobile) */}
      <button
        onClick={openAddModal}
        aria-label="Add clothing item"
        className="lg:hidden fixed bottom-20 right-5 z-30 w-14 h-14 rounded-full bg-ink-900 text-cream-100 shadow-lg flex items-center justify-center hover:bg-ink-700 active:scale-95 transition-all"
      >
        <Plus size={24} />
      </button>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-cream-200 flex items-center justify-around h-16 px-2">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 py-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-ink-900' : 'text-ink-400'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <UploadModal />
    </div>
  )
}
