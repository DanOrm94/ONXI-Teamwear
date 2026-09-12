import { useMemo, useState } from 'react'
import { products, type Product } from './products'

type CartItem = Product & { size: string; quantity: number }

const money = (value: number) => `£${value.toFixed(2)}`
const splineSceneUrl = 'https://my.spline.design/reactiveorb-M9WZmx1K8a10YWiXpdpxisQE/'

function ProductVisual({ product }: { product: Product }) {
  return (
    <div className={`product-visual ${product.imageClass}`} aria-label={product.name}>
      {product.category === 'Kits' ? (
        <div className="jersey"><span className="jersey-collar" /><span className="jersey-sleeve left" /><span className="jersey-sleeve right" /><span className="jersey-mark">ONXI</span><span className="jersey-number">10</span></div>
      ) : (
        <div className="sock-pair"><span /><span /></div>
      )}
      <div className="visual-shadow" />
    </div>
  )
}

export default function App() {
  const [category, setCategory] = useState<'All' | 'Kits' | 'Grip Socks'>('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [size, setSize] = useState('M')
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => category === 'All' ? products : products.filter((p) => p.category === category), [category])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function addToCart(product: Product, selectedSize = size) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.size === selectedSize)
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, size: selectedSize, quantity: 1 }]
    })
    setSelected(null)
    setCartOpen(true)
    setNotice(`${product.name} added to your bag`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  function updateQuantity(id: string, itemSize: string, delta: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== id || item.size !== itemSize) return [item]
      const quantity = item.quantity + delta
      return quantity > 0 ? [{ ...item, quantity }] : []
    }))
  }

  return (
    <div className="site-shell">
      <div className="announcement">FREE UK SHIPPING ON ORDERS OVER £75 <span>·</span> BUILT FOR THE GAME</div>
      <header className="nav">
        <a className="brand" href="#top" aria-label="ONXI home">ONXI<span>.</span></a>
        <nav className="desktop-nav">
          <button onClick={() => { setCategory('All'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Shop all</button>
          <button onClick={() => { setCategory('Kits'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Kits</button>
          <button onClick={() => { setCategory('Grip Socks'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Grip socks</button>
          <a href="#story">Our story</a>
        </nav>
        <button className="bag-button" onClick={() => setCartOpen(true)}>Bag <span>{cartCount}</span></button>
      </header>

      <main id="top">
        <section className="hero" style={{ background: '#050505', color: '#fff' }}>
          <div className="hero-copy">
            <p className="eyebrow" style={{ color: '#8f8f96' }}>01 / PERFORMANCE TEAMWEAR</p>
            <h1>BUILT<br /><em>FOR THE</em><br />GAME.</h1>
            <p className="hero-text" style={{ color: '#8f8f96' }}>Football essentials engineered for movement, confidence and the 90 minutes that matter.</p>
            <button className="primary-button" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>Shop the collection <span>↗</span></button>
          </div>
          <div className="hero-art spline-hero" aria-label="Interactive ONXI 3D orb" style={{ background: '#050505', borderRadius: 0, boxShadow: 'none' }}>
            <iframe
              className="spline-frame"
              src={splineSceneUrl}
              title="ONXI interactive 3D orb"
              loading="eager"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              style={{ transform: 'scale(1.18)', transformOrigin: 'center right' }}
            />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
              <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '56%', background: '#050505' }} />
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: 210, height: 82, background: '#050505' }} />
            </div>
          </div>
        </section>

        <section className="ticker"><div>PERFORMANCE <span>✦</span> PRECISION <span>✦</span> ATTITUDE <span>✦</span> PERFORMANCE <span>✦</span> PRECISION <span>✦</span> ATTITUDE <span>✦</span></div></section>

        <section className="shop-section" id="shop">
          <div className="section-heading"><div><p className="eyebrow">02 / THE COLLECTION</p><h2>SHOP <em>ONXI</em></h2></div><div className="filters">{(['All', 'Kits', 'Grip Socks'] as const).map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
          <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><button className="product-hit" onClick={() => { setSelected(product); setSize(product.sizes[0]) }}><div className="badge-row">{product.badge && <span className="badge">{product.badge}</span>}<span>{product.category}</span></div><ProductVisual product={product} /><div className="product-info"><div><h3>{product.name}</h3><p>{product.colour}</p></div><strong>{money(product.price)}</strong></div></button><button className="quick-add" onClick={() => addToCart(product, product.sizes[0])}>Quick add <span>+</span></button></article>)}</div>
        </section>

        <section className="feature" id="story"><div className="feature-art"><div className="feature-socks"><span /><span /></div><span className="feature-label">GRIP / 01</span></div><div className="feature-copy"><p className="eyebrow">03 / LOCKED IN</p><h2>FEEL THE<br /><em>DIFFERENCE.</em></h2><p>Our grip socks are built around one idea: keep your foot exactly where you put it. Targeted silicone grip zones help reduce movement inside the boot, so you can focus on the next touch.</p><div className="spec-list"><div><strong>01</strong><span>High-friction grip zones</span></div><div><strong>02</strong><span>Breathable performance knit</span></div><div><strong>03</strong><span>Arch support fit</span></div></div><button className="text-button" onClick={() => { setCategory('Grip Socks'); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Shop grip socks <span>↗</span></button></div></section>
        <section className="manifesto"><p className="eyebrow">04 / THE ONXI STANDARD</p><h2>NO DISTRACTIONS.<br /><em>JUST FOOTBALL.</em></h2><div className="manifesto-bottom"><p>Designed for players who care about every detail. ONXI is a new generation of football essentials — stripped back, considered and ready for match day.</p><span>EST. 2026 / UK</span></div></section>
        <section className="newsletter"><div><p className="eyebrow">05 / STAY IN THE LOOP</p><h2>GET THE<br /><em>DROP.</em></h2></div><form onSubmit={(e) => { e.preventDefault(); setNotice('You’re on the list — welcome to ONXI') }}><input type="email" placeholder="Your email address" required /><button type="submit">Join <span>↗</span></button></form></section>
      </main>

      <footer><div className="footer-brand">ONXI<span>.</span></div><div className="footer-links"><a href="#shop">Shop</a><a href="#story">About</a><a href="#top">Contact</a><a href="#top">Shipping & returns</a></div><p>© 2026 ONXI Teamwear. All rights reserved.</p></footer>
      {notice && <div className="toast">{notice}</div>}
      {selected && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null) }}><div className="product-modal"><button className="close" onClick={() => setSelected(null)}>×</button><ProductVisual product={selected} /><div className="modal-details"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><div className="modal-price">{money(selected.price)}</div><p>{selected.description}</p><label>Size</label><div className="sizes">{selected.sizes.map((item) => <button className={size === item ? 'selected' : ''} key={item} onClick={() => setSize(item)}>{item}</button>)}</div><button className="primary-button full" onClick={() => addToCart(selected, size)}>Add to bag <span>↗</span></button></div></div></div>}
      {cartOpen && <div className="cart-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setCartOpen(false) }}><aside className="cart"><div className="cart-head"><div><p className="eyebrow">YOUR BAG</p><h2>{cartCount} ITEM{cartCount === 1 ? '' : 'S'}</h2></div><button className="close" onClick={() => setCartOpen(false)}>×</button></div>{cart.length === 0 ? <div className="empty"><p>Your bag is empty.</p><button className="text-button" onClick={() => setCartOpen(false)}>Continue shopping <span>↗</span></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={`${item.id}-${item.size}`}><ProductVisual product={item} /><div><h3>{item.name}</h3><p>Size {item.size}</p><strong>{money(item.price * item.quantity)}</strong><div className="qty"><button onClick={() => updateQuantity(item.id, item.size, -1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.size, 1)}>+</button></div></div></div>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Shipping calculated at checkout.</small><button className="primary-button full" onClick={() => setNotice('Checkout is ready to connect to Stripe')}>Checkout <span>↗</span></button></div></>}</aside></div>}
    </div>
  )
}
