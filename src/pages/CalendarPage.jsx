import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useWardrobe } from '../context/WardrobeContext'
import { generateOutfits } from '../lib/ai'
import { ChevronLeft, ChevronRight, Plus, Lock, Sparkles } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'

const OCCASIONS = ['Casual', 'Travail', 'SoirÃ©e', 'Sport', 'Week-end']

export default function CalendarPage() {
  const { isPremium } = useAuth()
  const { wardrobe, addCalendarEvent, getCalendarEvents } = useWardrobe()
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState({ titre: '', occasion: 'Casual', note: '' })
  const [generatingFor, setGeneratingFor] = useState(null)
  const [suggestedOutfit, setSuggestedOutfit] = useState(null)
  const days = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) })
  const firstDayOfWeek = (startOfMonth(currentDate).getDay() + 6) % 7
  useEffect(() => {
    if (isPremium) getCalendarEvents(currentDate.getMonth() + 1, currentDate.getFullYear()).then(setEvents)
  }, [currentDate, isPremium])
  function getEventsForDay(day) { return events.filter(e => isSameDay(new Date(e.date), day)) }
  async function handleAddEvent() {
    if (!newEvent.titre) return
    const event = await addCalendarEvent({ ...newEvent, date: format(selectedDay, 'yyyy-MM-dd') })
    setEvents(prev => [...prev, event])
    setShowModal(false)
    setNewEvent({ titre: '', occasion: 'Casual', note: '' })
  }
  async function generateForEvent(event) {
    if (wardrobe.length < 2) return
    setGeneratingFor(event.id)
    try {
      const results = await generateOutfits({ wardrobe, occasion: event.occasion, saison: 'Printemps', count: 1 })
      setSuggestedOutfit({ outfit: results[0], eventId: event.id })
    } catch (e) { console.error(e) }
    setGeneratingFor(null)
  }
  if (!isPremium) return (
    <div className="p-6"><h1>Calendrier</h1>
      <div className="bg-white border border-cream-200 rounded-3xl p-12 text-center mt-6">
        <Lock size={40} className="mx-auto mb-4 text-cream-400" />
        <h2 className="font-display text-2xl italic mb-2">FonctionnalitÃ© Premium</h2>
        <button onClick={() => navigate('/app/premium')} className="bg-ink-900 text-cream-100 font-semibold px-6 py-3 rounded-xl text-sm">Passer Premium - 9.90 CHF/mois</button>
      </div>
    </div>
  )
  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto animate-fadeIn">
      <h1 className="font-display text-4xl italic text-ink-800 mb-6">Calendrier</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-cream-200 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentDate(d => subMonths(d, 1))} className="p-2 hover:bg-cream-100 rounded-xl"><ChevronLeft size={18} /></button>
            <h2 className="font-display text-xl italic text-ink-800 capitalize">{format(currentDate, 'MMMM yyyy', { locale: fr })}</h2>
            <button onClick={() => setCurrentDate(d => addMonths(d, 1))} className="p-2 hover:bg-cream-100 rounded-xl"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 mb-2">{['Lu','Ma','Me','Je','Ve','Sa','Di'].map(d => <div key={d} className="text-center text-xs font-medium text-ink-400 py-2">{d}</div>)Ý</div>
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDayOfWeek).fill(null).map((_, i) => <div key={`e-${i}`} />)}
            {days.map(day => {
              const dayEvs = getEventsForDay(day)
              const isSel = selectedDay && isSameDay(day, selectedDay)
              return <button key={day.toISOString()} onClick={() => setSelectedDay(day)} className={`relative aspect-square rounded-xl flex flex-col items-center justify-start pt-1.5 text-sm ${isToday(day) ? 'bg-ink-900 text-cream-100' : isSel ? 'bg-cream-200' : 'hover:bg-cream-100 text-ink-700'}`}>
                <span className="text-xs font-medium">{format(day, 'd')}</span>
                {dayEvs.length > 0 && <div className="flex gap-0.5 mt-0.5">{dayEvs.slice(0,3).map((_,i)=><div key={i} className={`w-1 h-1 rounded-full ${isToday(day) ? 'bg-cream-400' : 'bg-cream-500'}`}/>)}</div>}
              </button>
            })}
          </div>
        </div>
        <div className="bg-white border border-cream-200 rounded-3xl p-5">
          {selectedDay ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink-800 capitalize">{format(selectedDay, 'eeee d MMMM', { locale: fr })}</h3>
                <button onClick={() => setShowModal(true)} className="w8 h-8 bg-ink-900 text-cream-100 rounded-full flex items-center justify-center"><Plus size={14} /></button>
              </div>
              {getEventsForDay(selectedDay).length === 0 ? (
                <p className="text-ink-400 text-sm text-center py-8">Aucun Ã©vÃ©nement.</p>
              ) : (
                <div className="space-y-3">
                  {getEventsForDay(selectedDay).map(event => (
                    <div key={event.id} className="bg-cream-50 rounded-2xl p-4 border border-cream-100">
                      <p className="font-medium text-ink-800 text-sm">{event.titre}</p>
                      <span className="text-xs bg-cream-200 text-ink-600 px-2 py-0.5 rounded-full">{event.occasion}</span>
                      {event.note && <p className="text-xs text-ink-500 mt-1">{event.note}</p>}
                      <button onClick={() => generateForEvent(event)} disabled={generatingFor === event.id} className="mt-3 flex items-center gap-1.5 text-xs text-ink-600 font-medium">
                        {generatingFor === event.id ? <span className="w-3 h-3 border border-ink-400 border-t-transparent rounded-full animate-spin-slow" /> : <Sparkles size={11} />}
                        Quelle tenue ?
                      </button>
                      {suggestedOutfit?.eventId === event.id && (
                        <div className="mt-3 bg-white rounded-xl p-3 border border-cream-200">
                          <p className="text-xs font-semibold text-ink-700">{suggestedOutfit.outfit.nom}</p>
                          <p className="text-xs text-ink-400 mt-1">{suggestedOutfit.outfit.conseil}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : <div className="text-center py-12 text-ink-300"><p className="text-sm">SÃ©lectionne un jour</p></div>}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display text-xl italic text-ink-800 mb-5">Nouvel Ã©vÃ©nement</h3>
            <div className="space-y-4">
              <input type="text" value={newEvent.titre} onChange={e => setNewEvent(p => ({...p, titre: e.target.value}))} placeholder="Titre" className="w50 border border-cream-300 rounded-xl px-4 py-2.5 text-sm" />
              <div className="flex flex-wrap gap-2">{OCCASIONS.map(o => <button key={o} onClick={() => setNewEvent(p => ({...p, occasion: o}))} className={`px-3 py-1 rounded-full text-xs border ${newEvent.occasion === o ? 'bg-ink-900 text-cream-100' : 'border-cream-200 text-ink-500'}`}>{o}</button>)}</div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddEvent} className="flex-1 bg-ink-900 text-cream-100 font-semibold py-3 rounded-xl text-sm">Ajouter</button>
              <button onClick={() => setShowModal(false)} className="px-4 bg-cream-100 text-ink-600 rounded-xl text-sm">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
