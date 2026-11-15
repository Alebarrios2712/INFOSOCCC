
import { useState } from 'react'
import './App.css'

// ==========================================
// IMÁGENES
// ==========================================

import heroImage from './assets/pyg.jpg'

// ==========================================
// COMPONENTES
// ==========================================

import QuizAdopcion from './components/QuizAdopcion'
import ChatMascota from './components/ChatMascota'
import DiarioAdaptacion from './components/DiarioAdaptacion'
import PerfilMascota from './components/PerfilMascota'
import AlertasEmergencia from './components/AlertasEmergencia'
import PrimerosDias from './components/PrimerosDias'

// ==========================================
// ICONOS DE LAS TARJETAS
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

  // Controla si el Quiz de Adopción está visible
  const [mostrarQuiz, setMostrarQuiz] = useState(false)

  // ==========================================
  // ABRIR EL QUIZ DE ADOPCIÓN
  // ==========================================

  function iniciarTest() {
    setMostrarQuiz(true)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById('quiz-adopcion')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
      })
    })
  }

  // ==========================================
  // CERRAR EL QUIZ
  // ==========================================

  function cerrarTest() {
    setMostrarQuiz(false)
  }

  // ==========================================
  // NAVEGACIÓN
  // ==========================================

  function navegar(destino) {
    setPagina(destino)
    setMostrarQuiz(false)

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  // ==========================================
  // IR A LAS TARJETAS DE INICIO
  // ==========================================

  function irAGuia() {
    setPagina('inicio')
    setMostrarQuiz(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById('guia')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
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
        'Conversa con tu mascota, toma decisiones y descubre qué podría estar comunicando a través de sus comportamientos.',
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
  // ESTRUCTURA DE LA PÁGINA
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

          <button
            type="button"
            className={
              pagina === 'inicio' ? 'nav-active' : ''
            }
            onClick={() => navegar('inicio')}
          >
            Inicio
          </button>

          <button
            type="button"
            className={`nav-mascota ${
              pagina === 'mascota'
                ? 'nav-mascota-active'
                : ''
            }`}
            onClick={() => navegar('mascota')}
          >
            <span aria-hidden="true">🐾</span>
            Mi mascota
          </button>

          <button
            type="button"
            className={
              pagina === 'diario' ? 'nav-active' : ''
            }
            onClick={() => navegar('diario')}
          >
            Diario
          </button>

          <button
            type="button"
            className={
              pagina === 'primeros' ? 'nav-active' : ''
            }
            onClick={() => navegar('primeros')}
          >
            Primeros días
          </button>

          <button
            type="button"
            className={
              pagina === 'conductas' ? 'nav-active' : ''
            }
            onClick={() => navegar('conductas')}
          >
            Conductas
          </button>

          <button
            type="button"
            className={
              pagina === 'alertas' ? 'nav-active' : ''
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

        {/* =====================================
            PÁGINA DE INICIO
        ===================================== */}

        {pagina === 'inicio' ? (

          <>

            {/* PORTADA */}

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

                {/* BOTONES DE LA PORTADA */}

                <div
                  className="hero-acciones"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '24px',
                    marginTop: '12px'
                  }}
                >

                  <button
                    type="button"
                    onClick={irAGuia}
                  >
                    Comenzar guía
                  </button>

                  <button
                    type="button"
                    className="hero-secundario"
                    onClick={iniciarTest}
                    aria-expanded={mostrarQuiz}
                    aria-controls="quiz-adopcion"
                  >
                    ¿Estás listo para adoptar?
                  </button>

                </div>
              </div>

              <div className="hero-image">
                <img
                  src={heroImage}
                  alt="Perro y gato juntos"
                />
              </div>
            </section>

            {/* =====================================
                QUIZ DE ADOPCIÓN
            ===================================== */}

            {mostrarQuiz && (

              <div
                id="quiz-adopcion"
                style={{
                  scrollMarginTop: '24px'
                }}
              >

                {/* BOTÓN PARA CERRAR */}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '20px 6% 0'
                  }}
                >
                  <button
                    type="button"
                    onClick={cerrarTest}
                    style={{
                      border: '1px solid #E9D9D0',
                      background: '#FFFFFF',
                      color: '#493832',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    ✕ Cerrar test
                  </button>
                </div>

                {/* COMPONENTE DEL QUIZ */}

                <QuizAdopcion
                  irAPrimeros={() => navegar('primeros')}
                  irAlDiario={() => navegar('diario')}
                />

              </div>

            )}

            {/* =====================================
                GUÍAS PRINCIPALES
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
              MI MASCOTA Y VACUNAS
          ===================================== */

          <PerfilMascota />

        ) : pagina === 'diario' ? (

          /* =====================================
              DIARIO DE ADAPTACIÓN
          ===================================== */

          <DiarioAdaptacion />

        ) : pagina === 'primeros' ? (

          /* =====================================
              PRIMEROS DÍAS
          ===================================== */

          <PrimerosDias />

        ) : pagina === 'conductas' ? (

          /* =====================================
              NUEVO CHAT INTERACTIVO
              DE CONDUCTAS
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

              {/* CHAT PERSONALIZADO */}

              <ChatMascota
                irAPerfil={() => navegar('mascota')}
              />

              {/* CONSEJO FINAL */}

              <aside className="info-tip">

                <div className="tip-heading">

                  <span aria-hidden="true">♡</span>

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
              ALERTAS Y EMERGENCIAS
          ===================================== */

          <AlertasEmergencia />

        ) : null}

      </main>

    </div>
  )
}

export default App
