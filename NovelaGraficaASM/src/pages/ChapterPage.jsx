
import { useParams, Navigate, Link } from 'react-router-dom'
import { CHAPTERS } from '../data/chapters'
import { PHENOMENA } from '../data/phenomena'
import { Gamepad2, ArrowLeft, TriangleAlert, Info, MapPin } from 'lucide-react'

export default function ChapterPage() {
  const { id } = useParams()
  const chapter = CHAPTERS.find(c => c.id === id)
  if(!chapter) return <Navigate to="/capitulos" />
  
  const p = PHENOMENA.terremoto;

  return (
    <div>
      <div className="chapter-header" style={{backgroundColor: p.color, color: 'white'}}>
        <div className="container">
          <Link to="/capitulos" style={{color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem'}}><ArrowLeft size={18}/> Volver</Link>
          <div style={{display:'flex', gap:'1.5rem', alignItems:'center'}}>
            <TriangleAlert size={64}/>
            <div>
              <div style={{textTransform:'uppercase', opacity:0.8}}>Capítulo {chapter.number}</div>
              <h1 style={{fontSize:'2.5rem', margin:0}}>{chapter.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container chapter-content">
        <div>
          <h2>Sinopsis</h2>
          <p style={{lineHeight:1.6, marginTop:'1rem', color:'var(--text-muted)'}}>{chapter.synopsis}</p>
          <h2 style={{marginTop:'2rem'}}>Cómo actuar</h2>
          <div style={{marginTop:'1rem'}}>
            <h3 style={{fontSize:'1.1rem', marginBottom:'0.5rem'}}>Antes:</h3>
            {p.before.map((txt,i) => <div className="list-item" key={i}><Info className="list-icon" size={20}/><span>{txt}</span></div>)}
            <h3 style={{fontSize:'1.1rem', marginBottom:'0.5rem', marginTop:'1.5rem'}}>Durante:</h3>
            {p.during.map((txt,i) => <div className="list-item" key={i}><Info className="list-icon" size={20}/><span>{txt}</span></div>)}
            <h3 style={{fontSize:'1.1rem', marginBottom:'0.5rem', marginTop:'1.5rem'}}>Después:</h3>
            {p.after.map((txt,i) => <div className="list-item" key={i}><Info className="list-icon" size={20}/><span>{txt}</span></div>)}
          </div>
        </div>
        <div>
          <div className="card" style={{position:'sticky', top:'100px'}}>
            <div className="card-body">
              <h3>Jugar Capítulo</h3>
              <p style={{fontSize:'0.9rem', color:'var(--text-muted)', marginTop:'0.5rem'}}>Inicia la novela gráfica interactiva.</p>
              <Link to={`/novela?capitulo=${chapter.id}`} className="btn btn-primary" style={{marginTop:'1.5rem', width:'100%', justifyContent:'center'}}><Gamepad2 size={20}/> Iniciar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
