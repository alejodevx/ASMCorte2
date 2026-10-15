import { MEETING_POINTS } from './meetingPoints'

/**
 * Microzonificación y Zonas de Riesgo de Colapso Estructural en Cali.
 * Cubre la totalidad del perímetro urbano dividiéndolo por tipo de suelo,
 * tipología de edificaciones y nivel de riesgo de colapso ante sismos severos.
 */
export const COLLAPSE_ZONES = [
  {
    id: 'cz-ladera',
    phenomenon: 'terremoto',
    level: 'muy_alto',
    name: 'Ladera Occidental: Siloé, Terrón Colorado y Piedemonte',
    area: 'Comunas 1, 18 y 20 · Siloé, Terrón Colorado, Aguacatal, Los Chorros, Bellavista, Polvorines, Meléndez Alto',
    soilType: 'Pendientes abruptas y roca fracturada con depósitos de vertiente.',
    structuralRisk: 'Alta concentración de viviendas autoconstruidas sin vigas de confinamiento ni cálculo estructural; colapso severo por sacudida y deslizamientos de laderas.',
    description: 'Franja de máxima vulnerabilidad en Cali. Las fuertes pendientes incrementan la inestabilidad de las viviendas informales y las fallas en cimientos provocan colapsos en cadena y bloqueo de senderos peatonales.',
    recommendations: [
      'Inspeccionar muros agrietados y taludes inestables tras cualquier movimiento.',
      'Asegurar tanques de agua elevados y retirar cargas excesivas en terrazas.',
      'Evacuar de inmediato hacia canchas comunitarias o vías amplias despejadas.',
      'No retornar a viviendas construidas al borde de pendientes sin revisión técnica.'
    ],
    meetingPoints: ['pe-pueblo', 'pe-perro'],
    coords: [
      [3.4850, -76.5500],
      [3.4750, -76.5700],
      [3.4450, -76.5800],
      [3.4150, -76.5750],
      [3.3750, -76.5650],
      [3.3750, -76.5450],
      [3.4050, -76.5500],
      [3.4300, -76.5480],
      [3.4550, -76.5440],
      [3.4850, -76.5500]
    ]
  },
  {
    id: 'cz-aguablanca',
    phenomenon: 'terremoto',
    level: 'muy_alto',
    name: 'Distrito de Aguablanca y Llanura Aluvial Oriental',
    area: 'Comunas 13, 14, 15 y 21 · Mojica, El Poblado, Llano Verde, Decepaz, Alfonso López, Cuatro Esquinas',
    soilType: 'Suelos aluviales muy blandos, arcillas compresibles y nivel freático a escasa profundidad.',
    structuralRisk: 'Potencial de licuación del suelo y gran amplificación de ondas sísmicas; pérdida brusca de soporte en cimientos y colapso de muros de mampostería no confinada.',
    description: 'Terrenos que históricamente conformaron humedales del Río Cauca. Durante sismos fuertes, el suelo saturado pierde consistencia (licuación) causando hundimientos, pérdida de verticalidad y colapsos masivos.',
    recommendations: [
      'Verificar asentamientos diferenciales (pisos descolgados o puertas atascadas).',
      'No levantar segundos o terceros pisos sin columnas y zapatas continuas.',
      'Mantener rutas de evacuación expeditas hacia autopistas y corredores abiertos.'
    ],
    meetingPoints: ['pe-ingenio', 'pe-caicedo'],
    coords: [
      [3.4680, -76.4950],
      [3.4580, -76.4700],
      [3.4150, -76.4780],
      [3.3850, -76.5050],
      [3.3980, -76.5220],
      [3.4250, -76.5160],
      [3.4480, -76.5050],
      [3.4680, -76.4950]
    ]
  },
  {
    id: 'cz-centro',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Centro Histórico y Comunas Tradicionales',
    area: 'Comunas 3 y 9 · San Antonio, San Cayetano, Centro, La Merced, San Nicolás, La Alameda, Sucre, San Bosco',
    soilType: 'Depósitos aluviales y arenas consolidadas de la cuenca media del Río Cali.',
    structuralRisk: 'Alta concentración de edificaciones patrimoniales y antiguas en adobe, tapia pisada y ladrillo no reforzado (previas a NSR-84). Calles estrechas con desprendimiento de fachadas.',
    description: 'Sector con edificaciones históricas vulnerables por la fragilidad de materiales antiguos y fatiga estructural acumulada. El colapso de aleros, balcones y cornisas representa alto riesgo para peatones.',
    recommendations: [
      'Al evacuar, alejarse del pie de fachadas antiguas y cables aéreos.',
      'Buscar espacios despejados como la Plaza de Caicedo o plazoletas céntricas.',
      'Promover el reforzamiento estructural con vigas de confinamiento en predios antiguos.'
    ],
    meetingPoints: ['pe-caicedo', 'pe-pascual'],
    coords: [
      [3.4580, -76.5360],
      [3.4520, -76.5440],
      [3.4380, -76.5430],
      [3.4320, -76.5320],
      [3.4420, -76.5240],
      [3.4550, -76.5270],
      [3.4580, -76.5360]
    ]
  },
  {
    id: 'cz-corredor-central',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Corredor Central y San Fernando',
    area: 'Comuna 19 · San Fernando, Tequendama, Miraflores, Champagnat, Bretaña, Los Cámbulos',
    soilType: 'Depósitos aluviales intermedios de conos de deyección.',
    structuralRisk: 'Edificios residenciales y de salud (4 a 8 pisos) construidos entre 1960 y 1990 con esquemas de piso blando (garajes o locales sin muros de rigidez en primer piso).',
    description: 'Corredor vital con alta densidad de clínicas, centros médicos y apartamentos. Las estructuras con piso blando sufren concentración de cortante en columnas bajas, generando colapsos catastróficos por aplastamiento.',
    recommendations: [
      'Evacuar de inmediato si el edificio presenta columnas fisuradas en la planta baja.',
      'No utilizar elevadores; emplear escaleras de evacuación estructurales.',
      'Concentrarse en el Estadio Pascual Guerrero o Parque del Perro.'
    ],
    meetingPoints: ['pe-pascual', 'pe-perro'],
    coords: [
      [3.4380, -76.5430],
      [3.4300, -76.5500],
      [3.4150, -76.5480],
      [3.4180, -76.5340],
      [3.4320, -76.5320],
      [3.4380, -76.5430]
    ]
  },
  {
    id: 'cz-sur-intermedio',
    phenomenon: 'terremoto',
    level: 'medio',
    name: 'Sur Residencial Intermedio (Pasoancho / Limonar)',
    area: 'Comunas 10 y 17 (Norte) · El Limonar, Capri, Departamental, Pasoancho, Cañaveralejo, Santa Anita',
    soilType: 'Abanicos aluviales de los ríos Cañaveralejo y Meléndez.',
    structuralRisk: 'Edificaciones de tipología mixta (casas de 2 pisos y bloques de 4-6 niveles). Riesgo moderado por reformas no estructurales o sobrepeso en cubiertas.',
    description: 'Barrios residenciales consolidados. Aunque el terreno ofrece buena capacidad portante, construcciones intervenidas o multifamiliares de las décadas de 1970 y 1980 sufren fallas localizadas como en Torres de Limonar.',
    recommendations: [
      'Revisar grietas en uniones de losas y columnas tras sacudidas fuertes.',
      'Cerrar llaves maestras de gas y electricidad ante sospecha de fugas.',
      'Acudir al Parque del Ingenio como punto de concentración seguro.'
    ],
    meetingPoints: ['pe-ingenio', 'pe-pascual'],
    coords: [
      [3.4180, -76.5340],
      [3.4150, -76.5480],
      [3.3900, -76.5430],
      [3.3850, -76.5260],
      [3.4050, -76.5240],
      [3.4180, -76.5340]
    ]
  },
  {
    id: 'cz-norte-tradicional',
    phenomenon: 'terremoto',
    level: 'medio',
    name: 'Norte Tradicional y Comercial',
    area: 'Comuna 2 · Granada, Juanambú, Versalles, San Vicente, Santa Mónica, Vipasa, Prados del Norte',
    soilType: 'Terrazas aluviales consolidadas y depósitos de piedemonte del Río Cali.',
    structuralRisk: 'Riesgo moderado centrado en desprendimiento de ventanales flotantes, fachadas decorativas comerciales y muros divisorios no aislados.',
    description: 'Sector residencial y de servicios con construcciones generalmente estables. La vulnerabilidad principal radica en voladizos y elementos no estructurales que pueden desprenderse hacia andenes concurridos.',
    recommendations: [
      'Resguardarse de caída de vidrios, tejas y avisos comerciales en la calle.',
      'Evacuar hacia parques barriales abiertos como Parque Versalles o La Flora.'
    ],
    meetingPoints: ['pe-caicedo'],
    coords: [
      [3.4850, -76.5300],
      [3.4750, -76.5420],
      [3.4550, -76.5380],
      [3.4560, -76.5220],
      [3.4780, -76.5180],
      [3.4850, -76.5300]
    ]
  },
  {
    id: 'cz-norte-industrial',
    phenomenon: 'terremoto',
    level: 'bajo',
    name: 'Norte Industrial y Planificado',
    area: 'Comunas 4, 5 y 6 · Salomia, Chiminangos, Flora Industrial, Menga, Acopi, Los Andes',
    soilType: 'Aluviones planos estables y terrazas aluviales con buena capacidad portante.',
    structuralRisk: 'Bajo riesgo de colapso en viviendas modulares. Estructuras metálicas industriales con capacidad de disipación de energía.',
    description: 'Terreno plano y suelos consolidados. Predominan naves industriales ligeras y urbanizaciones planificadas con bajo índice de colapsos estructurales catastróficos.',
    recommendations: [
      'Activar de inmediato el corte preventivo de tuberías de gas y químicos industriales.',
      'Reunir al personal en patios amplios de maniobras libres de cables aéreos.'
    ],
    meetingPoints: ['pe-caicedo'],
    coords: [
      [3.5000, -76.5100],
      [3.4850, -76.5200],
      [3.4560, -76.5220],
      [3.4680, -76.4950],
      [3.4950, -76.4850],
      [3.5000, -76.5100]
    ]
  },
  {
    id: 'cz-sur-expansion',
    phenomenon: 'terremoto',
    level: 'bajo',
    name: 'Sur de Expansión Moderna y Pance',
    area: 'Comunas 17 (Sur) y 22 · El Caney, Bochalema, Ciudad Pacífica, Valle del Lilí, UAO, Pance, Ciudad Jardín',
    soilType: 'Abanico aluvial firme con gravas y cantos rodados de los ríos Pance y Lili.',
    structuralRisk: 'Bajo riesgo de colapso. Más del 85% de las edificaciones cumplen las normas sismorresistentes modernas NSR-98 y NSR-10, con pantallas de concreto y pilotes profundos.',
    description: 'La zona más moderna de Cali. Urbanizaciones y campus universitarios (como la UAO) diseñados con estrictos coeficientes de disipación sísmica que garantizan integridad estructural y evacuación segura.',
    recommendations: [
      'Conservar la calma: las edificaciones modernas están calculadas para resistir sacudidas intensas sin derrumbarse.',
      'Evacuar ordenadamente hacia las zonas verdes de los conjuntos o campus universitarios.'
    ],
    meetingPoints: ['pe-uao', 'pe-ingenio'],
    coords: [
      [3.3850, -76.5260],
      [3.3900, -76.5430],
      [3.3750, -76.5480],
      [3.3300, -76.5400],
      [3.3250, -76.5180],
      [3.3500, -76.5050],
      [3.3850, -76.5180],
      [3.3850, -76.5260]
    ]
  }
]

