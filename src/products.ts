export type Product = {
  id: string
  name: string
  category: 'Kits' | 'Grip Socks'
  price: number
  badge?: string
  colour: string
  description: string
  sizes: string[]
  imageClass: string
}

export const products: Product[] = [
  {
    id: 'onxi-home-black',
    name: 'Home Kit — Black',
    category: 'Kits',
    price: 49.99,
    badge: 'New',
    colour: 'Black / Volt',
    description: 'A clean, match-ready silhouette with lightweight performance fabric and a sharp ONXI finish.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imageClass: 'kit-black',
  },
  {
    id: 'onxi-away-white',
    name: 'Away Kit — White',
    category: 'Kits',
    price: 49.99,
    badge: 'Core',
    colour: 'White / Black',
    description: 'Minimal, fast and made to stand out. Built for training sessions and match day.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imageClass: 'kit-white',
  },
  {
    id: 'onxi-training-black',
    name: 'Training Top — Black',
    category: 'Kits',
    price: 39.99,
    colour: 'Black / Volt',
    description: 'A lightweight training layer designed for movement, repeat sessions and everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    imageClass: 'training-black',
  },
  {
    id: 'onxi-grip-black',
    name: 'Grip Socks — Black',
    category: 'Grip Socks',
    price: 14.99,
    badge: 'Best Seller',
    colour: 'Black',
    description: 'High-friction grip zones give your foot a locked-in feel inside the boot.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'socks-black',
  },
  {
    id: 'onxi-grip-white',
    name: 'Grip Socks — White',
    category: 'Grip Socks',
    price: 14.99,
    colour: 'White',
    description: 'The same locked-in performance in a clean white finish.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'socks-white',
  },
  {
    id: 'onxi-grip-volt',
    name: 'Grip Socks — Volt',
    category: 'Grip Socks',
    price: 16.99,
    badge: 'Limited',
    colour: 'Volt',
    description: 'Stand out on the pitch with our limited volt colourway and signature grip sole.',
    sizes: ['S', 'M', 'L'],
    imageClass: 'socks-volt',
  },
]
