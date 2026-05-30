import { createContext, useContext, useState } from 'react'
import { DEMO_WARDROBE } from '../lib/mockData'
import { groupOf } from '../lib/constants'

const WardrobeContext = createContext(null)

export function WardrobeProvider({ children }) {
  const [items, setItems] = useState(DEMO_WARDROBE)

  // Shared upload/edit modal state so it can be triggered from the floating
  // action button (Layout) as well as the wardrobe page.
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  function openAddModal() {
    setEditingItem(null)
    setModalOpen(true)
  }

  function openEditModal(item) {
    setEditingItem(item)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingItem(null)
  }

  function addItem(item) {
    const newItem = { ...item, id: `item-${Date.now()}` }
    setItems((prev) => [newItem, ...prev])
    return newItem
  }

  function updateItem(id, patch) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  function itemsByGroup(group) {
    return items.filter((it) => groupOf(it.category) === group)
  }

  return (
    <WardrobeContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        itemsByGroup,
        modalOpen,
        editingItem,
        openAddModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  )
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext)
  if (!ctx) throw new Error('useWardrobe must be used within WardrobeProvider')
  return ctx
}
