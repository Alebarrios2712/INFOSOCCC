import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { supabaseConfigurado } from './lib/supabaseClient'

const estiloAviso = {
  padding: '12px 20px',
  background: '#B74632',
  color: '#FFFFFF',
  textAlign: 'center',
  fontWeight: 700
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {!supabaseConfigurado && (
      <p role="alert" style={estiloAviso}>
        El diario y el perfil no están disponibles: falta configurar la
        conexión con la base de datos.
      </p>
    )}

    <App />
  </StrictMode>,
)
