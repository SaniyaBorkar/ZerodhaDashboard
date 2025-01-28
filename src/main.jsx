
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import { AuthProvider } from './components/context/AuthContext';
import { SummaryProvider } from './components/SummaryContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <SummaryProvider>
      <App />
      </SummaryProvider>
    </AuthProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
