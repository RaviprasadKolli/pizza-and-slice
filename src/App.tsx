
import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react'
import './App.css'

type Pizza = {
  id: number
  name: string
  description: string
  price: number
  tag: string
  image: string
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: 'Pepperoni Royale',
    description: 'Pepperoni, mozzarella, rich tomato sauce and herbs.',
    price: 14,
    tag: 'THE CLASSIC',
    image:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 2,
    name: 'Garden Society',
    description: 'Roasted peppers, mushrooms, olives and mozzarella.',
    price: 13,
    tag: 'VEGETARIAN',
    image:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 3,
    name: 'The Meat Affair',
    description: 'A generous mix of savoury meats and melted cheese.',
    price: 16,
    tag: 'HOUSE FAVOURITE',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85',
  },
]

function App() {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  )

  const cartTotal = pizzas.reduce(
    (total, pizza) => total + pizza.price * (cart[pizza.id] ?? 0),
    0,
  )

  function changeQuantity(id: number, change: number) {
    setCart((current) => {
      const nextQuantity = (current[id] ?? 0) + change
      const next = { ...current }

      if (nextQuantity <= 0) {
        delete next[id]
      } else {
        next[id] = nextQuantity
      }

      return next
    })
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>GOOD FOOD. GOOD MOOD. GREAT PIZZA.</span>
        <span className="announcement-right">
          MADE FRESH, MADE WITH LOVE <span aria-hidden="true">✳</span>
        </span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Pizza and Slice home">
          <span className="wordmark-main">PIZZA<span>&</span>SLICE</span>
          <span className="wordmark-sub">A LITTLE SLICE OF SOMETHING SPECIAL</span>
        </a>

        <button
          className="icon-button mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <MenuIcon />}
        </button>

        <nav className={mobileMenuOpen ? 'main-nav nav-open' : 'main-nav'}>
          <a href="#menu" onClick={closeMobileMenu}>THE MENU</a>
          <a href="#story" onClick={closeMobileMenu}>OUR STORY</a>
          <a href="#visit" onClick={closeMobileMenu}>FIND US</a>
          <button
            className="cart-button"
            onClick={() => {
              setCartOpen(true)
              closeMobileMenu()
            }}
          >
            <ShoppingBag size={17} strokeWidth={1.8} />
            <span>YOUR ORDER</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" role="img" aria-label="Freshly baked artisan pizza" />
          <div className="hero-shade" />

          <div className="hero-content">
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              YOUR NEW FAVOURITE SLICE
            </div>

            <h1>
              A SLICE
              <br />
              ABOVE
              <br />
              <span>THE REST.</span>
            </h1>

            <p className="hero-description">
              Big flavours. Golden crusts. Good times.
              <br />
              Life is simply better with pizza.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#menu">
                EXPLORE THE MENU <ArrowRight size={17} />
              </a>
              <a className="text-link" href="#story">
                OUR LITTLE STORY <ArrowDownRight size={17} />
              </a>
            </div>
          </div>

          <div className="hero-side-note">
            <span>MADE FOR THE LOVE OF PIZZA</span>
            <span className="side-note-dot">✳</span>
          </div>

          <div className="hero-bottom">
            <span>FRESHLY MADE. ALWAYS CRAVE-WORTHY.</span>
            <a href="#menu">SCROLL TO DISCOVER ↓</a>
          </div>
        </section>

        <div className="ticker" aria-label="Our philosophy">
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, index) => (
              <span className="ticker-item" key={index}>
                GOOD DOUGH <span>✳</span> GREAT TOPPINGS <span>✳</span> NO BORING BITES <span>✳</span>
              </span>
            ))}
          </div>
        </div>

        <section className="menu-section section-padding" id="menu">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                A FEW OF OUR FAVOURITES
              </div>
              <h2>
                THE ART OF
                <br />
                <span>A GOOD SLICE.</span>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Made for the hungry, the curious and the one-more-slice people.
                Find your favourite below.
              </p>
              <span className="handwritten-note">Go on, treat yourself.</span>
            </div>
          </div>

          <div className="pizza-grid">
            {pizzas.map((pizza, index) => (
              <article className="pizza-card" key={pizza.id}>
                <div className="pizza-image-wrap">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-image"
                    loading="lazy"
                  />
                  <span className="pizza-tag">{pizza.tag}</span>
                  <span className="pizza-index">0{index + 1}</span>
                  <button
                    className="quick-add"
                    onClick={() => changeQuantity(pizza.id, 1)}
                    aria-label={`Add ${pizza.name} to your order`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="pizza-card-info">
                  <div>
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                  </div>
                  <span className="pizza-price">£{pizza.price.toFixed(2)}</span>
                </div>

                <button
                  className="add-to-order"
                  onClick={() => changeQuantity(pizza.id, 1)}
                >
                  ADD TO ORDER <ArrowUpRight size={16} />
                </button>
              </article>
            ))}
          </div>

          <div className="menu-bottom">
            <p>THESE ARE JUST THE BEGINNING.</p>
            <span>MORE GOODNESS COMING SOON.</span>
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
              alt="Pizza prepared fresh with carefully chosen ingredients"
              loading="lazy"
            />
            <span className="story-image-label">A LITTLE LOVE IN EVERY BITE ✳</span>
          </div>

          <div className="story-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              MORE THAN JUST PIZZA
            </div>
            <h2>
              GOOD FOOD.
              <br />
              <span>BETTER</span>
              <br />
              MEMORIES.
            </h2>
            <p>
              The best moments are often the simplest: a table full of your
              favourite people, a hot pizza in the middle and absolutely no
              reason to rush.
            </p>
            <p>
              That's the spirit behind PIZZA & SLICE. Great food, welcoming
              vibes and one more slice whenever you fancy it.
            </p>
            <a className="button button-dark" href="#visit">
              COME SAY HELLO <ArrowRight size={17} />
            </a>
            <span className="story-stamp">MADE WITH<br />A LITTLE EXTRA LOVE</span>
          </div>
        </section>

        <section className="visit-section section-padding" id="visit">
          <div className="visit-top">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR NEXT PIZZA STOP
            </div>
            <span className="visit-star">✳</span>
          </div>

          <h2>
            LET'S MAKE
            <br />
            <span>TONIGHT</span> DELICIOUS.
          </h2>

          <p className="visit-description">
            Good pizza is better shared. Bring your appetite and your favourite
            people.
          </p>

          <div className="visit-details">
            <div className="visit-detail">
              <MapPin size={20} />
              <div>
                <span className="detail-label">COME FIND US</span>
                <p>2 Hopefield Road, Leicester</p>
                <span className="detail-note">LE3 2BJ · United Kingdom</span>
              </div>
            </div>

            <div className="visit-detail">
              <Clock3 size={20} />
              <div>
                <span className="detail-label">A LITTLE HEADS-UP</span>
                <p>Check opening times before visiting.</p>
                <span className="detail-note">Hours to be confirmed with the owner</span>
              </div>
            </div>
          </div>

          <a
            className="button button-primary visit-button"
            href="https://www.google.com/maps/search/?api=1&query=2+Hopefield+Road+Leicester+LE3+2BJ"
            target="_blank"
            rel="noreferrer"
          >
            GET DIRECTIONS <ArrowUpRight size={17} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark footer-wordmark" href="#home">
            <span className="wordmark-main">PIZZA<span>&</span>SLICE</span>
            <span className="wordmark-sub">A LITTLE SLICE OF SOMETHING SPECIAL</span>
          </a>
          <p>GOOD PIZZA. GOOD PEOPLE. GOOD TIMES.</p>
          <a
            className="social-link"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <span className="instagram-text">ig</span>
          </a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PIZZA & SLICE · PORTFOLIO DEMO</span>
          <a href="#home">BACK TO THE TOP ↑</a>
        </div>
        <p className="demo-notice">
          Independent portfolio concept. Demo menu and prices are illustrative.
          Not an official ordering service.
        </p>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <span className="eyebrow">SOMETHING DELICIOUS</span>
                <h2>YOUR ORDER<span>.</span></h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close your order"
              >
                <X />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={36} strokeWidth={1.3} />
                <h3>A little empty in here.</h3>
                <p>Your next favourite slice is waiting.</p>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setCartOpen(false)
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  EXPLORE THE MENU <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {pizzas.filter((pizza) => cart[pizza.id]).map((pizza) => (
                    <div className="cart-item" key={pizza.id}>
                      <img src={pizza.image} alt="" />
                      <div className="cart-item-info">
                        <h3>{pizza.name}</h3>
                        <span>£{pizza.price.toFixed(2)} each</span>
                        <div className="quantity-control">
                          <button
                            aria-label={`Remove one ${pizza.name}`}
                            onClick={() => changeQuantity(pizza.id, -1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span>{cart[pizza.id]}</span>
                          <button
                            aria-label={`Add one ${pizza.name}`}
                            onClick={() => changeQuantity(pizza.id, 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <strong>£{(pizza.price * cart[pizza.id]).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>SUBTOTAL</span>
                    <strong>£{cartTotal.toFixed(2)}</strong>
                  </div>
                  <p>Demo only. Checkout and payments are not enabled.</p>
                  <button
                    className="button button-primary checkout-button"
                    onClick={() => setCartOpen(false)}
                  >
                    CONTINUE EXPLORING <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
