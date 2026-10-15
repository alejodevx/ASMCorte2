import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Tooltip, Popup, useMap, ZoomControl, ScaleControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PHENOMENA, THREAT_LEVELS } from '../../data/phenomena'
import { CALI_CENTER, CALI_BOUNDS, SAFE_COLOR } from './mapConstants'
import { getDirectionsUrl, meetingPointById } from '../../data/meetingPoints'
import { Navigation, TriangleAlert } from 'lucide-react'

/** Ícono de punto de encuentro seguro (verde). */
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

/** Ícono de punto crítico de colapso (rojo con advertencia). */
const criticalIcon = L.divIcon({
  className: 'critical-point-marker',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -26],
  html: `<div style="
    width: 28px;
    height: 28px;
    background: #b71c1c;
    border: 2px solid #ffffff;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 3px 6px rgba(0,0,0,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <span style="
      transform: rotate(45deg);
      color: #fff;
      font-size: 13px;
      font-weight: 900;
      line-height: 1;
    ">&#9888;</span>
  </div>`,
})

/** Ícono de punto consultado en el mapa (azul). */
const inspectIcon = L.divIcon({
  className: 'inspect-point-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
  html: `<div style="
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(25, 118, 210, 0.3);
    border: 2px solid #1565c0;
    box-shadow: 0 0 10px rgba(25, 118, 210, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="width: 8px; height: 8px; background: #1565c0; border: 2px solid #fff; border-radius: 50%;"></div>
  </div>`,
})

const userIcon = L.divIcon({
  className: 'user-location-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
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

/** Escucha los clics en cualquier punto libre del mapa para evaluar el riesgo. */
function MapClickHandler({ onMapClick }) {
  const map = useMap()
  useEffect(() => {
    if (!onMapClick) return
    const handleClick = (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng])
    }
    map.on('click', handleClick)
    return () => {
      map.off('click', handleClick)
    }
  }, [map, onMapClick])
  return null
}

