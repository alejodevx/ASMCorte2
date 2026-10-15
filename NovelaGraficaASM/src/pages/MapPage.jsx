import { useState, useMemo } from 'react'
import {
  MapPin,
  ZoomIn,
  Navigation,
  Crosshair,
  TriangleAlert,
  Search,
  X,
  Layers,
} from 'lucide-react'
import RiskMap from '../components/map/RiskMap'
import ZoneDetail from '../components/map/ZoneDetail'
import { CALI_CENTER } from '../components/map/mapConstants'
import { THREAT_LEVELS, LEVEL_ORDER } from '../data/phenomena'
import {
  COLLAPSE_ZONES,
  CRITICAL_POINTS,
  NEIGHBORHOODS,
  findZoneByCoords,
  getNearestMeetingPoint,
} from '../data/zones'
import { MEETING_POINTS, EVACUATION_ROUTES, getDirectionsUrl } from '../data/meetingPoints'

export default function MapPage() {
  const [levels, setLevels] = useState(['muy_alto', 'alto', 'medio', 'bajo'])
  const [showCollapseZones, setShowCollapseZones] = useState(true)
  const [showCritical, setShowCritical] = useState(true)
  const [showPoints, setShowPoints] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [selectedZone, setSelectedZone] = useState(null)
  const [flyTarget, setFlyTarget] = useState(null)
  const [map, setMap] = useState(null)
  const [activeTab, setActiveTab] = useState('zones') // 'zones' | 'critical' | 'points'
  const [userLocation, setUserLocation] = useState(null)
  const [inspectedPoint, setInspectedPoint] = useState(null)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')

  // Filtrado de macrozonas y puntos críticos por nivel de riesgo
  const visibleZones = useMemo(
    () => COLLAPSE_ZONES.filter((z) => levels.includes(z.level)),
    [levels]
  )
  const visibleCritical = useMemo(
    () => CRITICAL_POINTS.filter((cp) => levels.includes(cp.level)),
    [levels]
  )
  const visiblePoints = showPoints ? MEETING_POINTS : []
  const visibleRoutes = showRoutes ? EVACUATION_ROUTES : []

  const toggleLevel = (id) =>
    setLevels((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))

  const selectZone = (zone) => {
    setSelectedZone(zone)
    setFlyTarget((prev) => ({
      type: 'zone',
      coords: zone.coords,
      id: zone.id,
      counter: (prev?.counter || 0) + 1,
    }))
  }

  const selectCriticalPoint = (cp) => {
    setSelectedZone(cp)
    setFlyTarget((prev) => ({
      type: 'point',
      coords: cp.coords,
      id: cp.id,
      counter: (prev?.counter || 0) + 1,
    }))
  }

  const selectPoint = (p) => {
    if (!showPoints) setShowPoints(true)
    setFlyTarget((prev) => ({
      type: 'point',
      coords: p.coords,
      id: p.id,
      counter: (prev?.counter || 0) + 1,
    }))
  }

  const resetView = () => map?.flyTo(CALI_CENTER, 12, { duration: 0.8 })

  // Evaluación de riesgo al hacer clic en cualquier lugar del mapa
  const handleMapClick = (coords) => {
    const zone = findZoneByCoords(coords, COLLAPSE_ZONES)
    const nearest = getNearestMeetingPoint(coords)
    setInspectedPoint({
      coords,
      zone,
      nearestPoint: nearest?.point,
      distanceKm: nearest?.distanceKm,
    })
  }

  // Ubicación por GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude]
        setUserLocation(coords)
        setFlyTarget((prev) => ({
          type: 'point',
          coords,
          id: 'user-loc',
          counter: (prev?.counter || 0) + 1,
        }))
        handleMapClick(coords)
      },
      (err) => {
        alert('No se pudo obtener tu ubicación: ' + err.message)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  // Búsqueda rápida por barrio
  const handleSelectNeighborhood = (name) => {
    setSelectedNeighborhood(name)
    const n = NEIGHBORHOODS.find((item) => item.name === name)
    if (n) {
      setFlyTarget((prev) => ({
        type: 'point',
        coords: n.coords,
        id: `barrio-${name}`,
        counter: (prev?.counter || 0) + 1,
      }))
      handleMapClick(n.coords)
    }
  }

  const filters = (
    <div className="map-filters">
      {/* Buscador / Selector rápido de riesgo por barrio */}
      <div style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Search size={13} />
          <span>Consulta tu riesgo por barrio</span>
        </div>
        <select
          value={selectedNeighborhood}
          onChange={(e) => handleSelectNeighborhood(e.target.value)}
          style={{
            width: '100%',
            padding: '0.45rem 0.5rem',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            fontSize: '0.85rem',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="">-- Elige o busca tu sector --</option>
          {NEIGHBORHOODS.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleLocateMe}
          className="btn-locate"
          style={{
            width: '100%',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '0.45rem',
            fontSize: '0.8rem',
            fontWeight: 500,
            backgroundColor: '#e3f2fd',
            color: '#1565c0',
            border: '1px solid #bbdefb',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <Crosshair size={14} />
          <span>Ver riesgo en mi ubicación actual (GPS)</span>
        </button>
      </div>

      {/* Diagnóstico en el punto consultado */}
      {inspectedPoint && (
        <div
          style={{
            background: '#ffffff',
            padding: '0.85rem',
            borderRadius: '8px',
            border: '2px solid #1976d2',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setInspectedPoint(null)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              cursor: 'pointer',
              color: '#999',
            }}
            title="Cerrar diagnóstico"
          >
            <X size={16} />
          </button>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#1565c0', fontWeight: 700 }}>
            📍 Diagnóstico de Riesgo de Colapso
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Nivel evaluado:</span>
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
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#222' }}>
            {inspectedPoint.zone?.name || 'Zona urbana de Cali'}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '2px', lineHeight: 1.35 }}>
            {inspectedPoint.zone?.structuralRisk}
          </div>
          {inspectedPoint.nearestPoint && (
            <div style={{ marginTop: '0.6rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#2e7d32', fontWeight: 600 }}>
                Punto seguro más cercano:
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                {inspectedPoint.nearestPoint.name} (~
                {inspectedPoint.distanceKm < 1
                  ? `${Math.round(inspectedPoint.distanceKm * 1000)} m`
                  : `${inspectedPoint.distanceKm.toFixed(1)} km`}
                )
              </div>
              <a
                href={getDirectionsUrl(inspectedPoint.nearestPoint.coords)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-route"
                style={{ marginTop: '4px', display: 'inline-flex' }}
              >
                <Navigation size={13} />
                <span>Cómo llegar a este punto seguro</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Niveles de amenaza de colapso */}
      <div className="filter-group">
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Nivel de riesgo de colapso
        </div>
        <div className="chip-row" style={{ flexWrap: 'wrap' }}>
          {LEVEL_ORDER.map((id) => {
            const l = THREAT_LEVELS[id]
            const active = levels.includes(id)
            return (
              <button
                key={id}
                className="chip"
                onClick={() => toggleLevel(id)}
                style={{
                  backgroundColor: active ? l.color : 'transparent',
                  borderColor: l.color,
                  color: active ? 'white' : l.color,
                  fontSize: '0.78rem',
                  padding: '0.3rem 0.65rem',
                }}
              >
                {l.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Capas del mapa */}
      <div className="filter-group">
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Layers size={13} />
          <span>Capas visibles en el mapa</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.2rem' }}>
          <label className="switch-label">
            <input
              type="checkbox"
              checked={showCollapseZones}
              onChange={(e) => setShowCollapseZones(e.target.checked)}
            />{' '}
            Zonas de colapso
          </label>
          <label className="switch-label">
            <input
              type="checkbox"
              checked={showCritical}
              onChange={(e) => setShowCritical(e.target.checked)}
            />{' '}
            Puntos críticos
          </label>
          <label className="switch-label">
            <input
              type="checkbox"
              checked={showPoints}
              onChange={(e) => setShowPoints(e.target.checked)}
            />{' '}
            Puntos encuentro
          </label>
          <label className="switch-label">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
            />{' '}
            Rutas evacuación
          </label>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />

      {/* Selector de pestañas */}
      <div>
        <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('zones')}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '0.5rem 0.2rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'zones' ? 600 : 400,
              color: activeTab === 'zones' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'zones' ? '2px solid var(--primary)' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Zonas ({visibleZones.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('critical')}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '0.5rem 0.2rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'critical' ? 600 : 400,
              color: activeTab === 'critical' ? '#b71c1c' : 'var(--text-muted)',
              borderBottom: activeTab === 'critical' ? '2px solid #b71c1c' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              whiteSpace: 'nowrap',
            }}
          >
            <TriangleAlert size={13} color={activeTab === 'critical' ? '#b71c1c' : 'var(--text-muted)'} />
            Puntos críticos ({visibleCritical.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('points')
              if (!showPoints) setShowPoints(true)
            }}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '0.5rem 0.2rem',
              fontSize: '0.78rem',
              fontWeight: activeTab === 'points' ? 600 : 400,
              color: activeTab === 'points' ? '#2e7d32' : 'var(--text-muted)',
              borderBottom: activeTab === 'points' ? '2px solid #2e7d32' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              whiteSpace: 'nowrap',
            }}
          >
            <MapPin size={13} color={activeTab === 'points' ? '#2e7d32' : 'var(--text-muted)'} />
            Refugios ({MEETING_POINTS.length})
          </button>
        </div>

        {/* Contenido Pestaña 1: Macrozonas de colapso */}
        {activeTab === 'zones' && (
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
              Cobertura completa de Cali según vulnerabilidad de suelo y tipo de edificación. Haz clic en una zona para explorar su riesgo.
            </div>
            <ul className="zone-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {visibleZones.map((z) => {
                const l = THREAT_LEVELS[z.level] || THREAT_LEVELS.medio
                return (
                  <li
                    key={z.id}
                    className="zone-item"
                    onClick={() => selectZone(z)}
                    style={{
                      borderLeft: `3px solid ${l.color}`,
                      padding: '0.6rem 0.75rem',
                      borderRadius: '4px',
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <div className="zone-item-title" style={{ fontSize: '0.88rem' }}>
                        {z.name}
                      </div>
                      <div className="zone-item-subtitle" style={{ fontSize: '0.78rem', marginTop: '2px' }}>
                        Riesgo {l.label} · {z.area.split('·')[0]}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: l.color,
                        flexShrink: 0,
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Contenido Pestaña 2: Puntos críticos de colapso */}
        {activeTab === 'critical' && (
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
              Edificaciones y sectores con colapsos estructurales severos durante el terremoto de la historia.
            </div>
            <ul className="zone-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {visibleCritical.map((cp) => {
                const l = THREAT_LEVELS[cp.level] || THREAT_LEVELS.alto
                return (
                  <li
                    key={cp.id}
                    className="zone-item"
                    onClick={() => selectCriticalPoint(cp)}
                    style={{
                      borderLeft: `3px solid ${l.color}`,
                      padding: '0.6rem 0.75rem',
                      borderRadius: '4px',
                    }}
                  >
                    <TriangleAlert size={18} color={l.color} style={{ flexShrink: 0 }} />
                    <div style={{ flexGrow: 1 }}>
                      <div className="zone-item-title" style={{ fontSize: '0.88rem' }}>
                        {cp.name}
                      </div>
                      <div className="zone-item-subtitle" style={{ fontSize: '0.78rem', marginTop: '2px' }}>
                        {cp.area}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Contenido Pestaña 3: Puntos de encuentro y refugio seguro */}
        {activeTab === 'points' && (
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
              Puntos seguros de encuentro. Pulsa en <strong>Cómo llegar</strong> para trazar la ruta en Google Maps desde tu ubicación.
            </div>
            <ul className="zone-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MEETING_POINTS.map((p) => (
                <li
                  key={p.id}
                  className="zone-item meeting-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                  onClick={() => selectPoint(p)}
                  title="Centrar en el mapa"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <MapPin size={20} color="#2e7d32" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.area}</div>
                    </div>
                  </div>
                  <a
                    href={getDirectionsUrl(p.coords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-route"
                    onClick={(e) => e.stopPropagation()}
                    title="Ver cómo llegar en Google Maps"
                  >
                    <Navigation size={13} />
                    <span>Cómo llegar</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="map-layout">
      <div className="map-sidebar">
        <h2 style={{ marginBottom: '0.35rem', fontSize: '1.4rem' }}>Mapa de crisis y riesgo de colapso</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.4 }}>
          Toca cualquier punto de Cali para evaluar tu riesgo de colapso estructural y encontrar tu punto seguro más cercano.
        </p>
        {selectedZone ? (
          <ZoneDetail
            zone={selectedZone}
            onBack={() => setSelectedZone(null)}
            onSelectPoint={selectPoint}
          />
        ) : (
          filters
        )}
      </div>
      <div className="map-content">
        <RiskMap
          zones={visibleZones}
          criticalPoints={visibleCritical}
          meetingPoints={visiblePoints}
          routes={visibleRoutes}
          selectedZoneId={selectedZone?.id}
          flyTarget={flyTarget}
          userLocation={userLocation}
          inspectedPoint={inspectedPoint}
          showCollapseZones={showCollapseZones}
          showCriticalPoints={showCritical}
          showMeetingPoints={showPoints}
          showRoutes={showRoutes}
          onSelectZone={selectZone}
          onSelectCriticalPoint={selectCriticalPoint}
          onSelectPoint={selectPoint}
          onMapClick={handleMapClick}
          onMapReady={setMap}
        />
        <div className="map-fabs">
          <button className="fab" onClick={handleLocateMe} title="Consultar riesgo en mi ubicación actual">
            <Crosshair size={20} color="#1565c0" />
          </button>
          <button className="fab" onClick={resetView} title="Resetear vista de Cali">
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
