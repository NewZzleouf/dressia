import { useState, useRef, useEffect } from 'react'
import { useWardrobe } from '../context/WardrobeContext'
import { CATEGORIES, COLORS, SEASONS } from '../lib/constants'
import { X, ImagePlus } from 'lucide-react'

const EMPTY = { name: '', category: 'T-Shirt', color: 'Black', season: 'All Season', image: '' }

export default function UploadModal() {
  const { modalOpen, editingItem, closeModal, addItem, updateItem } = useWardrobe()
  const fileRef = useRef(null)
  const [form, setForm] = useState(EMPTY)

  const isEditing = Boolean(editingItem)

  // Sync form when the modal opens for add vs edit.
  useEffect(() => {
    if (modalOpen) setForm(editingItem ? { ...editingItem } : EMPTY)
  }, [modalOpen, editingItem])

  if (!modalOpen) return null

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm((f) => ({ ...f, image: url, name: f.name || file.name.replace(/\.[^.]+$/, '') }))
  }

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (isEditing) updateItem(editingItem.id, form)
    else addItem(form)
    closeModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/40 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3 className="font-display text-2xl italic text-ink-800">
            {isEditing ? 'Edit Item' : 'Add Clothing Item'}
          </h3>
          <button
            onClick={closeModal}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-cream-100 text-ink-500 flex items-center justify-center hover:bg-cream-200"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* Photo upload + preview */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50 overflow-hidden flex items-center justify-center mb-5 hover:border-cream-400 transition-colors"
          >
            {form.image ? (
              <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2 text-ink-400">
                <ImagePlus size={28} />
                <span className="text-sm font-medium">Upload Photo</span>
              </span>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

          <Field label="Clothing Name">
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. White Cotton Tee"
              className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-ink-400"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <Select value={form.category} onChange={(v) => set('category', v)} options={CATEGORIES} />
            </Field>
            <Field label="Color">
              <Select value={form.color} onChange={(v) => set('color', v)} options={COLORS} />
            </Field>
          </div>

          <Field label="Season">
            <Select value={form.season} onChange={(v) => set('season', v)} options={SEASONS} />
          </Field>

          <button
            type="submit"
            className="w-full bg-ink-900 text-cream-100 font-semibold py-3 rounded-xl text-sm hover:bg-ink-700 transition-colors mt-2"
          >
            {isEditing ? 'Save Changes' : 'Add to Wardrobe'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider block mb-1.5">
        {label}
      </span>
      {children}
    </label>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-cream-50 border border-cream-200 rounded-xl px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-ink-400 appearance-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}
