// Fine-grained categories used in the upload form (Feature 3)
export const CATEGORIES = [
  'T-Shirt',
  'Shirt',
  'Hoodie',
  'Sweater',
  'Jacket',
  'Jeans',
  'Pants',
  'Shorts',
  'Sneakers',
  'Boots',
  'Accessories',
]

// Maps a fine category to a high-level group used for the wardrobe filters
// and the outfit generator slots (Feature 2 + Feature 4).
export const CATEGORY_GROUP = {
  'T-Shirt': 'Tops',
  Shirt: 'Tops',
  Hoodie: 'Tops',
  Sweater: 'Tops',
  Jacket: 'Jackets',
  Jeans: 'Pants',
  Pants: 'Pants',
  Shorts: 'Pants',
  Sneakers: 'Shoes',
  Boots: 'Shoes',
  Accessories: 'Accessories',
}

export const GROUPS = ['Tops', 'Pants', 'Shoes', 'Jackets', 'Accessories']

export const COLORS = [
  'Black',
  'White',
  'Beige',
  'Gray',
  'Navy',
  'Blue',
  'Brown',
  'Olive',
  'Green',
  'Red',
  'Pink',
]

export const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season']

export function groupOf(category) {
  return CATEGORY_GROUP[category] || 'Accessories'
}
