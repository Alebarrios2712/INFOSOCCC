
import { useState } from 'react'
import './PerfilMascota.css'

function PerfilMascota() {
  const [mascota, setMascota] = useState({
    nombre: '',
    especie: '',
    edad: '',
    fechaAdopcion: ''
  })

  const [perfilCreado, setPerfilCreado] = useState(false)

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setMascota((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  function guardarPerfil(evento) {
    evento.preventDefault()
    setPerfilCreado(true)
  }

  return (
    <section className="perfil-mascota">
      <div className="perfil-encabezado">
        <span className="section-tag">
          MI COMPAÑERO
        </span>

        <h1>Conozcamos a tu mascota</h1>

        <p>
          Cada mascota tiene una historia especial.
          Crea su perfil para acompañarla en esta
          nueva etapa de su vida.
        </p>
      </div>

      {!perfilCreado ? (
        <form
          className="perfil-formulario"
          onSubmit={guardarPerfil}
        >
          <h2>Datos de tu mascota</h2>

          <label htmlFor="nombre">
            Nombre de tu mascota
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Milo"
            value={mascota.nombre}
            onChange={actualizarCampo}
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
            placeholder="Ej: 8 meses"
            value={mascota.edad}
            onChange={actualizarCampo}
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
          />

          <button type="submit">
            Crear perfil
          </button>
        </form>
      ) : (
        <div className="perfil-resumen">
          <div
            className="perfil-avatar"
            aria-hidden="true"
          >
            {mascota.especie === 'Perro' ? '🐶' : '🐱'}
          </div>

          <span className="section-tag">
            PERFIL DE MASCOTA
          </span>

          <h2>{mascota.nombre}</h2>

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
            {mascota.fechaAdopcion || 'No registrada'}
          </p>

          <div className="perfil-accesos">
            <div>
              Diario de adaptación
            </div>

            <div>
              Registro de vacunas
            </div>

            <div>
              Recordatorios
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPerfilCreado(false)}
          >
            Editar perfil
          </button>
        </div>
      )}
    </section>
  )
}

export default PerfilMascota
