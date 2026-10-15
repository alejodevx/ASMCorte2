import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Tooltip, Popup, useMap, ZoomControl, ScaleControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PHENOMENA, THREAT_LEVELS } from '../../data/phenomena'
import { CALI_CENTER, CALI_BOUNDS, SAFE_COLOR } from './mapConstants'
import { getDirectionsUrl, meetingPointById } from '../../data/meetingPoints'
import { Navigation } from 'lucide-react'

/** Ícono de punto de encuentro (estilo línea, color sólido, sin imágenes externas). */
const meetingIcon = L.divIcon({
  className: 'meeting-point-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 30],
  popupAnchor: [0, -28],
  html: `<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
    <path d="M12 22s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z" fill="#fff" stroke="${SAFE_COLOR}" stroke-width="1.6"/>
    <circle cx="12" cy="7.6" r="1.4" fill="none" stroke="${SAFE_COLOR}" stroke-width="1.4"/>
    <path d="M9.4 14.2l1.2-3.6h2.8l1.2 3.6M12 10.6v4.6" fill="none" stroke="${SAFE_COLOR}" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
})

const userIcon = L.divIcon({
  className: 'user-location-icon',
  iconSize: [18, 18],
  html: '<span></span>',
})

/** Centra el mapa en la zona o punto seleccionado. */
function FlyTo({ target }) {
  const map = useMap()
  useEffect(() => {
    if (!target) return
    if (target.type === 'zone') {
      map.flyToBounds(L.latLngBounds(target.coords), { padding: [40, 40], maxZoom: 14, duration: 0.8 })
    } else {
      map.flyTo(target.coords, Math.max(map.getZoom(), 15), { duration: 0.8 })
    }
  }, [map, target])
  return null
}

/** Ajusta el tamaño cuando cambia el contenedor (paneles laterales, rotación del móvil). */
function AutoResize() {
  const map = useMap()
  useEffect(() => {
    const el = map.getContainer()
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(el)
    return () => ro.disconnect()
  }, [map])
  return null
}

function MapRefSetter({ onReady }) {
  const map = useMap()
  useEffect(() => { onReady?.(map) }, [map, onReady])
  return null
}

export default function RiskMap({
  zones,
  meetingPoints,
  routes,
  selectedZoneId,
  flyTarget,
  userLocation,
  onSelectZone,
  onSelectPoint,
  onMapReady,
}) {
  // Dibuja primero los niveles bajos y al final los altos (quedan encima).
  const ordered = useMemo(() => {
    const rank = { bajo: 0, medio: 1, alto: 2 }
    return [...zones].sort((a, b) => rank[a.level] - rank[b.level])
  }, [zones])

  return (
    <MapContainer
      center={CALI_CENTER}
      zoom={12}
      minZoom={11}
      maxZoom={18}
      maxBounds={CALI_BOUNDS}
      maxBoundsViscosity={0.8}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <ScaleControl position="bottomleft" imperial={false} />
      <AutoResize />
      <MapRefSetter onReady={onMapReady} />
      <FlyTo target={flyTarget} />

      {ordered.map((zone) => {
        const level = THREAT_LEVELS[zone.level]
        const phen = PHENOMENA[zone.phenomenon]
        const selected = zone.id === selectedZoneId
        return (
          <Polygon
            key={zone.id}
            positions={zone.coords}
            pathOptions={{
              color: selected ? '#000' : phen.color,
              weight: selected ? 3 : 1.5,
              fillColor: level.color,
              fillOpacity: level.fillOpacity,
            }}
            eventHandlers={{ click: () => onSelectZone(zone) }}
          >
            <Tooltip sticky direction="top">
              <strong>{zone.name}</strong>
              <br />
              {phen.name} · Amenaza {level.label.toLowerCase()}
            </Tooltip>
          </Polygon>
        )
      })}

      {routes.map((r) => {
        const destPoint = meetingPointById(r.to)
        return (
          <Polyline
            key={r.id}
            positions={r.coords}
            pathOptions={{ color: SAFE_COLOR, weight: 4, dashArray: '8 6', lineCap: 'round' }}
          >
            <Tooltip sticky>Ruta de evacuación: {r.name}</Tooltip>
            <Popup>
              <div style={{ minWidth: '180px' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: SAFE_COLOR, fontWeight: 600 }}>
                  Ruta de evacuación
                </div>
                <strong style={{ display: 'block', margin: '4px 0 6px', fontSize: '0.95rem' }}>{r.name}</strong>
                {destPoint && (
                  <a
                    href={getDirectionsUrl(destPoint.coords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-directions"
                  >
                    <Navigation size={14} />
                    <span>¿Cómo llegar a {destPoint.name}?</span>
                  </a>
                )}
              </div>
            </Popup>
          </Polyline>
        )
      })}

      {meetingPoints.map((p) => (
        <Marker
          key={p.id}
          position={p.coords}
          icon={meetingIcon}
          eventHandlers={{ click: () => onSelectPoint?.(p) }}
        >
          <Popup>
            <div style={{ minWidth: '180px' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#2e7d32', fontWeight: 600 }}>
                Punto de encuentro
              </div>
              <strong style={{ fontSize: '1rem', color: '#1b5e20', display: 'block', margin: '4px 0 2px' }}>
                {p.name}
              </strong>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>{p.area}</div>
              <div style={{ fontSize: '0.75rem', color: '#777', marginBottom: '8px' }}>
                Apto para: {p.phenomena.map((id) => PHENOMENA[id]?.name || id).join(', ')}
              </div>
              <a
                href={getDirectionsUrl(p.coords)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-directions"
              >
                <Navigation size={14} />
                <span>¿Cómo llegar? (Google Maps)</span>
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Tooltip>Tu ubicación</Tooltip>
        </Marker>
      )}
    </MapContainer>
  )
}
