
import { THREAT_LEVELS, LEVEL_ORDER } from '../../data/phenomena'
export default function MapLegend() {
  return (
    <div style={{position:'absolute', bottom:20, right:20, backgroundColor:'rgba(255,255,255,0.9)', padding:'1rem', borderRadius:'8px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', zIndex:500, backdropFilter:'blur(4px)'}}>
      <div style={{fontSize:'0.75rem', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.5rem', fontWeight:500}}>Amenaza</div>
      <div style={{display:'flex', flexDirection:'column', gap:'0.25rem'}}>
        {LEVEL_ORDER.map(id => {
          const l = THREAT_LEVELS[id]
          return (
            <div key={id} style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <div style={{width:16, height:16, borderRadius:4, backgroundColor:l.color, opacity:l.fillOpacity}}></div>
              <span style={{fontSize:'0.85rem'}}>{l.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