/**
 * Puntos y Sectores Críticos de Colapso (Hotspots de desastre y eventos de la historia).
 * Sitios puntuales donde ocurrieron colapsos estructurales graves.
 */
export const CRITICAL_POINTS = [
  {
    id: 'cp-huv',
    phenomenon: 'terremoto',
    level: 'muy_alto',
    name: 'Hospital Universitario del Valle (HUV)',
    area: 'Calle 5 - San Fernando',
    coords: [3.4305, -76.5455],
    description: 'El bloque central del hospital se fracturó por la mitad, dejando atrapados a los bebés en el área de neonatos mientras el personal médico efectuaba rescates heroicos.',
    meetingPoints: ['pe-pascual']
  },
  {
    id: 'cp-siloe',
    phenomenon: 'terremoto',
    level: 'muy_alto',
    name: 'Siloé - Sector La Sultana',
    area: 'Comuna 20 - Ladera Suroccidente',
    coords: [3.4240, -76.5580],
    description: 'Colapso en cadena de viviendas precarias en ladera por falla de talud y falta de zapatas estructurales.',
    meetingPoints: ['pe-pueblo']
  },
  {
    id: 'cp-terron',
    phenomenon: 'terremoto',
    level: 'muy_alto',
    name: 'Terrón Colorado - Curva del Diablo',
    area: 'Comuna 1 - Ladera Noroccidente',
    coords: [3.4600, -76.5560],
    description: 'Desprendimiento de rocas y derrumbe de viviendas al borde del cañón de la vía al mar.',
    meetingPoints: ['pe-caicedo']
  },
  {
    id: 'cp-limonar',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'El Limonar / Torres de Limonar',
    area: 'Comuna 17 - Sur de Cali',
    coords: [3.3945, -76.5350],
    description: 'Colapso total de un edificio de cuatro pisos; decenas de familias atrapadas y rescate conjunto de Cruz Roja y Bomberos.',
    meetingPoints: ['pe-ingenio', 'pe-pascual']
  },
  {
    id: 'cp-alameda',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Galería La Alameda',
    area: 'Comuna 3 / 9',
    coords: [3.4385, -76.5365],
    description: 'Desplome de una edificación de mampostería no confinada frente a la galería, sepultando locales comerciales.',
    meetingPoints: ['pe-pascual']
  },
  {
    id: 'cp-sanfernando',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'San Fernando / Edificio Los Colores',
    area: 'Comuna 19',
    coords: [3.4300, -76.5460],
    description: 'Colapso catastrófico frente al edificio Los Colores; escenario del rescate de María y Nicolás.',
    meetingPoints: ['pe-pascual', 'pe-perro']
  },
  {
    id: 'cp-cuartolegua',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Cuarto de Legua / Frente a la USC',
    area: 'Comuna 19 - Cerca a Plaza de Toros',
    coords: [3.4115, -76.5540],
    description: 'Colapso de edificio residencial de 7 pisos por falla por cortante en columnas de estacionamiento de primera planta.',
    meetingPoints: ['pe-pueblo']
  },
  {
    id: 'cp-laluna',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'La Luna / Sector Junín',
    area: 'Comuna 9',
    coords: [3.4355, -76.5295],
    description: 'Falla estructural y colapso de losas en la discoteca Saturday con atrapamiento de personas.',
    meetingPoints: ['pe-pascual']
  },
  {
    id: 'cp-autopista39',
    phenomenon: 'terremoto',
    level: 'alto',
    name: 'Autopista Sur con Calle 39',
    area: 'Sur',
    coords: [3.4250, -76.5355],
    description: 'Colapso de apartahotel con proyección de escombros hacia la autopista principal.',
    meetingPoints: ['pe-pascual', 'pe-pueblo']
  },
  {
    id: 'cp-torrecali',
    phenomenon: 'terremoto',
    level: 'medio',
    name: 'Torre de Cali',
    area: 'Norte / Centro',
    coords: [3.4565, -76.5320],
    description: 'Rascacielos insignia. Gran oscilación y alarma general; evacuación por escaleras presurizadas sin colapso global.',
    meetingPoints: ['pe-caicedo']
  }
]

