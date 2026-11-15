
import { useState } from 'react'
import './AlertasEmergencia.css'


import calor from '../assets/calor.jpg'
import intoxicacion from '../assets/intoxicacion.png'
import heridas from '../assets/heridas.jpg'
import convulsiones from '../assets/convulsiones.jpg'


// ======================================
// GUÍAS DE EMERGENCIA
// ======================================

const emergencias = [
  {
    id: 'calor',
    titulo: 'Golpe de calor',
    subtitulo: 'Cómo actuar ante el sobrecalentamiento',
    imagen: calor,
    descripcion:
      'El golpe de calor puede causar daños graves. Es importante enfriar a la mascota de inmediato y buscar atención veterinaria urgente.',
    hacer: [
      'Llévala a un lugar fresco, ventilado y fuera del sol.',
      'Detén cualquier ejercicio o actividad.',
      'Comienza a mojar su cuerpo con agua fresca, evitando echarla directamente sobre su cara.',
      'Facilita la circulación de aire mientras organizas el traslado al veterinario.',
      'Comunícate con una clínica veterinaria de urgencia.'
    ],
    evitar: [
      'No esperes a que mejore por sí sola.',
      'No la obligues a beber agua.',
      'No la cubras con toallas húmedas que impidan disipar el calor.'
    ]
  },
  {
    id: 'intoxicacion',
    titulo: 'Intoxicaciones',
    subtitulo: 'Alimentos y sustancias peligrosas',
    imagen: intoxicacion,
    descripcion:
      'Algunos alimentos, plantas y productos domésticos pueden intoxicar a perros y gatos. Incluso sin síntomas iniciales, se debe consultar inmediatamente con un veterinario.',
    hacer: [
      'Retira el alimento o producto para evitar que siga ingiriéndolo.',
      'Identifica qué consumió, cuánto y hace cuánto tiempo.',
      'Guarda el envase o toma una fotografía de los ingredientes.',
      'Llama inmediatamente al veterinario y sigue sus instrucciones.'
    ],
    evitar: [
      'No provoques el vómito sin indicación veterinaria.',
      'No administres leche, sal, aceite ni remedios caseros.',
      'No esperes a que aparezcan síntomas.'
    ]
  },
  {
    id: 'heridas',
    titulo: 'Heridas y sangrado',
    subtitulo: 'Primeras medidas de protección',
    imagen: heridas,
    descripcion:
      'Las heridas profundas, mordeduras y hemorragias pueden requerir atención veterinaria urgente.',
    hacer: [
      'Mantén a tu mascota tranquila y evita movimientos innecesarios.',
      'Si hay sangrado externo, aplica presión firme con una gasa o paño limpio.',
      'Si el paño se empapa, coloca otro encima sin retirar el primero.',
      'Busca atención veterinaria urgente ante sangrado abundante o heridas profundas.'
    ],
    evitar: [
      'No retires objetos incrustados en una herida.',
      'No apliques medicamentos humanos ni sustancias irritantes.',
      'No manipules bruscamente a una mascota asustada o con dolor.'
    ]
  },
  {
    id: 'convulsiones',
    titulo: 'Convulsiones',
    subtitulo: 'Cómo proteger a tu mascota',
    imagen: convulsiones,
    descripcion:
      'Las convulsiones necesitan valoración veterinaria. Las crisis prolongadas o repetidas pueden ser una emergencia.',
    hacer: [
      'Aleja los objetos con los que pueda golpearse.',
      'Mantén alejadas a otras mascotas y personas.',
      'Mide cuánto dura la convulsión.',
      'Si es seguro, graba un video para mostrarlo al veterinario.',
      'Busca atención veterinaria. Si dura más de cinco minutos o se repite, acude inmediatamente a urgencias.'
    ],
    evitar: [
      'No intentes sujetarla para detener los movimientos.',
      'No pongas tus manos ni objetos dentro de su boca.',
      'No le des alimentos, agua o medicamentos durante la convulsión.'
    ]
  }
]

// ======================================
// INFORMACIÓN SOBRE INTOXICACIONES
// ======================================

const categorias = {
  alimentos: {
    titulo: 'Alimentos peligrosos',
    descripcion:
      'Algunos alimentos habituales para las personas pueden causar intoxicaciones en las mascotas.',
    elementos: [
      {
        nombre: 'Chocolate y cacao',
        texto:
          'Pueden afectar el sistema digestivo, cardíaco y nervioso.'
      },
      {
        nombre: 'Uvas y pasas',
        texto:
          'Pueden causar daño renal grave en perros.'
      },
      {
        nombre: 'Cebolla, ajo y puerros',
        texto:
          'Pueden dañar los glóbulos rojos de perros y gatos.'
      },
      {
        nombre: 'Xilitol',
        texto:
          'Endulzante presente en ciertos productos sin azúcar. Puede causar intoxicación grave en perros.'
      },
      {
        nombre: 'Alcohol',
        texto:
          'Puede provocar intoxicaciones graves en perros y gatos.'
      },
      {
        nombre: 'Cafeína',
        texto:
          'Presente en café, bebidas energéticas y otros productos. Puede afectar el corazón y sistema nervioso.'
      }
    ]
  },

  plantas: {
    titulo: 'Plantas tóxicas',
    descripcion:
      'Algunas plantas domésticas y de jardín pueden ser peligrosas.',
    elementos: [
      {
        nombre: 'Lirios y azucenas',
        texto:
          'Algunas especies de lirios pueden causar daño renal grave en gatos.'
      },
      {
        nombre: 'Plantas desconocidas',
        texto:
          'Si tu mascota ingirió una planta, identifica cuál es y consulta al veterinario.'
      }
    ]
  },

  productos: {
    titulo: 'Productos peligrosos',
    descripcion:
      'Mantén medicamentos y productos químicos fuera del alcance de tus mascotas.',
    elementos: [
      {
        nombre: 'Medicamentos humanos',
        texto:
          'Algunos analgésicos y otros medicamentos pueden resultar muy tóxicos.'
      },
      {
        nombre: 'Productos de limpieza',
        texto:
          'Pueden provocar intoxicaciones y lesiones según sus ingredientes.'
      },
      {
        nombre: 'Insecticidas y venenos',
        texto:
          'Pueden causar intoxicaciones graves incluso en pequeñas cantidades.'
      },
      {
        nombre: 'Anticongelantes',
        texto:
          'Algunas formulaciones contienen sustancias altamente tóxicas.'
      }
    ]
  }
}

