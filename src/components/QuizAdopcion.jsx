import { useRef, useState } from 'react'
import './QuizAdopcion.css'
import imagenAlto from '../assets/quiz-alto.jpg'
import imagenMedio from '../assets/quiz-medio.jpg'
import imagenBajo from '../assets/quiz-bajo.jpg'

// ÁREAS Y CONSEJOS

const areas = {
  dinero: {
    emoji: '💰',
    nombre: 'Dinero',
    consejo:
      'Calcula un presupuesto mensual (alimento, higiene, arena) y arma un fondo de emergencia veterinaria. Averigua si tu municipio tiene campañas de vacunación o esterilización de bajo costo.'
  },
  tiempo: {
    emoji: '⏰',
    nombre: 'Tiempo',
    consejo:
      'Revisa tu rutina semanal y reserva espacios fijos para paseo y juego. Si pasas muchas horas fuera, piensa en apoyo de familiares, un paseador o una mascota adulta y tranquila.'
  },
  disposicion: {
    emoji: '💛',
    nombre: 'Disposición',
    consejo:
      'Conversa con las personas con quienes vives, repartan las tareas y piensa cómo serían los próximos 10 años. Ser hogar temporal por unas semanas es una buena forma de probar la experiencia.'
  }
}

// PREGUNTAS
// Cada opción suma 2, 1 o 0 puntos. "alerta" se muestra si se elige 0 puntos.

const preguntas = [
  {
    id: 'presupuesto',
    area: 'dinero',
    texto:
      '¿Cómo cubrirías los gastos mensuales de tu mascota (alimento, higiene, arena)?',
    opciones: [
      { texto: 'Ya calculé un presupuesto mensual', puntos: 2 },
      { texto: 'Creo que podría, pero no lo he calculado', puntos: 1 },
      { texto: 'No sé cuánto cuesta', puntos: 0 }
    ]
  },
  {
    id: 'emergencias',
    area: 'dinero',
    texto: 'Si surge un gasto veterinario inesperado, ¿qué harías?',
    opciones: [
      { texto: 'Tengo ahorros o un plan para emergencias', puntos: 2 },
      { texto: 'Podría reunir el dinero con ayuda o esfuerzo', puntos: 1 },
      { texto: 'No podría cubrirlo', puntos: 0 }
    ]
  },
  {
    id: 'salud-preventiva',
    area: 'dinero',
    texto:
      'Vacunas, desparasitación, controles y esterilización forman parte del cuidado. ¿Los consideraste?',
    opciones: [
      { texto: 'Sí, ya los incluí en mi presupuesto', puntos: 2 },
      { texto: 'Sé que existen, pero no los he considerado', puntos: 1 },
      { texto: 'No sabía que eran necesarios', puntos: 0 }
    ]
  },
  {
    id: 'tiempo-diario',
    area: 'tiempo',
    texto:
      '¿Cuánto tiempo al día podrías dedicarle a paseos, juego y compañía?',
    opciones: [
      { texto: 'Más de 2 horas', puntos: 2 },
      { texto: 'Cerca de 1 hora', puntos: 1 },
      { texto: 'Menos de 1 hora', puntos: 0 }
    ]
  },
  {
    id: 'soledad',
    area: 'tiempo',
    texto: '¿Cuánto tiempo pasaría sola en casa?',
    opciones: [
      { texto: 'Poco, o casi siempre habría alguien', puntos: 2 },
      { texto: 'Medio día de forma frecuente', puntos: 1 },
      { texto: 'Más de 8 horas casi todos los días', puntos: 0 }
    ]
  },
  {
    id: 'primeros-meses',
    area: 'tiempo',
    texto:
      'Los primeros meses requieren más dedicación: adaptación, veterinario y aprendizaje. ¿Cómo lo organizarías?',
    opciones: [
      { texto: 'Ya organicé mi agenda para esa etapa', puntos: 2 },
      { texto: 'Podría hacerlo con algo de esfuerzo', puntos: 1 },
      { texto: 'No tengo cómo hacerlo', puntos: 0 }
    ]
  },
  {
    id: 'largo-plazo',
    area: 'disposicion',
    texto:
      'Una mascota puede vivir entre 10 y 20 años. ¿Estás preparado para acompañarla todo ese tiempo?',
    opciones: [
      {
        texto: 'Sí, y ya pensé en cambios futuros como mudanzas o estudios',
        puntos: 2
      },
      { texto: 'Creo que sí, pero no lo he pensado a fondo', puntos: 1 },
      { texto: 'No estoy seguro', puntos: 0 }
    ],
    alerta:
      'Una mascota puede vivir entre 10 y 20 años. Tómate el tiempo que necesites para decidir con calma.'
  },
  {
    id: 'paciencia',
    area: 'disposicion',
    texto:
      'Si ensucia, rompe cosas o le cuesta adaptarse, ¿cómo reaccionarías?',
    opciones: [
      {
        texto: 'Con paciencia, buscando ayuda profesional si hace falta',
        puntos: 2
      },
      { texto: 'Me costaría, pero lo intentaría', puntos: 1 },
      { texto: 'Probablemente me frustraría mucho', puntos: 0 }
    ]
  },
  {
    id: 'hogar',
    area: 'disposicion',
    texto: '¿Las personas con quienes vives están de acuerdo con adoptar?',
    ayuda: 'Si vives solo o sola, elige la primera opción.',
    opciones: [
      { texto: 'Todos están de acuerdo y repartiremos las tareas', puntos: 2 },
      { texto: 'Algunos tienen dudas', puntos: 1 },
      { texto: 'No lo hemos conversado o alguien se opone', puntos: 0 }
    ],
    alerta:
      'Antes de adoptar, conversa con las personas con quienes vives. Una mascota es una decisión de todo el hogar.'
  }
]

