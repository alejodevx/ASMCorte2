/**
 * Capítulos de la novela basados en el guion del Terremoto (El Buziraco).
 */
export const CHAPTERS = [
  {
    id: 'terremoto_cap1',
    phenomenonId: 'terremoto',
    number: 1,
    title: 'La calma antes',
    synopsis:
      'Una tarde acogedora y normal en Cali. Conoce a María y Nicolás en San Fernando; a Juan celebrando en La Luna; y a Luis, recién llegado a la Torre de Cali, revisando su mochila de emergencia.',
    characters: ['María (Médico)', 'Nicolás (Paciente)', 'Juan (Novio)', 'Luis (Residente Torre de Cali)'],
  },
  {
    id: 'terremoto_cap2',
    phenomenonId: 'terremoto',
    number: 2,
    title: 'El despertar del Buziraco',
    synopsis:
      'De madrugada, un rugido profundo retumba desde el suelo. El Buziraco se libera y la ciudad se sacude violentamente. Edificios colapsan como papel en Cuarto de Legua, El Limonar y el HUV.',
    characters: ['El Buziraco', 'Enfermeras del HUV', 'Habitantes del Limonar'],
  },
  {
    id: 'terremoto_cap3',
    phenomenonId: 'terremoto',
    number: 3,
    title: 'Rescate y secuelas',
    synopsis:
      'El sur de Cali es la zona más golpeada. Comienzan las intensas labores de rescate en La Alameda y San Fernando. Los ciudadanos se enfrentan a las ruinas buscando salvar a quienes quedaron atrapados.',
    characters: ['Cruz Roja', 'Defensa Civil', 'Bomberos', 'Sobrevivientes'],
  },
]

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id)

const PROGRESS_KEY = 'novela-cali-progreso'

export const getProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) ?? {}
  } catch {
    return {}
  }
}

export const markChapterCompleted = (id) => {
  const p = getProgress()
  p[id] = { completed: true, date: new Date().toISOString() }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p))
}
