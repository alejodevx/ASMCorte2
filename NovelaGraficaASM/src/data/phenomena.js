export const THREAT_LEVELS = {
  alto: { id: 'alto', label: 'Alto', color: '#B71C1C', fillOpacity: 0.45 },
  medio: { id: 'medio', label: 'Medio', color: '#EF6C00', fillOpacity: 0.38 },
  bajo: { id: 'bajo', label: 'Bajo', color: '#F9A825', fillOpacity: 0.3 },
}

export const LEVEL_ORDER = ['alto', 'medio', 'bajo']

export const PHENOMENA = {
  terremoto: {
    id: 'terremoto',
    name: 'Terremoto',
    icon: 'earthquake',
    color: '#5D4037',
    origin: 'Geológico / Mitológico',
    criticalMonths: [], // No tiene temporada: puede ocurrir en cualquier momento.
    seasonLabel: 'No tiene temporada: puede ocurrir en cualquier momento del año.',
    summary:
      'Cali se ubica en una zona de amenaza sísmica alta debido a fallas geológicas. Según la leyenda local, el demonio "Buziraco" ruge desde las profundidades, provocando violentas sacudidas.',
    causes: [
      'Subducción de la placa de Nazca y actividad de fallas cercanas.',
      'El despertar del "Buziraco", liberando su fuerza a través de la tierra.',
      'Suelos blandos y amplificación sísmica en ciertas zonas de la ciudad.',
      'Edificaciones construidas antes de 1988 sin normativas sismorresistentes modernas.',
    ],
    effects: [
      'Colapso de edificaciones vulnerables (ej. El Limonar, La Alameda, Cuarto de Legua).',
      'Personas atrapadas bajo escombros en zonas comerciales y residenciales.',
      'Daños graves en infraestructura crítica como el Hospital Universitario del Valle.',
      'Pánico generalizado por el rugido profundo y el movimiento violento.',
    ],
    before: [
      'Prepara una mochila de emergencia (agua, linterna, radio, botiquín, etc.) como hizo Luis en la Torre de Cali.',
      'Verifica si tu edificio cuenta con protección antisismos moderna (como en El Caney).',
      'Identifica las rutas de evacuación y puntos de encuentro.',
    ],
    during: [
      'Mantén la calma a pesar del fuerte estruendo.',
      'Agáchate, cúbrete y sujétate bajo una estructura resistente.',
      'Aléjate de ventanas, vidrios y muros que puedan resquebrajarse.',
    ],
    after: [
      'Evacúa hacia los puntos de encuentro preestablecidos.',
      'Ayuda a las labores de rescate si estás capacitado, o deja espacio a Cruz Roja y Bomberos.',
      'No satures las líneas telefónicas; usa mensajes de texto.',
    ],
  },
}

export const PHENOMENA_LIST = Object.values(PHENOMENA)

export const isCriticalMonth = () => false
