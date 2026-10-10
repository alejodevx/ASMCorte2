
import { THREAT_LEVELS } from '../data/phenomena'
export default function LevelChip({ level }) {
  const l = THREAT_LEVELS[level]
  if(!l) return null;
  return <span className="level-badge" style={{backgroundColor: l.color}}>Nivel {l.label}</span>
}
