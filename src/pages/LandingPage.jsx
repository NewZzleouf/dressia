import { useNavigate } from 'react-router-dom'
import { Sparkles, Shirt, Calendar, Crown } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-cream-50 overflow-x-hidden">
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between">
        <span className="font-display text-3xl italic text-ink-800 tracking-wide">DressIA</span>
        <div className="flex gap-3">
          <button onClick={() => navigate('/auth?mode=login')} className="text-sm text-ink-600 px-4 py-2 hover:text-ink-900">Connexion</button>
          <button onClick={() => navigate('/auth?mode=signup')} className="text-sm font-semibold bg-ink-900 text-cream-100 px-5 py-2 rounded-xl hover:bg-ink-700">Commencer</button>
        </div>
      </header>
      <section className="px-6 lg:px-12 pt-16 pb-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cream-200 text-ink-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6"><Sparkles size={12} /> Styliste IA personnel</div>
            <h1 className="font-display text-5xl lg:text-6xl font-light italic text-ink-900 leading-tight mb-6">Ton style.<br style={{}} />Ton dressing.<br style={{}} /><span className="text-cream-500">Ton jour.</span></h1>
            <p className="text-ink-500 text-lg leading-relaxed mb-8 max-w-md">DressIA analyse ton dressing et compose les meilleures tenues avec ce que tu possèdes déjà. Adapté à la météo, à l'occasion, à toi.</p>
            <div className="flex gap-3">
              <button onClick={() => navigate('/auth?mode=signup')} className="flex items-center gap-2 bg-ink-900 text-cream-100 font-semibold px-6 py-3.5 rounded-xl hover:bg-ink-700 text-sm"><Sparkles size={16} /> Commencer gratuitement</button>
              <button onClick={() => navigate('/auth?mode=login')} className="text-sm text-ink-600 border border-cream-300 px-6 py-3.5 rounded-xl hover:border-ink-400">Se connecter</button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg italic text-ink-700">Tenue du jour</span>
                <span className="text-xs bg-cream-100 text-ink-500 px-3 py-1 rounded-full">☀️ 19°C</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['👕', '👖', '👟'].map((emoji, i) => (
                  <div key={i} className="bg-cream-50 rounded-2xl aspect-square flex items-center justify-center text-3xl border border-cream-200">{emoji}</div>
                ))}
              </div>
              <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200">
                <p className="text-xs font-semibold text-ink-700 mb-1">✦ Conseil stylist</p>
                <p className="text-xs text-ink-500 leading-relaxed">Associe un t-shirt blanc à un jean slim et des sneakers blanches pour un look casual chic parfait.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl italic text-center text-ink-800 mb-3">Comment ça marche</h2>
          <p className="text-center text-ink-400 text-sm mb-12">Simple, rapide, intelligent.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shirt, title: 'Photographie ton dressing', desc: 'Prends en photo chaque vêtement. L\'IA identifie automatiquement la couleur, le style, et les occasions adaptées.' },
              { icon: Sparkles, title: 'L\'IA compose tes tenues', desc: 'En fonction de la météo, de l\'occasion et de ton style, DressIA crée des looks personnalisés depuis ton dressing.' },
              { icon: Calendar, title: 'Planifie à l\'avance', desc: 'Prépare tes tenues pour la semaine, les événements à venir, les voyages.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Icon size={24} className="text-ink-700" /></div>
                <h3 className="font-semibold text-ink-800 mb-2">{title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <h2 className="font-display text-4xl italic text-center text-ink-800 mb-12">Simple et transparent</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-cream-200 p-8">
            <h3 className="font-semibold text-ink-800 text-lg mb-1">Gratuit</h3>
            <p className="text-4xl font-display font-light text-ink-900 mb-1">0 CHF</p>
            <ul className="space-y-3 text-sm text-ink-600 mb-8">{['Analyse par photo', 'Suggestions IA', 'Météo', 'Sans sauvegarde'].map(f => <li key={f} className="flex items-center gap-2"><span className="text-cream-400">✓</span>{f}</li>)}</ul>
            <button onClick={() => navigate('/auth?mode=signup')} className="w-full border border-ink-200 text-ink-700 py-3 rounded-xl text-sm font-medium hover:border-ink-400">Commencer gratuitement</button>
          </div>
          <div className="bg-ink-900 rounded-3xl p-8 text-cream-100 relative overflow-hidden">
            <div className="absolute top-4 right-4"><Crown size={20} className="text-cream-400" /></div>
            <h3 className="font-semibold text-cream-200 text-lg mb-1">Premium</h3>
            <p className="text-4xl font-display font-light mb-1">9.90 CHF</p>
            <ul className="space-y-3 text-sm text-cream-300 mb-8">{['Tout le gratuit', 'Dressing sauvegardé', 'Historique des tenues', 'Calendrier', 'Favoris', 'Statistiques'].map(f => <li key={f} className="flex items-center gap-2"><span className="text-cream-400">✦</span>{f}</li>)}</ul>
            <button onClick={() => navigate('/auth?mode=signup')} className="w50 bg-cream-200 text-ink-900 py-3 rounded-xl text-sm font-semibold hover:bg-cream-100">Essayer Premium</button>
          </div>
        </div>
      </section>
      <footer className="border-t border-cream-200 py-8 px-6 text-center">
        <span className="font-display text-xl italic text-ink-400">DressIA</span>
        <p className="text-xs text-ink-300 mt-2">© 2025 DressIA. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
