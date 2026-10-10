
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Play, Book, TriangleAlert } from 'lucide-react'
import { PHENOMENA } from '../../data/phenomena'
import { meetingPointById } from '../../data/meetingPoints'
import LevelChip from '../LevelChip'

export default function ZoneDetail({ zone, onBack, onSelectPoint }) {
  const phen = PHENOMENA[zone.phenomenon]
  const points = zone.meetingPoints.map(meetingPointById).filter(Boolean)

  return (
    <div>
      <div className="detail-header">
        <button onClick={onBack} style={{background:'none', cursor:'pointer'}}><ArrowLeft/></button>
        <span style={{textTransform:'uppercase', fontSize:'0.75rem', color:'var(--text-muted)'}}>Detalle de la zona</span>
      </div>
      
      <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
        <div className="detail-icon-box" style={{backgroundColor: phen.color}}>
          <TriangleAlert size={32} />
        </div>
        <div>
          <h3 style={{margin:0, fontSize:'1.2rem'}}>{zone.name}</h3>
          <p style={{margin:0, fontSize:'0.9rem', color:'var(--text-muted)'}}>{phen.name} · Origen geológico</p>
        </div>
      </div>
      
      <div style={{marginBottom:'1.5rem'}}><LevelChip level={zone.level} /></div>
      
      <div style={{marginBottom:'1.5rem'}}>
        <div style={{fontSize:'0.9rem', fontWeight:500}}>Sector</div>
        <div style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>{zone.area}</div>
      </div>
      <p style={{fontSize:'0.9rem', marginBottom:'1.5rem', lineHeight:1.5}}>{zone.description}</p>
      
      <hr style={{borderColor:'var(--border)', margin:'1.5rem 0', borderStyle:'solid', borderWidth:'1px 0 0 0'}} />
      
      <div style={{marginBottom:'1.5rem'}}>
        <div style={{fontSize:'0.9rem', fontWeight:500, marginBottom:'0.5rem'}}>Puntos de encuentro cercanos</div>
        <ul className="zone-list" style={{marginTop:0}}>
          {points.map(p => (
            <li key={p.id} className="zone-item" onClick={() => onSelectPoint(p)}>
              <MapPin size={18} color="#2e7d32" />
              <div>
                <div style={{fontSize:'0.9rem'}}>{p.name}</div>
                <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{p.area}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap'}}>
        <Link to={`/novela?capitulo=${phen.id}`} className="btn btn-primary" style={{flex:1, justifyContent:'center'}}><Play size={18}/> Jugar</Link>
        <Link to={`/capitulos/${phen.id}`} className="btn btn-outline" style={{flex:1, justifyContent:'center'}}><Book size={18}/> Actuar</Link>
      </div>
    </div>
  )
}
