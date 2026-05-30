import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { analyzeClothingItem } from '../lib/ai'
import { Upload, X, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['Tout', 'Hauts', 'Bas', 'Robes & Combinaisons', 'Vestes & Manteaux', 'Chaussures', 'Accessoires']
const CAT_ICONS = { 'Hauts': 'ðŸ‘•', 'Bas': 'ðŸ‘–', 'Robes & Combinaisons': 'ðŸ‘—', 'Vestes & Manteaux': 'ðŸ¤Õ', 'Chaussures': 'ðŸ‘Ÿ', 'Accessoires': 'ðŸ‘œ' }

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result.split(',')[1])
    r.onerror = rej
    r.readAsDataURL(file)
  })
}

export default function DressingPage() {
  const { isPremium } = useAuth()
  const { wardrobe, addClothingItem, addLocalItem, removeClothingItem } = useWardrobe()
  const navigate = useNavigate()
  const fileRef = useRef()
  const [analyzing, setAnalyzing] = useState(false)
  const [pendingItem, setPendingItem] = useState(null)
  const [pendingFile, setPendingFile] = useState(null)
  const [error, setError] = useState('')
  const [filterCat, setFilterCat] = useState('Tout')
  const filtered = filterCat === 'Tout' ? wardrobe : wardrobe.filter(i => i.categorie === filterCat)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setError('')
    setAnalyzing(true)
    try {
      const base64 = await fileToBase64(file)
      const info = await analyzeClothingItem(base64, file.type)
      setPendingItem({ ...info, preview: URL.createObjectURL(file), base64, mediaType: file.type })
      setPendingFile(file)
    } catch (err) { setError('Impossible d\'analyser l\'image.') }
    setAnalyzing(false)
    e.target.value = ''
  }

  async function confirmItem() {
    if (!pendingItem) return
    try {
      if (isPremium) { await addClothingItem(pendingItem, pendingFile) }
      else { addLocalItem({ ...pendingItem, image_url: pendingItem.preview }) }
    } catch (err) { setError('Erreur lors de l\'ajout. ' + err.message) }
    setPendingItem(null)
    setPendingFile(null)
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl italic text-ink-800">Mon Dressing</h1>
          <p className="text-ink-400 text-sm mt-1">{wardrobe.length} piÃ¨ce(wardrobe.length !== 1 ? 's' : '') Â· {isPremium ? 'SauvegardÃ© âœ¦' : 'Session uniquement'}</p>
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={analyzing} className="flex items-center gap-2 bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-ink-700 disabled:opacity-50">
          {analyzing ? <span className="w-4 h-4 border-2 border-cream-400 border-t-transparent rounded-full animate-spin-slow" /> : <Upload size={15} />}
          {analyzing ? 'Analyseâ€¦' : 'Ajouter une piÃ¨ce'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
      {!isPremium && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2"><Lock size={14} className="text-amber-500" /><p className="text-sm text-amber-700">Version gratuite â€” dressing non sauvegardÃ©</p></div>
          <button onClick={() => navigate('/app/premium')} className="text-xs font-semibold text-amber-700 underline ml-3">Passer Premium</button>
        </div>
      )}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CATEGORIES,map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${filterCat === cat ? 'bg-ink-900 text-cream-100' : 'bg-white text-ink-500 border-cream-200'}`}>
            {cat !== 'Tout' && CAT_ICONS[cat]} {cat}
          </button>
        ))}
      </div>
      {pendingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-display text-2xl italic text-ink-800 mb-5">VÃªtement dÃ©tectÃ©</h3>
            <div className="flex gap-4 mb-5">
              <img src={pendingItem.preview} alt="" className="w-28 h-36 object-cover rounded-2xl border border-cream-200" />
              <div className="flex-1">
                <p className="font-semibold text-ink-800 mb-1">{pendingItem.nom}</p>
                <p className="text-ink-500 text-xs mb-3">{pendingItem.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {[pendingItem.categorie, pendingItem.couleur, pendingItem.style].filter(Boolean).map(t => <span key={t} className="bg-cream-100 text-ink-600 text-xs px-2.5 py-1 rounded-full border border-cream-200">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={confirmItem} className="flex-1 bg-ink-900 text-cream-100 font-semibold py-3 rounded-xl text-sm hover:bg-ink-700">Ajouter au dressing</button>
              <button onClick={() => setPendingItem(null)} className="px-4 bg-cream-100 text-ink-600 rounded-xl text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}
      {wardrobe.length === 0 ? (
        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-cream-300 rounded-3xl p-16 text-center cursor-pointer hover:border-cream-400">
          <div className="text-5xl mb-4">ðŸ‘—</div>
          <p className="font-semibold text-ink-600 mb-1">Ton dressing est vide</p>
          <p className="text-ink-400 text-sm">Clique pour ajouter ta premiÃ¨re piÃ¨ce</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-ink-400 py-12">Aucune piÃ¨ce dans cette catÃ©gorie.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group bg-white border border-cream-200 rounded-2xl overflow-hidden hover:shadow-md">
              <div className="relative aspect-[3/4] bg-cream-50">
                {item.image_url ? <img src={item.image_url} alt={item.nom} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl">{CAT_ICONS[item.categorie] || 'ðŸ‘•'}</div>}
                <button onClick={() => removeClothingItem(item.id)} className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"><X size={12} /></button>
              </div>
              <div className="p-3"><p className="text-sm font-medium text-ink-800 truncate">{item.nom}</p><p className="text-xs text-ink-400 mt-0.5">{item.couleur} Â· {item.style}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
