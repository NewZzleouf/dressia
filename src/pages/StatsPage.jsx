import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function PremiumGate({ title, desc }) {
  const navigate = useNavigate()
  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-8">{title}</h1>
      <div className="bg-white border border-cream-200 rounded-3xl p-12 text-center">
        <Lock size={40} className="mx-auto mb-4 text-cream-400" />
        <h2 className="font-display text-2xl italic text-ink-700 mb-2">Fonctionnalité Premium</h2>
        <p className="text-ink-400 text-sm mb-6">{desc}</p>
        <button onClick={() => navigate('/app/premium')} className="bg-ink-900 text-cream-100 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-ink-700 transition-colors">
          Passer Premium — 9.90 CHF/mois
        </button>
      </div>
    </div>
  )
}

export default function StatsPage() {
  const { isPremium } = useAuth()
  const { wardrobe, outfits } = useWardrobe()
  if (!isPremium) return <PremiumGate title="Statistiques" desc="Découvre tes habitudes vestimentaires et les pièces que tu portes le plus." />
  const catCounts = wardrobe.reduce((acc, item) => {
    acc[item.categorie] = (acc[item.categorie] || 0) + 1
    return acc
  }, {})
  const colorCounts = wardrobe.reduce((acc, item) => {
    if (item.couleur) acc[item.couleur] = (acc[item.couleur] || 0) + 1
    return acc
  }, {})
  const topColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const topCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1])
  const maxCat = Math.max(...Object.values(catCounts), 1)
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-6">Statistiques</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[{ label: 'Vêtements', value: wardrobe.length, icon: '👗' },{ label: 'Tenues créées', value: outfits.length, icon: '✨' },{ label: 'Favoris', value: outfits.filter(o => o.is_favorite).length, icon: '❤️' }].map(({ label, value, icon }) => (
          <div key={label} className="bg-white border border-cream-200 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-3xl font-bold text-ink-900">{value}</p>
            <p className="text-xs text-ink-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-cream-200 rounded-3xl p-6">
          <h3 className="font-semibold text-ink-700 mb-5">Répartition par catégorie</h3>
          {topCats.length === 0 ? <p className="text-ink-400 text-sm text-center py-6">Ajoute des vêtements.</p> : (
            <div className="space-y-3">
              {topCats.map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1.5"><span className="text-ink-600">{cat}</span><span className="text-ink-400 font-medium">{count}</span></div>
                  <div className="h-2 bg-cream-100 rounded-full overflow-hidden"><div className="h-full bg-ink-900 rounded-full transition-all duration-500" style={{ width: `${(count/maxCat)*100}%` }} /></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white border border-cream-200 rounded-3xl p-6">
          <h3 className="font-semibold text-ink-700 mb-5">Couleurs dominantes</h3>
          {topColors.length === 0 ? <p className="text-ink-400 text-sm text-center py-6">Ajoute des vêtements.</p> : (
            <div className="space-y-3">
              {topColors.map(([color, count]) => (
                <div key={color} className="flex items-center gap-3"><div className="w-5 h-5 rounded-full border border-cream-200 shrink-0" style={{ background: color.toLowerCase() }} /><span className="flex-1 text-sm text-ink-600 capitalize">{color}</span><span className="text-xs text-ink-400">{count} pièce{count > 1 ? 's' : ''}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
