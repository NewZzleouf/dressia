import { useWardrobe } from '../context/WardrobeContext'
import { Pencil, Trash2 } from 'lucide-react'

export default function ClothingCard({ item }) {
  const { openEditModal, removeItem } = useWardrobe()

  return (
    <div className="group bg-white border border-cream-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] bg-cream-50">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-300 text-sm">
            No image
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openEditModal(item)}
            aria-label={`Edit ${item.name}`}
            className="w-7 h-7 rounded-full bg-white/90 text-ink-700 flex items-center justify-center shadow-sm hover:bg-white"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Delete ${item.name}`}
            className="w-7 h-7 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-sm hover:bg-white"
          >
            <Trash2 size={13} />
          </button>
        </div>
        <span className="absolute top-2 left-2 bg-ink-900/80 text-cream-100 text-[10px] font-medium px-2 py-0.5 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-ink-800 truncate">{item.name}</p>
        <p className="text-xs text-ink-400 mt-0.5">
          {item.color} · {item.season}
        </p>
      </div>
    </div>
  )
}