/**
 * Barrios clave para búsqueda rápida de riesgo en la ciudad.
 */
export const NEIGHBORHOODS = [
  { name: 'Siloé', coords: [3.424, -76.558], zoneId: 'cz-ladera' },
  { name: 'Terrón Colorado', coords: [3.460, -76.556], zoneId: 'cz-ladera' },
  { name: 'Aguablanca / Mojica', coords: [3.425, -76.495], zoneId: 'cz-aguablanca' },
  { name: 'Llano Verde / Decepaz', coords: [3.400, -76.505], zoneId: 'cz-aguablanca' },
  { name: 'Centro / Plaza Caicedo', coords: [3.451, -76.532], zoneId: 'cz-centro' },
  { name: 'San Antonio', coords: [3.448, -76.540], zoneId: 'cz-centro' },
  { name: 'La Alameda', coords: [3.438, -76.536], zoneId: 'cz-centro' },
  { name: 'San Fernando', coords: [3.430, -76.546], zoneId: 'cz-corredor-central' },
  { name: 'Cuarto de Legua / USC', coords: [3.411, -76.554], zoneId: 'cz-corredor-central' },
  { name: 'El Limonar', coords: [3.394, -76.535], zoneId: 'cz-sur-intermedio' },
  { name: 'Capri / Pasoancho', coords: [3.400, -76.540], zoneId: 'cz-sur-intermedio' },
  { name: 'Granada / Versalles', coords: [3.465, -76.533], zoneId: 'cz-norte-tradicional' },
  { name: 'Salomia / Menga', coords: [3.475, -76.505], zoneId: 'cz-norte-industrial' },
  { name: 'El Caney', coords: [3.380, -76.522], zoneId: 'cz-sur-expansion' },
  { name: 'Bochalema', coords: [3.353, -76.518], zoneId: 'cz-sur-expansion' },
  { name: 'Universidad Autónoma (UAO)', coords: [3.3536, -76.5233], zoneId: 'cz-sur-expansion' },
  { name: 'Pance / Ciudad Jardín', coords: [3.340, -76.535], zoneId: 'cz-sur-expansion' }
]

