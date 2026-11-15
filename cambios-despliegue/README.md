# Huella Segura

Sitio web de acompañamiento para la adopción responsable de perros y gatos:
guías de primeros días, lectura de conductas, alertas de emergencia, test
"¿Estás listo para adoptar?", perfil de la mascota, diario de adaptación y
asistente de consultas.

Hecho con **React + Vite** y **Supabase** (base de datos).

## Ejecutar en tu computador

1. Instala [Node.js](https://nodejs.org) (versión 20 o superior).
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia `.env.example` como `.env` y completa tus datos de Supabase
   (Project Settings > API):
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...
   ```
4. Inicia el proyecto:
   ```bash
   npm run dev
   ```

## Probar la versión de producción

```bash
npm run build
npm run preview
```

## Publicar en internet (Vercel)

1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com), elige **Add New > Project** e importa el repositorio.
3. Vercel detecta Vite solo. Antes de desplegar, en **Environment Variables** agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Pulsa **Deploy**. Si cambias las variables después, haz un **Redeploy**:
   se incorporan al compilar el proyecto.

También funciona igual en Netlify o Cloudflare Pages (comando `npm run build`,
carpeta de salida `dist`).

## Base de datos

Se usan las tablas `mascotas` y `registros`. La estructura de referencia está
en `supabase/schema.sql`.

## Limitaciones conocidas

- La app no tiene inicio de sesión: el diario se asocia al navegador mediante
  `localStorage`. Si se abre desde otro dispositivo o se borran los datos del
  navegador, no aparece el diario anterior.
- Las políticas de Supabase del prototipo son abiertas; para usarlo con datos
  reales hay que agregar autenticación.
- La información es orientativa y no reemplaza la atención de un veterinario.
