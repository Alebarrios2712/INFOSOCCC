
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import fotoConductas from '../assets/conductas.jpg'
import './ChatMascota.css'

// ==========================================
// HISTORIAS INTERACTIVAS
// ==========================================

const historias = {
  perro: [
    {
      id: 'escondido',
      titulo: 'Mi nuevo hogar',
      emoji: '🏠',
      contexto:
        'Tu perro acaba de llegar a su nuevo hogar. Se esconde detrás del sofá y evita acercarse.',
      inicio:
        'Hola... todo es nuevo para mí. Hay muchos olores y sonidos que todavía no conozco. Prefiero quedarme escondido.',
      pregunta:
        '¿Qué haces para ayudarme?',
      respuestas: [
        {
          texto:
            'Te dejaré tranquilo y esperaré a que quieras acercarte.',
          reaccion:
            'Gracias... desde aquí puedo observar todo sin sentirme presionado.',
          consejo:
            'Respetar su espacio y permitir acercamientos voluntarios favorece la confianza.',
          favorable: true
        },
        {
          texto:
            'Te sacaré del sofá para que conozcas la casa.',
          reaccion:
            '¡Espera! Todavía tengo miedo. Quiero volver a esconderme.',
          consejo:
            'Forzar a una mascota asustada a salir puede aumentar su inseguridad.',
          favorable: false
        },
        {
          texto:
            'Invitaré a todos para que vengan a acariciarte.',
          reaccion:
            '¡Son demasiadas personas! Me siento abrumado.',
          consejo:
            'Las presentaciones con muchas personas pueden ser estresantes durante los primeros días.',
          favorable: false
        }
      ],
      continuacion:
        'Todavía estoy conociendo este lugar. ¿Cómo podría sentirme más cómodo?',
      finales: [
        {
          texto:
            'Voy a prepararte una cama, agua y un rincón tranquilo.',
          reaccion:
            '¡Eso me ayudará! Así tendré un lugar seguro para descansar.'
        },
        {
          texto:
            'Voy a insistir en que salgas a jugar conmigo.',
          reaccion:
            'Todavía necesito tiempo. Prefiero acercarme cuando me sienta preparado.'
        }
      ],
      aprendizaje:
        'Durante la adaptación, los perros pueden necesitar refugio, tranquilidad y rutinas predecibles. Es importante respetar sus señales de incomodidad.',
      alerta:
        'Consulta al veterinario si deja de comer o beber, presenta decaimiento o mantiene un miedo intenso.'
    },
    {
      id: 'mordidas',
      titulo: '¡Quiero morder!',
      emoji: '🦴',
      contexto:
        'Tu cachorro mordisquea las zapatillas y también intenta morder tus manos mientras juegan.',
      inicio:
        '¡Encontré unas zapatillas! Son entretenidas para morder. ¡También quiero jugar con tus manos!',
      pregunta:
        '¿Cómo podemos jugar?',
      respuestas: [
        {
          texto:
            'Te ofreceré un mordedor apropiado.',
          reaccion:
            '¡Este juguete también es entretenido! Puedo morderlo mientras jugamos.',
          consejo:
            'Redirigir las mordidas hacia juguetes seguros ayuda a enseñar una alternativa adecuada.',
          favorable: true
        },
        {
          texto:
            'Te gritaré para que dejes de hacerlo.',
          reaccion:
            '¡Me asusté! No entiendo bien qué esperas que haga.',
          consejo:
            'Los gritos pueden provocar miedo sin enseñar una conducta alternativa.',
          favorable: false
        },
        {
          texto:
            'Seguiré jugando usando mis manos.',
          reaccion:
            '¡Entonces tus manos también son parte del juego!',
          consejo:
            'Jugar directamente con las manos puede reforzar las mordidas dirigidas a ellas.',
          favorable: false
        }
      ],
      continuacion:
        '¡Todavía tengo energía! ¿Qué hacemos ahora?',
      finales: [
        {
          texto:
            'Jugaremos con juguetes y haremos pausas cuando sea necesario.',
          reaccion:
            '¡Me gusta! Así puedo jugar de una manera más apropiada.'
        },
        {
          texto:
            'Te quitaré todos tus juguetes.',
          reaccion:
            'Pero sigo necesitando cosas seguras para explorar y morder.'
        }
      ],
      aprendizaje:
        'Mordisquear puede formar parte del juego, la exploración y la dentición. Ofrecer juguetes seguros y reforzar su uso es preferible al castigo.',
      alerta:
        'Consulta si existen lesiones, dolor, mordidas intensas o cambios repentinos de comportamiento.'
    },
    {
      id: 'soledad',
      titulo: '¿Vas a volver?',
      emoji: '💛',
      contexto:
        'Tu perro comienza a inquietarse cuando tomas tus llaves y te preparas para salir.',
      inicio:
        '¿Ya te vas? Todavía me cuesta quedarme solo en esta casa.',
      pregunta:
        '¿Cómo me ayudarás?',
      respuestas: [
        {
          texto:
            'Practicaremos separaciones muy breves y avanzaremos poco a poco.',
          reaccion:
            'Eso me ayuda... puedo aprender a sentirme más tranquilo.',
          consejo:
            'Las separaciones graduales deben adaptarse a la tolerancia de cada perro.',
          favorable: true
        },
        {
          texto:
            'Te dejaré solo muchas horas para que aprendas.',
          reaccion:
            '¡Es demasiado tiempo para mí! Me siento muy inquieto.',
          consejo:
            'Las separaciones prolongadas pueden empeorar la angustia.',
          favorable: false
        },
        {
          texto:
            'Te retaré si lloras.',
          reaccion:
            'Ahora estoy nervioso y también tengo miedo de que me reten.',
          consejo:
            'El castigo no resuelve los problemas relacionados con la separación.',
          favorable: false
        }
      ],
      continuacion:
        '¿Qué más podemos hacer para que me sienta mejor?',
      finales: [
        {
          texto:
            'Mantendremos rutinas y practicaremos con paciencia.',
          reaccion:
            '¡Gracias! Así puedo sentirme más seguro.'
        },
        {
          texto:
            'Ignoraremos cualquier señal de angustia.',
          reaccion:
            'Sigo sintiéndome mal. Quizás necesite más ayuda.'
        }
      ],
      aprendizaje:
        'Algunos perros necesitan apoyo progresivo para tolerar separaciones. Los signos intensos de angustia pueden requerir orientación profesional.',
      alerta:
        'Busca ayuda veterinaria si entra en pánico, intenta escapar o se lesiona cuando está solo.'
    },
    {
      id: 'paseo',
      titulo: '¡Ese ruido me asusta!',
      emoji: '🚗',
      contexto:
        'Durante un paseo pasa un vehículo muy ruidoso. Tu perro baja el cuerpo e intenta alejarse.',
      inicio:
        '¡Ese sonido fue muy fuerte! No quiero acercarme.',
      pregunta:
        '¿Qué decides hacer?',
      respuestas: [
        {
          texto:
            'Nos alejaremos un poco y buscaremos un lugar tranquilo.',
          reaccion:
            'Gracias... desde aquí me siento más cómodo.',
          consejo:
            'Aumentar la distancia del estímulo que provoca miedo puede favorecer la calma.',
          favorable: true
        },
        {
          texto:
            'Te acercaré al ruido para que pierdas el miedo.',
          reaccion:
            '¡No quiero acercarme! Estoy todavía más asustado.',
          consejo:
            'Forzar la exposición a un estímulo temido puede incrementar el miedo.',
          favorable: false
        },
        {
          texto:
            'Te retaré por detenerte.',
          reaccion:
            'Sigo teniendo miedo y ahora tampoco entiendo por qué me retan.',
          consejo:
            'El castigo no elimina la emoción que provoca la reacción.',
          favorable: false
        }
      ],
      continuacion:
        'Ya estamos un poco más lejos. ¿Cómo seguimos?',
      finales: [
        {
          texto:
            'Elegiremos una ruta tranquila y respetaremos tus pausas.',
          reaccion:
            '¡Perfecto! Así puedo explorar con más calma.'
        },
        {
          texto:
            'Volveremos directamente hacia el ruido.',
          reaccion:
            'Todavía no me siento preparado para regresar.'
        }
      ],
      aprendizaje:
        'Las posturas bajas, la evitación y los intentos de alejarse pueden indicar miedo. Es importante observar el contexto y respetar sus límites.',
      alerta:
        'Consulta si el miedo es extremo, persistente o limita las actividades cotidianas.'
    },
    {
      id: 'accidentes',
      titulo: 'Todavía estoy aprendiendo',
      emoji: '💧',
      contexto:
        'Tu perro recién adoptado ha hecho sus necesidades dentro de casa.',
      inicio:
        'Ups... todavía no entiendo bien los horarios ni dónde debo hacer mis necesidades.',
      pregunta:
        '¿Qué podemos hacer?',
      respuestas: [
        {
          texto:
            'Crearemos una rutina y te premiaré cuando lo hagas afuera.',
          reaccion:
            '¡Eso me ayuda a entender qué esperas de mí!',
          consejo:
            'Las rutinas y el refuerzo positivo favorecen el aprendizaje.',
          favorable: true
        },
        {
          texto:
            'Te retaré porque deberías saberlo.',
          reaccion:
            'Me asusté... pero sigo sin comprender dónde debo hacerlo.',
          consejo:
            'Castigar después de un accidente no enseña la conducta deseada.',
          favorable: false
        },
        {
          texto:
            'Te quitaré el agua para evitar accidentes.',
          reaccion:
            'Pero necesito beber agua para mantenerme sano.',
          consejo:
            'No se debe restringir el agua sin indicación veterinaria.',
          favorable: false
        }
      ],
      continuacion:
        '¿Y si vuelve a ocurrir?',
      finales: [
        {
          texto:
            'Limpiaremos y seguiremos practicando sin castigos.',
          reaccion:
            '¡Gracias por tenerme paciencia!'
        },
        {
          texto:
            'Te castigaré cada vez que ocurra.',
          reaccion:
            'Eso me da miedo, pero no me ayuda a aprender.'
        }
      ],
      aprendizaje:
        'Los cambios de hogar pueden alterar hábitos. El aprendizaje requiere paciencia, oportunidades frecuentes y refuerzo positivo.',
      alerta:
        'Consulta si aparecen sangre, dolor, esfuerzo para orinar o cambios repentinos.'
    }
  ],

  gato: [
    {
      id: 'caja',
      titulo: 'Mi caja es mi refugio',
      emoji: '📦',
      contexto:
        'Tu gato recién adoptado permanece escondido dentro de una caja.',
      inicio:
        'Miau... esta casa es muy grande. Desde mi caja puedo observar sin sentirme expuesto.',
      pregunta:
        '¿Qué harás con mi escondite?',
      respuestas: [
        {
          texto:
            'Te dejaré tu caja y un lugar tranquilo.',
          reaccion:
            '¡Gracias! Aquí me siento protegido mientras conozco mi nuevo hogar.',
          consejo:
            'Los refugios seguros ayudan a muchos gatos durante la adaptación.',
          favorable: true
        },
        {
          texto:
            'Te quitaré la caja para obligarte a explorar.',
          reaccion:
            '¡No! Ahora necesito encontrar otro lugar donde esconderme.',
          consejo:
            'Retirar un escondite puede aumentar el estrés.',
          favorable: false
        },
        {
          texto:
            'Te sacaré en brazos para mostrarte la casa.',
          reaccion:
            'Todavía no quiero recorrer todo. Prefiero hacerlo a mi ritmo.',
          consejo:
            'La exploración del entorno debe ser gradual y voluntaria.',
          favorable: false
        }
      ],
      continuacion:
        'Ahora que tengo mi refugio, ¿qué más necesito?',
      finales: [
        {
          texto:
            'Agua, comida y arenero en lugares adecuados y separados.',
          reaccion:
            '¡Perfecto! Así tendré lo necesario para comenzar.'
        },
        {
          texto:
            'Pondré el arenero junto a tu comida.',
          reaccion:
            'Preferiría que mi baño estuviera separado de donde como.'
        }
      ],
      aprendizaje:
        'Los gatos suelen beneficiarse de refugios, recursos accesibles y una adaptación progresiva. Cada animal tiene su propio ritmo.',
      alerta:
        'Consulta si deja de comer, beber, utilizar el arenero o presenta decaimiento.'
    },
    {
      id: 'bufidos',
      titulo: '¡Necesito espacio!',
      emoji: '😾',
      contexto:
        'Tu gato pone las orejas hacia atrás y bufa cuando intentas acariciarlo.',
      inicio:
        '¡Fsss! Ahora mismo no quiero que me toquen.',
      pregunta:
        '¿Cómo reaccionas?',
      respuestas: [
        {
          texto:
            'Me alejaré y esperaré a que quieras acercarte.',
          reaccion:
            'Gracias... prefiero decidir cuándo quiero contacto.',
          consejo:
            'Respetar sus señales de incomodidad ayuda a evitar situaciones de estrés.',
          favorable: true
        },
        {
          texto:
            'Seguiré acariciándote hasta que te acostumbres.',
          reaccion:
            '¡Fsss! Me siento cada vez más incómodo.',
          consejo:
            'Insistir puede aumentar las respuestas defensivas.',
          favorable: false
        },
        {
          texto:
            'Te retaré para que dejes de bufar.',
          reaccion:
            'Ahora me siento todavía más inseguro.',
          consejo:
            'Castigar las señales de advertencia puede incrementar el miedo.',
          favorable: false
        }
      ],
      continuacion:
        '¿Cómo podemos conocernos mejor?',
      finales: [
        {
          texto:
            'Te ofreceré juegos tranquilos y acercamientos voluntarios.',
          reaccion:
            '¡Me gusta! Así puedo participar cuando quiera.'
        },
        {
          texto:
            'Te tomaré en brazos cada vez que te vea.',
          reaccion:
            'Todavía no me siento cómodo con eso.'
        }
      ],
      aprendizaje:
        'El bufido y la postura corporal tensa pueden indicar miedo o incomodidad. Las señales deben interpretarse junto con el contexto.',
      alerta:
        'Consulta si la conducta aparece de repente, se relaciona con dolor o provoca agresiones frecuentes.'
    },
    {
      id: 'rascar',
      titulo: '¡Me encanta rascar!',
      emoji: '🛋️',
      contexto:
        'Tu gato rasca el sofá mientras estira sus patas y su cuerpo.',
      inicio:
        '¡Este sofá me encanta para estirarme y rascar!',
      pregunta:
        '¿Qué harás?',
      respuestas: [
        {
          texto:
            'Pondré un rascador firme cerca del sofá.',
          reaccion:
            '¡Qué interesante! También puedo rascar aquí.',
          consejo:
            'Rascar es una conducta natural. Ofrecer superficies apropiadas permite redirigirla.',
          favorable: true
        },
        {
          texto:
            'Te rociaré con agua para detenerte.',
          reaccion:
            '¡Me asusté! Pero sigo necesitando rascar.',
          consejo:
            'Asustarlo no elimina su necesidad natural de rascar.',
          favorable: false
        },
        {
          texto:
            'Te gritaré cuando te acerques al sofá.',
          reaccion:
            'Ahora tengo miedo, pero no sé dónde debería rascar.',
          consejo:
            'Ofrecer alternativas adecuadas es preferible a utilizar castigos.',
          favorable: false
        }
      ],
      continuacion:
        '¿Dónde pondremos mi nuevo rascador?',
      finales: [
        {
          texto:
            'En un sitio accesible que uses frecuentemente.',
          reaccion:
            '¡Genial! Así será fácil encontrarlo.'
        },
        {
          texto:
            'En una habitación a la que casi nunca entras.',
          reaccion:
            'Quizás ni siquiera lo encuentre cuando quiera rascar.'
        }
      ],
      aprendizaje:
        'Rascar permite estirarse, cuidar las uñas y marcar superficies. Un rascador bien ubicado puede ayudar a proteger los muebles.',
      alerta:
        'Consulta si existen lesiones en las patas, uñas dañadas o cambios bruscos de comportamiento.'
    },
    {
      id: 'arenero',
      titulo: 'Algo no anda bien',
      emoji: '🚨',
      contexto:
        'Tu gato entra repetidamente al arenero y parece tener problemas para orinar.',
      inicio:
        'Miau... he ido muchas veces al arenero y me cuesta hacer pipí.',
      pregunta:
        '¿Qué harás?',
      respuestas: [
        {
          texto:
            'Comprobaré si puedes orinar y contactaré al veterinario.',
          reaccion:
            'Gracias... podría necesitar atención médica.',
          consejo:
            'Las dificultades para orinar pueden indicar un problema médico urgente.',
          favorable: true
        },
        {
          texto:
            'Seguro lo haces para llamar la atención.',
          reaccion:
            'No me siento bien. No estoy intentando portarme mal.',
          consejo:
            'No debemos atribuir posibles problemas urinarios a desobediencia.',
          favorable: false
        },
        {
          texto:
            'Esperaré varios días a ver si mejoras.',
          reaccion:
            'Sigo sintiéndome mal. Necesito ayuda.',
          consejo:
            'Una posible obstrucción urinaria puede ser una emergencia.',
          favorable: false
        }
      ],
      continuacion:
        '¿Y si hago fuerza, pero no logro orinar?',
      finales: [
        {
          texto:
            'Te llevaré inmediatamente a urgencias veterinarias.',
          reaccion:
            'Eso es lo que necesito. ¡Gracias por actuar rápido!'
        },
        {
          texto:
            'Esperaré hasta mañana.',
          reaccion:
            'No puedo esperar. Esto puede ser una emergencia.'
        }
      ],
      aprendizaje:
        'Las dificultades para orinar pueden ser una urgencia veterinaria, especialmente en gatos machos.',
      alerta:
        'Si intenta orinar y no sale orina, acude inmediatamente a urgencias veterinarias.'
    },
    {
      id: 'noche',
      titulo: '¡Tengo energía!',
      emoji: '🌙',
      contexto:
        'Tu gato corre y juega cuando llega el anochecer.',
      inicio:
        '¡Miau! Está oscureciendo y tengo muchas ganas de jugar.',
      pregunta:
        '¿Qué podemos hacer?',
      respuestas: [
        {
          texto:
            'Jugaremos con juguetes apropiados y tendremos una rutina.',
          reaccion:
            '¡Sí! Me encanta perseguir mis juguetes.',
          consejo:
            'Muchos gatos presentan mayor actividad al amanecer y al anochecer.',
          favorable: true
        },
        {
          texto:
            'Te gritaré para que te quedes quieto.',
          reaccion:
            '¡Me asusté! Solo tenía ganas de jugar.',
          consejo:
            'El castigo no es una forma apropiada de manejar la actividad normal.',
          favorable: false
        },
        {
          texto:
            'Evitaré que juegues durante todo el día.',
          reaccion:
            'Pero necesito oportunidades para moverme y explorar.',
          consejo:
            'El enriquecimiento ambiental y el juego contribuyen al bienestar.',
          favorable: false
        }
      ],
      continuacion:
        '¿Y cómo organizamos nuestras tardes?',
      finales: [
        {
          texto:
            'Con juegos cortos y horarios relativamente estables.',
          reaccion:
            '¡Perfecto! Así puedo jugar y descansar.'
        },
        {
          texto:
            'Te despertaré cada vez que estés durmiendo.',
          reaccion:
            'También necesito descansar sin interrupciones.'
        }
      ],
      aprendizaje:
        'El juego, las rutinas y el enriquecimiento ambiental ayudan a satisfacer las necesidades de actividad de los gatos.',
      alerta:
        'Consulta si aparecen cambios repentinos, desorientación, dolor o vocalización inusual.'
    }
  ]
}

