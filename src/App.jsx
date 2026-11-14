
import { useState } from 'react'
import './App.css'

// IMAGEN DE INICIO
import heroImage from './assets/pyg.jpg'

// COMPONENTES DEL PROYECTO
import AsistenteConductas from './components/AsistenteConductas'
import DiarioAdaptacion from './components/DiarioAdaptacion'
import PerfilMascota from './components/PerfilMascota'
import AlertasEmergencia from './components/AlertasEmergencia'
import PrimerosDias from './components/PrimerosDias'

// ==========================================
// ICONOS DE LAS TARJETAS DE INICIO
// ==========================================

function Icono({ tipo }) {
  const atributos = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  }

  if (tipo === 'primeros') {
    return (
      <svg {...atributos}>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9" />
        <path d="M9 21v-7h6v7" />
      </svg>
    )
  }

  if (tipo === 'conductas') {
    return (
      <svg {...atributos}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    )
  }

  return (
    <svg {...atributos}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M12 8v5" />
      <path d="M12 17h.01" />
    </svg>
  )
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function App() {
  const [pagina, setPagina] = useState('inicio')

  // ==========================================
  // NAVEGACIÓN ENTRE PÁGINAS
  // ==========================================

  function navegar(destino) {
    setPagina(destino)

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  // ==========================================
  // IR A LAS GUÍAS DE LA PORTADA
  // ==========================================

  function irAGuia() {
    setPagina('inicio')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById('guia')
          ?.scrollIntoView({
            behavior: 'smooth'
          })
      })
    })
  }

  // ==========================================
  // TARJETAS PRINCIPALES
  // ==========================================

  const tarjetas = [
    {
      id: 'primeros',
      titulo: 'Primeros días',
      descripcion:
        'Descubre cómo ayudar a tu mascota a sentirse segura, cómoda y bienvenida en su nuevo hogar.',
      clase: 'card-first'
    },
    {
      id: 'conductas',
      titulo: 'Conductas',
      descripcion:
        'Aprende a comprender sus emociones, comportamientos y necesidades durante la adaptación.',
      clase: 'card-behavior'
    },
    {
      id: 'alertas',
      titulo: 'Señales de alerta',
      descripcion:
        'Descubre cómo actuar ante situaciones de emergencia y proteger la salud de tu mascota.',
      clase: 'card-alert'
    }
  ]

  // ==========================================
  // ESTRUCTURA PRINCIPAL
  // ==========================================

  return (
    <div>

      {/* =====================================
          BARRA DE NAVEGACIÓN
      ===================================== */}

      <header className="navbar">

        {/* LOGO */}

        <button
          className="logo logo-button"
          type="button"
          onClick={() => navegar('inicio')}
          aria-label="Huella Segura - Ir al inicio"
        >
          <span
            className="logo-icon"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              width="25"
              height="25"
              fill="currentColor"
            >
              <ellipse
                cx="5.2"
                cy="7"
                rx="1.9"
                ry="2.6"
              />

              <ellipse
                cx="10"
                cy="4.7"
                rx="1.9"
                ry="2.6"
              />

              <ellipse
                cx="15"
                cy="5.1"
                rx="1.9"
                ry="2.6"
              />

              <ellipse
                cx="19.3"
                cy="8.6"
                rx="1.8"
                ry="2.5"
              />

              <path d="M12 10.4c-2.2 0-3.3 1.5-4.7 3.1-1.1 1.2-2.6 2.4-2.6 4.1-1.1 1.2-2.6 2.4-2.6 4.1 0 1.8 1.4 3 3.2 3 1.5 0 2.7-.8 4.1-.8s2.6.8 4.1.8c1.8 0 3.2-1.2 3.2-3 0-1.7-1.5-2.9-2.6-4.1-1.4-1.6-2.5-3.1-4.7-3.1z" />
            </svg>
          </span>

          <span>Huella Segura</span>
        </button>

        {/* MENÚ PRINCIPAL */}

        <nav aria-label="Navegación principal">

          {/* INICIO */}

          <button
            type="button"
            className={
              pagina === 'inicio'
                ? 'nav-active'
                : ''
            }
            onClick={() => navegar('inicio')}
          >
            Inicio
          </button>

          {/* MI MASCOTA */}

          <button
            type="button"
            className={`nav-mascota ${
              pagina === 'mascota'
                ? 'nav-mascota-active'
                : ''
            }`}
            onClick={() => navegar('mascota')}
          >
            <span aria-hidden="true">
              🐾
            </span>

            Mi mascota
          </button>

          {/* DIARIO */}

          <button
            type="button"
            className={
              pagina === 'diario'
                ? 'nav-active'
                : ''
            }
            onClick={() => navegar('diario')}
          >
            Diario
          </button>

          {/* PRIMEROS DÍAS */}

          <button
            type="button"
            className={
              pagina === 'primeros'
                ? 'nav-active'
                : ''
            }
            onClick={() => navegar('primeros')}
          >
            Primeros días
          </button>

          {/* CONDUCTAS */}

          <button
            type="button"
            className={
              pagina === 'conductas'
                ? 'nav-active'
                : ''
            }
            onClick={() => navegar('conductas')}
          >
            Conductas
          </button>

          {/* ALERTAS */}

          <button
            type="button"
            className={
              pagina === 'alertas'
                ? 'nav-active'
                : ''
            }
            onClick={() => navegar('alertas')}
          >
            Alertas
          </button>

        </nav>
      </header>

      {/* =====================================
          CONTENIDO PRINCIPAL
      ===================================== */}

      <main>

        {pagina === 'inicio' ? (

          <>
            {/* =====================================
                PORTADA
            ===================================== */}

            <section
              className="hero"
              id="inicio"
            >
              <div className="hero-content">

                <h1>
                  Una nueva vida comienza en casa
                </h1>

                <p>
                  Aprende cómo acompañar a tu mascota
                  durante sus primeros días,
                  comprender sus conductas y
                  reconocer cuándo necesita ayuda.
                </p>

                <button
                  type="button"
                  onClick={irAGuia}
                >
                  Comenzar guía
                </button>
              </div>

              <div className="hero-image">
                <img
                  src={heroImage}
                  alt="Perro y gato juntos"
                />
              </div>
            </section>

            {/* =====================================
                TARJETAS DE LA PORTADA
            ===================================== */}

            <section
              className="options"
              id="guia"
            >
              <div className="options-heading">

                <span className="section-tag">
                  TE ACOMPAÑAMOS
                </span>

                <h2>
                  ¿Qué necesitas saber?
                </h2>

                <p>
                  Cada mascota tiene su propio ritmo.
                  Descubre cómo acompañarla
                  en esta nueva etapa.
                </p>
              </div>

              <div className="cards">

                {tarjetas.map((tarjeta) => (
                  <article
                    className={`card ${tarjeta.clase}`}
                    key={tarjeta.id}
                  >

                    <div className="card-icon">
                      <Icono tipo={tarjeta.id} />
                    </div>

                    <h3>
                      {tarjeta.titulo}
                    </h3>

                    <p>
                      {tarjeta.descripcion}
                    </p>

                    <button
                      type="button"
                      className="card-link"
                      onClick={() => navegar(tarjeta.id)}
                    >
                      Explorar tema

                      <span aria-hidden="true">
                        →
                      </span>
                    </button>

                  </article>
                ))}

              </div>
            </section>
          </>

        ) : pagina === 'mascota' ? (

          /* =====================================
              PERFIL DE MASCOTA Y VACUNAS
          ===================================== */

          <PerfilMascota />

        ) : pagina === 'diario' ? (

          /* =====================================
              DIARIO DE ADAPTACIÓN
          ===================================== */

          <DiarioAdaptacion />

        ) : pagina === 'primeros' ? (

          /* =====================================
              NUEVA GUÍA INTERACTIVA
              DE PRIMEROS DÍAS
          ===================================== */

          <PrimerosDias />

        ) : pagina === 'conductas' ? (

          /* =====================================
              GUÍA INTERACTIVA DE CONDUCTAS
          ===================================== */

          <section className="info-page info-conductas">

            <div className="info-container">

              {/* VOLVER AL INICIO */}

              <button
                type="button"
                className="back-link"
                onClick={() => navegar('inicio')}
              >
                ← Volver al inicio
              </button>

              {/* GUÍA DE CONDUCTAS */}

              <AsistenteConductas
                irAlDiario={() => navegar('diario')}
              />

              {/* CONSEJO FINAL */}

              <aside className="info-tip">

                <div className="tip-heading">

                  <span aria-hidden="true">
                    ♡
                  </span>

                  <h2>
                    Un consejo para ti
                  </h2>

                </div>

                <p>
                  Observa el contexto y el lenguaje
                  corporal completo de tu mascota.
                  Una conducta aislada no siempre
                  tiene un único significado.
                </p>
              </aside>

              {/* CIERRE */}

              <div className="info-footer">

                <h2>
                  Seguimos acompañándote
                </h2>

                <p>
                  Explora los demás temas para aprender
                  a cuidar y comprender a tu mascota.
                </p>

                <button
                  type="button"
                  onClick={irAGuia}
                >
                  Ver otros temas →
                </button>

              </div>
            </div>
          </section>

        ) : pagina === 'alertas' ? (

          /* =====================================
              GUÍAS DE EMERGENCIA
          ===================================== */

          <AlertasEmergencia />

        ) : null}

      </main>
    </div>
  )
}

export default App
