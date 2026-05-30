import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { GROUPS, groupOf } from '../lib/constants'
import { Sparkles, Plus, Shirt, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const { items, openAddModal } = useWardrobe()
  const navigate = useNavigate()

  const firstName = user?.name?.split(' ')[0] || 'there'
  const counts = GROUPS.map((g) => ({
    group: g,
    count: items.filter((i) => groupOf(i.category) === g).length,
  }))

  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      {/* Hero */}
      <div className="bg-ink-900 rounded-3xl p-7 lg:p-9 mb-6">
        <p className="text-cream-500 text-xs font-medium uppercase tracking-wider mb-2">
          Welcome back, {firstName}
        </p>
        <h1 className="font-display text-4xl lg:text-5xl italic text-cream-100 leading-tight mb-5 text-balance">
          Let&apos;s style your day.
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/app/generator')}
            className="flex items-center gap-2 bg-cream-200 text-ink-900 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-cream-100 transition-colors"
          >
            <Sparkles size={15} /> Generate Outfit
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 border border-cream-700/40 text-cream-200 font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-cream-200/10 transition-colors"
          >
            <Plus size={15} /> Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white border border-cream-200 rounded-2xl p-4 col-span-2 sm:col-span-1">
          <p className="text-3xl font-display font-light text-ink-900">{items.length}</p>
          <p className="text-xs text-ink-400 mt-1">Total items</p>
        </div>
        {counts.map(({ group, count }) => (
          <div key={group} className="bg-white border border-cream-200 rounded-2xl p-4">
            <p className="text-3xl font-display font-light text-ink-900">{count}</p>
            <p className="text-xs text-ink-400 mt-1">{group}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/app/wardrobe')}
          className="bg-white border border-cream-200 rounded-3xl p-6 text-left hover:border-ink-300 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center mb-4 text-ink-700">
            <Shirt size={18} />
          </div>
          <h2 className="font-display text-xl italic text-ink-800 mb-1">My Wardrobe</h2>
          <p className="text-ink-400 text-sm mb-4">
            Browse, edit and organize every piece you own.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-700">
            Open wardrobe <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>

        <button
          onClick={() => navigate('/app/generator')}
          className="bg-gradient-to-br from-cream-200 to-sand-300 rounded-3xl p-6 text-left hover:opacity-95 transition-opacity group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center mb-4 text-ink-800">
            <Sparkles size={18} />
          </div>
          <h2 className="font-display text-xl italic text-ink-800 mb-1">Outfit Generator</h2>
          <p className="text-ink-600 text-sm mb-4">
            Let DressAI mix and match a look from your closet.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink-800">
            Generate a look <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  )
}
