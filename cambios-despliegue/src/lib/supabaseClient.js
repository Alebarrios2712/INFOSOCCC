import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Indica si la conexión con Supabase está configurada
export const supabaseConfigurado = Boolean(
  supabaseUrl && supabasePublishableKey
)

if (!supabaseConfigurado) {
  console.error(
    'Falta configurar VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY. ' +
      'Revisa el archivo .env (local) o las variables de entorno del hosting.'
  )
}

// Si faltan las variables, se usan valores de reemplazo para que la página
// cargue igual y las consultas fallen con un mensaje, en vez de una pantalla en blanco.
export const supabase = createClient(
  supabaseUrl || 'https://sin-configurar.supabase.co',
  supabasePublishableKey || 'sin-configurar'
)
