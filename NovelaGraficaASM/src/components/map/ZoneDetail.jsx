import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Play, Book, TriangleAlert, Navigation, ShieldCheck } from 'lucide-react'
import { PHENOMENA, THREAT_LEVELS } from '../../data/phenomena'
import { meetingPointById, getDirectionsUrl } from '../../data/meetingPoints'
import LevelChip from '../LevelChip'

export default function ZoneDetail({ zone, onBack, onSelectPoint }) {
  const phen = PHENOMENA[zone.phenomenon] || PHENOMENA.terremoto
  const points = (zone.meetingPoints || []).map(meetingPointById).filter(Boolean)
  const levelInfo = THREAT_LEVELS[zone.level] || THREAT_LEVELS.medio

  return (
    <div>
      <div className="detail-header">
        <button onClick={onBack} style={{ background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={18} />
          <span style={{ fontSize: '0.85rem' }}>Volver al explorador</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
        <div className="detail-icon-box" style={{ backgroundColor: levelInfo.color }}>
          <TriangleAlert size={30} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{zone.name}</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{zone.area}</p>
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <LevelChip level={zone.level} />
      </div>

      {zone.soilType && (
        <div style={{ marginBottom: '1rem', background: '#fafafa', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Condición del suelo
          </div>
          <div style={{ fontSize: '0.85rem', marginTop: '2px' }}>{zone.soilType}</div>
        </div>
      )}

      {zone.structuralRisk && (
        <div style={{ marginBottom: '1.25rem', background: '#fff5f5', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ffcdd2' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c62828', textTransform: 'uppercase' }}>
            Vulnerabilidad y Riesgo de Colapso
          </div>
          <div style={{ fontSize: '0.85rem', marginTop: '2px', color: '#333', lineHeight: 1.4 }}>{zone.structuralRisk}</div>
        </div>
      )}

      <p style={{ fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: 1.45, color: '#444' }}>
        {zone.description}
      </p>

      {zone.recommendations && zone.recommendations.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={16} color="#2e7d32" />
            Acciones clave de prevención
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#555', lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {zone.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <hr style={{ borderColor: 'var(--border)', margin: '1.25rem 0', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Puntos de encuentro y refugio cercanos
        </div>
        {points.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Consulta los puntos de encuentro principales en el mapa.
          </p>
        ) : (
          <ul className="zone-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {points.map((p) => (
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
                onClick={() => onSelectPoint(p)}
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
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Link to={`/novela?capitulo=${phen.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
          <Play size={18} /> Jugar capítulo
        </Link>
        <Link to={`/capitulos/${phen.id}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
          <Book size={18} /> Guía de supervivencia
        </Link>
      </div>
    </div>
  )
}
