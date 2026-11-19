
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
// NUEVO LOGO HUELLA SEGURA
// ==========================================

function LogoHuella() {
  return (
    <div className="navbar-brand">
      <span
        className="navbar-logo-badge"
        aria-hidden="true"
      >
        <svg
          width="29"
          height="29"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="13"
            cy="23"
            rx="5.5"
            ry="8"
            transform="rotate(-20 13 23)"
            fill="white"
          />

          <ellipse
            cx="27"
            cy="13"
            rx="5.5"
            ry="8"
            transform="rotate(-8 27 13)"
            fill="white"
          />

          <ellipse
            cx="41"
            cy="15"
            rx="5.5"
            ry="8"
            transform="rotate(12 41 15)"
            fill="white"
          />

          <ellipse
            cx="53"
            cy="27"
            rx="5.5"
            ry="8"
            transform="rotate(25 53 27)"
            fill="white"
          />

          <path
            d="M32 27C25 27 22 34 17 39C13 43 11 46 11 50C11 55 15 58 20 58C25 58 28 54 32 54C36 54 39 58 44 58C49 58 53 55 53 50C53 46 51 43 47 39C42 34 39 27 32 27Z"
            fill="white"
          />
        </svg>
      </span>

      <span className="navbar-brand-text">
        <span className="navbar-brand-title">
          Huella Segura
        </span>

        <span className="navbar-brand-subtitle">
          Acompañando nuevas historias
        </span>
      </span>
    </div>
  )
}

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
  const [mostrarQuiz, setMostrarQuiz] = useState(false)

  // ==========================================
  // ABRIR QUIZ DE ADOPCIÓN
  // ==========================================

  function iniciarTest() {
    setPagina('inicio')
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
  // CERRAR QUIZ
  // ==========================================

  function cerrarTest() {
    setMostrarQuiz(false)
  }

  // ==========================================
  // NAVEGACIÓN ENTRE SECCIONES
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
  // IR A LAS GUÍAS PRINCIPALES
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
  // TARJETAS DE INICIO
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
  // ESTRUCTURA PRINCIPAL
  // ==========================================

  return (
    <div>

      {/* =====================================
          BARRA DE NAVEGACIÓN
      ===================================== */}

      <header className="navbar navbar-expand-lg bg-white">
      <div className="container">

        <button
          type="button"
          className="navbar-logo-boton"
          onClick={() => navegar('inicio')}
          aria-label="Ir al inicio"
        >
          <LogoHuella />
        </button>


        <button
          className="navbar-toggler menu-huella-boton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHuella"
          aria-controls="navbarHuella"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="menu-huella-texto">
            MENÚ
          </span>

          <span className="menu-huella-icono">
            ☰
          </span>
        </button>


        <div
          className="collapse navbar-collapse"
          id="navbarHuella"
        >

          <nav className="navbar-nav ms-auto menu-huella-panel">

            <button
              type="button"
              className={`nav-link ${
                pagina === 'inicio' ? 'active' : ''
              }`}
              onClick={() => navegar('inicio')}
            >
              Inicio
            </button>


            <button
              type="button"
              className={`nav-link ${
                pagina === 'mascota' ? 'active' : ''
              }`}
              onClick={() => navegar('mascota')}
            >
              Mi mascota
            </button>


            <button
              type="button"
              className={`nav-link ${
                pagina === 'diario' ? 'active' : ''
              }`}
              onClick={() => navegar('diario')}
            >
              Diario
            </button>


            <button
              type="button"
              className={`nav-link ${
                pagina === 'primeros' ? 'active' : ''
              }`}
              onClick={() => navegar('primeros')}
            >
              Primeros días
            </button>


            <button
              type="button"
              className={`nav-link ${
                pagina === 'conductas' ? 'active' : ''
              }`}
              onClick={() => navegar('conductas')}
            >
              Conductas
            </button>


            <button
              type="button"
              className={`nav-link ${
                pagina === 'alertas' ? 'active' : ''
              }`}
              onClick={() => navegar('alertas')}
            >
              Alertas
            </button>

          </nav>

        </div>

      </div>

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

                {/* BOTONES DE INICIO */}

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

                <QuizAdopcion
                  irAPrimeros={() => navegar('primeros')}
                  irAlDiario={() => navegar('diario')}
                />

              </div>
            )}

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
              CHAT INTERACTIVO
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
      <footer className="footer-huella">
        <div className="footer-contenido">

          <div className="footer-columna footer-marca">

            <strong>Huella Segura</strong>

            <span>
              Acompañando nuevas historias
            </span>

            <p>
              Plataforma de apoyo para familias adoptantes
              durante el proceso de adaptación de sus mascotas.
            </p>

          </div>


          <div className="footer-columna">

            <h3>Fundación colaboradora</h3>

            <p>XXXXX</p>

            <p>
              Correo: XXXXX
            </p>

            <p>
              Instagram: XXXXX
            </p>

          </div>


          <div className="footer-columna">
            <h3>Contacto</h3>
            <p>
              Equipo Huella Segura
            </p>

            <p>
              Correo: XXXXX
            </p>

            <p>
              Santiago, Chile
            </p>
          </div>
        </div>

        <div className="footer-inferior">

          <p>
            © 2026 Huella Segura
          </p>

          <p>
            Proyecto académico desarrollado por el equipo Huella Segura
          </p>
        </div>
      </footer>
      </div>
  )
}

export default App
