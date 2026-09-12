import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ClubShop from './ClubShop'
import NotFound from './NotFound'
import { clubs } from './clubs'
import './styles.css'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const club = clubs[pathname.slice(1).toLowerCase()]
const knownPaths = new Set(['/', '/shop', '/story'])

const root = document.getElementById('root')
if (!root) throw new Error('ONXI root element was not found')

createRoot(root).render(
  <StrictMode>
    {club ? <ClubShop club={club} /> : knownPaths.has(pathname) ? <App /> : <NotFound />}
  </StrictMode>,
)
