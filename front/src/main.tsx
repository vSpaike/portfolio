import { Route, Routes, BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import './main.css'

import Home from './pages/Home.tsx'
import Projects from './pages/Project.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
)
