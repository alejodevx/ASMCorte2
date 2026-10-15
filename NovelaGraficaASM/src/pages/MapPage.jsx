
import { useState, useMemo } from 'react'
import { MapPin, ZoomIn, Info, Navigation } from 'lucide-react'
import RiskMap from '../components/map/RiskMap'
import ZoneDetail from '../components/map/ZoneDetail'
import { CALI_CENTER } from '../components/map/mapConstants'
import { PHENOMENA, THREAT_LEVELS, LEVEL_ORDER } from '../data/phenomena'
import { ZONES } from '../data/zones'
import { MEETING_POINTS, EVACUATION_ROUTES, getDirectionsUrl } from '../data/meetingPoints'

export default function MapPage() {
  const [levels, setLevels] = useState(['alto', 'medio', 'bajo'])
  const [showPoints, setShowPoints] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [selectedZone, setSelectedZone] = useState(null)
  const [flyTarget, setFlyTarget] = useState(null)
  const [map, setMap] = useState(null)
  const [activeTab, setActiveTab] = useState('zones')

  const visibleZones = useMemo(() => ZONES.filter((z) => levels.includes(z.level)), [levels])
  const visiblePoints = showPoints ? MEETING_POINTS : []
  const visibleRoutes = showRoutes ? EVACUATION_ROUTES : []

  const toggleLevel = (id) => setLevels((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))
  const selectZone = (zone) => {
    setSelectedZone(zone)
    setFlyTarget((prev) => ({ type: 'zone', coords: zone.coords, id: zone.id, counter: (prev?.counter || 0) + 1 }))
  }
  const selectPoint = (p) => {
    if (!showPoints) setShowPoints(true)
    setFlyTarget((prev) => ({ type: 'point', coords: p.coords, id: p.id, counter: (prev?.counter || 0) + 1 }))
  }
  const resetView = () => map?.flyTo(CALI_CENTER, 12, { duration: 0.8 })

  const filters = (
    <div className="map-filters">
      <div className="filter-group">
        <div style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)'}}>Nivel de afectación</div>
        <div className="chip-row">
          {LEVEL_ORDER.map(id => {
            const l = THREAT_LEVELS[id]
            const active = levels.includes(id)
            return (
              <button key={id} className="chip" onClick={() => toggleLevel(id)} style={{
                backgroundColor: active ? l.color : 'transparent',
                borderColor: l.color,
                color: active ? 'white' : l.color
              }}>
                {l.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="filter-group">
        <div style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)'}}>Rescate</div>
        <label className="switch-label">
          <input type="checkbox" checked={showPoints} onChange={e => setShowPoints(e.target.checked)} /> Puntos de encuentro
        </label>
        <label className="switch-label">
          <input type="checkbox" checked={showRoutes} onChange={e => setShowRoutes(e.target.checked)} /> Rutas de evacuación
        </label>
      </div>
      <hr style={{borderColor: 'var(--border)', borderStyle: 'solid', borderWidth: '1px 0 0 0'}} />
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('zones')}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem 0.25rem',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'zones' ? 600 : 400,
              color: activeTab === 'zones' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'zones' ? '2px solid var(--primary)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            Sectores críticos ({visibleZones.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('points')
              if (!showPoints) setShowPoints(true)
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem 0.25rem',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'points' ? 600 : 400,
              color: activeTab === 'points' ? '#2e7d32' : 'var(--text-muted)',
              borderBottom: activeTab === 'points' ? '2px solid #2e7d32' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <MapPin size={15} color={activeTab === 'points' ? '#2e7d32' : 'var(--text-muted)'} />
            Puntos de encuentro ({MEETING_POINTS.length})
          </button>
        </div>

        {activeTab === 'zones' ? (
          <ul className="zone-list" style={{ marginTop: 0 }}>
            {visibleZones.map(z => (
              <li key={z.id} className="zone-item" onClick={() => selectZone(z)}>
                <Info size={16} color={PHENOMENA[z.phenomenon].color} />
                <div style={{flexGrow: 1}}>
                  <div className="zone-item-title">{z.name}</div>
                  <div className="zone-item-subtitle">Afectación {THREAT_LEVELS[z.level].label}</div>
                </div>
                <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: THREAT_LEVELS[z.level].color}}></div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
              Selecciona un punto para ubicarlo en el mapa o pulsa en <strong>Cómo llegar</strong> para abrir la ruta en Google Maps.
            </div>
            <ul className="zone-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MEETING_POINTS.map(p => (
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
                    cursor: 'pointer'
                  }}
                  onClick={() => selectPoint(p)}
                  title="Centrar en el mapa"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <MapPin size={20} color="#2e7d32" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.area}</div>
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
        <h2 style={{marginBottom: '0.5rem'}}>Mapa de crisis</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem'}}>Investiga las zonas más afectadas por el terremoto y sigue la historia.</p>
        {selectedZone ? <ZoneDetail zone={selectedZone} onBack={() => setSelectedZone(null)} onSelectPoint={selectPoint} /> : filters}
      </div>
      <div className="map-content">
        <RiskMap zones={visibleZones} meetingPoints={visiblePoints} routes={visibleRoutes} selectedZoneId={selectedZone?.id} flyTarget={flyTarget} onSelectZone={selectZone} onSelectPoint={selectPoint} onMapReady={setMap} />
        <div className="map-fabs">
          <button className="fab" onClick={resetView} title="Resetear vista"><ZoomIn size={20} /></button>
        </div>
      </div>
    </div>
  )
}
