
import { Link } from 'react-router-dom'
import { Map, ShieldAlert, MapPin, Gamepad2, Phone, ChevronRight, TriangleAlert } from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { PHENOMENA } from '../data/phenomena'

const STEPS = [
  { icon: Map, title: 'Explora el mapa', text: 'Investiga qué zonas de Cali están siendo más afectadas por el sismo.' },
  { icon: ShieldAlert, title: 'Conoce los riesgos', text: 'Identifica por qué algunas edificaciones colapsan y otras resisten.' },
  { icon: MapPin, title: 'Ubica tu punto de encuentro', text: 'Encuentra las zonas de rescate y rutas de evacuación seguras.' },
  { icon: Gamepad2, title: 'Aprende a actuar', text: 'Juega la novela y toma decisiones críticas de supervivencia.' },
]

export default function HomePage() {
  const p = PHENOMENA.terremoto

  return (
    <div>
      <section className="hero">
        <div className="container grid-2">
          <div>
            <span style={{opacity: 0.85, textTransform: 'uppercase', fontSize: '0.85rem'}}>Novela gráfica interactiva · UAO</span>
            <h1 className="hero-title">Nuestra casa compartida: El despertar del Buziraco</h1>
            <p className="hero-subtitle">Un rugido profundo retumba en las profundidades de Cali. La ciudad se sacude violentamente. Conoce las zonas críticas, sobrevive a la tragedia y aprende cómo ayudar.</p>
            <div className="hero-actions">
              <Link to="/mapa" className="btn hero-btn-light"><Map size={20}/> Explorar mapa</Link>
              <Link to="/novela" className="btn hero-btn-outline"><Gamepad2 size={20}/> Jugar novela</Link>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '160px', height: '160px', border: '2px solid rgba(255,255,255,0.7)', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <TriangleAlert size={80} />
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 style={{marginBottom: '0.5rem', fontSize: '2rem'}}>Capítulos de la Novela</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Sigue las historias de los habitantes de Cali antes, durante y después del catastrófico terremoto.</p>
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
                <Link to={`/capitulos/${c.id}`} style={{color: 'var(--primary)', fontWeight: 500, display: 'flex', alignItems: 'center'}}>Ver detalles <ChevronRight size={16}/></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{backgroundColor: 'white'}}>
        <div className="container">
          <h2 style={{marginBottom: '2rem', fontSize: '2rem'}}>¿Cómo funciona?</h2>
          <div className="grid-4">
            {STEPS.map((s, i) => (
              <div key={i}>
                <div style={{width: '48px', height: '48px', border: '2px solid var(--primary)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
                  <s.icon size={24} />
                </div>
                <h3 style={{marginBottom: '0.5rem', fontWeight: 400}}>{i+1}. {s.title}</h3>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section container">
        <div style={{backgroundColor: '#ffebee', padding: '2rem', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem'}}>
          <Phone size={40} color="var(--primary)" />
          <h3 style={{flexGrow: 1, fontSize: '1.25rem'}}>Ante una emergencia real, comunícate con:</h3>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 500}}>123</div>
            <div style={{fontSize: '0.8rem'}}>Emergencias</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 500}}>119</div>
            <div style={{fontSize: '0.8rem'}}>Bomberos</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 500}}>132</div>
            <div style={{fontSize: '0.8rem'}}>Cruz Roja</div>
          </div>
        </div>
      </section>
    </div>
  )
}