const cantidad = preguntas.length
const puntajeMaximo = cantidad * 2

// FUNCIONES DE RESULTADO

function calcularResultado(elegidas) {
  const porArea = { dinero: 0, tiempo: 0, disposicion: 0 }
  const alertas = []

  preguntas.forEach((pregunta, indice) => {
    const puntos = pregunta.opciones[elegidas[indice]]?.puntos ?? 0

    porArea[pregunta.area] += puntos

    if (pregunta.alerta && puntos === 0) {
      alertas.push(pregunta.alerta)
    }
  })

  const puntos = porArea.dinero + porArea.tiempo + porArea.disposicion

  return { porArea, alertas, puntos }
}

function maximoDeArea(clave) {
  return preguntas.filter((pregunta) => pregunta.area === clave).length * 2
}

function nivelGeneral(puntos) {
  if (puntos >= 15) {
    return {
      emoji: '🌟',
      imagen: imagenAlto,
      alt: 'Un perro y un gato felices junto a un corazón',
      titulo: 'Estás muy preparado',
      texto:
        'Tu situación es sólida para dar el paso. Revisa la guía de primeros días para preparar tu hogar.'
    }
  }

  if (puntos >= 10) {
    return {
      emoji: '🌱',
      imagen: imagenMedio,
      alt: 'Un perro esperanzado mira una lista de pendientes casi completa',
      titulo: 'Casi listo',
      texto:
        'Tienes buenas bases, pero conviene reforzar algunos puntos antes de adoptar. Mira los consejos de más abajo.'
    }
  }

  return {
    emoji: '🤍',
    imagen: imagenBajo,
    alt: 'Un gato durmiendo tranquilo sobre un cojín',
    titulo: 'Todavía no es el momento',
    texto:
      'Prepararte hoy puede cambiar mucho la vida de tu futura mascota. Revisa los consejos y vuelve a intentarlo cuando lo sientas.'
  }
}

// COMPONENTE
// paso: -1 = introducción, 0 a (cantidad - 1) = preguntas, cantidad = resultado

