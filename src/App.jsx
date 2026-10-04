import './App.css'

function App() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">
          🐾 Huella Segura
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#guia">Guía</a>
          <a href="#conductas">Conductas</a>
          <a href="#alertas">Alertas</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <h1>Una nueva vida comienza en casa</h1>

            <p>
              Aprende cómo acompañar a tu mascota durante sus primeros días,
              comprender sus conductas y reconocer cuándo necesita ayuda.
            </p>

            <button>Comenzar guía</button>
          </div>
        </section>

        <section className="options">
          <h2>¿Qué necesitas saber?</h2>

          <div className="cards">
            <div className="card">
              <span>🏠</span>
              <h3>Primeros días</h3>
              <p>
                Conoce qué comportamientos son normales durante la adaptación.
              </p>
            </div>

            <div className="card">
              <span>🐕</span>
              <h3>Conductas</h3>
              <p>
                Aprende a interpretar los cambios de comportamiento de tu mascota.
              </p>
            </div>

            <div className="card">
              <span>🚨</span>
              <h3>Señales de alerta</h3>
              <p>
                Identifica situaciones que pueden requerir atención profesional.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App