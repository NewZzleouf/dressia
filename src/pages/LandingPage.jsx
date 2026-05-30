import { useNavigate } from 'react-router-dom'
import { Sparkles, Shirt, Wand2 } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-cream-50 overflow-x-hidden">
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <span className="font-display text-3xl italic text-ink-800 tracking-wide">DressAI</span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-ink-600 px-4 py-2 hover:text-ink-900"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-semibold bg-ink-900 text-cream-100 px-5 py-2 rounded-xl hover:bg-ink-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      <section className="px-6 lg:px-12 pt-12 pb-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cream-200 text-ink-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Sparkles size={12} /> Your personal AI stylist
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-light italic text-ink-900 leading-tight mb-6 text-balance">
              Your wardrobe.
              <br />
              Reimagined.
            </h1>
            <p className="text-ink-500 text-lg leading-relaxed mb-8 max-w-md text-pretty">
              DressAI helps you digitize the clothes you already own and instantly generates outfit
              ideas — no shopping required.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/register')}
                className="flex items-center gap-2 bg-ink-900 text-cream-100 font-semibold px-6 py-3.5 rounded-xl hover:bg-ink-700 text-sm transition-colors"
              >
                <Sparkles size={16} /> Start for free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-ink-600 border border-cream-300 px-6 py-3.5 rounded-xl hover:border-ink-400 transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg italic text-ink-700">Today&apos;s outfit</span>
                <span className="text-xs bg-cream-100 text-ink-500 px-3 py-1 rounded-full">
                  Score 92%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['/wardrobe/white-tshirt.png', '/wardrobe/blue-jeans.png', '/wardrobe/white-sneakers.png'].map(
                  (src) => (
                    <div
                      key={src}
                      className="bg-cream-50 rounded-2xl aspect-square overflow-hidden border border-cream-200"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  )
                )}
              </div>
              <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200">
                <p className="text-xs font-semibold text-ink-700 mb-1">Stylist tip</p>
                <p className="text-xs text-ink-500 leading-relaxed">
                  Pair a clean white tee with slim denim and minimal sneakers for an effortless
                  smart-casual look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl italic text-center text-ink-800 mb-3">How it works</h2>
          <p className="text-center text-ink-400 text-sm mb-12">Simple, fast, intelligent.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shirt,
                title: 'Digitize your closet',
                desc: 'Snap a photo of each item and DressAI stores it with category, color and season.',
              },
              {
                icon: Wand2,
                title: 'Generate outfits',
                desc: 'Mix and match tops, bottoms, shoes and jackets into complete looks in one tap.',
              },
              {
                icon: Sparkles,
                title: 'Wear with confidence',
                desc: 'Every suggestion is built from the clothes you already own — styled for any day.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 bg-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-ink-700">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-ink-800 mb-2">{title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/register')}
              className="bg-ink-900 text-cream-100 font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-ink-700 transition-colors"
            >
              Build your wardrobe
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-cream-200 py-8 px-6 text-center">
        <span className="font-display text-xl italic text-ink-400">DressAI</span>
        <p className="text-xs text-ink-300 mt-2">© 2026 DressAI. All rights reserved.</p>
      </footer>
    </div>
  )
}