// Compatibilidad
export const ZONES = COLLAPSE_ZONES
export const zonesByPhenomenon = (phenomenonId) => COLLAPSE_ZONES.filter((z) => z.phenomenon === phenomenonId)

/**
 * Algoritmo Ray-Casting para detectar si un punto [lat, lng] está dentro de un polígono.
 */
export function isPointInPolygon(point, polygon) {
  if (!point || !polygon || polygon.length < 3) return false
  const [lat, lng] = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    const intersect =
      yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

/**
 * Distancia ortodrómica en kilómetros entre dos coordenadas.
 */
export function getDistanceKm(coord1, coord2) {
  if (!coord1 || !coord2) return Infinity
  const [lat1, lon1] = coord1
  const [lat2, lon2] = coord2
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Encuentra la macrozona de riesgo de colapso correspondiente a unas coordenadas dadas.
 */
export function findZoneByCoords(coords, zonesList = COLLAPSE_ZONES) {
  if (!coords) return null
  for (const zone of zonesList) {
    if (zone.coords && isPointInPolygon(coords, zone.coords)) {
      return zone
    }
  }
  // Búsqueda por proximidad si el punto está cerca del límite
  let closest = null
  let minDistance = Infinity
  for (const zone of zonesList) {
    if (!zone.coords || zone.coords.length === 0) continue
    const center = [
      zone.coords.reduce((sum, c) => sum + c[0], 0) / zone.coords.length,
      zone.coords.reduce((sum, c) => sum + c[1], 0) / zone.coords.length,
    ]
    const dist = getDistanceKm(coords, center)
    if (dist < minDistance) {
      minDistance = dist
      closest = zone
    }
  }
  return closest
}

/**
 * Encuentra el punto de encuentro más cercano a unas coordenadas dadas.
 */
export function getNearestMeetingPoint(coords) {
  if (!coords) return null
  let closest = null
  let minDistance = Infinity
  for (const p of MEETING_POINTS) {
    const d = getDistanceKm(coords, p.coords)
    if (d < minDistance) {
      minDistance = d
      closest = p
    }
  }
  return { point: closest, distanceKm: minDistance }
}
