
import './App.css'
import heroImage from './assets/pyg.jpg'

function App() {
  return (
    <div>
      {/* BARRA DE NAVEGACIÓN */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="25"
              height="25"
              fill="currentColor"
            >
              <ellipse cx="5.2" cy="7" rx="1.9" ry="2.6" />
              <ellipse cx="10" cy="4.7" rx="1.9" ry="2.6" />
              <ellipse cx="15" cy="5.1" rx="1.9" ry="2.6" />
              <ellipse cx="19.3" cy="8.6" rx="1.8" ry="2.5" />
              <path d="M12 10.4c-2.2 0-3.3 1.5-4.7 3.1-1.1 1.2-2.6 2.4-2.6 4.1 0 1.8 1.4 3 3.2 3 1.5 0 2.7-.8 4.1-.8s2.6.8 4.1.8c1.8 0 3.2-1.2 3.2-3 0-1.7-1.5-2.9-2.6-4.1-1.4-1.6-2.5-3.1-4.7-3.1z" />
            </svg>
          </span>

          <span>Huella Segura</span>
        </div>

        <nav aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#guia">Guía</a>
          <a href="#conductas">Conductas</a>
          <a href="#alertas">Alertas</a>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>
        {/* PORTADA */}
        <section className="hero" id="inicio">
          <div className="hero-content">
            <h1>Una nueva vida comienza en casa</h1>

            <p>
              Aprende cómo acompañar a tu mascota durante sus
              primeros días, comprender sus conductas y reconocer
              cuándo necesita ayuda.
            </p>

            <button
              type="button"
              onClick={() => {
                document.getElementById('guia')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              Comenzar guía
            </button>
          </div>

          <div className="hero-image">
            <img
              src={heroImage}
              alt="Perro y gato juntos representando el acompañamiento en la adopción"
            />
          </div>
        </section>

        {/* SECCIÓN DE TARJETAS */}
        <section className="options" id="guia">
          <div className="options-heading">
            <span className="section-tag">
              TE ACOMPAÑAMOS
            </span>

            <h2>¿Qué necesitas saber?</h2>

            <p>
              Cada mascota tiene su propio ritmo.
              Descubre cómo acompañarla en esta nueva etapa.
            </p>
          </div>

          <div className="cards">
            {/* PRIMEROS DÍAS */}
            <article className="card card-first">
              <div className="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m3 10 9-7 9 7" />
                  <path d="M5 9v12h14V9" />
                  <path d="M9 21v-7h6v7" />
                </svg>
              </div>

              <h3>Primeros días</h3>

              <p>
                Descubre cómo ayudar a tu mascota a sentirse
                segura, cómoda y bienvenida en su nuevo hogar.
              </p>

              <a href="#primeros-dias" className="card-link">
                Explorar tema
                <span aria-hidden="true">→</span>
              </a>
            </article>

            {/* CONDUCTAS */}
            <article
              className="card card-behavior"
              id="conductas"
            >
              <div className="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
                  <path d="M8.5 11.5h7" />
                </svg>
              </div>

              <h3>Conductas</h3>

              <p>
                Aprende a comprender sus emociones,
                comportamientos y necesidades durante
                el proceso de adaptación.
              </p>

              <a href="#conductas" className="card-link">
                Explorar tema
                <span aria-hidden="true">→</span>
              </a>
            </article>

            {/* SEÑALES DE ALERTA */}
            <article
              className="card card-alert"
              id="alertas"
            >
              <div className="card-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="M12 8v5" />
                  <circle
                    cx="12"
                    cy="17"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <h3>Señales de alerta</h3>

              <p>
                Reconoce situaciones que requieren atención
                y aprende cuándo es importante buscar
                ayuda profesional.
              </p>

              <a href="#alertas" className="card-link">
                Explorar tema
                <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
