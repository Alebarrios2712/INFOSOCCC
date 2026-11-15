
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './DiarioAdaptacion.css'

// ==========================================
// ILUSTRACIONES DE EMOCIONES
// ==========================================

import perroFeliz from '../assets/emociones/perro-feliz.png'
import perroNervioso from '../assets/emociones/perro-nervioso.png'
import perroTranquilo from '../assets/emociones/perro-tranquilo.png'
import perroAsustado from '../assets/emociones/perro-asustado.png'

import gatoFeliz from '../assets/emociones/gato-feliz.png'
import gatoNervioso from '../assets/emociones/gato-nervioso.png'
import gatoTranquilo from '../assets/emociones/gato-tranquilo.png'
import gatoAsustado from '../assets/emociones/gato-asustado.png'

// ==========================================
// EMOCIONES
// Se conservan los valores anteriores de
// Supabase para no perder compatibilidad.
// ==========================================

const emociones = [
  {
    valor: '😄',
    nombre: 'Feliz'
  },
  {
    valor: '😐',
    nombre: 'Nervioso'
  },
  {
    valor: '🙂',
    nombre: 'Tranquilo'
  },
  {
    valor: '😟',
    nombre: 'Asustado'
  }
]

// ==========================================
// IMÁGENES SEGÚN ESPECIE
// ==========================================

