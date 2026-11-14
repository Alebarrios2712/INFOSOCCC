import { useRef, useState } from 'react'
import './AsistenteConductas.css'

// SITUACIONES FRECUENTES
// tipos: ['perro'], ['gato'] o ['perro', 'gato']

const situaciones = [
  {
    id: 'se-esconde',
    tipos: ['perro', 'gato'],
    emoji: '🫣',
    titulo: 'Se esconde y evita el contacto',
    resumen: 'Se mete bajo la cama o se aleja cuando te acercas',
    porQue:
      'Todo es nuevo: olores, ruidos y personas. Esconderse es su forma de sentirse seguro mientras entiende dónde está.',
    hacer: [
      'Déjale un rincón tranquilo con agua, comida y una cama o caja donde pueda refugiarse.',
      'Siéntate cerca, sin mirarlo fijamente ni intentar tocarlo, y háblale suave.',
      'Deja premios o comida cerca de ti para que se acerque cuando quiera.',
      'Mantén horarios fijos y pocas visitas durante los primeros días.'
    ],
    evitar: [
      'Sacarlo a la fuerza de su escondite.',
      'Abrazarlo o cargarlo cuando todavía no te busca.',
      'Presentarle a muchas personas de una vez.'
    ],
    veterinario: [
      'Pasa más de 24 horas sin comer (gatos) o más de 48 (perros), o no bebe agua en todo un día.',
      'Después de dos o tres semanas no muestra ningún avance.'
    ]
  },
  {
    id: 'no-come',
    tipos: ['perro', 'gato'],
    emoji: '🍽️',
    titulo: 'Come poco o no quiere comer',
    resumen: 'Deja el plato casi lleno o come muy lento',
    porQue:
      'El estrés del cambio puede quitarle el apetito los primeros días. También influye si el alimento es distinto al que conocía.',
    hacer: [
      'Averigua qué comía antes y ofrécele lo mismo al comienzo.',
      'Si cambias el alimento, mézclalo poco a poco durante 7 a 10 días.',
      'Sírvelo en un lugar tranquilo, lejos del tránsito y de otras mascotas.',
      'Entibia un poco la comida húmeda para que huela más.'
    ],
    evitar: [
      'Darle comida de la mesa solo para que coma algo.',
      'Cambiar de marca todos los días buscando cuál le gusta.',
      'Quedarte mirándolo mientras come.'
    ],
    veterinario: [
      'Pasa más de 24 horas sin comer (gatos) o más de 48 (perros).',
      'Además tiene vómitos, diarrea, decaimiento o no toma agua.'
    ]
  },
  {
    id: 'llora-solo',
    tipos: ['perro'],
    emoji: '😢',
    titulo: 'Llora o ladra cuando se queda solo',
    resumen: 'Gime, ladra o te sigue a todas partes',
    porQue:
      'Todavía no sabe que vas a volver. Se siente inseguro lejos de las personas con quienes está creando vínculo.',
    hacer: [
      'Acostúmbralo a separaciones muy cortas y alárgalas poco a poco.',
      'Paséalo y juega con él antes de salir para que esté tranquilo.',
      'Déjale un juguete relleno de comida o un mordedor para entretenerse.',
      'Sal y vuelve sin despedidas ni saludos exagerados.'
    ],
    evitar: [
      'Retarlo o castigarlo por ladrar o llorar.',
      'Dejarlo muchas horas solo apenas llega.'
    ],
    veterinario: [
      'Destruye puertas o ventanas, se lastima o intenta escapar.',
      'Jadea mucho, saliva o se orina cada vez que te vas.'
    ]
  },
  {
    id: 'necesidades-casa',
    tipos: ['perro'],
    emoji: '💧',
    titulo: 'Hace sus necesidades dentro de casa',
    resumen: 'Orina o defeca en el piso aunque salga a pasear',
    porQue:
      'Aún no conoce las reglas de tu casa y, con el estrés, puede costarle aguantar. Es muy común los primeros días.',
    hacer: [
      'Sácalo después de comer, al despertar y tras jugar, siempre al mismo lugar.',
      'Prémialo con un snack y cariño apenas termine afuera.',
      'Supervísalo en casa y llévalo afuera si olfatea en círculos.',
      'Limpia los accidentes con un limpiador enzimático para quitar el olor.'
    ],
    evitar: [
      'Retarlo después del hecho: no entiende por qué.',
      'Frotarle el hocico en el lugar o gritarle.'
    ],
    veterinario: [
      'Orina con mucha frecuencia, con esfuerzo o con sangre.',
      'Tiene diarrea por más de un día.'
    ]
  },
  {
    id: 'muerde',
    tipos: ['perro'],
    emoji: '🦴',
    titulo: 'Muerde manos, zapatos o muebles',
    resumen: 'Mordisquea todo lo que encuentra',
    porQue:
      'Morder es una forma de explorar y de aliviar el estrés, sobre todo en cachorros o perros con mucha energía.',
    hacer: [
      'Ofrécele mordedores apropiados y elógialo cuando los use.',
      'Si muerde tus manos, detén el juego un momento y retómalo con un juguete.',
      'Dale paseos y juego a diario para gastar energía.',
      'Guarda zapatos y cables fuera de su alcance mientras aprende.'
    ],
    evitar: [
      'Jugar con las manos como si fueran juguetes.',
      'Golpearlo o castigarlo físicamente.'
    ],
    veterinario: [
      'Gruñe o muerde cuando lo tocas en una zona concreta: puede haber dolor.',
      'Sus mordidas lastiman o son cada vez más fuertes. Pide ayuda a un adiestrador que use refuerzo positivo.'
    ]
  },
  {
    id: 'miedo-paseo',
    tipos: ['perro'],
    emoji: '🦮',
    titulo: 'Tiene miedo en los paseos',
    resumen: 'Se paraliza, tira de la correa o quiere volver',
    porQue:
      'La calle tiene ruidos, olores y personas que no conoce. Algunos perros necesitan tiempo para sentirse seguros afuera.',
    hacer: [
      'Empieza con paseos cortos, en lugares tranquilos y a horas de poco tránsito.',
      'Usa un arnés bien ajustado y una chapa con tus datos: un perro asustado puede escaparse.',
      'Déjalo olfatear y detenerse; prémialo cuando avance con calma.',
      'Si se asusta, aléjate con calma hasta que se tranquilice.'
    ],
    evitar: [
      'Arrastrarlo o tirar de la correa.',
      'Acercarlo a la fuerza a lo que le da miedo.'
    ],
    veterinario: [
      'Se niega a salir por completo después de varias semanas.',
      'Tiembla, jadea o intenta huir en cada paseo.'
    ]
  },
  {
    id: 'arenero',
    tipos: ['gato'],
    emoji: '🧺',
    titulo: 'No usa el arenero',
    resumen: 'Hace sus necesidades fuera de la caja',
    porQue:
      'Puede no gustarle la arena, el lugar o la limpieza del arenero, o estar estresado por el cambio.',
    hacer: [
      'Pon el arenero en un lugar tranquilo, lejos de su comida y su agua.',
      'Usa la misma arena que tenía antes y retira los residuos todos los días.',
      'Llévalo al arenero después de comer o al despertar.',
      'Limpia los accidentes con un limpiador enzimático.'
    ],
    evitar: [
      'Retarlo o castigarlo.',
      'Cambiar de arena de golpe o usar limpiadores de olor muy fuerte en la caja.'
    ],
    veterinario: [
      'Orina muy seguido o en pequeñas cantidades.',
      'Hay sangre en la orina o tiene diarrea por más de un día.'
    ],
    urgencia:
      'Si va al arenero, hace esfuerzo y no logra orinar, llévalo al veterinario de inmediato. Es una urgencia, sobre todo en machos.'
  },
  {
    id: 'rasguna',
    tipos: ['gato'],
    emoji: '🛋️',
    titulo: 'Rasguña sofás y cortinas',
    resumen: 'Afila sus uñas en los muebles',
    porQue:
      'Rascar es natural: estira sus músculos, marca territorio y lo ayuda a sentirse seguro.',
    hacer: [
      'Pon un rascador firme y alto junto al mueble que rasguña.',
      'Prueba distintas texturas, como cuerda de sisal o cartón.',
      'Prémialo cada vez que use el rascador.',
      'Cubre el mueble por un tiempo con cinta doble cara o una manta.'
    ],
    evitar: [
      'Gritarle o rociarlo con agua.',
      'Quitarle las uñas: es una cirugía dolorosa y dañina.'
    ],
    veterinario: [
      'Sus uñas se ven rotas, muy largas o inflamadas.',
      'Cojea o se lame las patas con insistencia.'
    ]
  },
  {
    id: 'maulla-noche',
    tipos: ['gato'],
    emoji: '🌙',
    titulo: 'Maúlla o corre de noche',
    resumen: 'Te despierta con maullidos o carreras',
    porQue:
      'Los gatos son más activos al amanecer y al anochecer. En un lugar nuevo, además, pueden estar inquietos.',
    hacer: [
      'Juega activamente con él unos 15 minutos antes de dormir.',
      'Dale la última comida justo antes de acostarte.',
      'Déjale juguetes, un rascador y una ventana segura donde mirar.',
      'No le respondas cuando maúlla pidiendo atención, y premia los momentos de calma.'
    ],
    evitar: [
      'Darle comida cada vez que maúlla de noche.',
      'Gritarle: lo estresa y no entiende el motivo.'
    ],
    veterinario: [
      'Maúlla de forma nueva o muy fuerte, o parece desorientado.',
      'Toma mucha agua, adelgaza o parece tener dolor.'
    ]
  },
  {
    id: 'bufa',
    tipos: ['gato'],
    emoji: '😾',
    titulo: 'Bufa, gruñe o araña',
    resumen: 'Se pone a la defensiva cuando te acercas',
    porQue:
      'Es su forma de pedir espacio cuando se siente amenazado. Casi siempre es miedo, no maldad.',
    hacer: [
      'Dale espacio y aléjate con calma cuando bufe.',
      'Evita mirarlo fijo y agáchate de lado para parecer menos amenazante.',
      'Ofrécele premios y juega con una caña para mantener la distancia.',
      'Deja que sea él quien se acerque y te huela primero.'
    ],
    evitar: [
      'Castigarlo o gritarle.',
      'Acorralarlo o tomarlo en brazos cuando está tenso.'
    ],
    veterinario: [
      'Ataca de repente sin motivo claro o cuando lo tocas en una zona concreta.',
      'Los arañazos o mordidas son frecuentes o profundos.'
    ]
  }
]

