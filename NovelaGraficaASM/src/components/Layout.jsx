
import { Outlet, NavLink, Link } from 'react-router-dom'
import { Map, BookOpen, Gamepad2, Info } from 'lucide-react'

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          <img src="/uao-logo.png" alt="UAO" style={{ height: '32px' }} onError={(e) => e.target.style.display='none'} />
          <span>Novela Gráfica ASM</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/mapa" className={({isActive}) => isActive ? 'active' : ''}><Map size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Mapa</NavLink>
          <NavLink to="/capitulos" className={({isActive}) => isActive ? 'active' : ''}><BookOpen size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Capítulos</NavLink>
          <NavLink to="/novela" className={({isActive}) => isActive ? 'active' : ''}><Gamepad2 size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Jugar</NavLink>
          <NavLink to="/nosotros" className={({isActive}) => isActive ? 'active' : ''}><Info size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Proyecto</NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