// ======================================
// COMPONENTE PRINCIPAL
// ======================================

function AlertasEmergencia() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [categoria, setCategoria] = useState('alimentos')

  const emergencia = emergencias.find(
    (item) => item.id === seleccionada
  )

  function abrirGuia(id) {
    setSeleccionada(id)
    setCategoria('alimentos')
    window.scrollTo(0, 0)
  }

  function volver() {
    setSeleccionada(null)
    window.scrollTo(0, 0)
  }

  // ======================================
  // PÁGINA PRINCIPAL DE ALERTAS
  // ======================================

  if (!emergencia) {
    return (
      <section className="alertas-emergencia">
        <div className="alertas-contenedor">

          <div className="alertas-encabezado">
            <span className="section-tag">
              CUIDADO Y SEGURIDAD
            </span>

            <h1>
              ¿Qué hacer ante una emergencia?
            </h1>

            <p>
              Aprende cómo actuar ante situaciones
              que pueden poner en riesgo la salud
              de tu mascota.
            </p>
          </div>

          <div className="alertas-advertencia">
            <strong>
              Ante una emergencia, busca atención veterinaria.
            </strong>

            <p>
              Estas guías entregan medidas iniciales
              y no reemplazan la evaluación de
              un profesional.
            </p>
          </div>

          <div className="alertas-grid">
            {emergencias.map((item) => (
              <article
                className="alertas-card"
                key={item.id}
              >
                <img
                  src={item.imagen}
                  alt={`Imagen de ${item.titulo}`}
                  className="alertas-card-imagen"
                />

                <div className="alertas-card-contenido">
                  <h2>{item.titulo}</h2>

                  <p>{item.subtitulo}</p>

                  <button
                    type="button"
                    onClick={() => abrirGuia(item.id)}
                  >
                    Ver guía
                    <span aria-hidden="true"> →</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    )
  }

  // ======================================
  // GUÍA SELECCIONADA
  // ======================================

  return (
    <section className="alertas-emergencia">
      <div className="alertas-detalle">

        <button
          type="button"
          className="alertas-volver"
          onClick={volver}
        >
          ← Volver a Alertas
        </button>

        <img
          src={emergencia.imagen}
          alt={`Imagen de ${emergencia.titulo}`}
          className="alertas-detalle-imagen"
        />

        <div className="alertas-detalle-encabezado">
          <span className="section-tag">
            GUÍA DE EMERGENCIA
          </span>

          <h1>{emergencia.titulo}</h1>

          <p>{emergencia.descripcion}</p>
        </div>

        {/* QUÉ HACER */}

        <div className="alertas-pasos">
          <h2>Qué hacer</h2>

          <ol>
            {emergencia.hacer.map((paso, index) => (
              <li key={index}>{paso}</li>
            ))}
          </ol>
        </div>

        {/* QUÉ EVITAR */}

        <div className="alertas-evitar">
          <h2>Qué evitar</h2>

          <ul>
            {emergencia.evitar.map((paso, index) => (
              <li key={index}>{paso}</li>
            ))}
          </ul>
        </div>

        {/* INTOXICACIONES INTERACTIVAS */}

        {emergencia.id === 'intoxicacion' && (
          <div className="alertas-intoxicaciones">
            <h2>
              ¿Qué pudo haber ingerido?
            </h2>

            <p>
              Selecciona una categoría para
              conocer algunas sustancias peligrosas.
            </p>

            <div className="alertas-categorias">
              {[
                ['alimentos', 'Alimentos'],
                ['plantas', 'Plantas'],
                ['productos', 'Productos']
              ].map(([id, nombre]) => (
                <button
                  type="button"
                  key={id}
                  className={
                    categoria === id ? 'activo' : ''
                  }
                  aria-pressed={categoria === id}
                  onClick={() => setCategoria(id)}
                >
                  {nombre}
                </button>
              ))}
            </div>

            <div className="alertas-categoria-contenido">
              <h3>
                {categorias[categoria].titulo}
              </h3>

              <p>
                {categorias[categoria].descripcion}
              </p>

              <div className="alertas-alimentos-grid">
                {categorias[categoria].elementos.map(
                  (elemento) => (
                    <div
                      className="alertas-alimento"
                      key={elemento.nombre}
                    >
                      <h4>{elemento.nombre}</h4>

                      <p>{elemento.texto}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <div className="alertas-aviso-final">
          <h3>Recuerda</h3>

          <p>
            Ante una posible intoxicación,
            dificultad para respirar, colapso,
            hemorragia intensa o convulsiones
            prolongadas, busca atención
            veterinaria inmediata.
          </p>
        </div>

      </div>
    </section>
  )
}

export default AlertasEmergencia
