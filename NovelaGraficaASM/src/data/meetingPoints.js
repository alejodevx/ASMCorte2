/**
 * Puntos de encuentro y rutas de evacuación (Terremotos).
 */

export const MEETING_POINTS = [
  { id: 'pe-caicedo', name: 'Plaza de Caicedo', area: 'Comuna 3 – Centro', coords: [3.4516, -76.5320], phenomena: ['terremoto'] },
  { id: 'pe-perro', name: 'Parque del Perro', area: 'Comuna 19 – San Fernando', coords: [3.4432, -76.5444], phenomena: ['terremoto'] },
  { id: 'pe-pascual', name: 'Estadio Olímpico Pascual Guerrero (exteriores)', area: 'Comuna 19 - Cerca de HUV y San Fernando', coords: [3.4297, -76.5414], phenomena: ['terremoto'] },
  { id: 'pe-pueblo', name: 'Coliseo El Pueblo', area: 'Comuna 19 - Cerca de Cuarto de Legua', coords: [3.4235, -76.5440], phenomena: ['terremoto'] },
  { id: 'pe-ingenio', name: 'Parque del Ingenio', area: 'Comuna 17 - Cerca a Limonar y Caney', coords: [3.3880, -76.5280], phenomena: ['terremoto'] },
  { id: 'pe-uao', name: 'Universidad Autónoma de Occidente', area: 'Comuna 22 – Cerca a Bochalema', coords: [3.3536, -76.5233], phenomena: ['terremoto'] },
]

export const EVACUATION_ROUTES = [
  {
    id: 'ruta-huv-pascual',
    phenomenon: 'terremoto',
    name: 'HUV → Estadio Pascual Guerrero',
    to: 'pe-pascual',
    coords: [[3.4310, -76.5460], [3.4300, -76.5430], [3.4297, -76.5414]],
  },
  {
    id: 'ruta-cuartolegua-pueblo',
    phenomenon: 'terremoto',
    name: 'Cuarto de Legua → Coliseo El Pueblo',
    to: 'pe-pueblo',
    coords: [[3.4120, -76.5520], [3.4170, -76.5480], [3.4235, -76.5440]],
  },
  {
    id: 'ruta-limonar-ingenio',
    phenomenon: 'terremoto',
    name: 'El Limonar → Parque del Ingenio',
    to: 'pe-ingenio',
    coords: [[3.3950, -76.5350], [3.3920, -76.5320], [3.3880, -76.5280]],
  },
]

export const meetingPointById = (id) => MEETING_POINTS.find((p) => p.id === id)

/**
 * Genera la URL universal de Google Maps para obtener la ruta hacia las coordenadas dadas.
 * Al no especificar origen, Google Maps utiliza automáticamente la ubicación actual del usuario.
 */
export const getDirectionsUrl = (coords) => {
  if (!coords || coords.length < 2) return '#'
  const [lat, lng] = coords
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
