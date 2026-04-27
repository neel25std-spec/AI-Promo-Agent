import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContentPreview from './ContentPreview.jsx'
import LiveDashboard from './LiveDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/preview" element={<ContentPreview />} />
        <Route path="/dashboard" element={<LiveDashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
