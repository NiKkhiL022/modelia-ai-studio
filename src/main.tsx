import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReadmePage from './routes/ReadmePage'
import ArchitecturePage from './routes/ArchitecturePage'
import AboutPage from './routes/AboutPage'

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/readme" element={<ReadmePage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  )
} else {
  console.error('Root container #root not found')
}
