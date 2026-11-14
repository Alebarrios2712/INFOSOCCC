import AsistenteConductas from './components/AsistenteConductas'
import { useState } from 'react'
import './App.css'

import heroImage from './assets/pyg.jpg'
import familiaImage from './assets/fam.jpg'

import DiarioAdaptacion from './components/DiarioAdaptacion'
import PerfilMascota from './components/PerfilMascota'

// ==========================================
// CONTENIDO DE LAS PÁGINAS INFORMATIVAS
// ==========================================

const contenidos = {
  primeros: {
    etiqueta: 'ADAPTACIÓN AL HOGAR',
    titulo: 'Sus primeros días en casa',
    descripcion:
      'Un nuevo hogar significa nuevos olores, personas y rutinas. Acompaña a tu mascota con paciencia y cariño.',

    pasos: [
      {
        titulo: 'Prepara un espacio seguro',
        texto:
          'Elige un lugar tranquilo con agua, comida, una cama y un espacio donde pueda descansar sin interrupciones.'
      },
      {
        titulo: 'Respeta su ritmo',
        texto:
          'Algunas mascotas exploran rápidamente y otras necesitan más tiempo. Evita forzar el contacto físico.'
      },
      {
        titulo: 'Establece rutinas',
        texto:
          'Mantén horarios consistentes para la alimentación, el descanso, los paseos y el juego según sus necesidades.'
      },
      {
        titulo: 'Construye confianza',
        texto:
          'Acércate con calma, utiliza refuerzos positivos y permite que tu mascota tome la iniciativa para interactuar.'
      }
    ],

    consejo:
      'No todas las mascotas se adaptan al mismo ritmo. La paciencia y la constancia son fundamentales.'
  },

  conductas: {
    etiqueta: 'COMPRENDE A TU MASCOTA',
    titulo: 'Entendiendo sus conductas',
    descripcion:
      'El comportamiento de tu mascota es una forma de comunicación. Aprender a observarlo te ayudará a responder a sus necesidades.',

    pasos: [
      {
        titulo: 'Miedo o inseguridad',
        texto:
          'Esconderse, temblar o evitar el contacto puede indicar incomodidad. Proporciónale tranquilidad y espacio.'
      },
      {
        titulo: 'Exploración y curiosidad',
        texto:
          'Olfatear, observar y recorrer los espacios son formas habituales de conocer su nuevo entorno.'
      },
      {
        titulo: 'Necesidad de descanso',
        texto:
          'Un animal puede necesitar momentos de tranquilidad después de conocer personas, jugar o explorar.'
      },
      {
        titulo: 'Juego y aprendizaje',
        texto:
          'El juego apropiado y los refuerzos positivos ayudan a fortalecer el vínculo y desarrollar confianza.'
      }
    ],

    consejo:
      'Observa el contexto y el lenguaje corporal completo. Una conducta aislada no siempre tiene un único significado.'
  },

  alertas: {
    etiqueta: 'CUIDADO Y BIENESTAR',
    titulo: 'Señales que merecen atención',
    descripcion:
      'Identificar cambios importantes en la salud o el comportamiento permite buscar orientación profesional oportunamente.',

    pasos: [
      {
        titulo: 'Cambios en la alimentación',
        texto:
          'La falta de apetito, la dificultad para beber o los cambios importantes en sus hábitos requieren evaluación según su duración y contexto.'
      },
      {
        titulo: 'Cambios de comportamiento',
        texto:
          'El aislamiento repentino, el dolor aparente o una agresividad inusual pueden indicar malestar físico o emocional.'
      },
      {
        titulo: 'Problemas digestivos',
        texto:
          'Los vómitos o la diarrea repetidos, especialmente si se acompañan de decaimiento, requieren atención veterinaria.'
      },
      {
        titulo: 'Señales de urgencia',
        texto:
          'La dificultad para respirar, las convulsiones, el colapso o las lesiones graves requieren atención veterinaria inmediata.'
      }
    ],

    consejo:
      'Esta información es orientativa y no sustituye una evaluación veterinaria. Ante una urgencia, busca atención inmediata.'
  }
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

  // Cambiar entre páginas
  function navegar(destino) {
    setPagina(destino)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  // Ir a la sección de guías de la portada
  function irAGuia() {
    setPagina('inicio')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('guia')?.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  }

  // Tarjetas de la portada
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
        'Reconoce situaciones que requieren atención y cuándo buscar ayuda profesional.',
      clase: 'card-alert'
    }
  ]

  const contenido = contenidos[pagina]

  return (
    <div>

      {/* =====================================
          BARRA DE NAVEGACIÓN
      ===================================== */}

      <header className="navbar">
        <button
          className="logo logo-button"
          type="button"
          onClick={() => navegar('inicio')}
          aria-label="Huella Segura - Ir al inicio"
        >
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
        </button>

        {/* NUEVO ORDEN DE NAVEGACIÓN */}

        <nav aria-label="Navegación principal">

          {/* INICIO */}
          <button
            type="button"
            className={pagina === 'inicio' ? 'nav-active' : ''}
            onClick={() => navegar('inicio')}
          >
            Inicio
          </button>

          {/* MI MASCOTA - DESTACADO */}
          <button
            type="button"
            className={`nav-mascota ${
              pagina === 'mascota' ? 'nav-mascota-active' : ''
            }`}
            onClick={() => navegar('mascota')}
          >
            <span aria-hidden="true">🐾</span>
            Mi mascota
          </button>

          {/* DIARIO */}
          <button
            type="button"
            className={pagina === 'diario' ? 'nav-active' : ''}
            onClick={() => navegar('diario')}
          >
            Diario
          </button>

          {/* GUÍAS */}
          <button
            type="button"
            onClick={irAGuia}
          >
            Guías
          </button>

          {/* PRIMEROS DÍAS */}
          <button
            type="button"
            className={pagina === 'primeros' ? 'nav-active' : ''}
            onClick={() => navegar('primeros')}
          >
            Primeros días
          </button>

          {/* CONDUCTAS */}
          <button
            type="button"
            className={pagina === 'conductas' ? 'nav-active' : ''}
            onClick={() => navegar('conductas')}
          >
            Conductas
          </button>

          {/* ASISTENTE */}
          <button
            type="button"
            className={pagina === 'asistente' ? 'nav-active' : ''}
            onClick={() => navegar('asistente')}
          >
            Qué hacer
          </button>

          {/* ALERTAS */}
          <button
            type="button"
            className={pagina === 'alertas' ? 'nav-active' : ''}
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
            {/* PORTADA PRINCIPAL */}

            <section className="hero" id="inicio">
              <div className="hero-content">
                <h1>Una nueva vida comienza en casa</h1>

                <p>
                  Aprende cómo acompañar a tu mascota durante
                  sus primeros días, comprender sus conductas
                  y reconocer cuándo necesita ayuda.
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
                {tarjetas.map((tarjeta) => (
                  <article
                    className={`card ${tarjeta.clase}`}
                    key={tarjeta.id}
                  >
                    <div className="card-icon">
                      <Icono tipo={tarjeta.id} />
                    </div>

                    <h3>{tarjeta.titulo}</h3>

                    <p>{tarjeta.descripcion}</p>

                    <button
                      type="button"
                      className="card-link"
                      onClick={() => navegar(tarjeta.id)}
                    >
                      Explorar tema
                      <span aria-hidden="true">→</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : pagina === 'mascota' ? (

          /* PERFIL DE MASCOTA */
          <PerfilMascota />

        ) : pagina === 'diario' ? (

          /* DIARIO EXISTENTE */
          <DiarioAdaptacion />

        ) : pagina === 'asistente' ? (

          /* ASISTENTE DE CONDUCTAS */
          <AsistenteConductas irAlDiario={() => navegar('diario')}  />

        ) : (

          /* PÁGINAS INFORMATIVAS */

          <section
            className={`info-page info-${pagina}`}
            key={pagina}
          >
            <div className="info-container">
              <button
                type="button"
                className="back-link"
                onClick={() => navegar('inicio')}
              >
                ← Volver al inicio
              </button>

              {/* ENCABEZADO */}

              <div
                className={`info-hero ${
                  pagina === 'primeros' ? 'info-hero-familia' : ''
                }`}
              >
                <div className="info-heading">
                  <span className="section-tag">
                    {contenido.etiqueta}
                  </span>

                  <h1>{contenido.titulo}</h1>
                  <p>{contenido.descripcion}</p>
                </div>

                {/* FOTO DE PRIMEROS DÍAS */}

                {pagina === 'primeros' && (
                  <div className="info-hero-image">
                    <img
                      src={familiaImage}
                      alt="Familia compartiendo un momento de cariño con su perro en casa"
                    />
                  </div>
                )}
              </div>

              {/* TARJETAS DE RECOMENDACIONES */}

              <div className="info-grid">
                {contenido.pasos.map((paso, index) => (
                  <article
                    className="info-card"
                    key={paso.titulo}
                  >
                    <div className="info-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <h2>{paso.titulo}</h2>
                    <p>{paso.texto}</p>
                  </article>
                ))}
              </div>

              {/* CONSEJO DESTACADO */}

              <aside className="info-tip">
                <div className="tip-heading">
                  <span aria-hidden="true">♡</span>
                  <h2>Un consejo para ti</h2>
                </div>

                <p>{contenido.consejo}</p>
              </aside>

              {/* CIERRE DE PÁGINA */}

              <div className="info-footer">
                <h2>Seguimos acompañándote</h2>

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
        )}
      </main>
    </div>
  )
}

export default App
