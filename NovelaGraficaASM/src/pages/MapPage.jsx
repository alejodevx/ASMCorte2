
import { useState, useMemo } from 'react'
import { MapPin, ZoomIn, Info } from 'lucide-react'
import RiskMap from '../components/map/RiskMap'
import ZoneDetail from '../components/map/ZoneDetail'
import { CALI_CENTER } from '../components/map/mapConstants'
import { PHENOMENA, THREAT_LEVELS, LEVEL_ORDER } from '../data/phenomena'
import { ZONES } from '../data/zones'
import { MEETING_POINTS, EVACUATION_ROUTES } from '../data/meetingPoints'

export default function MapPage() {
  const [levels, setLevels] = useState(['alto', 'medio', 'bajo'])
  const [showPoints, setShowPoints] = useState(true)
  const [showRoutes, setShowRoutes] = useState(true)
  const [selectedZone, setSelectedZone] = useState(null)
  const [flyTarget, setFlyTarget] = useState(null)
  const [map, setMap] = useState(null)

  const visibleZones = useMemo(() => ZONES.filter((z) => levels.includes(z.level)), [levels])
  const visiblePoints = showPoints ? MEETING_POINTS : []
  const visibleRoutes = showRoutes ? EVACUATION_ROUTES : []

  const toggleLevel = (id) => setLevels((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]))
  const selectZone = (zone) => { setSelectedZone(zone); setFlyTarget({ type: 'zone', coords: zone.coords, key: Date.now() }); }
  const selectPoint = (p) => { setFlyTarget({ type: 'point', coords: p.coords, key: Date.now() }); }
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
        <div style={{fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)'}}>Sectores críticos</div>
        <ul className="zone-list">
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