/** Ajusta el tamaño cuando cambia el contenedor. */
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
  zones = [],
  criticalPoints = [],
  meetingPoints = [],
  routes = [],
  selectedZoneId,
  flyTarget,
  userLocation,
  inspectedPoint,
  showCollapseZones = true,
  showCriticalPoints = true,
  showMeetingPoints = true,
  showRoutes = true,
  onSelectZone,
  onSelectCriticalPoint,
  onSelectPoint,
  onMapClick,
  onMapReady,
}) {
  const inspectMarkerRef = useRef(null)

  // Abre automáticamente el popup del punto consultado
  useEffect(() => {
    if (inspectedPoint && inspectMarkerRef.current) {
      inspectMarkerRef.current.openPopup()
    }
  }, [inspectedPoint])

  // Orden de capas de zonas: bajo -> medio -> alto -> muy_alto
  const orderedZones = useMemo(() => {
    const rank = { bajo: 0, medio: 1, alto: 2, muy_alto: 3 }
    return [...zones].sort((a, b) => (rank[a.level] || 0) - (rank[b.level] || 0))
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
      <MapClickHandler onMapClick={onMapClick} />

      {/* 1. Macrozonas de riesgo de colapso que cubren toda la ciudad */}
      {showCollapseZones &&
        orderedZones.map((zone) => {
          const level = THREAT_LEVELS[zone.level] || THREAT_LEVELS.medio
          const selected = zone.id === selectedZoneId
          return (
            <Polygon
              key={zone.id}
              positions={zone.coords}
              pathOptions={{
                color: selected ? '#000' : level.color,
                weight: selected ? 3.5 : 1.5,
                fillColor: level.color,
                fillOpacity: selected ? Math.min(level.fillOpacity + 0.15, 0.7) : level.fillOpacity,
              }}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e)
                  onSelectZone?.(zone)
                },
              }}
            >
              <Tooltip sticky direction="top">
                <div style={{ fontWeight: 600 }}>{zone.name}</div>
                <div style={{ fontSize: '0.8rem', color: level.color, fontWeight: 500 }}>
                  Riesgo de colapso {level.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#555' }}>Haz clic para ver detalles y recomendaciones</div>
              </Tooltip>
            </Polygon>
          )
        })}

      {/* 2. Rutas de evacuación seguras */}
      {showRoutes &&
        routes.map((r) => {
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

      {/* 3. Puntos de encuentro y refugio seguro */}
      {showMeetingPoints &&
        meetingPoints.map((p) => (
          <Marker
            key={p.id}
            position={p.coords}
            icon={meetingIcon}
            eventHandlers={{ click: () => onSelectPoint?.(p) }}
          >
            <Popup>
              <div style={{ minWidth: '190px' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#2e7d32', fontWeight: 600 }}>
                  Punto de encuentro seguro
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

      {/* 4. Puntos y sectores críticos de colapso */}
      {showCriticalPoints &&
        criticalPoints.map((cp) => {
          const level = THREAT_LEVELS[cp.level] || THREAT_LEVELS.alto
          const nearestDest = cp.meetingPoints?.length ? meetingPointById(cp.meetingPoints[0]) : null
          return (
            <Marker
              key={cp.id}
              position={cp.coords}
              icon={criticalIcon}
              eventHandlers={{ click: () => onSelectCriticalPoint?.(cp) }}
            >
              <Tooltip direction="top" offset={[0, -20]}>
                <strong>{cp.name}</strong>
                <br />
                <span style={{ color: level.color, fontWeight: 500 }}>Colapso Crítico ({level.label})</span>
              </Tooltip>
              <Popup>
                <div style={{ minWidth: '210px', maxWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#b71c1c', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    <TriangleAlert size={14} />
                    Punto crítico de colapso
                  </div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', margin: '4px 0 2px' }}>{cp.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '6px' }}>{cp.area}</div>
                  <p style={{ fontSize: '0.8rem', color: '#333', lineHeight: 1.35, margin: '6px 0' }}>{cp.description}</p>
                  {nearestDest && (
                    <a
                      href={getDirectionsUrl(nearestDest.coords)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-directions"
                      style={{ backgroundColor: '#c62828' }}
                    >
                      <Navigation size={13} />
                      <span>Ruta a punto de rescate</span>
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

      {/* 5. Punto consultado por el usuario al hacer clic en cualquier parte de la ciudad */}
      {inspectedPoint && (
        <Marker ref={inspectMarkerRef} position={inspectedPoint.coords} icon={inspectIcon}>
          <Popup autoPan={true}>
            <div style={{ minWidth: '220px', maxWidth: '280px' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#1565c0', fontWeight: 700 }}>
                📍 Riesgo en esta ubicación
              </div>
              <div style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Riesgo de colapso:</span>
                <span
                  className="level-badge"
                  style={{
                    backgroundColor: THREAT_LEVELS[inspectedPoint.zone?.level || 'medio'].color,
                    padding: '2px 8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {THREAT_LEVELS[inspectedPoint.zone?.level || 'medio'].label}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: '4px' }}>
                {inspectedPoint.zone?.name || 'Zona urbana de Cali'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '8px', lineHeight: 1.35 }}>
                {inspectedPoint.zone?.structuralRisk || 'Consulta la zona más cercana para recomendaciones.'}
              </div>
              {inspectedPoint.nearestPoint && (
                <div style={{ borderTop: '1px solid #eee', paddingTop: '6px', marginTop: '6px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 600 }}>
                    Punto de encuentro más cercano:
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>
                    {inspectedPoint.nearestPoint.name} (a ~
                    {inspectedPoint.distanceKm < 1
                      ? `${Math.round(inspectedPoint.distanceKm * 1000)} m`
                      : `${inspectedPoint.distanceKm.toFixed(1)} km`}
                    )
                  </div>
                  <a
                    href={getDirectionsUrl(inspectedPoint.nearestPoint.coords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-directions"
                    style={{ marginTop: '6px' }}
                  >
                    <Navigation size={13} />
                    <span>Cómo llegar (Google Maps)</span>
                  </a>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      )}

      {/* 6. Ubicación en tiempo real del usuario */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Tooltip>Tu ubicación</Tooltip>
        </Marker>
      )}
    </MapContainer>
  )
}
