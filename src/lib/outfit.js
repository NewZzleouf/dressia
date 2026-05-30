import { groupOf } from './constants'

function pickRandom(arr) {
  if (!arr.length) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

const STYLES = ['Casual', 'Smart Casual', 'Minimal', 'Street', 'Weekend', 'Office']

// Mock "AI" outfit generator (Feature 4). Randomly combines wardrobe items
// into a coherent outfit with a fake score, style and weather.
export function generateOutfit(items) {
  const tops = items.filter((i) => groupOf(i.category) === 'Tops')
  const bottoms = items.filter((i) => groupOf(i.category) === 'Pants')
  const shoes = items.filter((i) => groupOf(i.category) === 'Shoes')
  const jackets = items.filter((i) => groupOf(i.category) === 'Jackets')

  if (!tops.length || !bottoms.length || !shoes.length) {
    return { error: 'Add at least one top, one pair of pants and a pair of shoes to generate outfits.' }
  }

  const top = pickRandom(tops)
  const bottom = pickRandom(bottoms)
  const shoe = pickRandom(shoes)
  // Jacket is optional — include roughly 60% of the time when available.
  const jacket = jackets.length && Math.random() > 0.4 ? pickRandom(jackets) : null

  return {
    id: `outfit-${Date.now()}`,
    top,
    bottom,
    shoes: shoe,
    jacket,
    score: 84 + Math.floor(Math.random() * 14), // 84 - 97
    style: pickRandom(STYLES),
    weather: 14 + Math.floor(Math.random() * 12), // 14 - 25 °C
  }
}
