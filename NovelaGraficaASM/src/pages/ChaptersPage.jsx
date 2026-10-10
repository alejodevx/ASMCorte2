
import { Link } from 'react-router-dom'
import { CHAPTERS } from '../data/chapters'
import { PHENOMENA } from '../data/phenomena'
import { ChevronRight, TriangleAlert } from 'lucide-react'

export default function ChaptersPage() {
  const p = PHENOMENA.terremoto;
  return (
    <div className="section container">
      <h1 style={{fontSize:'2.5rem', marginBottom:'0.5rem'}}>Capítulos</h1>
      <p style={{color:'var(--text-muted)', marginBottom:'2rem', fontSize:'1.1rem'}}>Explora los capítulos de la novela visual.</p>
      <div className="grid-3">
        {CHAPTERS.map(c => (
          <div className="card" key={c.id}>
            <div className="card-header" style={{backgroundColor: p.color}}>
              <TriangleAlert size={32} />
              <div>
                <div style={{fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8}}>Capítulo {c.number}</div>
                <div className="card-title" style={{margin: 0}}>{c.title}</div>
              </div>
            </div>
            <div className="card-body">
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{c.synopsis}</p>
            </div>
            <div className="card-footer">
              <Link to={`/capitulos/${c.id}`} style={{color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center'}}>Detalles <ChevronRight size={16}/></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
