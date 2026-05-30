import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { getWeather, getWeatherSaison } from '../lib/weather'
import { generateOutfits } from '../lib/ai'
import { Sparkles, Shirt, Calendar, Heart, ArrowRight, RefreshCw } from 'lucide-react'

const QUICK_ACTIONS = [
  { icon: Shirt, label: 'Ajouter un vêtement', desc: 'Photo ou galerie', path: '/app/dressing', color: 'bg-blue-50 text-blue-600' },
  { icon: Sparkles, label: 'Créer une tenue', desc: 'Laisser l\'IA proposer', path: '/app/tenues', color: 'bg-amber-50 text-amber-600' },
  { icon: Heart, label: 'Mes favoris', desc: 'Looks sauvegardés', path: '/app/favoris', color: 'bg-rose-50 text-rose-600' },
  { icon: Calendar, label: 'Planifier', desc: 'Prochain événement', path: '/app/calendrier', color: 'bg-green-50 text-green-600' },
]

export default function Dashboard() {
  const { profile, isPremium } = useAuth()
  const { wardrobe, outfits } = useWardrobe()
  const navigate = useNavigate()
  const [weather, setWeather] = useState(null)
  const [todayOutfit, setTodayOutfit] = useState(null)
  const [loadingOutfit, setLoadingOutfit] = useState(false)
  const firstName = profile?.full_name?.split(' ')[0] || 'toi'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bonjour' : 'Bonsoir'
  useEffect(() => { getWeather(profile?.city || 'Lausanne').then(setWeather) }, [profile])
  async function generateTodayOutfit() {
    if (wardrobe.length < 2) return
    setLoadingOutfit(true)
    try {
      const saison = weather ? getWeatherSaison(weather.temp) : 'Printemps'
      const results = await generateOutfits({ wardrobe, occasion: 'Casual', saison, meteo: weather, count: 1 })
      setTodayOutfit(results[0])
    } catch (e) { }
    setLoadingOutfit(false)
  }
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      <div className="bg-ink-900 rounded-3xl p-8 mb-6 relative overflow-hidden">
        <div className="relative grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-cream-500 text-xs font-medium uppercase mb-2">{greeting} {firstName} 👋</p>
            <h1 className="font-display text-4xl lg:text-5xl italic text-cream-100 leading-tight mb-3">Ton style.<br style={{}} />Ton dressing.<br style={{}} /><span className="text-cream-400">Ton jour.</span></h1>
            <button onClick={() => navigate('/app/tenues')} className="flex items-center gap-2 bg-cream-200 text-ink-900 font-semibold px-5 py-2.5 rounded-xl text-sm"><Sparkles size={14} /> Voir mes tenues du jour</button>
          </div>
          <div className="flex gap-4 lg:justify-end">
            <div className="bg-cream-200/10 border border-cream-700/30 rounded-2xl p-4 text-center"><p className="text-3xl font-bold text-cream-200">{wardrobe.length}</p><p className="text-xs text-cream-500 mt-1">vêtements</p></div>
            <div className="bg-cream-200/10 border border-cream-700/30 rounded-2xl p-4 text-center"><p className="text-3xl font-bold text-cream-200">{outfits.length}</p><p className="text-xs text-cream-500 mt-1">tenues</p></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {QUICK_ACTIONS.map(({ icon: Icon, label, desc, path, color }) => (
          <button key={path} onClick={() => navigate(path)} className="bg-white border border-cream-200 rounded-2xl p-4 text-left hover:border-ink-300 transition-all group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={16} /></div>
            <p className="text-sm font-semibold text-ink-800">{label}</p>
            <p className="text-xs text-ink-400 mt-0.5">{desc}</p>
            <ArrowRight size={12} className="text-ink-300 mt-2" />
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-cream-200 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl italic text-ink-800">Tenue recommandée</h2>
            {weather && <span className="text-xs bg-cream-100 text-ink-500 px-3 py-1 rounded-full">{weather.icon} {weather.temp}°C</span>}
          </div>
          {wardrobe.length < 2 ? (
            <div className="text-center py-8"><p className="text-ink-400 text-sm mb-3">Ajoute au moins 2 vêtements !</p><button onClick={() => navigate('/app/dressing')} className="text-sm font-medium text-ink-700 underline">Ajouter</button></div>
          ) : todayOutfit ? (
            <div>
              <div className="flex gap-3 mb-4">
                {todayOutfit.pieces_ids?.slice(0, 3).map(id => {
                  const item = wardrobe.find(w => w.id == id)
                  return item ? (<div key={id} className="flex-1 aspect-square bg-cream-50 rounded-xl border border-cream-200 overflow-hidden">{item.image_url ? <img src={item.image_url} alt={item.nom} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>}</div>) : null
                })}
              </div>
              <div className="bg-cream-50 rounded-2xl p-4 border border-cream-100"><p className="text-xs font-semibold text-ink-700 mb-1">{todayOutfit.style_tag} ✦</p><p className="text-sm text-ink-600">{todayOutfit.conseil}</p></div>
              <button onClick={generateTodayOutfit} className="mt-3 flex items-center gap-2 text-xs text-ink-400"><RefreshCw size={12} /> Autre suggestion</button>
            </div>
          ) : (
            <div className="text-center py-6"><button onClick={generateTodayOutfit} disabled={loadingOutfit} className="flex items-center gap-2 mx-auto bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm">Sparkles → Générer ma tenue du jour</button></div>
          )}
        </div>
        <div className="bg-white border border-cream-200 rounded-3xl p-6">
          <h2 className="font-display text-xl italic text-ink-800 mb-4">Météo {weather ? `à ${weather.city}` : ''}</h2>
          {weather ? (<div><div className="flex items-end gap-4 mb-4"><div><p className="text-5xl font-display font-light text-ink-900">{weather.temp}°C</p><p className="text-ink-400 text-sm capitalize mt-1">{weather.description}</p></div><span className="text-5xl">{weather.icon}</span></div><div className="flex gap-3 overflow-x-auto">{weather.hourly.map((h, i) => <div key={i} className="flex-shrink-0 text-center bg-cream-50 rounded-xl px-3 py-2 border border-cream-100"><p className="text-xs text-ink-400">{h.time}</p><p className="text-sm">{h.icon}</p><p className="text-xs font-medium text-ink-700">{h.temp}·</p></div>)}</div></div>) : (<div className="flex items-center justify-center h-32"><span className="w6 h-6 border-2 border-cream-400 border-t-transparent rounded-full animate-spin-slow" /></div>)}
        </div>
      </div>
      {isPremium === false && (
        <div className="mt-6 bg-gradient-to-r from-cream-200 to-sand-300 rounded-3xl p-6 flex items-center justify-between">
          <div><p className="font-semibold text-ink-800">✦ Passer Premium</p><p className="text-sm text-ink-500 mt-0.5">Sauvegarde ton dressing et bien plus.</p></div>
          <button onClick={() => navigate('/app/premium')} className="shrink-0 bg-ink-900 text-cream-100 font-semibold px-5 py-2.5 rounded-xl text-sm">9.90 CHF/mois →</button>
        </div>
      )}
    </div>
  )
}
