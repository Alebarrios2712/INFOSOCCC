
import { useEffect, useState } from 'react'
import familiaImage from '../assets/fam.jpg'
import './PrimerosDias.css'

// ========================================
// CHECKLIST PARA PREPARAR EL HOGAR
// ========================================

const preparacion = {
  perro: [
    'Cama o manta en un lugar tranquilo',
    'Platos de comida y agua fresca',
    'Alimento adecuado y conocido',
    'Arnés, correa e identificación',
    'Juguetes y mordedores seguros',
    'Cables, medicamentos y productos peligrosos fuera de alcance'
  ],
  gato: [
    'Habitación tranquila y segura',
    'Comida y agua en lugares separados',
    'Arenero alejado de la comida',
    'Caja o escondite donde refugiarse',
    'Rascador, juguetes y transportadora',
    'Ventanas protegidas y productos peligrosos fuera de alcance'
  ]
}

// ========================================
// GUÍA PARA LOS PRIMEROS SIETE DÍAS
// ========================================

const dias = [
  {
    numero: 1,
    titulo: 'Una bienvenida tranquila',
    descripcion:
      'El primer día se trata de llegar, descansar y comenzar a sentirse seguro.',
    perro: [
      'Muéstrale su cama, el agua y el lugar donde comerá.',
      'Permítele explorar un espacio seguro sin forzarlo.',
      'Evita las visitas y las presentaciones multitudinarias.'
    ],
    gato: [
      'Lleva su transportadora a la habitación segura y abre la puerta.',
      'Deja que salga de la transportadora cuando quiera.',
      'Muéstrale dónde están el agua, la comida y el arenero.'
    ],
    consejo:
      'Que se esconda, duerma mucho o esté reservado no significa que la adopción vaya mal.'
  },
  {
    numero: 2,
    titulo: 'Conocer su espacio',
    descripcion:
      'Un entorno predecible ayuda a reducir la inseguridad.',
    perro: [
      'Mantén los mismos lugares para comer y descansar.',
      'Acompaña una exploración tranquila de la casa.',
      'Observa su apetito, hidratación y necesidades.'
    ],
    gato: [
      'Mantén disponible su escondite y su habitación segura.',
      'Revisa que coma, beba agua y use el arenero.',
      'Si está tranquilo, siéntate cerca sin obligarlo a interactuar.'
    ],
    consejo:
      'No es necesario mostrarle toda la casa de inmediato.'
  },
  {
    numero: 3,
    titulo: 'Construir confianza',
    descripcion:
      'El vínculo se fortalece con experiencias positivas y respetando sus límites.',
    perro: [
      'Háblale con calma y premia los acercamientos voluntarios.',
      'Invítalo a jugar suavemente si demuestra interés.',
      'Permite que descanse sin interrupciones.'
    ],
    gato: [
      'Deja que se acerque por iniciativa propia.',
      'Ofrécele un juguete tipo caña si muestra interés.',
      'Evita sacarlo de sus escondites o cargarlo a la fuerza.'
    ],
    consejo:
      'No todos los animales expresan cariño buscando contacto físico.'
  },
  {
    numero: 4,
    titulo: 'Crear rutinas',
    descripcion:
      'La constancia ayuda a comprender qué esperar de su nuevo hogar.',
    perro: [
      'Establece horarios habituales de alimentación.',
      'Organiza salidas para sus necesidades según su edad y estado de salud.',
      'Refuerza con premios y cariño las conductas deseadas.'
    ],
    gato: [
      'Mantén horarios de alimentación relativamente estables.',
      'Limpia el arenero y revisa que esté en un lugar tranquilo.',
      'Conserva sus lugares habituales de descanso y refugio.'
    ],
    consejo:
      'Evita cambios bruscos de alimento y pregunta al veterinario cómo realizar una transición.'
  },
  {
    numero: 5,
    titulo: 'Jugar y explorar',
    descripcion:
      'Las actividades positivas pueden ayudar, pero deben ajustarse a la confianza de cada mascota.',
    perro: [
      'Propón juegos cortos con juguetes adecuados.',
      'Permite que olfatee y explore espacios seguros.',
      'Respeta las pausas y las señales de cansancio.'
    ],
    gato: [
      'Ofrécele juguetes que pueda perseguir sin utilizar tus manos.',
      'Permítele explorar otra habitación solamente si se siente seguro.',
      'Deja abierto el acceso a su refugio habitual.'
    ],
    consejo:
      'Si todavía tiene miedo, continúa con las actividades de los días anteriores.'
  },
  {
    numero: 6,
    titulo: 'Cuidar su bienestar',
    descripcion:
      'Además de acompañar su adaptación, es importante revisar sus necesidades de salud.',
    perro: [
      'Revisa sus antecedentes sanitarios y vacunas con un veterinario.',
      'Comprueba que sus datos de identificación estén actualizados.',
      'Observa cómo come, duerme y realiza sus necesidades.'
    ],
    gato: [
      'Revisa sus antecedentes sanitarios y vacunas con un veterinario.',
      'Verifica su identificación y las medidas para evitar escapes.',
      'Observa su alimentación, el uso del arenero y su actividad.'
    ],
    consejo:
      'Agenda una evaluación veterinaria temprana. No esperes al sexto día si notas signos de enfermedad.'
  },
  {
    numero: 7,
    titulo: 'Reconocer sus avances',
    descripcion:
      'Una semana es apenas el comienzo de la adaptación a una nueva familia.',
    perro: [
      'Identifica en qué espacios se siente más tranquilo.',
      'Reconoce las rutinas que mejor le han funcionado.',
      'Mantén las experiencias positivas sin apresurar nuevas presentaciones.'
    ],
    gato: [
      'Observa si muestra más confianza o explora voluntariamente.',
      'Mantén sus lugares seguros y la rutina del arenero.',
      'Continúa las introducciones graduales si convive con otras mascotas.'
    ],
    consejo:
      'Es normal necesitar más tiempo. El objetivo no es terminar una lista, sino acompañar su bienestar.'
  }
]

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function PrimerosDias() {
  const [tipo, setTipo] = useState('perro')
  const [diaActivo, setDiaActivo] = useState(1)
  const [marcados, setMarcados] = useState({})
  const [cargado, setCargado] = useState(false)

  // Recuperar casillas guardadas en este navegador
  useEffect(() => {
    try {
      const guardado = localStorage.getItem('huellaPrimerosDias')
      if (guardado) {
        const datos = JSON.parse(guardado)
        if (datos && typeof datos === 'object') {
          setMarcados(datos)
        }
      }
    } catch (error) {
      console.error('No se pudieron leer las actividades:', error)
    }

    setCargado(true)
  }, [])

  // Guardar cambios automáticamente
  useEffect(() => {
    if (!cargado) return

    try {
      localStorage.setItem(
        'huellaPrimerosDias',
        JSON.stringify(marcados)
      )
    } catch (error) {
      console.error('No se pudieron guardar las actividades:', error)
    }
  }, [marcados, cargado])

  const dia = dias[diaActivo - 1]
  const tareas = dia[tipo]
  const pendientes = preparacion[tipo]

  const clavePreparacion = (indice) =>
    `${tipo}-preparacion-${indice}`

  const claveDia = (numero, indice) =>
    `${tipo}-dia-${numero}-${indice}`

  function alternar(clave) {
    setMarcados((anterior) => ({
      ...anterior,
      [clave]: !anterior[clave]
    }))
  }

  const totalTareas =
    pendientes.length +
    dias.reduce((suma, item) => suma + item[tipo].length, 0)

  const completadas =
    pendientes.filter((_, indice) =>
      marcados[clavePreparacion(indice)]
    ).length +
    dias.reduce(
      (suma, item) =>
        suma +
        item[tipo].filter((_, indice) =>
          marcados[claveDia(item.numero, indice)]
        ).length,
      0
    )

  const porcentaje =
    Math.round((completadas / totalTareas) * 100)

  const completadasDia = tareas.filter((_, indice) =>
    marcados[claveDia(dia.numero, indice)]
  ).length

  return (
    <section className="primeros-pagina">
      <div className="primeros-contenedor">

        {/* ENCABEZADO CON LA FOTO EXISTENTE */}

        <div className="primeros-hero">
          <div className="primeros-hero-texto">
            <span className="primeros-etiqueta">
              BIENVENIDOS A CASA
            </span>

            <h1>
              Su primera semana, paso a paso
            </h1>

            <p>
              Acompaña a tu mascota en sus primeros
              días en el hogar. Descubre actividades
              sencillas para ayudarla a sentirse
              segura, respetando siempre su ritmo.
            </p>

            <div className="primeros-hero-nota">
              No hay una fecha límite para adaptarse.
              Cada mascota necesita su propio tiempo.
            </div>
          </div>

          <img
            src={familiaImage}
            alt="Familia compartiendo un momento de cariño con su perro"
            className="primeros-hero-imagen"
          />
        </div>

        {/* SELECTOR DE MASCOTA */}

        <div className="primeros-selector-bloque">
          <div>
            <h2>¿A quién acompañaremos?</h2>
            <p>
              Selecciona tu mascota para personalizar
              las actividades.
            </p>
          </div>

          <div className="primeros-selector" role="group" aria-label="Tipo de mascota">
            <button
              type="button"
              className={tipo === 'perro' ? 'activo' : ''}
              aria-pressed={tipo === 'perro'}
              onClick={() => setTipo('perro')}
            >
              🐶 Perro
            </button>

            <button
              type="button"
              className={tipo === 'gato' ? 'activo' : ''}
              aria-pressed={tipo === 'gato'}
              onClick={() => setTipo('gato')}
            >
              🐱 Gato
            </button>
          </div>
        </div>

        {/* PROGRESO GENERAL */}

        <div className="primeros-progreso">
          <div className="primeros-progreso-titulos">
            <div>
              <strong>Tu recorrido</strong>
              <p>
                {completadas} de {totalTareas} actividades marcadas
              </p>
            </div>

            <span>{porcentaje}%</span>
          </div>

          <div
            className="primeros-barra"
            role="progressbar"
            aria-label="Progreso de actividades"
            aria-valuenow={completadas}
            aria-valuemin={0}
            aria-valuemax={totalTareas}
          >
            <span style={{ width: `${porcentaje}%` }} />
          </div>
        </div>

        {/* CHECKLIST DE BIENVENIDA */}

        <div className="primeros-checklist">
          <div className="primeros-seccion-heading">
            <span className="primeros-etiqueta">
              ANTES Y DURANTE SU LLEGADA
            </span>

            <h2>Prepara su espacio seguro</h2>

            <p>
              Marca las cosas que ya tienes listas
              para recibir a tu mascota.
            </p>
          </div>

          <div className="primeros-checklist-grid">
            {pendientes.map((tarea, indice) => {
              const clave = clavePreparacion(indice)

              return (
                <label
                  className="primeros-check-item"
                  key={clave}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(marcados[clave])}
                    onChange={() => alternar(clave)}
                  />
                  <span>{tarea}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* RECORRIDO DE SIETE DÍAS */}

        <div className="primeros-recorrido">
          <div className="primeros-seccion-heading">
            <span className="primeros-etiqueta">
              UN DÍA A LA VEZ
            </span>

            <h2>Explora los primeros 7 días</h2>

            <p>
              Selecciona un día y descubre qué puedes
              hacer. Puedes volver a cualquier día
              cuando lo necesites.
            </p>
          </div>

          <div className="primeros-dias-selector">
            {dias.map((item) => {
              const hecho = item[tipo].every((_, indice) =>
                marcados[claveDia(item.numero, indice)]
              )

              return (
                <button
                  type="button"
                  key={item.numero}
                  className={
                    diaActivo === item.numero
                      ? 'primeros-dia-boton activo'
                      : 'primeros-dia-boton'
                  }
                  aria-pressed={diaActivo === item.numero}
                  onClick={() => setDiaActivo(item.numero)}
                >
                  <span>DÍA</span>
                  <strong>{item.numero}</strong>
                  {hecho && (
                    <small aria-label="Actividades marcadas">
                      ✓
                    </small>
                  )}
                </button>
              )
            })}
          </div>

          <article className="primeros-dia-panel">
            <div className="primeros-dia-panel-heading">
              <div>
                <span className="primeros-etiqueta">
                  DÍA {dia.numero} DE 7
                </span>

                <h3>{dia.titulo}</h3>

                <p>{dia.descripcion}</p>
              </div>

              <span className="primeros-dia-contador">
                {completadasDia}/{tareas.length}
              </span>
            </div>

            <div className="primeros-dia-tareas">
              {tareas.map((tarea, indice) => {
                const clave = claveDia(dia.numero, indice)

                return (
                  <label
                    className="primeros-dia-tarea"
                    key={clave}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(marcados[clave])}
                      onChange={() => alternar(clave)}
                    />
                    <span>{tarea}</span>
                  </label>
                )
              })}
            </div>

            <div className="primeros-consejo">
              <strong>Un consejo para ti</strong>
              <p>{dia.consejo}</p>
            </div>

            <div className="primeros-dia-navegacion">
              <button
                type="button"
                className="primeros-anterior"
                disabled={diaActivo === 1}
                onClick={() => setDiaActivo((anterior) => anterior - 1)}
              >
                ← Día anterior
              </button>

              <button
                type="button"
                className="primeros-siguiente"
                disabled={diaActivo === 7}
                onClick={() => setDiaActivo((anterior) => anterior + 1)}
              >
                Día siguiente →
              </button>
            </div>
          </article>
        </div>

        {/* MENSAJE FINAL */}

        <div className="primeros-cierre">
          <h2>Lo importante es avanzar a su ritmo</h2>

          <p>
            No es necesario completar cada actividad
            en el día indicado. Observa a tu mascota,
            mantén un ambiente seguro y consulta al
            veterinario ante señales de enfermedad
            o preocupación.
          </p>

          <p className="primeros-cierre-pequeno">
            Las casillas se guardan en este navegador.
            No representan una evaluación de salud
            ni un certificado de adaptación.
          </p>
        </div>

      </div>
    </section>
  )
}

export default PrimerosDias
