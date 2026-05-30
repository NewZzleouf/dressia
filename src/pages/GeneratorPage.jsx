import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWardrobe } from '../context/WardrobeContext'
import { generateOutfit } from '../lib/outfit'
import { Sparkles, RefreshCw, Thermometer, Shirt } from 'lucide-react'

const SLOTS = [
  { key: 'top', label: 'Top' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'jacket', label: 'Jacket' },
]

export default function GeneratorPage() {
  const { items } = useWardrobe()
  const navigate = useNavigate()
  const [outfit, setOutfit] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleGenerate() {
    setError('')
    setLoading(true)
    // Small delay to simulate "AI" thinking.
    setTimeout(() => {
      const result = generateOutfit(items)
      if (result.error) {
        setError(result.error)
        setOutfit(null)
      } else {
        setOutfit(result)
      }
      setLoading(false)
    }, 450)
  }

  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-1">Outfit Generator</h1>
      <p className="text-ink-400 text-sm mb-8">
        DressAI combines pieces from your wardrobe into a complete look.
      </p>

      {!outfit && !error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-3xl bg-cream-100 flex items-center justify-center mx-auto mb-5 text-ink-600">
            <Sparkles size={28} />
          </div>
          <p className="text-ink-500 text-sm mb-6 max-w-xs mx-auto">
            Ready when you are. Generate a fresh outfit from the clothes you already own.
          </p>
          <GenerateButton loading={loading} onClick={handleGenerate} label="Generate Outfit" />
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-3xl bg-cream-100 flex items-center justify-center mx-auto mb-5 text-ink-500">
            <Shirt size={26} />
          </div>
          <p className="text-ink-600 text-sm mb-1 font-medium">Not enough pieces</p>
          <p className="text-ink-400 text-sm mb-6 max-w-sm mx-auto">{error}</p>
          <button
            onClick={() => navigate('/app/wardrobe')}
            className="bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-ink-700 transition-colors"
          >
            Go to wardrobe
          </button>
        </div>
      )}

      {outfit && (
        <div>
          <div className="bg-white border border-cream-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Stats bar */}
            <div className="flex items-center justify-between gap-4 px-6 py-5 bg-ink-900 text-cream-100">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cream-500">Outfit Score</p>
                <p className="font-display text-3xl">{outfit.score}%</p>
              </div>
              <div className="h-8 w-px bg-cream-700/40" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cream-500">Style</p>
                <p className="text-sm font-medium mt-1">{outfit.style}</p>
              </div>
              <div className="h-8 w-px bg-cream-700/40" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-cream-500">Weather</p>
                <p className="text-sm font-medium mt-1 flex items-center gap-1">
                  <Thermometer size={13} /> {outfit.weather}°C
                </p>
              </div>
            </div>

            {/* Pieces */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cream-200">
              {SLOTS.map(({ key, label }) => {
                const piece = outfit[key]
                return (
                  <div key={key} className="bg-white p-4">
                    <p className="text-[10px] uppercase tracking-wider text-ink-400 mb-2">{label}</p>
                    {piece ? (
                      <>
                        <div className="aspect-square rounded-xl bg-cream-50 overflow-hidden mb-2">
                          <img
                            src={piece.image}
                            alt={piece.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-ink-800 truncate">{piece.name}</p>
                        <p className="text-[11px] text-ink-400">{piece.color}</p>
                      </>
                    ) : (
                      <div className="aspect-square rounded-xl bg-cream-50 border border-dashed border-cream-300 flex items-center justify-center text-ink-300 text-xs">
                        Optional
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center mt-6">
            <GenerateButton loading={loading} onClick={handleGenerate} label="Generate Another Outfit" secondary />
          </div>
        </div>
      )}
    </div>
  )
}

function GenerateButton({ loading, onClick, label, secondary }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 ${
        secondary
          ? 'border border-cream-300 text-ink-700 hover:border-ink-400'
          : 'bg-ink-900 text-cream-100 hover:bg-ink-700'
      }`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-slow" />
      ) : secondary ? (
        <RefreshCw size={15} />
      ) : (
        <Sparkles size={15} />
      )}
      {loading ? 'Styling…' : label}
    </button>
  )
}