// ==========================================
// LEER CAMBIOS LOCALES DEL PERFIL
// ==========================================

function leerPerfilLocal(id) {
  try {
    const guardado = localStorage.getItem(
      `huellaPerfil_${id}`
    )

    if (!guardado) return null

    const perfil = JSON.parse(guardado)

    if (
      typeof perfil?.nombre !== 'string' ||
      !perfil.nombre.trim() ||
      !['Perro', 'Gato'].includes(perfil.especie)
    ) {
      return null
    }

    return {
      nombre: perfil.nombre.trim(),
      tipo: perfil.especie.toLowerCase()
    }
  } catch (error) {
    console.warn(
      'No se pudo leer el perfil local:',
      error
    )
    return null
  }
}

// ==========================================
// BURBUJA DE CONVERSACIÓN
// ==========================================

function Burbuja({ autor, texto, nombre, emoji }) {
  const esMascota = autor === 'mascota'

  return (
    <div
      className={`chatm-fila ${
        esMascota ? 'mascota' : 'usuario'
      }`}
    >
      {esMascota && (
        <span
          className="chatm-mini-avatar"
          aria-hidden="true"
        >
          {emoji}
        </span>
      )}

      <div className="chatm-burbuja">
        <span className="chatm-autor">
          {esMascota ? nombre : 'Tú'}
        </span>

        <p>{texto}</p>
      </div>
    </div>
  )
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ChatMascota({ irAPerfil }) {
  const [mascota, setMascota] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [historiaActual, setHistoriaActual] = useState(0)
  const [respuesta1, setRespuesta1] = useState(null)
  const [respuesta2, setRespuesta2] = useState(null)
  const [finalizado, setFinalizado] = useState(false)

  // ==========================================
  // RECUPERAR MASCOTA REGISTRADA
  // ==========================================

  useEffect(() => {
    let vigente = true

    async function cargarPerfil() {
      setCargando(true)
      setError('')

      const idGuardado = localStorage.getItem(
        'huellaMascotaId'
      )

      const id = Number(idGuardado)

      if (
        !idGuardado ||
        !Number.isSafeInteger(id) ||
        id <= 0
      ) {
        if (vigente) {
          setMascota(null)
          setCargando(false)
        }

        return
      }

      // Recuperar primero cualquier edición pendiente
      const perfilLocal = leerPerfilLocal(id)

      try {
        const { data, error: errorConsulta } = await supabase
          .from('mascotas')
          .select('id, nombre, tipo')
          .eq('id', id)
          .maybeSingle()

        if (!vigente) return

        if (errorConsulta) {
          throw errorConsulta
        }

        const tipoServidor =
          typeof data?.tipo === 'string'
            ? data.tipo.toLowerCase()
            : ''

        const perfilServidor =
          data?.nombre &&
          ['perro', 'gato'].includes(tipoServidor)
            ? {
                nombre: data.nombre,
                tipo: tipoServidor
              }
            : null

        // Prioridad:
        // 1. Edición local pendiente
        // 2. Perfil confirmado en Supabase
        const perfilActual = perfilLocal || perfilServidor

        setMascota(perfilActual)
      } catch (errorConsulta) {
        console.error(
          'Error al recuperar la mascota:',
          errorConsulta
        )

        if (!vigente) return

        // Si Supabase falla, usar el respaldo local
        if (perfilLocal) {
          setMascota(perfilLocal)
        } else {
          setError(
            'No pudimos recuperar el perfil de tu mascota. Comprueba la conexión.'
          )
        }
      } finally {
        if (vigente) setCargando(false)
      }
    }

    cargarPerfil()

    return () => {
      vigente = false
    }
  }, [])

  // ==========================================
  // FUNCIONES DE LA CONVERSACIÓN
  // ==========================================

  function reiniciarConversacion() {
    setRespuesta1(null)
    setRespuesta2(null)
  }

  function cambiarHistoria(indice) {
    setHistoriaActual(indice)
    setFinalizado(false)
    reiniciarConversacion()
  }

  function siguienteHistoria() {
    if (!mascota) return

    const cantidad = historias[mascota.tipo].length

    if (historiaActual < cantidad - 1) {
      cambiarHistoria(historiaActual + 1)
    } else {
      setFinalizado(true)
    }
  }

  // ==========================================
  // ESTADO DE CARGA
  // ==========================================

  if (cargando) {
    return (
      <section className="chatm-pagina">
        <div className="chatm-estado">
          <h2>Cargando el perfil de tu mascota...</h2>
        </div>
      </section>
    )
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="chatm-pagina">
        <div className="chatm-estado">
          <h2>No pudimos abrir el chat</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  // ==========================================
  // SIN PERFIL
  // ==========================================

  if (!mascota) {
    return (
      <section className="chatm-pagina">
        <div className="chatm-estado">
          <div className="chatm-estado-emoji">
            🐾
          </div>

          <h2>
            ¡Primero queremos conocer a tu mascota!
          </h2>

          <p>
            Registra el nombre y la especie de tu
            mascota en Mi mascota para comenzar
            las conversaciones personalizadas.
          </p>

          <button
            type="button"
            onClick={irAPerfil}
          >
            Ir a Mi mascota
          </button>
        </div>
      </section>
    )
  }

  // ==========================================
  // DATOS DE LA HISTORIA ACTUAL
  // ==========================================

  const lista = historias[mascota.tipo]
  const actual = lista[historiaActual]

  const emoji =
    mascota.tipo === 'perro' ? '🐶' : '🐱'

  const eleccion1 =
    respuesta1 === null
      ? null
      : actual.respuestas[respuesta1]

  const eleccion2 =
    respuesta2 === null
      ? null
      : actual.finales[respuesta2]

  // ==========================================
  // CONSTRUIR MENSAJES
  // ==========================================

  const mensajes = [
    {
      autor: 'mascota',
      texto: actual.inicio
    }
  ]

  if (eleccion1) {
    mensajes.push(
      {
        autor: 'usuario',
        texto: eleccion1.texto
      },
      {
        autor: 'mascota',
        texto: eleccion1.reaccion
      },
      {
        autor: 'mascota',
        texto: actual.continuacion
      }
    )
  }

  if (eleccion2) {
    mensajes.push(
      {
        autor: 'usuario',
        texto: eleccion2.texto
      },
      {
        autor: 'mascota',
        texto: eleccion2.reaccion
      }
    )
  }

  // ==========================================
  // PANTALLA FINAL
  // ==========================================

  if (finalizado) {
    return (
      <section className="chatm-pagina">
        <div className="chatm-final-juego">
          <span className="chatm-final-emoji">
            {emoji}
          </span>

          <h2>
            ¡Ahora conoces un poquito mejor a{' '}
            {mascota.nombre}!
          </h2>

          <p>
            Has explorado diferentes situaciones
            que pueden ocurrir durante la convivencia
            con tu mascota.
          </p>

          <p>
            Recuerda que cada animal tiene su propia
            personalidad y puede reaccionar de
            diferentes maneras.
          </p>

          <button
            type="button"
            onClick={() => cambiarHistoria(0)}
          >
            Volver a conversar
          </button>
        </div>
      </section>
    )
  }

  // ==========================================
  // INTERFAZ PRINCIPAL
  // ==========================================

  return (
    <section className="chatm-pagina">
      <div className="chatm-contenedor">

        {/* ENCABEZADO */}

        <div className="chatm-hero">
          <div>
            <span className="chatm-etiqueta">
              HUELLA SEGURA · APRENDE JUGANDO
            </span>

            <h1>Chat con mi mascota</h1>

            <p>
              ¿Qué intenta comunicar{' '}
              {mascota.nombre}?
              Conversa, toma decisiones y descubre
              cómo responder ante distintas
              situaciones cotidianas.
            </p>

            <span className="chatm-subtitulo">
              Cada respuesta cambia la conversación.
            </span>
          </div>

          <img
            src={fotoConductas}
            alt="Perro y gato en un hogar"
          />
        </div>

        {/* SELECCIÓN DE HISTORIAS */}

        <div className="chatm-capitulos">
          <h2>Elige una historia</h2>

          <div className="chatm-capitulos-lista">
            {lista.map((historia, indice) => (
              <button
                key={historia.id}
                type="button"
                className={
                  historiaActual === indice
                    ? 'chatm-capitulo activo'
                    : 'chatm-capitulo'
                }
                aria-pressed={
                  historiaActual === indice
                }
                onClick={() =>
                  cambiarHistoria(indice)
                }
              >
                <span aria-hidden="true">
                  {historia.emoji}
                </span>

                <small>
                  Historia {indice + 1}
                </small>

                <strong>
                  {historia.titulo}
                </strong>
              </button>
            ))}
          </div>
        </div>

        {/* VENTANA DE MENSAJES */}

        <div className="chatm-ventana">

          {/* CABECERA */}

          <div className="chatm-cabecera">
            <div className="chatm-avatar">
              {emoji}
            </div>

            <div className="chatm-cabecera-texto">
              <h2>{mascota.nombre}</h2>

              <span>
                Conversación simulada ·{' '}
                {mascota.tipo === 'perro'
                  ? 'Perro'
                  : 'Gato'}
              </span>
            </div>

            <span className="chatm-capitulo-numero">
              {historiaActual + 1} / {lista.length}
            </span>
          </div>

          {/* CONTEXTO */}

          <div className="chatm-contexto">
            <strong>
              {actual.emoji} {actual.titulo}
            </strong>

            <p>{actual.contexto}</p>
          </div>

          {/* BURBUJAS */}

          <div
            className="chatm-mensajes"
            aria-live="polite"
          >
            {mensajes.map((mensaje, indice) => (
              <Burbuja
                key={`${historiaActual}-${indice}`}
                autor={mensaje.autor}
                texto={mensaje.texto}
                nombre={mascota.nombre}
                emoji={emoji}
              />
            ))}
          </div>

          {/* PRIMERA DECISIÓN */}

          {respuesta1 === null && (
            <div className="chatm-elecciones">
              <h3>{actual.pregunta}</h3>

              {actual.respuestas.map(
                (opcion, indice) => (
                  <button
                    type="button"
                    key={indice}
                    className="chatm-opcion"
                    onClick={() =>
                      setRespuesta1(indice)
                    }
                  >
                    <span>
                      {opcion.texto}
                    </span>

                    <span aria-hidden="true">
                      ➤
                    </span>
                  </button>
                )
              )}
            </div>
          )}

          {/* SEGUNDA DECISIÓN */}

          {eleccion1 && respuesta2 === null && (
            <div className="chatm-elecciones">

              <div className="chatm-pista">
                <strong>
                  Lo que podemos aprender
                </strong>

                <p>{eleccion1.consejo}</p>
              </div>

              <h3>
                ¿Qué le responderías ahora?
              </h3>

              {actual.finales.map(
                (opcion, indice) => (
                  <button
                    type="button"
                    key={indice}
                    className="chatm-opcion"
                    onClick={() =>
                      setRespuesta2(indice)
                    }
                  >
                    <span>
                      {opcion.texto}
                    </span>

                    <span aria-hidden="true">
                      ➤
                    </span>
                  </button>
                )
              )}
            </div>
          )}

          {/* FINAL DE LA HISTORIA */}

          {eleccion2 && (
            <div className="chatm-desenlace">

              <div className="chatm-aprendizaje">
                <span className="chatm-etiqueta">
                  FIN DE LA HISTORIA
                </span>

                <h3>¿Qué aprendimos?</h3>

                <p>{actual.aprendizaje}</p>
              </div>

              <div className="chatm-alerta">
                <strong>
                  ¿Cuándo consultar al veterinario?
                </strong>

                <p>{actual.alerta}</p>
              </div>

              <div className="chatm-botones-finales">
                <button
                  type="button"
                  className="chatm-repetir"
                  onClick={reiniciarConversacion}
                >
                  ↻ Probar otras respuestas
                </button>

                <button
                  type="button"
                  className="chatm-siguiente"
                  onClick={siguienteHistoria}
                >
                  {historiaActual ===
                  lista.length - 1
                    ? 'Terminar juego →'
                    : 'Otra historia →'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* AVISO */}

        <p className="chatm-aviso">
          Este chat es una simulación educativa.
          Los mensajes no representan los
          pensamientos reales de{' '}
          {mascota.nombre}.
          Las conductas deben interpretarse
          según el contexto.
        </p>

      </div>
    </section>
  )
}
