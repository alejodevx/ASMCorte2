
import { Gamepad2 } from 'lucide-react'
export default function UnityPlayer() {
  // Placeholder logic without MUI
  return (
    <div style={{color:'white', textAlign:'center', padding:'2rem', border:'2px dashed #444', borderRadius:'8px', maxWidth:'600px'}}>
      <Gamepad2 size={64} color="#666" style={{margin:'0 auto 1rem'}} />
      <h2 style={{marginBottom:'1rem'}}>Juego no exportado</h2>
      <p style={{color:'#aaa', marginBottom:'1.5rem'}}>La build de Unity WebGL aún no se encuentra en public/unity/Build.</p>
      <div style={{backgroundColor:'#222', padding:'1rem', borderRadius:'4px', textAlign:'left', fontSize:'0.9rem', color:'#888'}}>
        Instrucciones para el desarrollador:
        <br/>1. Exporta tu juego desde Unity usando el template WebGL proporcionado.
        <br/>2. Copia los archivos a la carpeta <code style={{color:'#fff'}}>public/unity/Build/</code>.
      </div>
    </div>
  )
}
