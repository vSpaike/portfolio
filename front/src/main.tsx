import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Home.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
