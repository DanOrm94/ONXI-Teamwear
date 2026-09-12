import { useMemo, useState, type CSSProperties } from 'react'
import { clubs, type ClubConfig } from './clubs'
import { products, type Product } from './products'
import './club-shop.css'

type CartLine = { product: Product; size: string; quantity: number }
type ClubShopProps = { club: ClubConfig }
const formatPrice = (price: number) => `£${price.toFixed(2)}`

export default function ClubShop({ club }: ClubShopProps) {
  const clubProducts = useMemo(() => club.productIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[], [club.productIds])
  const [filter, setFilter] = useState<'All' | Product['category']>('All')
  const [cart, setCart] = useState<CartLine[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const visibleProducts = filter === 'All' ? clubProducts : clubProducts.filter((product) => product.category === filter)
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0)
  const cartTotal = cart.reduce((total, line) => total + line.product.price * line.quantity, 0)
  const openProduct = (product: Product) => { setSelectedProduct(product); setSelectedSize(product.sizes[0] ?? '') }
  const addToCart = () => {
    if (!selectedProduct || !selectedSize) return
    setCart((current) => {
      const existing = current.find((line) => line.product.id === selectedProduct.id && line.size === selectedSize)
      return existing ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { product: selectedProduct, size: selectedSize, quantity: 1 }]
    })
    setSelectedProduct(null); setCartOpen(true)
  }
  const changeQuantity = (line: CartLine, delta: number) => setCart((current) => current.map((item) => item === line ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))

  return (
    <div className="club-shop" style={{ '--club-accent': club.accent } as CSSProperties}>
      <header className="club-nav">
        <a className="club-brand" href="/"><span className="club-brand-mark">ONXI</span><span>TEAMWEAR</span></a>
        <div className="club-nav-centre"><span>{club.name}</span><small>{club.strapline}</small></div>
        <button className="club-cart-button" onClick={() => setCartOpen(true)}>BAG <span>{cartCount}</span></button>
      </header>
      <main>
        <nav className="club-breadcrumb" aria-label="Breadcrumb"><a href="/">ONXI</a><span aria-hidden="true">/</span><span>{club.name}</span></nav>
        <section className="club-hero">
          <div className="club-hero-badge">{club.shortName}</div>
          <div><p className="club-eyebrow">{club.strapline}</p><h1>{club.name}</h1><p>Performance teamwear selected for the club. Shop the official ONXI collection below.</p><a className="club-hero-cta" href="#club-products">SHOP THE COLLECTION</a></div>
        </section>
        <section className="club-products" id="club-products">
          <div className="club-section-heading"><div><p className="club-eyebrow">{club.name}</p><h2>CLUB COLLECTION</h2></div><div className="club-filters" role="tablist" aria-label="Product categories">{(['All', 'Kits', 'Grip Socks'] as const).map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div></div>
          <div className="club-product-grid">{visibleProducts.map((product) => <button className="club-product-card" key={product.id} onClick={() => openProduct(product)}><div className={`club-product-visual product-visual ${product.imageClass}`}><span>{product.badge ?? 'ONXI'}</span></div><div className="club-product-meta"><div><h3>{product.name}</h3><p>{product.colour}</p></div><strong>{formatPrice(product.price)}</strong></div></button>)}</div>
        </section>
      </main>
      <footer className="club-footer"><strong>{club.name}</strong><span>Powered by ONXI Teamwear</span><a href="/">Visit ONXI</a></footer>
      {selectedProduct && <div className="club-modal-backdrop" onClick={() => setSelectedProduct(null)}><div className="club-modal" onClick={(event) => event.stopPropagation()}><button className="club-modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close">×</button><div className={`club-modal-visual product-visual ${selectedProduct.imageClass}`} /><div className="club-modal-copy"><p className="club-eyebrow">{club.name}</p><h2>{selectedProduct.name}</h2><p>{selectedProduct.description}</p><strong className="club-modal-price">{formatPrice(selectedProduct.price)}</strong><div className="club-size-row">{selectedProduct.sizes.map((size) => <button className={selectedSize === size ? 'selected' : ''} key={size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div><button className="club-add-button" onClick={addToCart}>ADD TO BAG</button></div></div></div>}
      {cartOpen && <div className="club-modal-backdrop" onClick={() => setCartOpen(false)}><aside className="club-cart-panel" onClick={(event) => event.stopPropagation()}><div className="club-cart-heading"><div><p className="club-eyebrow">{club.shortName}</p><h2>YOUR BAG</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close">×</button></div>{cart.length === 0 ? <p className="club-empty-cart">Your club shop bag is empty.</p> : <><div className="club-cart-lines">{cart.map((line) => <div className="club-cart-line" key={`${line.product.id}-${line.size}`}><div><strong>{line.product.name}</strong><span>Size {line.size}</span></div><div className="club-qty"><button onClick={() => changeQuantity(line, -1)}>−</button><span>{line.quantity}</span><button onClick={() => changeQuantity(line, 1)}>+</button></div><strong>{formatPrice(line.product.price * line.quantity)}</strong></div>)}</div><div className="club-cart-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div><button className="club-add-button" disabled aria-disabled="true">CHECKOUT UNAVAILABLE</button><small className="club-checkout-note">Online checkout is not enabled yet.</small></>}</aside></div>}
    </div>
  )
}

export { clubs }
