
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './PerfilMascota.css'

// ==========================================
// DATOS INICIALES
// ==========================================

const mascotaInicial = {
  nombre: '',
  especie: '',
  edad: '',
  fechaAdopcion: ''
}

// ==========================================
// RESPALDO LOCAL DEL PERFIL
// ==========================================

function leerPerfilLocal(id) {
  try {
    const guardado = localStorage.getItem(
      `huellaPerfil_${id}`
    )

    if (!guardado) return null

    const datos = JSON.parse(guardado)

    if (
      !datos ||
      !datos.nombre ||
      !['Perro', 'Gato'].includes(datos.especie)
    ) {
      return null
    }

    return datos
  } catch {
    return null
  }
}

// ==========================================
// VACUNAS PARA PERROS
// ==========================================

const vacunasPorEspecie = {
  Perro: [
    {
      id: 'sextuple',
      nombre: 'Séxtuple u Óctuple',
      descripcion:
        'Protege contra parvovirus, distemper (moquillo), hepatitis infecciosa, parainfluenza y otras enfermedades, según la formulación de la vacuna.',
      dosis: [
        {
          id: 'sextuple-1',
          texto: 'Primera dosis',
          edad: '8 a 9 semanas de vida'
        },
        {
          id: 'sextuple-2',
          texto: 'Segunda dosis',
          edad: '11 a 12 semanas de vida'
        },
        {
          id: 'sextuple-3',
          texto: 'Tercera dosis',
          edad: '14 a 16 semanas de vida'
        },
        {
          id: 'sextuple-refuerzo',
          texto: 'Refuerzo en etapa adulta',
          edad: 'Según calendario indicado por el veterinario'
        }
      ]
    },
    {
      id: 'rabia-perro',
      nombre: 'Antirrábica',
      descripcion:
        'Protege contra la rabia, enfermedad viral grave que afecta el sistema nervioso y puede transmitirse a las personas.',
      dosis: [
        {
          id: 'rabia-perro-1',
          texto: 'Primera dosis',
          edad: 'Según edad autorizada para la vacuna utilizada'
        },
        {
          id: 'rabia-perro-2',
          texto: 'Primer refuerzo',
          edad: 'Alrededor del año de vida'
        },
        {
          id: 'rabia-perro-refuerzo',
          texto: 'Refuerzo en etapa adulta',
          edad: 'Según fabricante y normativa vigente'
        }
      ]
    },
    {
      id: 'bordetella',
      nombre: 'Bordetella / Tos de las perreras',
      descripcion:
        'Ayuda a prevenir enfermedades respiratorias asociadas a Bordetella bronchiseptica. Se recomienda evaluar su uso cuando la mascota comparte espacios con otros perros, como guarderías o residencias.',
      opcional: true,
      dosis: [
        {
          id: 'bordetella-1',
          texto: 'Vacunación inicial',
          edad: 'Según edad mínima y vía de administración del producto'
        },
        {
          id: 'bordetella-refuerzo',
          texto: 'Refuerzo',
          edad: 'Según riesgo e indicación veterinaria'
        }
      ]
    }
  ],

  // ========================================
  // VACUNAS PARA GATOS
  // ========================================

  Gato: [
    {
      id: 'triple-felina',
      nombre: 'Triple Felina',
      descripcion:
        'Protege contra panleucopenia felina, rinotraqueítis viral felina y calicivirus felino, enfermedades que pueden afectar gravemente la salud de los gatos.',
      dosis: [
        {
          id: 'triple-1',
          texto: 'Primera dosis',
          edad: '7 a 9 semanas de vida'
        },
        {
          id: 'triple-2',
          texto: 'Segunda dosis',
          edad: '10 a 12 semanas de vida'
        },
        {
          id: 'triple-3',
          texto: 'Tercera dosis',
          edad: '13 a 16 semanas de vida'
        },
        {
          id: 'triple-refuerzo',
          texto: 'Refuerzo en etapa adulta',
          edad: 'Según riesgo, antecedentes y pauta veterinaria'
        }
      ]
    },
    {
      id: 'leucemia',
      nombre: 'Leucemia Felina (FeLV)',
      descripcion:
        'Ayuda a prevenir la infección por el virus de la leucemia felina, que puede debilitar el sistema inmunitario y causar enfermedades graves.',
      opcional: true,
      dosis: [
        {
          id: 'leucemia-1',
          texto: 'Primera dosis',
          edad: 'Habitualmente desde las 8 a 12 semanas'
        },
        {
          id: 'leucemia-2',
          texto: 'Segunda dosis',
          edad: 'Según intervalo indicado por el veterinario'
        },
        {
          id: 'leucemia-refuerzo',
          texto: 'Refuerzo en etapa adulta',
          edad: 'Según riesgo de exposición y pauta veterinaria'
        }
      ]
    },
    {
      id: 'rabia-gato',
      nombre: 'Antirrábica',
      descripcion:
        'Protege contra la rabia, una enfermedad viral grave que afecta el sistema nervioso y puede transmitirse a las personas.',
      dosis: [
        {
          id: 'rabia-gato-1',
          texto: 'Primera dosis',
          edad: 'Según edad autorizada para la vacuna utilizada'
        },
        {
          id: 'rabia-gato-2',
          texto: 'Primer refuerzo',
          edad: 'Alrededor del año de vida'
        },
        {
          id: 'rabia-gato-refuerzo',
          texto: 'Refuerzo en etapa adulta',
          edad: 'Según fabricante y normativa vigente'
        }
      ]
    }
  ]
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function PerfilMascota() {
  const [mascota, setMascota] = useState(mascotaInicial)
  const [mascotaId, setMascotaId] = useState(null)

  const [perfilCreado, setPerfilCreado] = useState(false)
  const [perfilConfirmado, setPerfilConfirmado] = useState(null)

  const [editando, setEditando] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)

  const [mensaje, setMensaje] = useState('')
  const [vista, setVista] = useState('perfil')

  const [vacunasMarcadas, setVacunasMarcadas] = useState({})

  // ==========================================
  // CARGAR EL PERFIL
  // ==========================================

  useEffect(() => {
    let activo = true

    async function cargarMascota() {
      const idGuardado = localStorage.getItem(
        'huellaMascotaId'
      )

      if (!idGuardado) {
        if (activo) setCargando(false)
        return
      }

      const id = Number(idGuardado)

      if (!Number.isSafeInteger(id) || id <= 0) {
        if (activo) {
          setMensaje('El identificador de la mascota no es válido.')
          setCargando(false)
        }
        return
      }

      const perfilLocal = leerPerfilLocal(id)

      try {
        const { data, error } = await supabase
          .from('mascotas')
          .select('id, nombre, tipo, fecha_llegada')
          .eq('id', id)
          .maybeSingle()

        if (!activo) return

        if (error || !data) {
          if (perfilLocal) {
            setMascota(perfilLocal)
            setPerfilConfirmado(perfilLocal)
            setMascotaId(id)
            setPerfilCreado(true)
            setMensaje(
              'Mostrando el perfil guardado en este dispositivo. La sincronización con Supabase está pendiente.'
            )
          } else {
            setMensaje(
              'No fue posible recuperar el perfil de tu mascota.'
            )
          }

          return
        }

        const edadGuardada =
          localStorage.getItem(`huellaEdad_${id}`) || ''

        const datosServidor = {
          nombre: data.nombre || '',
          especie:
            data.tipo === 'gato' ? 'Gato' : 'Perro',
          edad: edadGuardada,
          fechaAdopcion: data.fecha_llegada || ''
        }

        // Si existe una edición local pendiente,
        // la mostramos sin perder los cambios.
        const datosActuales = perfilLocal
          ? { ...datosServidor, ...perfilLocal }
          : datosServidor

        setMascota(datosActuales)
        setPerfilConfirmado(datosActuales)

        setMascotaId(id)
        setPerfilCreado(true)

        if (perfilLocal) {
          setMensaje(
            'Este perfil tiene cambios guardados en el dispositivo que aún no se han sincronizado con Supabase.'
          )
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error)

        if (activo && perfilLocal) {
          setMascota(perfilLocal)
          setPerfilConfirmado(perfilLocal)
          setMascotaId(id)
          setPerfilCreado(true)

          setMensaje(
            'Mostrando el perfil local. La sincronización está pendiente.'
          )
        } else if (activo) {
          setMensaje('No fue posible cargar el perfil.')
        }
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarMascota()

    return () => {
      activo = false
    }
  }, [])

  // ==========================================
  // CARGAR VACUNAS
  // ==========================================

  useEffect(() => {
    if (!mascotaId) {
      setVacunasMarcadas({})
      return
    }

    try {
      const guardadas = JSON.parse(
        localStorage.getItem(
          `huellaVacunas_${mascotaId}`
        ) || '{}'
      )

      if (
        guardadas &&
        typeof guardadas === 'object' &&
        !Array.isArray(guardadas)
      ) {
        setVacunasMarcadas(guardadas)
      } else {
        setVacunasMarcadas({})
      }
    } catch {
      setVacunasMarcadas({})
    }
  }, [mascotaId])

  // ==========================================
  // ACTUALIZAR LOS CAMPOS
  // ==========================================

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setMascota((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  // ==========================================
  // GUARDAR O EDITAR EL PERFIL
  // ==========================================

  async function guardarPerfil(evento) {
    evento.preventDefault()

    if (guardando) return

    if (
      !mascota.nombre.trim() ||
      !mascota.especie ||
      !mascota.fechaAdopcion
    ) {
      setMensaje('Completa los campos obligatorios.')
      return
    }

    setGuardando(true)
    setMensaje('')

    const nuevosDatos = {
      nombre: mascota.nombre.trim(),
      especie: mascota.especie,
      edad: mascota.edad.trim(),
      fechaAdopcion: mascota.fechaAdopcion
    }

    const datosSupabase = {
      nombre: nuevosDatos.nombre,
      tipo: nuevosDatos.especie.toLowerCase(),
      fecha_llegada: nuevosDatos.fechaAdopcion
    }

    try {
      if (mascotaId) {
        // ======================================
        // EDITAR MASCOTA EXISTENTE
        // ======================================

        const { data, error } = await supabase
          .from('mascotas')
          .update(datosSupabase)
          .eq('id', mascotaId)
          .select('id, nombre, tipo, fecha_llegada')
          .maybeSingle()

        // Guardar la edad, que actualmente
        // se maneja en localStorage.
        localStorage.setItem(
          `huellaEdad_${mascotaId}`,
          nuevosDatos.edad
        )

        if (error || !data) {
          // Respaldo local si Supabase no permite
          // actualizar el registro todavía.
          localStorage.setItem(
            `huellaPerfil_${mascotaId}`,
            JSON.stringify(nuevosDatos)
          )

          setMensaje(
            'Cambios guardados en este dispositivo. La sincronización con Supabase está pendiente.'
          )
        } else {
          // Supabase confirmó la edición.
          localStorage.removeItem(
            `huellaPerfil_${mascotaId}`
          )

          setMensaje('Perfil actualizado correctamente.')
        }

        setMascota(nuevosDatos)
        setPerfilConfirmado(nuevosDatos)

        setPerfilCreado(true)
        setEditando(false)
        setVista('perfil')
      } else {
        // ======================================
        // CREAR PERFIL NUEVO
        // ======================================

        const { data, error } = await supabase
          .from('mascotas')
          .insert(datosSupabase)
          .select('id, nombre, tipo, fecha_llegada')
          .single()

        if (error || !data) {
          throw error || new Error(
            'No se recibió el perfil creado.'
          )
        }

        localStorage.setItem(
          'huellaMascotaId',
          String(data.id)
        )

        localStorage.setItem(
          `huellaEdad_${data.id}`,
          nuevosDatos.edad
        )

        setMascotaId(data.id)
        setMascota(nuevosDatos)
        setPerfilConfirmado(nuevosDatos)

        setPerfilCreado(true)
        setEditando(false)
        setVista('perfil')

        setMensaje('Perfil creado correctamente.')
      }
    } catch (error) {
      console.error('Error al guardar el perfil:', error)

      setMensaje(
        'No fue posible guardar el perfil. Comprueba tu conexión y vuelve a intentarlo.'
      )
    } finally {
      setGuardando(false)
    }
  }

  // ==========================================
  // CANCELAR EDICIÓN
  // ==========================================

  function cancelarEdicion() {
    if (perfilConfirmado) {
      setMascota({ ...perfilConfirmado })
    }

    setEditando(false)
    setMensaje('')
  }

  // ==========================================
  // MARCAR VACUNAS
  // ==========================================

  function marcarVacuna(idVacuna) {
    if (!mascotaId) return

    const nuevasMarcas = {
      ...vacunasMarcadas,
      [idVacuna]: !vacunasMarcadas[idVacuna]
    }

    try {
      localStorage.setItem(
        `huellaVacunas_${mascotaId}`,
        JSON.stringify(nuevasMarcas)
      )

      setVacunasMarcadas(nuevasMarcas)
      setMensaje('')
    } catch (error) {
      console.error('Error al guardar la vacuna:', error)

      setMensaje(
        'No fue posible guardar esta vacuna.'
      )
    }
  }

  // ==========================================
  // FORMATEAR LA FECHA
  // ==========================================

  function formatearFecha(fecha) {
    if (!fecha) return 'No registrada'

    return new Date(
      `${fecha}T00:00:00`
    ).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // ==========================================
  // PANTALLA DE CARGA
  // ==========================================

  if (cargando) {
    return (
      <section className="perfil-mascota">
        <div className="perfil-encabezado">
          <h1>Cargando perfil...</h1>
        </div>
      </section>
    )
  }

  // ==========================================
  // PÁGINA DE VACUNAS
  // ==========================================

  if (perfilCreado && vista === 'vacunas') {
    const lista =
      vacunasPorEspecie[mascota.especie] || []

    return (
      <section className="perfil-mascota">
        <div className="vacunas-contenedor">

          <button
            type="button"
            className="vacunas-volver"
            onClick={() => {
              setVista('perfil')
              setMensaje('')
            }}
          >
            ← Volver a mi mascota
          </button>

          <div className="vacunas-encabezado">
            <span className="section-tag">
              SALUD Y CUIDADOS
            </span>

            <h1>Vacunas de {mascota.nombre}</h1>

            <p>
              Conoce las vacunas recomendadas para
              tu mascota y marca las dosis que
              ya recibió.
            </p>
          </div>

          <div className="vacunas-lista-simple">

            {lista.map((vacuna) => (
              <article
                className="vacuna-tarjeta"
                key={vacuna.id}
              >

                <div className="vacuna-tarjeta-encabezado">
                  <h2>{vacuna.nombre}</h2>

                  {vacuna.opcional && (
                    <span className="vacuna-opcional">
                      Según riesgo
                    </span>
                  )}
                </div>

                <div className="vacuna-informacion">
                  <h3>¿Para qué sirve?</h3>
                  <p>{vacuna.descripcion}</p>
                </div>

                <div className="vacuna-dosis-lista">
                  <h3>
                    Edad de aplicación y dosis
                  </h3>

                  {vacuna.dosis.map((dosis) => {
                    const marcada = Boolean(
                      vacunasMarcadas[dosis.id]
                    )

                    return (
                      <label
                        key={dosis.id}
                        className={`vacuna-casilla ${
                          marcada
                            ? 'vacuna-casilla-marcada'
                            : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={marcada}
                          onChange={() =>
                            marcarVacuna(dosis.id)
                          }
                        />

                        <span className="vacuna-casilla-texto">
                          <strong>
                            {dosis.texto}
                          </strong>

                          <span>
                            {dosis.edad}
                          </span>
                        </span>

                        <span className="vacuna-casilla-estado">
                          {marcada
                            ? 'Aplicada'
                            : 'Sin registrar'}
                        </span>
                      </label>
                    )
                  })}
                </div>

              </article>
            ))}

          </div>

          <div className="vacunas-aviso">
            <strong>Importante</strong>

            <p>
              Las edades son orientativas.
              El calendario definitivo debe
              establecerlo un médico veterinario
              según la edad, antecedentes y
              necesidades de cada mascota.
            </p>

            <p>
              Marca una vacuna solamente cuando
              tengas constancia de su aplicación.
              Los refuerzos de adultos son un
              registro general, no un historial
              por cada año.
            </p>
          </div>

          {mensaje && (
            <p
              className="perfil-mensaje"
              role="alert"
            >
              {mensaje}
            </p>
          )}

        </div>
      </section>
    )
  }

  // ==========================================
  // PERFIL O FORMULARIO
  // ==========================================

  const mostrarFormulario = !perfilCreado || editando

  return (
    <section className="perfil-mascota">

      <div className="perfil-encabezado">
        {mostrarFormulario ? (
          <>
            <span className="section-tag">
              MI COMPAÑERO
            </span>

            <h1>Conozcamos a tu mascota</h1>

            <p>
              Registra a tu mascota para
              acompañarla durante su adaptación.
            </p>
          </>
        ) : (
          <h1>Mi mascota</h1>
        )}
      </div>

      {mostrarFormulario ? (

        // ======================================
        // FORMULARIO DE EDICIÓN
        // ======================================

        <form
          className="perfil-formulario"
          onSubmit={guardarPerfil}
        >

          <h2>
            {editando
              ? 'Editar datos de tu mascota'
              : 'Datos de tu mascota'}
          </h2>

          <label htmlFor="nombre">
            Nombre de tu mascota
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            value={mascota.nombre}
            onChange={actualizarCampo}
            placeholder="Ej: Milo"
            required
          />

          <label htmlFor="especie">
            ¿Qué mascota adoptaste?
          </label>

          <select
            id="especie"
            name="especie"
            value={mascota.especie}
            onChange={actualizarCampo}
            required
          >
            <option value="">
              Seleccionar
            </option>

            <option value="Perro">
              Perro
            </option>

            <option value="Gato">
              Gato
            </option>
          </select>

          <label htmlFor="edad">
            Edad aproximada
          </label>

          <input
            id="edad"
            name="edad"
            type="text"
            value={mascota.edad}
            onChange={actualizarCampo}
            placeholder="Ej: 2 meses"
          />

          <label htmlFor="fechaAdopcion">
            Fecha de adopción
          </label>

          <input
            id="fechaAdopcion"
            name="fechaAdopcion"
            type="date"
            value={mascota.fechaAdopcion}
            onChange={actualizarCampo}
            required
          />

          {mensaje && (
            <p
              className="perfil-mensaje"
              role="alert"
            >
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            className="perfil-guardar"
            disabled={guardando}
          >
            {guardando
              ? 'Guardando...'
              : editando
                ? 'Guardar cambios'
                : 'Crear perfil'}
          </button>

          {editando && (
            <button
              type="button"
              className="perfil-cancelar"
              onClick={cancelarEdicion}
              disabled={guardando}
            >
              Cancelar
            </button>
          )}

        </form>

      ) : (

        // ======================================
        // RESUMEN DEL PERFIL
        // ======================================

        <div className="perfil-resumen">

          <div
            className="perfil-avatar"
            aria-hidden="true"
          >
            {mascota.especie === 'Perro'
              ? '🐶'
              : '🐱'}
          </div>

          <span className="section-tag">
            PERFIL DE MASCOTA
          </span>

          <h2>{mascota.nombre}</h2>

          <div className="perfil-datos">
            <p>
              <strong>Especie:</strong>{' '}
              {mascota.especie}
            </p>

            <p>
              <strong>Edad:</strong>{' '}
              {mascota.edad || 'No registrada'}
            </p>

            <p>
              <strong>Adopción:</strong>{' '}
              {formatearFecha(mascota.fechaAdopcion)}
            </p>
          </div>

          {mensaje && (
            <p
              className="perfil-mensaje"
              role="status"
            >
              {mensaje}
            </p>
          )}

          <div className="perfil-accesos">
            <button
              type="button"
              className="perfil-boton-vacunas"
              onClick={() => {
                setVista('vacunas')
                setMensaje('')
                window.scrollTo(0, 0)
              }}
            >
              Vacunas
            </button>
          </div>

          <button
            type="button"
            className="perfil-editar"
            onClick={() => {
              setEditando(true)
              setMensaje('')
            }}
          >
            Editar perfil
          </button>

        </div>
      )}

    </section>
  )
}

export default PerfilMascota
