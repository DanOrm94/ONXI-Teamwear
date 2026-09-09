import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ClubShop from './ClubShop'
import { clubs } from './clubs'
import './styles.css'
import './hero.css'

const slug = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
const club = clubs[slug]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {club ? <ClubShop club={club} /> : <App />}
  </StrictMode>,
)