// COMPONENTE

function AsistenteConductas({ irAlDiario, situacionInicial = null }) {
  const [tipo, setTipo] = useState('perro')
  const [seleccionada, setSeleccionada] = useState(situacionInicial)
  const [probados, setProbados] = useState({})
  const panelRef = useRef(null)

  const visibles = situaciones.filter((situacion) =>
    situacion.tipos.includes(tipo)
  )

  const actual =
    visibles.find((situacion) => situacion.id === seleccionada) || null

  const total = actual ? actual.hacer.length : 0
  const hechos = actual
    ? actual.hacer.filter((_, indice) => probados[`${actual.id}-${indice}`])
        .length
    : 0

  function elegirSituacion(id) {
    setSeleccionada(id)

    // En pantallas pequeñas, lleva la vista al detalle
    if (window.matchMedia('(max-width: 860px)').matches) {
      const sinMovimiento = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      panelRef.current?.scrollIntoView({
        behavior: sinMovimiento ? 'auto' : 'smooth',
        block: 'start'
      })
    }
  }

  function marcarPaso(clave) {
    setProbados((anteriores) => ({
      ...anteriores,
      [clave]: !anteriores[clave]
    }))
  }

  return (
    <section className="asistente-section" id="guia-practica">
      <div className="asistente-container">
        <header className="asistente-heading">
          <span className="section-tag">GUÍA PRÁCTICA</span>

          <h2>Y si tu mascota hace esto, ¿qué hago?</h2>

          <p>
            Ya conoces el significado de sus conductas. Ahora elige una
            situación para ver qué puedes hacer, qué conviene evitar y
            cuándo consultar.
          </p>
        </header>

        <div
          className="asistente-tipo"
          role="group"
          aria-label="Tipo de mascota"
        >
          {[
            ['perro', '🐶 Perro'],
            ['gato', '🐱 Gato']
          ].map(([valor, etiqueta]) => (
            <button
              key={valor}
              type="button"
              className={
                tipo === valor
                  ? 'asistente-tipo-btn activo'
                  : 'asistente-tipo-btn'
              }
              aria-pressed={tipo === valor}
              onClick={() => setTipo(valor)}
            >
              {etiqueta}
            </button>
          ))}
        </div>

        <div className="asistente-layout">
          {/* LISTA DE SITUACIONES */}

          <ul className="asistente-lista" aria-label="Situaciones frecuentes">
            {visibles.map((situacion) => (
              <li key={situacion.id}>
                <button
                  type="button"
                  className={
                    seleccionada === situacion.id
                      ? 'asistente-situacion activa'
                      : 'asistente-situacion'
                  }
                  aria-pressed={seleccionada === situacion.id}
                  onClick={() => elegirSituacion(situacion.id)}
                >
                  <span className="asistente-emoji" aria-hidden="true">
                    {situacion.emoji}
                  </span>

                  <span>
                    <strong>{situacion.titulo}</strong>
                    <small>{situacion.resumen}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* DETALLE */}

          <div className="asistente-panel" ref={panelRef} aria-live="polite">
            {actual ? (
              <article key={actual.id}>
                <h3>{actual.titulo}</h3>

                <p className="asistente-porque">
                  <strong>Por qué puede pasar:</strong> {actual.porQue}
                </p>

                <section className="asistente-bloque">
                  <h4>Qué puedes hacer</h4>

                  <p className="asistente-ayuda">
                    Marca cada paso cuando lo hayas probado.
                  </p>

                  <div
                    className="asistente-progreso"
                    role="progressbar"
                    aria-label="Pasos probados"
                    aria-valuemin={0}
                    aria-valuemax={total}
                    aria-valuenow={hechos}
                  >
                    <span style={{ width: `${(hechos / total) * 100}%` }} />
                  </div>

                  <p className="asistente-contador">
                    {hechos} de {total} pasos probados
                  </p>

                  <ul className="asistente-pasos">
                    {actual.hacer.map((paso, indice) => {
                      const clave = `${actual.id}-${indice}`

                      return (
                        <li key={clave}>
                          <label>
                            <input
                              type="checkbox"
                              checked={Boolean(probados[clave])}
                              onChange={() => marcarPaso(clave)}
                            />
                            <span>{paso}</span>
                          </label>
                        </li>
                      )
                    })}
                  </ul>

                  {hechos === total && (
                    <p className="asistente-exito">
                      Ya probaste todos los pasos. Dale unos días: los
                      cambios de conducta toman tiempo. Si no ves mejoras,
                      consulta con un profesional.
                    </p>
                  )}
                </section>

                <section className="asistente-bloque asistente-evitar">
                  <h4>Qué conviene evitar</h4>

                  <ul>
                    {actual.evitar.map((texto) => (
                      <li key={texto}>{texto}</li>
                    ))}
                  </ul>
                </section>

                <section className="asistente-bloque asistente-vet">
                  <h4>Cuándo consultar al veterinario</h4>

                  <ul>
                    {actual.veterinario.map((texto) => (
                      <li key={texto}>{texto}</li>
                    ))}
                  </ul>

                  {actual.urgencia && (
                    <p className="asistente-urgencia">
                      <strong>Urgente:</strong> {actual.urgencia}
                    </p>
                  )}
                </section>

                {irAlDiario && (
                  <div className="asistente-cierre">
                    <p>
                      Anota en el diario cómo responde cada día para ver su
                      evolución.
                    </p>

                    <button type="button" onClick={irAlDiario}>
                      Ir al diario
                    </button>
                  </div>
                )}
              </article>
            ) : (
              <div className="asistente-vacio">
                <span aria-hidden="true">🐾</span>
                <h3>Elige una situación</h3>
                <p>
                  Te mostraremos pasos concretos para acompañar a tu{' '}
                  {tipo === 'perro' ? 'perro' : 'gato'}.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="asistente-nota">
          Esta información es orientativa y no reemplaza la evaluación de un
          veterinario. Si tu mascota empeora o notas algo que te preocupa,
          busca atención profesional.
        </p>
      </div>
    </section>
  )
}

export default AsistenteConductas