const imagenesEmociones = {
  perro: {
    '😄': perroFeliz,
    '😐': perroNervioso,
    '🙂': perroTranquilo,
    '😟': perroAsustado
  },

  gato: {
    '😄': gatoFeliz,
    '😐': gatoNervioso,
    '🙂': gatoTranquilo,
    '😟': gatoAsustado
  }
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function DiarioAdaptacion() {

  // DATOS DE LA MASCOTA

  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('perro')
  const [fechaLlegada, setFechaLlegada] = useState('')

  const [diarioCreado, setDiarioCreado] = useState(false)

  // REGISTRO DIARIO

  const [animo, setAnimo] = useState('')
  const [comio, setComio] = useState('')
  const [exploro, setExploro] = useState('')
  const [interactuo, setInteractuo] = useState('')
  const [observacion, setObservacion] = useState('')

  // ESTADOS GENERALES

  const [mensaje, setMensaje] = useState('')
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(false)

  // ==========================================
  // OBTENER IMAGEN SEGÚN LA ESPECIE
  // ==========================================

  const especieImagen =
    String(tipo || 'perro').toLowerCase() === 'gato'
      ? 'gato'
      : 'perro'

  function obtenerImagenAnimo(valor) {
    return imagenesEmociones[especieImagen]?.[valor] || null
  }

  function obtenerNombreAnimo(valor) {
    return (
      emociones.find(
        (emocion) => emocion.valor === valor
      )?.nombre || 'Estado registrado'
    )
  }

  // ==========================================
  // CARGAR MASCOTA Y REGISTROS DESDE SUPABASE
  // ==========================================

  useEffect(() => {

    const mascotaIdGuardado =
      localStorage.getItem('huellaMascotaId')

    if (!mascotaIdGuardado) {
      return
    }

    async function cargarDatos() {

      setCargando(true)

      const {
        data: mascota,
        error: errorMascota
      } = await supabase
        .from('mascotas')
        .select('*')
        .eq('id', Number(mascotaIdGuardado))
        .single()

      if (errorMascota) {

        console.error(
          'Error cargando mascota:',
          errorMascota
        )

        localStorage.removeItem(
          'huellaMascotaId'
        )

        setCargando(false)

        return
      }

      setNombre(mascota.nombre)
      setTipo(mascota.tipo)
      setFechaLlegada(mascota.fecha_llegada)
      setDiarioCreado(true)

      const {
        data: registrosGuardados,
        error: errorRegistros
      } = await supabase
        .from('registros')
        .select('*')
        .eq(
          'mascota_id',
          Number(mascotaIdGuardado)
        )
        .order('fecha', {
          ascending: false
        })

      if (errorRegistros) {

        console.error(
          'Error cargando registros:',
          errorRegistros
        )

        setCargando(false)

        return
      }

      setRegistros(registrosGuardados || [])
      setCargando(false)
    }

    cargarDatos()

  }, [])

  // ==========================================
  // CREAR DIARIO
  // ==========================================

  async function crearDiario() {

    if (
      nombre.trim() === '' ||
      fechaLlegada === ''
    ) {

      setMensaje(
        'Completa el nombre y la fecha de llegada.'
      )

      return
    }

    setCargando(true)
    setMensaje('')

    const { data, error } = await supabase
      .from('mascotas')
      .insert({
        nombre: nombre.trim(),
        tipo,
        fecha_llegada: fechaLlegada
      })
      .select()
      .single()

    if (error) {

      console.error(
        'Error creando mascota:',
        error
      )

      setMensaje(
        'No fue posible crear el diario.'
      )

      setCargando(false)

      return
    }

    localStorage.setItem(
      'huellaMascotaId',
      data.id
    )

    setNombre(data.nombre)
    setTipo(data.tipo)
    setFechaLlegada(data.fecha_llegada)

    setDiarioCreado(true)
    setMensaje('')
    setCargando(false)
  }

  // ==========================================
  // GUARDAR REGISTRO DEL DÍA
  // ==========================================

  async function guardarRegistro() {

    if (
      animo === '' ||
      comio === '' ||
      exploro === '' ||
      interactuo === ''
    ) {

      setMensaje(
        'Completa todas las opciones antes de guardar.'
      )

      return
    }

    const mascotaIdGuardado =
      localStorage.getItem('huellaMascotaId')

    if (!mascotaIdGuardado) {

      setMensaje(
        'No se encontró la mascota asociada al diario.'
      )

      return
    }

    setCargando(true)
    setMensaje('')

    const { data, error } = await supabase
      .from('registros')
      .insert({
        mascota_id: Number(mascotaIdGuardado),
        animo,
        comio,
        exploro,
        interactuo,
        observacion: observacion.trim()
      })
      .select()
      .single()

    if (error) {

      console.error(
        'Error guardando registro:',
        error
      )

      setMensaje(
        'No fue posible guardar el registro.'
      )

      setCargando(false)

      return
    }

    setRegistros((anteriores) => [
      data,
      ...anteriores
    ])

    setMensaje(
      'Registro guardado correctamente.'
    )

    setAnimo('')
    setComio('')
    setExploro('')
    setInteractuo('')
    setObservacion('')

    setCargando(false)
  }

  // ==========================================
  // ELIMINAR REGISTRO
  // ==========================================

  async function eliminarRegistro(id) {

    const confirmar = window.confirm(
      '¿Quieres eliminar este registro?'
    )

    if (!confirmar) {
      return
    }

    const { error } = await supabase
      .from('registros')
      .delete()
      .eq('id', id)

    if (error) {

      console.error(
        'Error eliminando registro:',
        error
      )

      setMensaje(
        'No fue posible eliminar el registro.'
      )

      return
    }

    setRegistros((anteriores) =>
      anteriores.filter(
        (registro) => registro.id !== id
      )
    )
  }

  // ==========================================
  // BORRAR TODO EL DIARIO
  // ==========================================

  async function borrarDiario() {

    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar todo el diario? Esta acción no se puede deshacer.'
    )

    if (!confirmar) {
      return
    }

    const mascotaIdGuardado =
      localStorage.getItem('huellaMascotaId')

    if (!mascotaIdGuardado) {
      return
    }

    setCargando(true)

    const { error } = await supabase
      .from('mascotas')
      .delete()
      .eq(
        'id',
        Number(mascotaIdGuardado)
      )

    if (error) {

      console.error(
        'Error eliminando diario:',
        error
      )

      setMensaje(
        'No fue posible eliminar el diario.'
      )

      setCargando(false)

      return
    }

    localStorage.removeItem(
      'huellaMascotaId'
    )

    setNombre('')
    setTipo('perro')
    setFechaLlegada('')

    setRegistros([])

    setAnimo('')
    setComio('')
    setExploro('')
    setInteractuo('')
    setObservacion('')

    setDiarioCreado(false)
    setMensaje('')

    setCargando(false)
  }

  // ==========================================
  // CALCULAR DÍA DE ADAPTACIÓN
  // ==========================================

  function calcularDiaAdaptacion() {

    if (!fechaLlegada) {
      return 1
    }

    const llegada = new Date(
      `${fechaLlegada}T00:00:00`
    )

    const hoy = new Date()

    llegada.setHours(0, 0, 0, 0)
    hoy.setHours(0, 0, 0, 0)

    const diferencia =
      hoy.getTime() - llegada.getTime()

    const dias =
      Math.floor(
        diferencia /
          (1000 * 60 * 60 * 24)
      ) + 1

    return dias < 1 ? 1 : dias
  }

  // ==========================================
  // FORMATEAR FECHA DE LLEGADA
  // ==========================================

  function formatearFecha(fecha) {

    if (!fecha) {
      return ''
    }

    const fechaFormateada =
      new Date(`${fecha}T00:00:00`)

    return fechaFormateada.toLocaleDateString(
      'es-CL',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    )
  }

  // ==========================================
  // FORMATEAR FECHA DE REGISTRO
  // ==========================================

  function formatearFechaRegistro(fecha) {

    if (!fecha) {
      return ''
    }

    return new Date(
      fecha
    ).toLocaleDateString(
      'es-CL',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    )
  }

  // ==========================================
  // CALCULAR RESUMEN DE ÁNIMO
  // ==========================================

  function obtenerResumenAnimo() {

    if (registros.length === 0) {
      return null
    }

    const valores = {
      '😟': 1,
      '😐': 2,
      '🙂': 3,
      '😄': 4
    }

    const registrosValidos =
      registros.filter(
        (registro) =>
          valores[registro.animo]
      )

    if (
      registrosValidos.length === 0
    ) {
      return null
    }

    const suma =
      registrosValidos.reduce(
        (total, registro) =>
          total +
          valores[registro.animo],
        0
      )

    const promedio =
      suma /
      registrosValidos.length

    if (promedio < 1.5) {
      return {
        emoji: '😟',
        texto:
          'Ha tenido varios días difíciles'
      }
    }

    if (promedio < 2.5) {
      return {
        emoji: '😐',
        texto:
          'Su adaptación aún está en proceso'
      }
    }

    if (promedio < 3.5) {
      return {
        emoji: '🙂',
        texto:
          'Se observan señales positivas'
      }
    }

    return {
      emoji: '😄',
      texto:
        'Ha mostrado una evolución muy positiva'
    }
  }

  const resumen =
    obtenerResumenAnimo()

  // ==========================================
  // CARGANDO
  // ==========================================

  if (
    cargando &&
    !diarioCreado
  ) {

    return (
      <section className="diario-page">

        <div className="diario-container">

          <div className="diario-heading">

            <h1>
              Cargando diario...
            </h1>

          </div>

        </div>

      </section>
    )
  }

  // ==========================================
  // RENDERIZADO
  // ==========================================

  return (

    <section className="diario-page">

      <div className="diario-container">

        {!diarioCreado ? (

          <>
            {/* CREACIÓN DEL DIARIO */}

            <div className="diario-heading">

              <span className="section-tag">
                ACOMPAÑA SU PROCESO
              </span>

              <h1>
                Diario de adaptación
              </h1>

              <p>
                Registra pequeños cambios
                y observa cómo tu mascota
                se adapta a su nuevo hogar.
              </p>

            </div>

            <div className="diario-card">

              <div className="diario-field">

                <label htmlFor="nombre">
                  Nombre de tu mascota
                </label>

                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej: Miel"
                  value={nombre}
                  onChange={(evento) =>
                    setNombre(
                      evento.target.value
                    )
                  }
                />

              </div>

              <div className="diario-field">

                <label htmlFor="tipo">
                  Tipo de mascota
                </label>

                <select
                  id="tipo"
                  value={tipo}
                  onChange={(evento) =>
                    setTipo(
                      evento.target.value
                    )
                  }
                >

                  <option value="perro">
                    Perro
                  </option>

                  <option value="gato">
                    Gato
                  </option>

                </select>

              </div>

              <div className="diario-field">

                <label htmlFor="fechaLlegada">
                  Fecha de llegada al hogar
                </label>

                <input
                  id="fechaLlegada"
                  type="date"
                  value={fechaLlegada}
                  onChange={(evento) =>
                    setFechaLlegada(
                      evento.target.value
                    )
                  }
                />

              </div>

              {mensaje && (

                <p className="diario-mensaje">
                  {mensaje}
                </p>

              )}

              <button
                type="button"
                className="diario-main-button"
                onClick={crearDiario}
                disabled={cargando}
              >
                {cargando
                  ? 'Creando...'
                  : 'Crear diario'}
              </button>

            </div>

          </>

        ) : (

          <>

            {/* ENCABEZADO */}

            <div className="diario-heading">

              <span className="section-tag">
                DÍA{' '}
                {calcularDiaAdaptacion()}{' '}
                DE ADAPTACIÓN
              </span>

              <h1>
                {tipo === 'perro'
                  ? '🐶'
                  : '🐱'}{' '}
                {nombre}
              </h1>

              <p>
                Registra cómo ha estado hoy
                y observa su evolución con
                el paso de los días.
              </p>

            </div>

            {/* INFORMACIÓN MASCOTA */}

            <div className="diario-summary">

              <p>
                <strong>
                  Mascota:
                </strong>

                <br />

                {nombre}
              </p>

              <p>
                <strong>
                  Tipo:
                </strong>

                <br />

                {tipo === 'perro'
                  ? 'Perro'
                  : 'Gato'}
              </p>

              <p>
                <strong>
                  Llegó al hogar:
                </strong>

                <br />

                {formatearFecha(
                  fechaLlegada
                )}
              </p>

            </div>

            {/* EVOLUCIÓN */}

            {resumen && (

              <div className="diario-evolucion">

                <div className="evolucion-emoji">

                  <img
                    src={obtenerImagenAnimo(resumen.emoji)}
                    alt={obtenerNombreAnimo(resumen.emoji)}
                    className="evolucion-imagen-emocion"
                  />

                </div>

                <div>

                  <span>
                    Evolución registrada
                  </span>

                  <h2>
                    {resumen.texto}
                  </h2>

                  <p>
                    Este resumen se basa
                    únicamente en los
                    registros que has
                    realizado.
                  </p>

                </div>

              </div>

            )}

            {/* FORMULARIO DIARIO */}

            <div className="diario-card">

              {/* ESTADO DE ÁNIMO */}

              <div className="diario-question">

                <h2>
                  ¿Cómo estuvo hoy?
                </h2>

                <div className="diario-options diario-emociones-grid">

                  {emociones.map((emocion) => (

                    <button
                      key={emocion.valor}
                      type="button"
                      className={
                        animo === emocion.valor
                          ? 'diario-option diario-emocion-card selected'
                          : 'diario-option diario-emocion-card'
                      }
                      onClick={() =>
                        setAnimo(emocion.valor)
                      }
                      aria-pressed={
                        animo === emocion.valor
                      }
                      aria-label={emocion.nombre}
                    >

                      <img
                        src={obtenerImagenAnimo(emocion.valor)}
                        alt=""
                        className="diario-emocion-imagen"
                      />

                      <span className="diario-emocion-label">
                        {emocion.nombre}
                      </span>

                    </button>

                  ))}

                </div>

              </div>

              {/* COMIDA */}

              <div className="diario-question">

                <h2>
                  ¿Comió normalmente?
                </h2>

                <div className="diario-options">

                  {[
                    'Sí',
                    'Poco',
                    'No'
                  ].map((opcion) => (

                    <button
                      key={opcion}
                      type="button"
                      className={
                        comio === opcion
                          ? 'diario-option selected'
                          : 'diario-option'
                      }
                      onClick={() =>
                        setComio(opcion)
                      }
                    >
                      {opcion}
                    </button>

                  ))}

                </div>

              </div>

              {/* EXPLORACIÓN */}

              <div className="diario-question">

                <h2>
                  ¿Exploró la casa?
                </h2>

                <div className="diario-options">

                  {[
                    'Sí',
                    'Un poco',
                    'No'
                  ].map((opcion) => (

                    <button
                      key={opcion}
                      type="button"
                      className={
                        exploro === opcion
                          ? 'diario-option selected'
                          : 'diario-option'
                      }
                      onClick={() =>
                        setExploro(opcion)
                      }
                    >
                      {opcion}
                    </button>

                  ))}

                </div>

              </div>

              {/* INTERACCIÓN */}

              <div className="diario-question">

                <h2>
                  ¿Interactuó contigo?
                </h2>

                <div className="diario-options">

                  {[
                    'Sí',
                    'Poco',
                    'No'
                  ].map((opcion) => (

                    <button
                      key={opcion}
                      type="button"
                      className={
                        interactuo === opcion
                          ? 'diario-option selected'
                          : 'diario-option'
                      }
                      onClick={() =>
                        setInteractuo(opcion)
                      }
                    >
                      {opcion}
                    </button>

                  ))}

                </div>

              </div>

              {/* OBSERVACIONES */}

              <div className="diario-field">

                <label htmlFor="observacion">
                  Observaciones
                </label>

                <textarea
                  id="observacion"
                  rows="5"
                  placeholder="Ej: Hoy se acercó por primera vez y jugó unos minutos."
                  value={observacion}
                  onChange={(evento) =>
                    setObservacion(
                      evento.target.value
                    )
                  }
                />

              </div>

              {mensaje && (

                <p className="diario-mensaje">
                  {mensaje}
                </p>

              )}

              <button
                type="button"
                className="diario-main-button"
                onClick={guardarRegistro}
                disabled={cargando}
              >
                {cargando
                  ? 'Guardando...'
                  : 'Guardar registro'}
              </button>

            </div>

            {/* HISTORIAL */}

            <section className="diario-historial">

              <div className="historial-heading">

                <div>

                  <span className="section-tag">
                    SU PROGRESO
                  </span>

                  <h2>
                    Historial de adaptación
                  </h2>

                </div>

                <span className="historial-contador">

                  {registros.length}{' '}

                  {registros.length === 1
                    ? 'registro'
                    : 'registros'}

                </span>

              </div>

              {registros.length === 0 ? (

                <div className="historial-vacio">

                  <span>
                    🐾
                  </span>

                  <h3>
                    Aún no hay registros
                  </h3>

                  <p>
                    Completa el registro
                    de hoy para comenzar
                    a observar su evolución.
                  </p>

                </div>

              ) : (

                <div className="historial-lista">

                  {registros.map((registro) => (

                    <article
                      className="historial-card"
                      key={registro.id}
                    >

                      <div className="historial-top">

                        <div className="historial-animo">

                          <img
                            src={obtenerImagenAnimo(registro.animo)}
                            alt={obtenerNombreAnimo(registro.animo)}
                            className="historial-imagen-emocion"
                          />

                        </div>

                        <div>

                          <h3>
                            {formatearFechaRegistro(
                              registro.fecha
                            )}
                          </h3>

                          <p>
                            Registro diario
                          </p>

                          <span className="historial-emocion-nombre">
                            {obtenerNombreAnimo(registro.animo)}
                          </span>

                        </div>

                        <button
                          type="button"
                          className="historial-eliminar"
                          onClick={() =>
                            eliminarRegistro(
                              registro.id
                            )
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                      {/* DATOS DEL REGISTRO */}

                      <div className="historial-datos">

                        <div>

                          <span>
                            🍽️ Comida
                          </span>

                          <strong>
                            {registro.comio}
                          </strong>

                        </div>

                        <div>

                          <span>
                            🏠 Exploración
                          </span>

                          <strong>
                            {registro.exploro}
                          </strong>

                        </div>

                        <div>

                          <span>
                            🤝 Interacción
                          </span>

                          <strong>
                            {registro.interactuo}
                          </strong>

                        </div>

                      </div>

                      {/* OBSERVACIONES DEL HISTORIAL */}

                      {registro.observacion && (

                        <div className="historial-observacion">

                          <span>
                            Observación
                          </span>

                          <p>
                            {registro.observacion}
                          </p>

                        </div>

                      )}

                    </article>

                  ))}

                </div>

              )}

            </section>

            {/* ELIMINAR DIARIO */}

            <div className="diario-danger-zone">

              <p>
                ¿Quieres comenzar un diario nuevo?
              </p>

              <button
                type="button"
                onClick={borrarDiario}
                disabled={cargando}
              >
                Eliminar diario
              </button>

            </div>

          </>

        )}

      </div>

    </section>

  )
}

export default DiarioAdaptacion
