import { useState, useEffect } from 'react'
import { useWardrobe } from '../context/WardrobeContext'
import { useAuth } from '../context/AuthContext'
import { generateOutfits } from '../lib/ai'
import { getWeather, getWeatherSaison } from '../lib/weather'
import { Sparkles, Save, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const OCCASIONS = ['Casual', 'Travail', 'Soirée', 'Sport', 'Week-end']
const SAISOMS= Y'Printemps', 'Été', 'Automne', 'Hiver']
const CAT_ICONS = { 'Hauts': '👕', 'Bas': '👖', 'Robes & Combinaisons': '👗', 'Vestes & Manteaux': '��', 'Chaussures': '👟', 'Accessoires': '👜' }

export default function OutfitsPage() {
  const { wardrobe, saveOutfit, outfits } = useWardrobe()
  const { isPremium } = useAuth()
  const navigate = useNavigate()
  const [occasion, setOccasion] = useState('Casual')
  const [saison, setSaison] = useState('Été')
  const [generated, setGenerated] = useState([])
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState({})

  useEffect(() => {
    getWeather().then(w => { setWeather(w); setSaison(getWeatherSaison(w.temp)) })
  }, [])

  async function handleGenerate() {
    if (wardrobe.length < 2) { setError('Ajoute au moins 2 vêtements !'); return }
    setError(''); setLoading(true)
    try {
      const results = await generateOutfits({ wardrobe, occasion, saison, meteo: weather })
      setGenerated(results); setSaved({})
    } catch (e) { setError('Erreur lors de la génération.') }
    setLoading(false)
  }

  async function handleSave(outfit, index) {
    if (!isPremium) { navigate('/app/premium'); return }
    try {
      await saveOutfit({ nom: outfit.nom, style_tag: outfit.style_tag, pieces_ids: outfit.pieces_ids, conseil: outfit.conseil, occasion, saison })
      setSaved(p => ({ ...p, [index]: true }))
    } catch (e) { }
  }

  const getItemById = (id) => wardrobe.find(i => i.id == id)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-2">Mes Tenues</h1>
      <p className="text-ink-400 text-sm mb-8">L'IA compose des looks depuis ton dressing.</p>
      <div className="bg-white border border-cream-200 rounded-3xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div><label className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-2">Occasion</label>
            <div className="flex flex-wrap gap-2">{OCCASIONS.map(o => <button key={o} onClick={() => setOccasion(o)} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${occasion === o ? 'bg-ink-900 text-cream-100' : 'bg-cream-50 text-ink-500 border-cream-200'}`}>{o}</button>)}</div></div>
          <div><label className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-2">Saison</label>
            <div className="flex flex-wrap gap-2">{SAISONS.map(s => <button key={s} onClick={() => setSaison(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${saison === s ? 'bg-ink-900 text-cream-100' : 'bg-cream-50 text-ink-500 border-cream-200'}`}>{s}</button>)}</div></div>
          <button onClick={handleGenerate} disabled={loading} className="flex items-center justify-center gap-2 bg-ink-900 text-cream-100 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-ink-700 disabled:opacity-50">
            {loading ? <span className="w-4 h-4 border-2 border-cream-400 border-t-transparent rounded-full animate-spin-slow" /> : <Sparkles size={15} />}
            {loading ? 'Création en cours…' : 'Générer mes tenues'}
          </button>
        </div>
        {weather && <div className="mt-4 pt-4 border-t border-cream-100 flex items-center gap-2 text-xs text-ink-400"><span>{weather.icon}</span><span>Metéo actuelle : {weather.temp}°C, {weather.description} à {weather.city}</span></div>}
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>}
      {generated.length === 0 && !loading && (
        <div className="text-center py-20 text-ink-300"><Sparkles size={40} className="mx-auto mb-4 opacity-30" /><p>Configure tes préférences et génère tes tenues</p></div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generated.map((outfit, idx) => {
          const pieces = (outfit.pieces_ids || []).map(id => getItemById(id)).filter(Boolean)
          return (
            <div key={idx} className="bg-white border border-cream-200 rounded-3xl overflow-hidden hover:shadow-md">
              <div className="flex h-40">
                {pieces.slice(0, 3).map((piece, i) => (
                  <div key={piece.id} className={`flex-1 bg-cream-50 overflow-hidden ${i === 1 ? 'border-x border-cream-200' : ''}`}>
                    {piece.image_url ? <img src={piece.image_url} alt={piece.nom} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">{CAT_ICONS[piece.categorie] || '👕'}</div>}
                  </div>
                ))}
                {pieces.length === 0 && <div className="flex-1 bg-cream-50 flex items-center justify-center text-3xl">👗</div>}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div><p className="font-semibold text-ink-800">{outfit.nom}</p><span className="text-xs text-cream-500">{outfit.style_tag}</span></div>
                  <span className="text-xs bg-cream-100 text-ink-500 px-2 py-1 rounded-full">Look {idx+1}</span>
                </div>
                <div className="bg-cream-50 rounded-xl p-3 mb-4 border border-cream-100"><p className="text-xs font-semibold text-ink-600 mb-1">✨ Conseil stylist</p><p className="text-xs text-ink-500 leading-relaxed">{outfit.conseil}</p></div>
                <button onClick={() => handleSave(outfit, idx)} disabled={saved[idx]} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold ${saved[idx] ? 'bg-green-100 text-green-700' : 'bg-ink-900 text-cream-100 hover:bg-ink-700'}`}><Save size={12} />{saved[idx] ? 'Sauvegardée ✓' : isPremium ? 'Sauvegarder' : 'Sauvegarder (Premium)'}</button>
              </div>
            </div>
          )
        })}
      </div>
      {generated.length > 0 && <div className="text-center mt-8"><button onClick={handleGenerate} disabled={loading} className="flex items-center gap-2 mx-auto text-ink-500 border border-cream-200 px-5 py-2.5 rounded-xl text-sm hover:border-ink-300"><RefreshCw size={14} /> Générer d'autres tenues</button></div>}
    </div>
  )
}