function QuizAdopcion({ irAPrimeros, irAlDiario, empezarDirecto = false }) {
  const [paso, setPaso] = useState(empezarDirecto ? 0 : -1)
  const [elegidas, setElegidas] = useState(() => preguntas.map(() => null))
  const tituloRef = useRef(null)

  const enIntro = paso === -1
  const enResultado = paso === cantidad
  const pregunta = !enIntro && !enResultado ? preguntas[paso] : null

  function irA(nuevoPaso) {
    setPaso(nuevoPaso)

    // Lleva el foco al título para lectores de pantalla y teclado
    requestAnimationFrame(() => {
      tituloRef.current?.focus()
    })
  }

  function elegir(indiceOpcion) {
    setElegidas((anteriores) =>
      anteriores.map((valor, indice) =>
        indice === paso ? indiceOpcion : valor
      )
    )
  }

  function reiniciar() {
    setElegidas(preguntas.map(() => null))
    irA(-1)
  }

  const resultado = enResultado ? calcularResultado(elegidas) : null
  const nivel = resultado ? nivelGeneral(resultado.puntos) : null

  const areasPorReforzar = resultado
    ? Object.keys(areas).filter((clave) => resultado.porArea[clave] <= 3)
    : []

  return (
    <section className="quiz-section" id="quiz-adopcion">
      <div className="quiz-card">
        {/* INTRODUCCIÓN */}

        {enIntro && (
          <div className="quiz-intro">
            <span className="section-tag">ANTES DE ADOPTAR</span>

            <h2 ref={tituloRef} tabIndex={-1}>
              ¿Estás listo para adoptar?
            </h2>

            <p>
              Responde {cantidad} preguntas rápidas sobre dinero, tiempo y
              disposición. No hay respuestas buenas o malas: es una forma de
              reflexionar antes de dar el paso.
            </p>

            <ul className="quiz-chips" aria-label="Áreas del test">
              {Object.values(areas).map((area) => (
                <li key={area.nombre}>
                  <span aria-hidden="true">{area.emoji}</span> {area.nombre}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="quiz-primario"
              onClick={() => irA(0)}
            >
              Hacer el test (2 min)
            </button>

            <p className="quiz-nota">
              Es orientativo y no reemplaza el proceso de adopción de cada
              refugio u organización.
            </p>
          </div>
        )}

        {/* PREGUNTAS */}

        {pregunta && (
          <div className="quiz-pregunta">
            <div className="quiz-encabezado">
              <span>
                Pregunta {paso + 1} de {cantidad}
              </span>

              <span className="quiz-area">
                <span aria-hidden="true">{areas[pregunta.area].emoji}</span>{' '}
                {areas[pregunta.area].nombre}
              </span>
            </div>

            <div
              className="quiz-barra"
              role="progressbar"
              aria-label="Avance del test"
              aria-valuemin={1}
              aria-valuemax={cantidad}
              aria-valuenow={paso + 1}
            >
              <span style={{ width: `${((paso + 1) / cantidad) * 100}%` }} />
            </div>

            <h3 id="quiz-titulo-pregunta" ref={tituloRef} tabIndex={-1}>
              {pregunta.texto}
            </h3>

            {pregunta.ayuda && (
              <p className="quiz-ayuda">{pregunta.ayuda}</p>
            )}

            <div
              className="quiz-opciones"
              role="radiogroup"
              aria-labelledby="quiz-titulo-pregunta"
            >
              {pregunta.opciones.map((opcion, indice) => (
                <label
                  key={opcion.texto}
                  className={
                    elegidas[paso] === indice
                      ? 'quiz-opcion elegida'
                      : 'quiz-opcion'
                  }
                >
                  <input
                    type="radio"
                    name={`quiz-${pregunta.id}`}
                    checked={elegidas[paso] === indice}
                    onChange={() => elegir(indice)}
                  />

                  <span>{opcion.texto}</span>
                </label>
              ))}
            </div>

            <div className="quiz-acciones">
              <button
                type="button"
                className="quiz-secundario"
                onClick={() => irA(paso - 1)}
              >
                ← Atrás
              </button>

              <button
                type="button"
                className="quiz-primario"
                disabled={elegidas[paso] === null}
                onClick={() => irA(paso + 1)}
              >
                {paso === cantidad - 1 ? 'Ver resultado' : 'Siguiente →'}
              </button>
            </div>
          </div>
        )}

        {/* RESULTADO */}

        {resultado && nivel && (
          <div className="quiz-resultado">
            <img
              className="quiz-imagen"
              src={nivel.imagen}
              alt={nivel.alt}
              width="320"
              height="240"
            />

            <p className="quiz-puntaje">
              {resultado.puntos}
              <small> de {puntajeMaximo} puntos</small>
            </p>

            <h3 ref={tituloRef} tabIndex={-1}>
              <span aria-hidden="true">{nivel.emoji}</span> {nivel.titulo}
            </h3>

            <p className="quiz-mensaje">{nivel.texto}</p>

            {resultado.alertas.map((alerta) => (
              <p className="quiz-alerta" role="note" key={alerta}>
                <strong>Importante:</strong> {alerta}
              </p>
            ))}

            <div className="quiz-areas">
              {Object.entries(areas).map(([clave, area]) => {
                const puntos = resultado.porArea[clave]
                const maximo = maximoDeArea(clave)
                const porReforzar = puntos <= 3

                return (
                  <div
                    key={clave}
                    className={
                      porReforzar ? 'quiz-fila por-reforzar' : 'quiz-fila'
                    }
                  >
                    <div className="quiz-fila-texto">
                      <strong>
                        <span aria-hidden="true">{area.emoji}</span>{' '}
                        {area.nombre}
                      </strong>

                      <span>
                        {porReforzar ? 'Por reforzar' : 'Bien encaminado'} ·{' '}
                        {puntos} de {maximo}
                      </span>
                    </div>

                    <div className="quiz-fila-barra" aria-hidden="true">
                      <span style={{ width: `${(puntos / maximo) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {areasPorReforzar.length > 0 && (
              <div className="quiz-consejos">
                <h4>Para reforzar antes de adoptar</h4>

                <ul>
                  {areasPorReforzar.map((clave) => (
                    <li key={clave}>
                      <strong>{areas[clave].nombre}:</strong>{' '}
                      {areas[clave].consejo}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="quiz-acciones quiz-acciones-final">
              {irAPrimeros && (
                <button
                  type="button"
                  className="quiz-primario"
                  onClick={irAPrimeros}
                >
                  Ver guía de primeros días
                </button>
              )}

              {irAlDiario && resultado.puntos >= 10 && (
                <button
                  type="button"
                  className="quiz-secundario"
                  onClick={irAlDiario}
                >
                  Crear mi diario
                </button>
              )}

              <button
                type="button"
                className="quiz-secundario"
                onClick={reiniciar}
              >
                Repetir el test
              </button>
            </div>

            <p className="quiz-nota">
              Este resultado es orientativo. La decisión final de una adopción
              la toma cada refugio u organización.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default QuizAdopcion
