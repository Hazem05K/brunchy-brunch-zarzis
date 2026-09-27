export interface Branch {
  id: string
  name: string
  slug: string
  address?: string
  phone?: string
  openingHours?: string
  description?: string
  latitude?: number
  longitude?: number
  image?: string
  gallery?: string[]
}

// Replace each clearly marked placeholder with client-verified branch information.
export const branches: Branch[] = [
  {
    id: 'branch-1',
    name: 'Classic',
    slug: 'classic',
    description: 'L’esprit brunch dans une version simple et généreuse, pour savourer les classiques à votre rythme.',
    image: '/images/branch-food-1.jpg',
    gallery: [
      '/images/brunch-gallery-5.jpg',
      '/images/vip-gallery.jpg',
      '/images/brunch-gallery-1.jpg',
    ],
  },
  {
    id: 'branch-2',
    name: 'VIP',
    slug: 'vip',
    description: 'Une ambiance brunch plus raffinée, imaginée pour prendre le temps de se faire plaisir.',
    image: '/images/branch-food-2.jpg',
    gallery: [
      '/images/brunch-gallery-2.jpg',
      '/images/brunch-gallery-7.jpg',
      '/images/brunch-gallery-6.jpg',
    ],
  },
  {
    id: 'branch-3',
    name: 'Royal',
    slug: 'royal',
    description: 'Une invitation aux grandes envies de brunch, avec une touche élégante et généreuse.',
    image: '/images/branch-food-3.jpg',
    gallery: [
      '/images/brunch-gallery-8.jpg',
      '/images/shared-gallery-1.jpg',
      '/images/shared-gallery-2.jpg',
    ],
  },
  {
    id: 'branch-4',
    name: 'Family',
    slug: 'family',
    description: 'Un esprit convivial autour du brunch, pensé pour les moments gourmands à partager.',
    image: '/images/branch-food-4.jpg',
    gallery: [
      '/images/family-gallery.jpg',
      '/images/branch-food-1.jpg',
      '/images/brunch-illustrative.jpg',
    ],
  },
]

export function findBranchBySlug(slug: string) {
  return branches.find(branch => branch.slug === slug)
}

export function findBranchById(id: string) {
  return branches.find(branch => branch.id === id)
}
