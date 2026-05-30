import { useState } from 'react'
import { useWardrobe } from '../context/WardrobeContext'
import { GROUPS, groupOf } from '../lib/constants'
import ClothingCard from '../components/ClothingCard'
import { Plus, Shirt } from 'lucide-react'

const FILTERS = ['All', ...GROUPS]

export default function WardrobePage() {
  const { items, openAddModal } = useWardrobe()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? items : items.filter((i) => groupOf(i.category) === filter)

  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl italic text-ink-800">My Wardrobe</h1>
          <p className="text-ink-400 text-sm mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your closet
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="hidden sm:flex items-center gap-2 bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-ink-700 transition-colors"
        >
          <Plus size={16} /> Add Clothing Item
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f
                ? 'bg-ink-900 text-cream-100 border-ink-900'
                : 'bg-white text-ink-500 border-cream-200 hover:border-ink-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <button
          onClick={openAddModal}
          className="w-full border-2 border-dashed border-cream-300 rounded-3xl p-16 text-center hover:border-cream-400 transition-colors"
        >
          <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mx-auto mb-4 text-ink-500">
            <Shirt size={22} />
          </div>
          <p className="font-semibold text-ink-700 mb-1">Nothing here yet</p>
          <p className="text-ink-400 text-sm">Tap to add your first clothing item</p>
        </button>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <ClothingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
